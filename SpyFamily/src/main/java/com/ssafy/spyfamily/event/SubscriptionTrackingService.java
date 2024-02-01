package com.ssafy.spyfamily.event;

import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Component
public class SubscriptionTrackingService {

    private final ConcurrentMap<String, Set<String>> subscriptions = new ConcurrentHashMap<>();

    public void addSubscription(String sessionId, String destination) {
        subscriptions.computeIfAbsent(sessionId, k -> ConcurrentHashMap.newKeySet()).add(destination);
    }

    public Set<String> getSubscriptions(String sessionId) {
        return subscriptions.getOrDefault(sessionId, Collections.emptySet());
    }

    public void removeSubscriptions(String sessionId) {
        subscriptions.remove(sessionId);
    }
}
