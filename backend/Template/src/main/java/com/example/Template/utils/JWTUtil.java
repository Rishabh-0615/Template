package com.example.Template.utils;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class JWTUtil {
    private final String SECRET="b6f3c23c8e4a9a24a71f8b77c56d8f93e8f55c1d7f0b2a8dbe9b4a1e3f62a90d";

    public String generateToken(String email, long expiryMillis){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+expiryMillis))
                .signWith(SignatureAlgorithm.HS256,SECRET)
                .compact();
    }

    public String extractEmail(String token){
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
