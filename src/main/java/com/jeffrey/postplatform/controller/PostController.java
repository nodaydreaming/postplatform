package com.jeffrey.postplatform.controller;

import com.jeffrey.postplatform.service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    private static final Logger LOGGER = LoggerFactory.getLogger(PostController.class);


}
