package com.LoginRegister.example.controller;

import com.LoginRegister.example.Service.UserService;
import com.LoginRegister.example.entity.Users;
import com.LoginRegister.example.requests.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {
    @Autowired
    UserService userService;


    @PostMapping("/addUser")
    @CrossOrigin(origins = "http://localhost:3003")
    public Users addUser(@RequestBody Users user){
        return userService.addUser(user);


    }

    @PostMapping("/loginUser")
    @CrossOrigin(origins = "http://localhost:3003")
    public Boolean loginUser(@RequestBody LoginRequest loginRequest){
        return userService.loginUser(loginRequest);


    }
}
