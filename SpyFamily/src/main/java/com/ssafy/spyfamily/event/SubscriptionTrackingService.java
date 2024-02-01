package com.ssafy.spyfamily.event;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Component
@Slf4j
public class SubscriptionTrackingService {

    private static List<Map<String, String>> sessionInfos = new ArrayList<>();

//    public SubscriptionTrackingService() {
//        sessionInfos = new ArrayList<>();v
//
//    }
//    public SubscriptionTrackingService(List<Map<String, String>> sessionInfos) {
//        this.sessionInfos = sessionInfos;
//    }

    public void addSubscription(String sessionId, String destination) {
        Map<String, String> temp = new HashMap<>();
        temp.put("sessionId", sessionId);
        temp.put("destination", destination);

        sessionInfos.add(new HashMap<>());
        sessionInfos.get(sessionInfos.size()-1).put("sessionId", sessionId);
        sessionInfos.get(sessionInfos.size()-1).put("destination", destination);

        log.info("세션아이디 담았음" + temp);
        log.info(sessionInfos.toString());
    }

    public Map<String, String> getSubscriptions(String sessionId) {
        log.info("세션인포" + sessionInfos.toString());
        log.info(sessionInfos.size()+" 사이즈") ;
        for(int i = 0 ; i < sessionInfos.size() ; i++) {
            if (sessionInfos.get(i).get("sessionId").equals(sessionId)) {
                return sessionInfos.get(i);
            }
        }

        return null ;
    }


}
