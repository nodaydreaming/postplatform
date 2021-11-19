package com.jeffrey.postplatform.controller;

import com.jeffrey.postplatform.entity.AdminEntity;
import com.jeffrey.postplatform.entity.NoticeEntity;
import com.jeffrey.postplatform.service.NoticeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notice")
public class NoticeController {
    
    @Autowired
    private NoticeService noticeService;
    
    private static final Logger LOGGER = LoggerFactory.getLogger(NoticeController.class);

    @PostMapping("/saveNotice")
    public Map<String, Object> saveNotice(HttpServletRequest request, NoticeEntity noticeEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            String adminName = ((AdminEntity) request.getSession().getAttribute("loginAdmin")).getAdminName();
            noticeEntity.setNoticeAuthor(adminName);
            noticeEntity.setNoticeDate(new Date());
            Map<String, Object> map = noticeService.saveNotice(noticeEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("newNotice")){
                resultMap.put("newNotice", map.get("newNotice"));
                LOGGER.info("新添公告成功");
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "新添公告失败");
        }
        return resultMap;
    }

    @PostMapping("/findAllNotices")
    public Map<String, Object> findAllNotices(){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = noticeService.findAllNotices();
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("noticeList")){
                resultMap.put("noticeList", map.get("noticeList"));
                LOGGER.info("查询所有公告成功");
            }
        } catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询所有公告失败");
        }
        return resultMap;
    }

    @PostMapping("/deleteNotice")
    public Map<String, Object> deleteNotice(NoticeEntity noticeEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = noticeService.deleteNotice(noticeEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除公告（"+ noticeEntity.getNoticeTitle() +"）失败");
        }
        return resultMap;
    }

    @PostMapping("/updateNotice")
    public Map<String, Object> updateNotice(HttpServletRequest request, NoticeEntity noticeEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            String adminName = ((AdminEntity) request.getSession().getAttribute("loginAdmin")).getAdminName();
            Map<String, Object> map = noticeService.updateNotice(noticeEntity, adminName);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
        } catch (Exception e){
            e.printStackTrace();
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "更新公告失败");
        }
        return resultMap;
    }

    @PostMapping("/showNotice")
    public Map<String, Object> showNotice(){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> map = noticeService.findAllNotices();
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("noticeList")){
                List<NoticeEntity> list = (List) map.get("noticeList");
                if(list.size() > 5){
                    List<NoticeEntity> noticeList = list.subList(0, 6);
                    resultMap.put("noticeList", noticeList);
                }
                else{
                    resultMap.put("noticeList", list);
                }
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "获得公告失败");
        }
        return resultMap;
    }
}
