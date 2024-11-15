package com.syvora.syvora.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syvora.syvora.entity.Authors;

public interface AuthorRepository extends JpaRepository<Authors, Integer> {

}
