package com.ssafy.spyfamily.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.spyfamily.user.model.UserInfo;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JsonUtil {

    // json to map
    public static Map<String, String> convertJsonToMap(String jsonString) {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> dataMap = new HashMap<>();

        try {
            // JSON 문자열을 JsonNode로 매핑
            JsonNode rootNode = objectMapper.readTree(jsonString);

            // response 아래의 필드를 Map에 담기
            rootNode.fields().forEachRemaining(entry -> {
                dataMap.put(entry.getKey(), entry.getValue().asText());
            });

        } catch (Exception e) {
            e.printStackTrace();
        }

        return dataMap;
    }

    // object to json
    public static String convertObjectToJson(Object object) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // response 필드를 따로 JSON 문자열로 변환
            if (object instanceof UserInfo) {
                UserInfo userInfo = (UserInfo) object;
                Object response = userInfo.getResponse();
                if (response != null) {
                    String responseJson = objectMapper.writeValueAsString(response);
                    // response를 JSON 문자열로 변환하여 Map에 추가
                    Map<String, Object> dataMap = objectMapper.readValue(responseJson, new TypeReference<Map<String, Object>>() {});
                    Map<String, Object> resultMap = new HashMap<>();
                    resultMap.putAll(dataMap);
                    resultMap.put("response", responseJson);
                    return objectMapper.writeValueAsString(resultMap);
                }
            }
            // 그 외의 경우는 전체 객체를 JSON으로 변환
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
