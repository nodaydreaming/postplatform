package com.jeffrey.postplatform.dao;

import com.jeffrey.postplatform.entity.EmployerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends JpaRepository<EmployerEntity, Integer> {
}
