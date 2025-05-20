package com.LoginRegister.example.dto;

import org.springframework.web.multipart.MultipartFile;

public class TravelDestinationDTO {
    private String place;
    private String category;
    private String destinationName;
    private String description;
    private MultipartFile photo; // 👈 Add this

    // Getters and Setters
    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDestinationName() {
        return destinationName;
    }

    public void setDestinationName(String destinationName) {
        this.destinationName = destinationName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MultipartFile getPhoto() {
        return photo;
    }

    public void setPhoto(MultipartFile photo) {
        this.photo = photo;
    }
}
