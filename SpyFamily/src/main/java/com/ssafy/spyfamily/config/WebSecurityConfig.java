package com.ssafy.spyfamily.config;

import com.ssafy.spyfamily.user.repository.UserRepository;
import com.ssafy.spyfamily.user.service.UserService;
import com.ssafy.spyfamily.user.service.UserServiceImpl;
import com.ssafy.spyfamily.util.JWTFilter;
import com.ssafy.spyfamily.util.JWTUtil;
import com.ssafy.spyfamily.util.LoginFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    //JWTUtil 주입
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;



    public WebSecurityConfig(AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil, UserRepository userRepository){
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;

    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }



//    @Bean
//    public LoginFilter loginFilter() throws Exception {
//        return new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil);
//    }

    @Bean
    public JWTFilter jwtFilter() {
        return new JWTFilter(jwtUtil);
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors((corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        configuration.setAllowedMethods(Collections.singletonList("*"));
                        configuration.setAllowCredentials(true);
                        configuration.setAllowedHeaders(Collections.singletonList("*"));
                        configuration.setMaxAge(3600L);

                        configuration.setExposedHeaders(Arrays.asList("Authorization", "refreshToken"));

                        return configuration;
                    }
                })));

        http
                .csrf((auth) -> auth.disable());

        http
                .formLogin((auth) -> auth.disable());

        http
                .httpBasic((auth) -> auth.disable());
        http
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.sameOrigin())
                );

        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/profile/getImg/**","/login/**","/user/login/*", "/", "/signup","/reissue/token/**", "/challenge/init",
                                "/login/google/**","/user/update", "/user/info" ,"/ws-stomp/**" ,"/chat/enter","/diary/getImg/**", "/profile/read/**", "/fcm/**", "/fcm/issue/fcmtoken").permitAll()
                        .anyRequest().authenticated());





        http
                .addFilterBefore(jwtFilter(), LoginFilter.class);

        //AuthenticationManager()와 JWTUtil 인수 전달
        http
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, userRepository), UsernamePasswordAuthenticationFilter.class);

        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
