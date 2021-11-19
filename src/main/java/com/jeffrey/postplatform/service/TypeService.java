package com.jeffrey.postplatform.service;

import com.jeffrey.postplatform.dao.TypeRepository;
import com.jeffrey.postplatform.entity.TypeEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TypeService {
    @Autowired
    private TypeRepository typeRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(TypeService.class);

    /**
     * 添加岗位类型
     * @param typeEntity
     * @return
     */
    public Map<String, Object> saveTypeEntity(TypeEntity typeEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            TypeEntity newType = typeRepository.save(typeEntity);
            resultMap.put("newType", newType);
            LOGGER.info("成功添加岗位类型：" + newType);
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "添加岗位类型失败");
        }
        return resultMap;
    }

    /**
     * 删除岗位类型
     * @param typeEntity
     * @return
     */
    public Map<String, Object> deleteTypeEntity(TypeEntity typeEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            typeRepository.delete(typeEntity);
            LOGGER.info("成功删除岗位类型：" + typeEntity);
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除岗位类型失败");
        }
        return resultMap;
    }

    /**
     * 更新类型信息
     * @param typeEntity
     * @return
     */
    public Map<String, Object> updateTypeEntity(TypeEntity typeEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Optional<TypeEntity> typeOptional = typeRepository.findById(typeEntity.getTypeId());
            if(typeOptional.isPresent()){
                TypeEntity oldTypeEntity = typeOptional.get();
                oldTypeEntity.setTypeName(typeEntity.getTypeName());
                oldTypeEntity.setTypeDescription(typeEntity.getTypeDescription());

                typeRepository.save(oldTypeEntity);
                LOGGER.info("成功修改岗位类型：" + typeEntity);
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "修改岗位类型失败");
        }
        return resultMap;
    }

    /**
     * 或者所有类型的数组
     * @return
     */
    public Map<String, Object> findAllTypes(){
        Map<String, Object> resultMap = new HashMap<>();
        List list;
        try {
            list = typeRepository.findAll();
            resultMap.put("typeList", list);
            LOGGER.info("查询所有类型，共" + list.size() + "个类型");
        }catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询所有类型失败");
        }
        return resultMap;
    }
}
