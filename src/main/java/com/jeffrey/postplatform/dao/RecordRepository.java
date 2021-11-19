package com.jeffrey.postplatform.dao;

import com.jeffrey.postplatform.entity.RecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository<RecordEntity, Integer> {

    RecordEntity findRecordEntityByPostIdAndAndUserId(int postId, int userId);
}
