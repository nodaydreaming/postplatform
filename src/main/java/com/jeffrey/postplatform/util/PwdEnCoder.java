package com.jeffrey.postplatform.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @ClassName PwdEnCoder
 * @Description
 * 登陆口令加密算法，用户手机号前8位作为“盐”，
 * 与口令相连后得到hash值，再把用户手机号前8位插入到hash值中
 * @Author GYJ
 * @Date 2018/11/7 17:19
 * @Version 1.0
 **/
public class PwdEnCoder {

    public static String enCoder(String pwd, String telephone) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("MD5");

            String inputWithSalt = pwd + telephone;
            messageDigest.update(inputWithSalt.getBytes());
            String hashResult = byteArrayToHex(messageDigest.digest());

            char[] cs = new char[32 + telephone.length()];
            //输出带盐，存储盐到hash值中;每四个hash字符中间插入一个盐字符
            for (int i = 0; i < cs.length; i += 5) {
                cs[i] = hashResult.charAt(i / 5 * 4);
                cs[i + 1] = hashResult.charAt(i / 5 * 4 + 1);
                cs[i + 2] = telephone.charAt(i / 5);
                cs[i + 3] = hashResult.charAt(i / 5 * 4 + 2);
                cs[i + 4] = hashResult.charAt(i / 5 * 4 + 3);
            }
            hashResult = new String(cs);
//            System.out.println(hashResult);
            return hashResult;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return e.toString();
        }
    }

    //将字节数组换成成16进制的字符串
    public static String byteArrayToHex(byte[] byteArray) {
        // 首先初始化一个字符数组，用来存放每个16进制字符
        char[] hexDigits = {'0','1','2','3','4','5','6','7','8','9', 'A','B','C','D','E','F' };

        // new一个字符数组，这个就是用来组成结果字符串的（解释一下：一个byte是八位二进制，也就是2位十六进制字符（2的8次方等于16的2次方））
        char[] resultCharArray =new char[byteArray.length * 2];
        // 遍历字节数组，通过位运算（位运算效率高），转换成字符放到字符数组中去
        int index = 0;
        for (byte b : byteArray) {
            resultCharArray[index++] = hexDigits[b>>> 4 & 0xf];
            resultCharArray[index++] = hexDigits[b& 0xf];
        }
        // 字符数组组合成字符串返回
        return new String(resultCharArray);
    }

    public static void main(String[] args){
        PwdEnCoder pwdEnCoder = new PwdEnCoder();
        System.out.println(pwdEnCoder.enCoder("123456","12345678"));
    }
}
