package com.jeffrey.postplatform.controller;

import com.jeffrey.postplatform.entity.AdminEntity;
import com.jeffrey.postplatform.entity.EmployerEntity;
import com.jeffrey.postplatform.service.EmployerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employer")
public class EmployerController {
    @Autowired
    private EmployerService employerService;

    private static final Logger LOGGER = LoggerFactory.getLogger(EmployerController.class);


    @PostMapping("/saveEmployer")
    public Map<String, Object> saveEmployer(EmployerEntity employerEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            employerEntity.setEmployerReputation(0.0);
            Map<String, Object> map = employerService.saveEmployer(employerEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("newEmployer")){
                resultMap.put("newEmployer", map.get("newEmployer"));
                LOGGER.info("新增招聘方成功");
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "新增招聘方失败");
        }
        return resultMap;
    }

    @GetMapping("/findAllEmployers")
    public Map<String, Object> findAllEmployers(@Nullable Integer page, @Nullable Integer limit){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = employerService.findAllEmployers();
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
            else if(map.containsKey("employerList")){
                List<EmployerEntity> list = (List) map.get("employerList");
                int i = 1;
                for(EmployerEntity e : list){
                    e.setOrderId(i++);
                }
                if(page != null && limit != null){
                    int begin = (page - 1) * limit;
                    int end = begin + limit;
                    List<EmployerEntity> resultList = new ArrayList<>();
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
                    resultMap.put("employerList", list);
                }

                LOGGER.info("查询所有招聘方成功");
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查询所有招聘方失败");
        }
        return resultMap;
    }

    @PostMapping("/deleteEmployer")
    public Map<String, Object> deleteEmployer(EmployerEntity employerEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> map = employerService.deleteEmployer(employerEntity);
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除招聘方 "+ employerEntity.getEmployerName() +"（"+ employerEntity.getEmployerContact() +"）失败");
        }
        return resultMap;
    }

    @PostMapping("/updateEmployer")
    public Map<String, Object> updateEmployer(HttpServletRequest request, EmployerEntity employerEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            AdminEntity loginAdmin = (AdminEntity) request.getSession().getAttribute("loginAdmin");
            Map<String, Object> map = employerService.updateEmployer(employerEntity, loginAdmin.getAdminName());
            if(map.containsKey("message")){
                resultMap.put("message", map.get("message"));
            }
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "更新招聘方（ID为"+ employerEntity.getEmployerId() +"）失败");
        }
        return resultMap;
    }
}
