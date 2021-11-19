package com.jeffrey.postplatform.controller;

import com.jeffrey.postplatform.util.RandomUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/upload")
public class UploadController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UploadController.class);

    @PostMapping("/uploadImg")
    public Map<String, Object> uploadImg(MultipartFile file){
        Map<String, Object> resultMap = new HashMap<>();
        if (file.isEmpty()) {
            resultMap.put("message", "上传失败，请选择文件");
        }
        else{
            String filePath = ClassUtils.getDefaultClassLoader().getResource("").getPath()+"static/upload/adminPhoto";
            File floder = new File(filePath);
            if(!floder.exists()){
                floder.mkdirs();
            }

            String fileName = RandomUtil.getRandomFileName() + file.getOriginalFilename();
            File dest = new File(filePath + "/" +fileName);
            try {
                file.transferTo(dest);
                LOGGER.info("上传成功");
                resultMap.put("photoAddr", "/post-platform/upload/adminPhoto/" + fileName);
            } catch (IOException e) {
                LOGGER.error(e.toString(), e);
                resultMap.put("message", "上传失败");
            }
        }
        return resultMap;
    }
}
