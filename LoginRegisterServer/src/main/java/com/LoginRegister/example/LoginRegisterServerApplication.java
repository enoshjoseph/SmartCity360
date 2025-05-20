package com.LoginRegister.example;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


//public class LoginRegisterServerApplication {
//
//    public static void main(String[] args) {
//        SpringApplication.run(LoginRegisterServerApplication.class, args);
//    }
//
//}
@SpringBootApplication
@ComponentScan(basePackages = "com.LoginRegister.example")
public class LoginRegisterServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoginRegisterServerApplication.class, args);
    }
}