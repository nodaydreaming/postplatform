package com.jeffrey.postplatform.dao;

import com.jeffrey.postplatform.entity.TypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<TypeEntity, Integer> {

    TypeEntity findByTypeName(String typeName);

}
