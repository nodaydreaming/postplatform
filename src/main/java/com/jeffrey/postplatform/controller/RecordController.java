package com.jeffrey.postplatform.controller;

import com.jeffrey.postplatform.entity.RecordEntity;
import com.jeffrey.postplatform.service.RecordService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class RecordController {
    @Autowired
    private RecordService recordService;

    private static final Logger LOGGER = LoggerFactory.getLogger(RecordController.class);

    @PostMapping("/saveRecord")
    public Map<String, Object> saveRecord(RecordEntity recordEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = recordService.saveRecord(recordEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("newRecord")){
                resultMap.put("newRecord", map.get("newRecord"));
                LOGGER.info("新添记录成功");
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "新添记录失败");
        }
        return resultMap;
    }


    @PostMapping("/findRecordByUserIdAndPostId")
    public Map<String, Object> findRecordByUserIdAndPostId(int userId, int postId){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = recordService.findRecordByUserIdAndPostId(userId, postId);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("recordEntity")){
                resultMap.put("recordEntity", map.get("recordEntity"));
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询记录失败");
        }
        return resultMap;
    }
}
