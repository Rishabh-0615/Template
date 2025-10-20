package com.example.Template.services;


import com.example.Template.TempUser;
import com.example.Template.models.UserEntity;
import com.example.Template.repositories.UserRepository;
import com.example.Template.utils.JWTUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.*;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JavaMailSender mailSender;

    @Autowired
    JWTUtil jwtUtil;

    private final BCryptPasswordEncoder  passwordEncoder = new BCryptPasswordEncoder();

    private final Map<String, TempUser> TEMP_USERS= new HashMap<>();

    private int generateOtp(){
        SecureRandom random = new SecureRandom();
        return 100000+random.nextInt(900000);
    }

    private void sendOtpMail(String email, int otp) throws MessagingException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setTo(email);
        helper.setSubject("Your OTP Code");
        helper.setText("Your OTP is: "+otp);
        mailSender.send(message);

    }

    public String registerWithOtp(String name,String email,String mobile,String password) throws MessagingException{
        if(userRepository.findUserByEmail(email).isPresent()){
            throw new RuntimeException("An account with this Email already exists!");
        }
        int otp = generateOtp();
        System.out.println("Generated Otp: "+otp);
        TEMP_USERS.put(email,new TempUser(name,mobile,password,otp,new Date(System.currentTimeMillis()+5*60*1000)));

        sendOtpMail(email,otp);
        return jwtUtil.generateToken(email,5*60*1000);
    }

    public UserEntity verifyOtpAndRegister(String token,int otp) {
        String email = jwtUtil.extractEmail(token);
        TempUser temp = TEMP_USERS.get(email);
        if(temp==null){
            throw new RuntimeException("No OTP Request Found for this email");
        }
        if(temp.getExpiresAt().before(new Date())){
            throw new RuntimeException("OTP Expired");
        }
        if(temp.getOtp()!=otp){
            throw new RuntimeException("Invalid OTP");
        }
        String hashed = passwordEncoder.encode(temp.getPassword());
        UserEntity userEntity = new UserEntity(temp.getName(),email,temp.getMobile(),hashed);
        userRepository.save(userEntity);
        TEMP_USERS.remove(email);
        return userEntity;
    }

    public UserEntity login(String email, String password){
        Optional<UserEntity> optionalUserEntity = userRepository.findUserByEmail(email);
        if(optionalUserEntity.isEmpty()){
            throw new RuntimeException("Email or password incorrect!");
        }
        UserEntity userEntity = optionalUserEntity.get();
        if(!passwordEncoder.matches(password,userEntity.getPassword())){
            throw new RuntimeException("Email or password incorrect");
        }
        return userEntity;
    }

    public String forgotPassword(String email) throws MessagingException{
        Optional<UserEntity> optionalUser = userRepository.findUserByEmail(email);
        if(optionalUser.isEmpty()){
            throw new RuntimeException("No User found with this Email");
        }
        int otp = generateOtp();
        TEMP_USERS.put(email,new TempUser(null,null,null,otp,new Date(System.currentTimeMillis()+5*60*1000)));
        sendOtpMail(email,otp);
        return jwtUtil.generateToken(email,5*50*1000);
    }

    public String resetPassword(String token,int otp, String newPassword){
        String email = jwtUtil.extractEmail(token);

        TempUser temp = TEMP_USERS.get(email);
        if(temp==null){
            throw new RuntimeException("No OTP request found for this Email");
        }
        if(temp.getExpiresAt().before(new Date())){
            throw new RuntimeException("OTP expired");
        }
        if(temp.getOtp()!=otp){
            throw new RuntimeException("Invalid OTP");
        }
        UserEntity userEntity = userRepository.findUserByEmail(email).orElseThrow(()-> new RuntimeException("User not found"));
        userEntity.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(userEntity);
        TEMP_USERS.remove(email);
        return "Password reset successfully";
    }
    public UserEntity getMyProfile(String userId){
        return userRepository.findById(userId).orElseThrow(()-> new RuntimeException("User Not found"));
    }

    public String logout(){
        return "Logged out Succesfully";
    }
}
