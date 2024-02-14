package com.ssafy.spyfamily.util;

import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

@Component
public class AesUtil{



    private static String privateKey_256;

    public AesUtil( @Value("${Aes.secret.key}")String tempKey ){
        privateKey_256 = tempKey;
    }


    public static String aesCBCEncode(String message) throws Exception{
        SecretKeySpec secretKey = new SecretKeySpec(privateKey_256.getBytes("UTF-8"),"AES");

        IvParameterSpec IV = new IvParameterSpec(privateKey_256.substring(0,16).getBytes());

        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");

        c.init(Cipher.ENCRYPT_MODE,secretKey,IV);

        byte[] encrypytionByte = c.doFinal(message.getBytes("UTF-8"));

        return Hex.encodeHexString(encrypytionByte);
    }

    public static String aesCBCDDecode(String message) throws Exception{
        SecretKeySpec secretKey = new SecretKeySpec(privateKey_256.getBytes("UTF-8"),"AES");
        IvParameterSpec IV = new IvParameterSpec(privateKey_256.substring(0,16).getBytes());

        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");

        c.init(Cipher.DECRYPT_MODE,secretKey,IV);
        byte[] decodeByte = Hex.decodeHex(message.toCharArray());

        return new String(c.doFinal(decodeByte),"UTF-8");

    }


}
