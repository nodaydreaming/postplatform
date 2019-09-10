package com.jeffrey.postplatform.service;

import com.jeffrey.postplatform.dao.RecordRepository;
import com.jeffrey.postplatform.entity.RecordEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecordService {
    @Autowired
    private RecordRepository recordRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(RecordService.class);

    public Map<String, Object> saveRecord(RecordEntity recordEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            RecordEntity newRecord = recordRepository.save(recordEntity);
            resultMap.put("newRecord", newRecord);
            LOGGER.info("添加岗位报名记录成功");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "添加岗位报名记录失败");
        }
        return resultMap;
    }

    public Map<String, Object> deleteRecord(RecordEntity recordEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            recordRepository.delete(recordEntity);
            LOGGER.info("删除岗位报名记录成功");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除岗位报名记录失败");
        }
        return resultMap;
    }

    public Map<String, Object> findAllRecords(){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            List<RecordEntity> list = recordRepository.findAll();
            resultMap.put("recordList", list);
            LOGGER.info("查找所有岗位报名记录成功，一共有" + list.size() + "个岗位报名记录");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查找所有岗位报名记录失败");
        }
        return resultMap;
    }
    public Map<String, Object> findRecordByUserIdAndPostId(int userId, int postId){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            RecordEntity recordEntity = recordRepository.findRecordEntityByPostIdAndAndUserId(userId, postId);
            if(recordEntity != null){
                resultMap.put("recordEntity", recordEntity);
            }
            else{
                resultMap.put("message", "未查到记录");
            }

        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查找岗位报名记录失败");
        }
        return resultMap;
    }
}
