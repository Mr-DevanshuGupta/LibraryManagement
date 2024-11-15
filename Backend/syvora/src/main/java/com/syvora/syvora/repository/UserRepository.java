package com.syvora.syvora.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syvora.syvora.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmail(String username);
}
