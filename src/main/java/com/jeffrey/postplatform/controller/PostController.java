package com.jeffrey.postplatform.controller;

import com.jeffrey.postplatform.entity.PostEntity;
import com.jeffrey.postplatform.service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    private static final Logger LOGGER = LoggerFactory.getLogger(PostController.class);
    @PostMapping("/savePost")
    public Map<String, Object> savePost(PostEntity postEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = postService.savePost(postEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("newPost")){
                resultMap.put("newPost", map.get("newPost"));
                LOGGER.info("新添岗位类型成功");
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "新添岗位类型失败");
        }
        return resultMap;
    }

    @PostMapping("/findAllPosts")
    public Map<String, Object> findAllPosts(){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = postService.findAllPosts();
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("postList")){
                LOGGER.info("查询所有岗位类型成功");
                resultMap.put("postList", map.get("postList"));
            }
        } catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询所有岗位类型失败");
        }
        return resultMap;
    }


    @PostMapping("/findPostById")
    public Map<String, Object> findPostById(int postId){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = postService.findPostById(postId);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("postEntity") && map.get("postEntity") != null){
                resultMap.put("postEntity", map.get("postEntity"));
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询岗位失败");
        }
        return resultMap;
    }

    @GetMapping("/findAllByPostType")
    public Map<String, Object> findAllByPostType(@Nullable Integer page,@Nullable Integer limit, int postType){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            String type = "家教岗位";
            if(postType == 1){
                type = "校内岗";
            }
            else if(postType == 2){
                type = "校外岗";
            }
            Map<String, Object> map = postService.findAllByPostType(type);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("postList")){
                List<PostEntity> list = (List) map.get("postList");
                int i = 1;
                for(PostEntity p : list){
                    p.setPostType(i+"");
                    i++;
                }
                if(page != null && limit != null){
                    int begin = (page - 1) * limit;
                    int end = begin + limit;
                    List<PostEntity> resultList = new ArrayList<>();
                    for(int j = begin; j < end && j < list.size(); j++){
                        resultList.add(list.get(j));
                    }
                    resultMap.put("code", 0);
                    resultMap.put("msg", "");
                    resultMap.put("count", list.size());
                    resultMap.put("data", resultList);
                }
                else{
                    resultMap.put("code", 0);
                    resultMap.put("msg", "");
                    resultMap.put("count", list.size());
                    resultMap.put("postList", list);
                }
                LOGGER.info("查找类型为："+ type +" 的岗位成功");
            }
        } catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询所有岗位类型失败");
        }
        return resultMap;
    }

    @PostMapping("/deletePost")
    public Map<String, Object> deletePost(PostEntity postEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = postService.deletePost(postEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除岗位类型（"+ postEntity.getPostName() +"）失败");
        }
        return resultMap;
    }

    @PostMapping("/updatePost")
    public Map<String, Object> updatePost(PostEntity postEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = postService.updatePost(postEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
        } catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "更新岗位类型失败");
        }
        return resultMap;
    }
}
