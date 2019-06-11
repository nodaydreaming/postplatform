package com.jeffrey.postplatform.controller;

import com.jeffrey.postplatform.entity.UserEntity;
import com.jeffrey.postplatform.service.UserService;
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
import java.util.*;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    /**
     * 用户注册
     * @param userEntity
     * @return
     */
    @PostMapping("/saveUser")
    public Map<String, Object> saveUserEntity(UserEntity userEntity) {
        Map<String, Object> resultMap = new HashMap<>();
        //表单验证

        try {
            //对密码进行加密
            String encryptedPwd = PwdEnCoder.enCoder(userEntity.getUserPassword(), userEntity.getUserTel().substring(0, 8));
            userEntity.setUserPassword(encryptedPwd);
            //设置初始信誉值
            userEntity.setUserReputation(50.0);
            //记录用户创建时间
            userEntity.setUserCreateDate(new Date());
            //保存到数据库
            Map<String, Object> map = userService.saveUserEntity(userEntity);
            if (map.containsKey("message")) {
                resultMap.put("message", map.get("message"));
            } else if (map.containsKey("newUser")) {
                resultMap.put("newUser", map.get("newUser"));
                LOGGER.info("新增用户成功");
            }
        } catch (Exception e) {
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "添加失败");
        }
        return resultMap;
    }

    /**
     * 查询所有用户
     * @return
     */
    @GetMapping("/findAllUsers")
    public Map<String, Object> findAllUsers(int page, int limit) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = userService.findAllUsers();
            if (map.containsKey("message")) {
                resultMap.put("message", map.get("message"));
            } else if (map.containsKey("userList")) {
                List<UserEntity> list = (List) map.get("userList");
                List<UserEntity> resultList = new ArrayList<>();

                int id = 1;
                for(UserEntity u : list){
                    u.setUserPassword(id + "");
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
            }
        } catch (Exception e) {
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询失败");
        }
        return resultMap;
    }

    /**
     * 删除用户
     * @param userEntity
     * @return
     */
    @PostMapping("/deleteUser")
    public Map<String, Object> deleteUser(UserEntity userEntity) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = userService.deleteUserEntity(userEntity);
            if (map.containsKey("message")) {
                resultMap.put("message", map.get("message"));
            }
        } catch (Exception e) {
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除失败");
        }
        return resultMap;
    }

    /**
     * 通过ID查找对应用户
     * @param userId
     * @return
     */
    @PostMapping("/findUserById")
    public Map<String, Object> findUserById(int userId) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = userService.findUserById(userId);
            if (map.containsKey("message")) {
                resultMap.put("message", map.get("message"));
            } else if (map.containsKey("userEntity")) {
                resultMap.put("userEntity", map.get("userEntity"));
            }
        } catch (Exception e) {
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询失败");
        }
        return resultMap;
    }

    /**
     * 根据学号查询用户
     * @param userStuNumber
     * @return
     */
    @PostMapping("/findUserByStuNumber")
    public Map<String, Object> findUserByUserStuNumber(String userStuNumber) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = userService.findUserByUserStuNumber(userStuNumber);
            if (map.containsKey("message")) {
                resultMap.put("message", map.get("message"));
            } else if (map.containsKey("userEntity") && map.get("userEntity") != null) {
                resultMap.put("userEntity", true);
            }
        } catch (Exception e) {
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询失败");
        }
        return resultMap;
    }

    /**
     * 根据手机号查询用户
     * @param userTel
     * @return
     */
    @PostMapping("/findUserByUserTel")
    public Map<String, Object> findUserByUserTel(String userTel) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = userService.findUserByUserTel(userTel);
            if (map.containsKey("message")) {
                resultMap.put("message", map.get("message"));
            } else if (map.containsKey("userEntity") && map.get("userEntity") != null) {
                resultMap.put("userEntity", true);
            }
        } catch (Exception e) {
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询失败");
        }
        return resultMap;
    }

    /**
     * 用户登陆
     * @param request
     * @param password
     * @return
     */
    @PostMapping("/userLogin")
    public Map<String, Object> userLogin(HttpServletRequest request, String account, String password){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            //调用service层业务逻辑
            Map<String, Object> map = userService.userLogin(account, password);
            if (map.containsKey("message")) {
                resultMap.put("message", map.get("message"));
                LOGGER.info(map.get("message").toString());
            } else if (map.containsKey("loginUser")) {
                UserEntity loginUser = (UserEntity) map.get("loginUser");
                //将登陆的用户保存到session中
                request.getSession().setAttribute("loginUser", loginUser);
                LOGGER.info("用户（" + loginUser.getUserName() + "）登陆");
            }

        } catch (Exception e) {
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "登陆失败");
        }
        return resultMap;
    }

    @PostMapping("/getLoginUser")
    public Map<String, Object> getLoginUser(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        if(request.getSession().getAttribute("loginUser") != null){
            resultMap.put("loginUser", request.getSession().getAttribute("loginUser"));
        }
        return resultMap;
    }

    /**
     * 用户登出
     * @param request
     * @return
     */
    @PostMapping("/signout")
    public Map<String, Object> signOut(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            HttpSession session = request.getSession();
            UserEntity loginUser = (UserEntity) session.getAttribute("loginUser");
            LOGGER.info("用户（" + loginUser.getUserName() + "）退出登录");
            session.removeAttribute("loginUser");
        } catch (Exception e){
            resultMap.put("message", "登出失败");
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
        }
        return resultMap;
    }

    @PostMapping("/adminResetUserPwd")
    public Map<String, Object> adminResetUserPwd(int adminId, String newPwd){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = userService.adminResetUserPwd(adminId, newPwd);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
        } catch (Exception e){
            resultMap.put("message", "重置id为" + adminId + "的用户的密码失败");
            LOGGER.error(e.toString(), e);
        }
        return resultMap;
    }

    /**
     * 用户修改个人信息
     * 可修改的字段包括：密码、性别、邮箱
     * 不可修改的字段包括：用户名、真实姓名、学院、班级、学号、手机号
     * 通过判断是否有新密码这个属性，来判断是否修改密码
     * @return
     */
    @PostMapping("/updateUser")
    public Map<String, Object> updateUser(UserEntity userEntity, String newPwd){
        Map<String, Object> resultMap = new HashMap<>();

        return resultMap;
    }
}
