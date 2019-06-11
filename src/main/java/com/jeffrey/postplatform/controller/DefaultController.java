package com.jeffrey.postplatform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class DefaultController {
    @RequestMapping("")
    public String index()  {
        return "redirect:/post/home.html";
    }
}
