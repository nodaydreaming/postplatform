package com.jeffrey.postplatform.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class RandomUtil {
    public static String getRandomFileName(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String dateStr = sdf.format(new Date());
        Random random = new Random();
        int rannum = (int) (random.nextDouble() * (999999 - 100000 + 1)) + 100000;
        return dateStr + rannum;
    }

    public static void main(String[] args){
        System.out.println(getRandomFileName());
        Random random = new Random();
        System.out.println(random.nextInt());
    }
}
