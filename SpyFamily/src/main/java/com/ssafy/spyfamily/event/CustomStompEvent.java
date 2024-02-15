package com.ssafy.spyfamily.event;

import org.springframework.context.ApplicationEvent;

public class CustomStompEvent extends ApplicationEvent {

    private final String destination;
    private final EventType eventType;

    public enum EventType {
        SUBSCRIBE,
        DISCONNECT
    }

    public CustomStompEvent(Object source, String destination, EventType eventType) {
        super(source);
        this.destination = destination;
        this.eventType = eventType;
    }

    public String getDestination() {
        return destination;
    }

    public EventType getEventType() {
        return eventType;
    }
}
