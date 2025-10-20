package com.example.Template.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "User")
public class UserEntity {
    private String name;

    @Id
    private String id;
    @Email
    private String email;
    private String password;
    @Pattern(regexp = "^\\+?[0-9]{10-15}$",message = "Invalid Mobile Number")
    private String mobile;

    public String getMobile(){
        return mobile;
    }

    public void setMobile(String mobile){
        this.mobile=mobile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserEntity(String name, String email,String mobile, String password){
        this.name=name;
        this.email=email;
        this.mobile=mobile;
        this.password=password;
    }
}

