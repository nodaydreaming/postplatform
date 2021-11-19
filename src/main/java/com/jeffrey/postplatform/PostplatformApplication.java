package com.jeffrey.postplatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class PostplatformApplication {
    public static void main(String[] args) {
        SpringApplication.run(PostplatformApplication.class, args);
    }
}
