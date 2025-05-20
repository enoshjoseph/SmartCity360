package com.LoginRegister.example.dto;

public class EventDTO {
    private String eventName;
    private String location;
    private String artistName;
    private String duration;
    private String date;
    private String time;

    // Getters and Setters
    public String getEventName() {
        return eventName;
    }
    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    public String getArtistName() {
        return artistName;
    }
    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public String getDuration() {
        return duration;
    }
    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }
    public void setTime(String time) {
        this.time = time;
    }
}
//import java.time.LocalDate;
//import java.time.LocalTime;
//
//public class EventDTO {
//    private String eventName;
//    private String location;
//    private String artistName;
//    private String duration;
//    private String date;
//    private String time;
//
//    // Getters and setters
//    public String getEventName() {
//        return eventName;
//    }
//
//    public void setEventName(String eventName) {
//        this.eventName = eventName;
//    }
//
//    public String getLocation() {
//        return location;
//    }
//
//    public void setLocation(String location) {
//        this.location = location;
//    }
//
//    public String getArtistName() {
//        return artistName;
//    }
//
//    public void setArtistName(String artistName) {
//        this.artistName = artistName;
//    }
//
//    public String getDuration() {
//        return duration;
//    }
//
//    public void setDuration(String duration) {
//        this.duration = duration;
//    }
//
//    public String getDate() {
//        return date;
//    }
//
//    public void setDate(String date) {
//        this.date = date;
//    }
//
//    public String getTime() {
//        return time;
//    }
//
//    public void setTime(String time) {
//        this.time = time;
//    }
//
//    // Optional: Add toString() method for debugging
//    @Override
//    public String toString() {
//        return "EventDTO{" +
//                "eventName='" + eventName + '\'' +
//                ", location='" + location + '\'' +
//                ", artistName='" + artistName + '\'' +
//                ", duration='" + duration + '\'' +
//                ", date='" + date + '\'' +
//                ", time='" + time + '\'' +
//                '}';
//    }
//}