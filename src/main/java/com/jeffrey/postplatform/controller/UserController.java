package com.jeffrey.postplatform.controller;

import com.jeffrey.postplatform.entity.UserEntity;
import com.jeffrey.postplatform.service.UserService;
import com.jeffrey.postplatform.util.PwdEnCoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

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
    @PostMapping("/findAllUsers")
    public Map<String, Object> findAllUsers() {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = userService.findAllUsers();
            if (map.containsKey("message")) {
                resultMap.put("message", map.get("message"));
            } else if (map.containsKey("userList")) {
                resultMap.put("userList", map.get("userList"));
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
     * 用户登陆
     * @param request
     * @param userEntity
     * @return
     */
    @PostMapping("/userLogin")
    public Map<String, Object> userLogin(HttpServletRequest request, UserEntity userEntity){
        Map<String, Object> resultMap = new HashMap<>();
        String username;
        String password;
        try {
            if(userEntity.getUserUsername() != null && !"".equals(userEntity.getUserUsername())){
                username = userEntity.getUserUsername();
                if(userEntity.getUserPassword() != null && !"".equals(userEntity.getUserPassword())){
                    password = userEntity.getUserPassword();
                    //调用service层业务逻辑
                    Map<String, Object> map = userService.userLogin(username, password);
                    if (map.containsKey("message")) {
                        resultMap.put("message", map.get("message"));
                        LOGGER.info(map.get("message").toString());
                    } else if (map.containsKey("loginUser")) {
                        UserEntity loginUser = (UserEntity) map.get("loginUser");
                        //将登陆的用户保存到session中
                        request.getSession().setAttribute("loginUser", loginUser);
                        LOGGER.info("用户（" + loginUser.getUserName() + "）登陆");
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
