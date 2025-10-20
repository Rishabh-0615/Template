package com.example.Template;

import java.util.Date;

public class TempUser {
    private String name;
    private String password;
    private String mobile;
    private int otp;
    private Date expiresAt;

    public TempUser(String name,String mobile,String password,int otp,Date expiresAt){
        this.name=name;
        this.mobile=mobile;
        this.password=password;
        this.otp=otp;
        this.expiresAt=expiresAt;
    }
    public String getName() { return name; }
    public String getMobile(){return mobile;}
    public String getPassword() { return password; }
    public int getOtp() { return otp; }
    public Date getExpiresAt() { return expiresAt; }

}
