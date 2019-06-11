package com.jeffrey.postplatform.dao;

import com.jeffrey.postplatform.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    UserEntity findUserEntityByUserUsername(String userUsername);

    UserEntity findUserEntityByUserName(String userName);

    UserEntity findUserEntityByUserStuNumber(String userStuNumber);

    UserEntity findUserEntityByUserTel(String userTel);

}
