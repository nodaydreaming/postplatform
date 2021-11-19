package com.jeffrey.postplatform.controller;

import com.jeffrey.postplatform.entity.TypeEntity;
import com.jeffrey.postplatform.service.TypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/type")
public class TypeController {
    @Autowired
    private TypeService typeService;

    private static final Logger LOGGER = LoggerFactory.getLogger(TypeController.class);

    @PostMapping("/saveType")
    public Map<String, Object> saveType(TypeEntity typeEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = typeService.saveTypeEntity(typeEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("newType")){
                resultMap.put("newType", map.get("newType"));
                LOGGER.info("新添岗位类型成功");
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "新添岗位类型失败");
        }
        return resultMap;
    }

    @PostMapping("/findAllTypes")
    public Map<String, Object> findAllTypes(){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = typeService.findAllTypes();
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("typeList")){
                resultMap.put("typeList", map.get("typeList"));
                LOGGER.info("查询所有岗位类型成功");
            }
        } catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询所有岗位类型失败");
        }
        return resultMap;
    }

    @PostMapping("/deleteType")
    public Map<String, Object> deleteType(TypeEntity typeEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = typeService.deleteTypeEntity(typeEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除岗位类型（"+ typeEntity.getTypeName() +"）失败");
        }
        return resultMap;
    }

    @PostMapping("/updateType")
    public Map<String, Object> updateType(TypeEntity typeEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = typeService.updateTypeEntity(typeEntity);
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
