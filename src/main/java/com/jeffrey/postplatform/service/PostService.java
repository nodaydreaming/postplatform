package com.jeffrey.postplatform.service;

import com.jeffrey.postplatform.dao.PostRepository;
import com.jeffrey.postplatform.entity.PostEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(PostService.class);

    public Map<String, Object> savePost(PostEntity postEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            postEntity.setPostState(1);
            PostEntity newPost = postRepository.save(postEntity);
            resultMap.put("newPost", newPost);
            LOGGER.info("添加岗位成功");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "添加岗位失败");
        }
        return resultMap;
    }

    public Map<String, Object> deletePost(PostEntity postEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            postRepository.delete(postEntity);
            LOGGER.info("删除岗位成功");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除岗位失败");
        }
        return resultMap;
    }

    public Map<String, Object> updatePost(PostEntity postEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Optional<PostEntity> oldPost = postRepository.findById(postEntity.getPostId());
            if(oldPost.isPresent()){
                PostEntity post = oldPost.get();
                post.setPostName(postEntity.getPostName());
                post.setPostType(postEntity.getPostType());
                post.setPostEmployer(postEntity.getPostEmployer());
                post.setPostStarttime(postEntity.getPostStarttime());
                post.setPostEndtime(postEntity.getPostEndtime());
                post.setPostNumber(postEntity.getPostNumber());
                post.setPostSalary(postEntity.getPostSalary());
                post.setPostDescription(postEntity.getPostDescription());
                post.setPostState(postEntity.getPostState());

                postRepository.save(post);
                LOGGER.info("更新岗位成功");
            }
            else{
                LOGGER.info("此id对应的岗位不存在");
                resultMap.put("message", "此id对应的岗位不存在");
            }

        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "更新岗位失败");
        }
        return resultMap;
    }

    public Map<String, Object> findAllPosts(){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            List<PostEntity> list = postRepository.findAll();
            resultMap.put("postList", list);
            LOGGER.info("查找所有岗位成功，一共有" + list.size() + "个岗位");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查找所有岗位失败");
        }
        return resultMap;
    }

    public Map<String, Object> findAllByPostType(String postType){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            List<PostEntity> list = postRepository.findAllByPostType(postType);
            resultMap.put("postList", list);
            LOGGER.info("查找类型为："+ postType +" 的岗位成功，一共有" + list.size() + "个岗位");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查找所有岗位失败");
        }
        return resultMap;
    }

    public Map<String, Object> findPostById(int postId){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Optional<PostEntity> postOptional = postRepository.findById(postId);
            if(postOptional.isPresent()){
                resultMap.put("postEntity", postOptional.get());
                LOGGER.info("查询Id为" + postOptional.get().getPostId() + "的用户成功");
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
