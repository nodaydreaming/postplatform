package com.jeffrey.postplatform.dao;

import com.jeffrey.postplatform.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
    AdminEntity findByAdminUsernameOrAdminTel(String adminUsername, String adminTel);
}
