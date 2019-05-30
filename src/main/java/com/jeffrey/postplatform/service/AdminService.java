package com.jeffrey.postplatform.service;

import com.jeffrey.postplatform.dao.AdminRepository;
import com.jeffrey.postplatform.entity.AdminEntity;
import com.jeffrey.postplatform.util.PwdEnCoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminService.class);

    /**
     * 保存对象到数据库
     * @param adminEntity
     * @return
     */
    public Map<String, Object> saveAdminEntity(AdminEntity adminEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap.put("newAdmin", adminRepository.save(adminEntity));
            LOGGER.info("新增管理员成功");
        }catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "添加失败");
        }
        return resultMap;
    }

    /**
     * 返回所有对象的集合
     * @return
     */
    public Map<String, Object> findAllAdmins(){
        Map<String, Object> resultMap = new HashMap<>();
        List list;
        try {
            list = adminRepository.findAll();
            resultMap.put("adminList", list);
            LOGGER.info("查询所有管理员，共" + list.size() + "个管理员");
        }catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查找失败");
        }
        return resultMap;
    }

    /**
     * 根据ID查找对象
     * @param id
     * @return
     */
    public Map<String, Object> findAdminById(int id){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Optional<AdminEntity> adminEntity = adminRepository.findById(id);
            if(adminEntity.isPresent()){
                resultMap.put("adminEntity", adminEntity.get());
                LOGGER.info("查询Id为" + adminEntity.get().getAdminId() + "的管理员成功");
            }
            else{
                resultMap.put("adminEntity", null);
            }
        }catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查找失败");
        }
        return resultMap;
    }

    /**
     * 删除对象
     * @param adminEntity
     * @return
     */
    public Map<String, Object> deleteAdminEntity(AdminEntity adminEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            adminRepository.delete(adminEntity);
            LOGGER.info("删除管理员"+ adminEntity.toString() +"成功");
        }catch (Exception e){
            e.printStackTrace();
            resultMap.put("message", "删除失败");
            LOGGER.error(e.toString(), e);
        }
        return resultMap;
    }

    public Map<String, Object> adminLogin(String username, String password){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            AdminEntity adminEntity = adminRepository.findByAdminUsername(username);
            String encryptedPwd = PwdEnCoder.enCoder(password, adminEntity.getAdminTel().substring(0, 8));
            if(encryptedPwd.equals(adminEntity.getAdminPassword())){
                AdminEntity a = new AdminEntity();
                a.setAdminId(adminEntity.getAdminId());
                a.setAdminUsername(adminEntity.getAdminUsername());
                a.setAdminName(adminEntity.getAdminName());

                resultMap.put("loginAdmin", a);
                LOGGER.info("管理员" + a.getAdminName() + "(" + username + ")登陆成功");
            }
            else{
                LOGGER.info("管理员名或密码错误");
                resultMap.put("message", "管理员名或密码错误");
            }
        }catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "登陆失败");
        }
        return resultMap;
    }
}
