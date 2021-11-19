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
                LOGGER.info("查询Id为" + id + "的管理员失败");
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
            LOGGER.info("删除管理员（"+ adminEntity.getAdminId() +"）成功");
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
            AdminEntity adminEntity = adminRepository.findByAdminUsernameOrAdminTel(username, username);
            if(adminEntity != null){
                String encryptedPwd = PwdEnCoder.enCoder(password, adminEntity.getAdminTel().substring(0, 8));
                if(encryptedPwd.equals(adminEntity.getAdminPassword())){
                    AdminEntity a = new AdminEntity();
                    a.setAdminId(adminEntity.getAdminId());
                    a.setAdminUsername(adminEntity.getAdminUsername());
                    a.setAdminName(adminEntity.getAdminName());
                    a.setAdminLevel(adminEntity.getAdminLevel());
                    a.setAdminPhoto(adminEntity.getAdminPhoto());

                    resultMap.put("loginAdmin", a);
                    LOGGER.info("管理员" + a.getAdminName() + "(" + username + ")登陆成功");
                }
                else{
                    LOGGER.info("username:" + username + ",password:" + password + ";用户名或密码错误");
                    resultMap.put("message", "用户名或密码错误");
                }
            }
            else{
                resultMap.put("message", "账号不存在");
            }
        }catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "登陆失败");
        }
        return resultMap;
    }

    /**
     * 超级管理员重置一般管理员密码
     * @param adminId
     * @param newPwd
     * @return
     */
    public Map<String, Object> resetAdminPwd(int adminId, String newPwd){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Optional<AdminEntity> adminOptional = adminRepository.findById(adminId);
            if(adminOptional.isPresent()){
                AdminEntity adminEntity = adminOptional.get();
                //对新密码加密
                String encryptedPwd = PwdEnCoder.enCoder(newPwd, adminEntity.getAdminTel().substring(0, 8));
                adminEntity.setAdminPassword(encryptedPwd);

                adminRepository.save(adminEntity);
                LOGGER.info( "重置管理员（" + adminEntity.getAdminName() + "）的密码，成功");
            }
            else{
                resultMap.put("message", "id为" + adminId + "的管理员不存在");
                LOGGER.info( "id为" + adminId + "的管理员不存在, 重置密码失败");
            }
        }catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "重置密码失败");
        }
        return resultMap;
    }

    /**
     * 管理员修改自己的密码
     * @param adminId
     * @param oldPwd
     * @param newPwd
     * @return
     */
    public Map<String, Object> updatePassword(int adminId, String oldPwd, String newPwd){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Optional<AdminEntity> adminOptional = adminRepository.findById(adminId);
            if(adminOptional.isPresent()){
                AdminEntity adminEntity = adminOptional.get();
                //对旧密码加密
                String encryptedPwd = PwdEnCoder.enCoder(oldPwd, adminEntity.getAdminTel().substring(0, 8));
                if(encryptedPwd.equals(adminEntity.getAdminPassword())){
                    //对新密码加密
                    String encryptedNewPwd = PwdEnCoder.enCoder(newPwd, adminEntity.getAdminTel().substring(0, 8));
                    adminEntity.setAdminPassword(encryptedNewPwd);
                    adminRepository.save(adminEntity);
                    LOGGER.info( "管理员（" + adminEntity.getAdminName() + "）修改密码");
                }
                else{
                    resultMap.put("message", "原密码错误");
                    LOGGER.info( "管理员（" + adminEntity.getAdminName() + "）修改密码失败，原密码错误");
                }
            }
            else{
                resultMap.put("message", "id为" + adminId + "的管理员不存在");
                LOGGER.info( "id为" + adminId + "的管理员不存在, 重置密码失败");
            }
        } catch (Exception e){
            resultMap.put("message", "管理员修改密码失败");
            LOGGER.error(e.toString(), e);
        }
        return resultMap;
    }
}
