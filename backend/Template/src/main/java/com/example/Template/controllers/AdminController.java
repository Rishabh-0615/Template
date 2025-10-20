package com.example.Template.controllers;


import com.example.Template.models.UserEntity;
import com.example.Template.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/users")
    public List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable String id){
        if(!userRepository.existsById(id)){
            return "User not found with ID: "+id;
        }
        userRepository.deleteById(id);
        return "User deleted successfully with ID: "+id;
    }
}
