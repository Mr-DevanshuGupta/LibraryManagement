package com.syvora.syvora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syvora.syvora.dto.AuthenticateRequest;
import com.syvora.syvora.dto.AuthenticationResponse;
import com.syvora.syvora.dto.RegisterRequest;
import com.syvora.syvora.service.AuthenticateService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

	@Autowired
	private AuthenticateService service;

	@GetMapping("/")
	public ResponseEntity<String> test() {
		return new ResponseEntity<String>("auth controller is running ", HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
		System.out.println("Inside register request " + request);
		return ResponseEntity.ok(service.register(request));
	}

	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticateRequest request) {
		return ResponseEntity.ok(service.authenticate(request));
	}
}
