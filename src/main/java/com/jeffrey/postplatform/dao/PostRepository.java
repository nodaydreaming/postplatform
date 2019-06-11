package com.jeffrey.postplatform.dao;

import com.jeffrey.postplatform.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Integer> {
    List<PostEntity> findAllByPostType(String postType);
}
