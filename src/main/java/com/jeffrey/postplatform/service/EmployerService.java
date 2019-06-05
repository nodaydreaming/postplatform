package com.jeffrey.postplatform.service;

import com.jeffrey.postplatform.dao.EmployerRepository;
import com.jeffrey.postplatform.entity.EmployerEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EmployerService {
    @Autowired
    private EmployerRepository employerRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(EmployerService.class);

    public Map<String, Object> saveEmployer(EmployerEntity employerEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            EmployerEntity newEmployer = employerRepository.save(employerEntity);
            resultMap.put("newEmployer", newEmployer);
            LOGGER.info("添加招聘方成功");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "添加招聘方失败");
        }
        return resultMap;
    }

    public Map<String, Object> deleteEmployer(EmployerEntity employerEntity){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            employerRepository.delete(employerEntity);
            LOGGER.info("删除招聘方（"+ employerEntity.getEmployerName() +"）成功");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "删除招聘方失败");
        }
        return resultMap;
    }

    public Map<String, Object> updateEmployer(EmployerEntity employerEntity, String adminName){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Optional<EmployerEntity> oldEmployer = employerRepository.findById(employerEntity.getEmployerId());
            if(oldEmployer.isPresent()){
                EmployerEntity employer = oldEmployer.get();

                employer.setEmployerName(employerEntity.getEmployerName());
                employer.setEmployerContact(employerEntity.getEmployerContact());
                employer.setEmployerTel(employerEntity.getEmployerTel());
                employer.setEmployerType(employerEntity.getEmployerType());
                employer.setEmployerDescription(employerEntity.getEmployerDescription());

                employerRepository.save(employer);
                LOGGER.info("更新招聘方成功");
            }
            else{
                LOGGER.info("此id对应的招聘方不存在");
                resultMap.put("message", "此id对应的招聘方不存在");
            }

        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "更新招聘方失败");
        }
        return resultMap;
    }

    public Map<String, Object> findAllEmployers(){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            List<EmployerEntity> list = employerRepository.findAll();
            resultMap.put("employerList", list);
            LOGGER.info("查找所有招聘方成功，一共有" + list.size() + "个招聘方");
        } catch (Exception e){
            LOGGER.error(e.toString(), e);
            resultMap.put("message", "查找所有招聘方失败");
        }
        return resultMap;
    }
}
