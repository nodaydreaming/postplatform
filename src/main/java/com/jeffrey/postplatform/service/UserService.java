package com.jeffrey.postplatform.service;

import com.jeffrey.postplatform.dao.UserRepository;
import com.jeffrey.postplatform.entity.UserEntity;
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
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    /**
     * 保存对象到数据库
     * @param userEntity
     * @return
     */
    public Map<String, Object> saveUserEntity(UserEntity userEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap.put("newUser", userRepository.save(userEntity));
            LOGGER.info("新增用户成功");
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
    public Map<String, Object> findAllUsers(){
        Map<String, Object> resultMap = new HashMap<>();
        List list;
        try {
            list = userRepository.findAll();
            resultMap.put("userList", list);
            LOGGER.info("查询所有用户，共" + list.size() + "个用户");
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
    public Map<String, Object> findUserById(int id){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Optional<UserEntity> userEntity = userRepository.findById(id);
            if(userEntity.isPresent()){
                resultMap.put("userEntity", userEntity.get());
                LOGGER.info("查询Id为" + userEntity.get().getUserId() + "的用户成功");
            }
            else{
                resultMap.put("userEntity", null);
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
     * @param userEntity
     * @return
     */
    public Map<String, Object> deleteUserEntity(UserEntity userEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            userRepository.delete(userEntity);
            LOGGER.info("删除用户"+ userEntity.toString() +"成功");
        }catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除失败");
        }
        return resultMap;
    }

    /**
     * 用户登陆逻辑
     * @param account
     * @param password
     * @return
     */
    public Map<String, Object> userLogin(String account, String password){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            //通过手机号查找
            UserEntity userEntity = userRepository.findUserEntityByUserTel(account);
            if(userEntity == null){
                //通过学号查找
                userEntity = userRepository.findUserEntityByUserStuNumber(account);
            }
            if(userEntity != null){
                //密码加密
                String encryptedPwd = PwdEnCoder.enCoder(password, userEntity.getUserTel().substring(0, 8));
                if(encryptedPwd.equals(userEntity.getUserPassword())){
                    UserEntity u = new UserEntity();
                    u.setUserId(userEntity.getUserId());
                    u.setUserName(userEntity.getUserName());
                    u.setUserStuNumber(userEntity.getUserStuNumber());
                    u.setUserTel(userEntity.getUserTel());

                    resultMap.put("loginUser", u);
                    LOGGER.info("用户（" + userEntity.getUserName() + "）登陆成功");
                }
                else{
                    LOGGER.info("用户名或密码错误");
                    resultMap.put("message", "用户名或密码错误");
                }
            }
            else{
                //通过手机号和学号都没有查找到用户
                resultMap.put("message", "此账号无对应用户");
            }

        }catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "登陆失败");
        }
        return resultMap;
    }

    public Map<String, Object> updateUser(UserEntity userEntity, String newPwd){
        Map<String, Object> resultMap = new HashMap<>();


        return resultMap;
    }

    public Map<String, Object> adminResetUserPwd(int userId, String newPwd){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Optional<UserEntity> userOptional = userRepository.findById(userId);
            if(userOptional.isPresent()){
                UserEntity userEntity = userOptional.get();
                //对新密码加密
                String encryptedPwd = PwdEnCoder.enCoder(newPwd, userEntity.getUserTel().substring(0, 8));
                userEntity.setUserPassword(encryptedPwd);

                userRepository.save(userEntity);
                LOGGER.info( "重置管理员（" + userEntity.getUserName() + "）的密码，成功");
            }
            else{
                resultMap.put("message", "id为" + userId + "的管理员不存在");
                LOGGER.info( "id为" + userId + "的管理员不存在, 重置密码失败");
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "重置密码失败");
        }
        return resultMap;
    }

    /**
     * 根据学号查询用户
    * @param userStuNumber
     * @return
     */
    public Map<String, Object> findUserByUserStuNumber(String userStuNumber){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            UserEntity userEntity = userRepository.findUserEntityByUserStuNumber(userStuNumber);
            if(userEntity != null){
                resultMap.put("userEntity", userEntity);
                LOGGER.info("查询学号为" + userStuNumber + "的用户成功");
            }
            else{
                resultMap.put("userEntity", null);
            }
        }catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查找失败");
        }
        return resultMap;
    }

    /**
     * 根据手机号查询用户
     * @param userTel
     * @return
     */
    public Map<String, Object> findUserByUserTel(String userTel){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            UserEntity userEntity = userRepository.findUserEntityByUserTel(userTel);
            if(userEntity != null){
                resultMap.put("userEntity", userEntity);
                LOGGER.info("查询手机号为" + userTel + "的用户成功");
            }
            else{
                resultMap.put("userEntity", null);
            }
        }catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查找失败");
        }
        return resultMap;
    }
}
