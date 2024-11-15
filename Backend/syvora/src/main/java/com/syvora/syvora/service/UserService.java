package com.syvora.syvora.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.syvora.syvora.entity.User;
import com.syvora.syvora.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User getUser(Integer id) {
		User user = userRepository.findById(id).orElse(null);
		return user;
	}

}
