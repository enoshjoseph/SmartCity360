package com.LoginRegister.example.requests;

public class LoginRequest {

    private String userId;
    private String password;

    // Default constructor
    public LoginRequest() {}

    // Parameterized constructor
    public LoginRequest(String userId, String password) {
        super();
        this.userId = userId;
        this.password = password;
    }

    // Getters and setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
