package com.example.Template.controllers;

import com.example.Template.models.UserEntity;
import com.example.Template.services.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerWithOtp(@RequestBody Map<String,String > request){
        String name = request.get("name");
        String email = request.get("email");
        String mobile = request.get("mobile");
        String password = request.get("password");
        try{
            String token = userService.registerWithOtp(name,email,mobile,password);
            return ResponseEntity.ok(Map.of(
                    "message","OTP sent succesfully. Please verify OTP to complete registration",
                    "token",token
            ));
        }
        catch (MessagingException e){
            return ResponseEntity.internalServerError().body(Map.of("message","Failed to send OTP"));
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(Map.of("message",e.getMessage()));
        }
    }

    @PostMapping("/verifyOtp/{token}")
    public ResponseEntity<?> verifyOtpAndRegister(@PathVariable String token, @RequestBody Map<String,Integer> request){
        int otp = request.get("otp");
        try{
            UserEntity userEntity = userService.verifyOtpAndRegister(token,otp);
            return ResponseEntity.status(201).body(Map.of(
                    "message","User registered succesfully",
                    "userEntity",userEntity
            ));

        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(Map.of("message",e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String ,String > request){
        String email = request.get("email");
        String password = request.get("password");
        try{
            UserEntity userEntity = userService.login(email,password);
            return ResponseEntity.ok(Map.of(
                    "message","Logged In Succesfully",
                    "userEntity",userEntity
            ));
        }
        catch (RuntimeException e){
            return  ResponseEntity.badRequest().body(Map.of("message",e.getMessage()));
        }
    }

    @PostMapping("/forget")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String,String > request){
        String email = request.get("email");
        try{
            String token = userService.forgotPassword(email);
            return ResponseEntity.ok(Map.of(
                    "message","OTP sent succesfully",
                    "token",token
            ));
        }
        catch(MessagingException e){
            return ResponseEntity.internalServerError().body(Map.of("message","Failed to send OTP"));
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(Map.of("message",e.getMessage()));
        }
    }

    @PostMapping("reset-password/{token}")
    public ResponseEntity<?> resetPassword(@PathVariable String token, @RequestBody Map<String, Object> request){
        int otp = (int) request.get("otp");
        String newPassword = (String) request.get("password");
        try{
            String msg = userService.resetPassword(token,otp,newPassword);
            return ResponseEntity.ok(Map.of("message",msg));
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(Map.of("message",e.getMessage()));
        }
    }

    @GetMapping("/me/{userId}")
    public ResponseEntity<?> myProfile(@PathVariable String userId){
        try{
            UserEntity userEntity = userService.getMyProfile(userId);
            return ResponseEntity.ok(userEntity);
        }
        catch (RuntimeException e){
            return  ResponseEntity.badRequest().body(Map.of("message",e.getMessage()));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logoutUser(){
        return ResponseEntity.ok(Map.of("message",userService.logout()));
    }

}
