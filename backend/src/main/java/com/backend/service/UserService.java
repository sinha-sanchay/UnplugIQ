package com.backend.service;

import com.backend.model.User;
import com.backend.repository.UserRepository;
import com.backend.dto.LoginRequest;
import com.backend.dto.LoginResponse;
import com.backend.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Register a new user with password encoding
    public User saveUser(User user) {
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password cannot be null or empty.");
        }

        // Optional: Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // ✅ Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Get user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // ✅ Get user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // ✅ Delete user
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    // ✅ Login and return JWT token using email or username
    public LoginResponse loginUser(LoginRequest request) {
        String identifier = request.getIdentifier();
        String password = request.getPassword();

        try {
            // Authenticate using identifier (email or username)
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(identifier, password)
            );

            // Search user by either email or username
            User user = userRepository.findByUsernameOrEmail(identifier, identifier)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Generate JWT token
            String token = jwtService.generateToken(user.getUsername());

            return new LoginResponse(token);

        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username/email or password");
        }
    }

}
