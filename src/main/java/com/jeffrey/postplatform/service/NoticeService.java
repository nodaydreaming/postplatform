package com.jeffrey.postplatform.service;

import com.jeffrey.postplatform.dao.NoticeRepository;
import com.jeffrey.postplatform.entity.NoticeEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NoticeService {
    @Autowired
    private NoticeRepository noticeRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(NoticeService.class);

    public Map<String, Object> saveNotice(NoticeEntity noticeEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            NoticeEntity newNotice = noticeRepository.save(noticeEntity);
            resultMap.put("newNotice", newNotice);
            LOGGER.info("添加通知成功");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "添加通知失败");
        }
        return resultMap;
    }

    public Map<String, Object> deleteNotice(NoticeEntity noticeEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            noticeRepository.delete(noticeEntity);
            LOGGER.info("删除通知成功");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除通知失败");
        }
        return resultMap;
    }

    public Map<String, Object> updateNotice(NoticeEntity noticeEntity, String adminName){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Optional<NoticeEntity> oldNotice = noticeRepository.findById(noticeEntity.getNoticeId());
            if(oldNotice.isPresent()){
                NoticeEntity notice = oldNotice.get();
                notice.setNoticeTitle(noticeEntity.getNoticeTitle());
                notice.setNoticeContent(noticeEntity.getNoticeContent());
                notice.setNoticeDate(new Date());
                notice.setNoticeAuthor(adminName);

                noticeRepository.save(notice);
                LOGGER.info("更新通知成功");
            }
            else{
                LOGGER.info("此id对应的通知不存在");
                resultMap.put("message", "此id对应的通知不存在");
            }

        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "更新通知失败");
        }
        return resultMap;
    }

    public Map<String, Object> findAllNotices(){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Sort.Order order = Sort.Order.desc("noticeDate");
            Sort sort = Sort.by(order);
            List<NoticeEntity> list = noticeRepository.findAll(sort);
            resultMap.put("noticeList", list);
            LOGGER.info("查找所有通知成功，一共有" + list.size() + "个通知");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查找所有通知失败");
        }
        return resultMap;
    }
}
