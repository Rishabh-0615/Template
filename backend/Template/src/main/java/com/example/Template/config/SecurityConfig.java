package com.example.Template.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // ❌ Disable CSRF (for Postman and APIs)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/user/register",
                                "/api/user/verifyOtp/**",
                                "/api/user/login",
                                "/api/user/forget",
                                "/api/user/reset-password/**"
                        ).permitAll()                // ✅ Public APIs
                        .anyRequest().permitAll()     // ✅ Allow everything for now (simplify testing)
                )
                .formLogin(login -> login.disable()) // disable default login form
                .httpBasic(basic -> basic.disable()); // disable HTTP Basic

        return http.build();
    }
}
