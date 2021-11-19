package com.jeffrey.postplatform.controller;

import com.jeffrey.postplatform.entity.AdminEntity;
import com.jeffrey.postplatform.service.AdminService;
import com.jeffrey.postplatform.util.PwdEnCoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminController.class);

    /**
     * 新增管理员
     * @param adminEntity
     * @return
     */
    @PostMapping("/saveAdmin")
    public Map<String, Object> saveAdminEntity(AdminEntity adminEntity){
        Map<String, Object> resultMap = new HashMap<>();
        adminEntity.setAdminLevel(1);
        //表单验证

        try {
            //对密码进行加密
            String encryptedPwd = PwdEnCoder.enCoder(adminEntity.getAdminPassword(), adminEntity.getAdminTel().substring(0, 8));
            adminEntity.setAdminPassword(encryptedPwd);
            //保存到数据库
            Map<String, Object> map = adminService.saveAdminEntity(adminEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("newAdmin")){
                resultMap.put("newAdmin", map.get("newAdmin"));
                LOGGER.info("新增管理员成功");
            }
        }catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "新增管理员失败");
        }
        return resultMap;
    }

    /**
     * 查询所有管理员
     * @return
     */
    @GetMapping("/findAllAdmins")
    public Map<String, Object> findAllAdmins(int page, int limit){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = adminService.findAllAdmins();
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("adminList")){
                List<AdminEntity> list = (List) map.get("adminList");
                List<AdminEntity> resultList = new ArrayList<>();
                int id = 1;
                for(AdminEntity a : list){
                    a.setAdminPassword(id + "");
                    id++;
                }
                int begin = (page - 1) * limit;
                int end = begin + limit;
                for(int i = begin; i < end && i < list.size(); i++){
                    resultList.add(list.get(i));
                }
                resultMap.put("code", 0);
                resultMap.put("msg", "");
                resultMap.put("count", list.size());
                resultMap.put("data", resultList);
                LOGGER.info("查询所有管理员成功");
            }
        }catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询所有管理员失败");
        }
        return resultMap;
    }

    /**
     * 删除某个管理员
     * @param adminEntity
     * @return
     */
    @PostMapping("/deleteAdmin")
    public Map<String, Object> deleteAdmin(AdminEntity adminEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = adminService.deleteAdminEntity(adminEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除管理员（"+ adminEntity.getAdminName() +"）失败");
        }
        return resultMap;
    }

    /**
     * 通过adminId查找对应得管理员
     * @param adminId
     * @return
     */
    @PostMapping("/findAdminById")
    public Map<String, Object> findAdminById(int adminId){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = adminService.findAdminById(adminId);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("adminEntity")){
                resultMap.put("adminEntity", map.get("adminEntity"));
            }
        }catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询失败");
        }
        return resultMap;
    }

    /**
     * 管理员登陆
     * @param request
     * @param adminEntity
     * @return
     */
    @PostMapping("/adminLogin")
    public Map<String, Object> adminLogin(HttpServletRequest request, AdminEntity adminEntity){
        Map<String, Object> resultMap = new HashMap<>();
        String username;
        String password;
        try {
            if(adminEntity.getAdminUsername() != null && !"".equals(adminEntity.getAdminUsername())){
                username = adminEntity.getAdminUsername();
                if(adminEntity.getAdminPassword() != null && !"".equals(adminEntity.getAdminPassword())){
                    password = adminEntity.getAdminPassword();
                    //调用service层业务逻辑
                    Map<String, Object> map = adminService.adminLogin(username, password);
                    if (map.containsKey("message")) {
                        resultMap.put("message", map.get("message"));
                        LOGGER.info(map.get("message").toString());
                    } else if (map.containsKey("loginAdmin")) {
                        AdminEntity loginAdmin = (AdminEntity) map.get("loginAdmin");
                        //将登陆的用户保存到session中
                        request.getSession().setAttribute("loginAdmin", loginAdmin);
                        resultMap.put("newPage", "post-admin/main.html");
                        LOGGER.info("管理员（" + loginAdmin.getAdminName() + "）登陆");
                    }
                }
                else{
                    LOGGER.info("密码为空");
                    resultMap.put("message", "请输入密码");
                }
            }
            else{
                LOGGER.info("用户名为空");
                resultMap.put("message", "请输入用户名");
            }
        } catch (Exception e) {
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "登陆失败");
        }
        return resultMap;
    }

    /**
     * 获得已登录管理员对象
     * @param request
     * @return
     */
    @PostMapping("/getLoginAdmin")
    public Map<String, Object> getLoginAdmin(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        HttpSession session = request.getSession();

        AdminEntity loginAdmin = (AdminEntity) session.getAttribute("loginAdmin");

        resultMap.put("loginAdmin", loginAdmin);
        return resultMap;
    }

    /**
     * 管理员登出
     * @param request
     * @return
     */
    @PostMapping("/signout")
    public Map<String, Object> signOut(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            HttpSession session = request.getSession();
            AdminEntity loginAdmin = (AdminEntity) session.getAttribute("loginAdmin");
            LOGGER.info("管理员（" + loginAdmin.getAdminName() + "）退出登录");
            session.removeAttribute("loginAdmin");
        } catch (Exception e){
            resultMap.put("message", "登出失败");
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
        }
        return resultMap;
    }

    /**
     * 超级管理员重置普通管理员密码
     * @param adminId
     * @param newPwd
     * @return
     */
    @PostMapping("/resetAdminPwd")
    public Map<String, Object> resetAdminPwd(int adminId, String newPwd){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = adminService.resetAdminPwd(adminId, newPwd);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
        } catch (Exception e){
            resultMap.put("message", "重置id为" + adminId + "的管理员的密码失败");
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
        }
        return resultMap;
    }

    /**
     * 管理员修改个人密码
     * @param oldPwd
     * @param newPwd
     * @return
     */
    @PostMapping("/updatePassword")
    public Map<String, Object> updatePassword(HttpServletRequest request, String oldPwd, String newPwd){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            int adminId = ((AdminEntity) request.getSession().getAttribute("loginAdmin")).getAdminId();
            Map<String, Object> map = adminService.updatePassword(adminId, oldPwd, newPwd);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else{
                request.getSession().removeAttribute("loginAdmin");
            }
        } catch (Exception e){
            resultMap.put("message", "管理员修改密码失败");
            LOGGER.error(e.toString(), e);
        }
        return resultMap;
    }


    /**
     * 普通管理员进行高权限操作，拒绝操作
     * @param request
     * @return
     */
    @PostMapping("/general")
    public Map<String, Object> generalAdmin(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        HttpSession session = request.getSession();
        AdminEntity loginAdmin = (AdminEntity) session.getAttribute("loginAdmin");
        LOGGER.info("管理员（" + loginAdmin.getAdminName() + "）进行高权限操作，已拒绝");
        resultMap.put("message", "您没有此权限");
        return resultMap;
    }
}
