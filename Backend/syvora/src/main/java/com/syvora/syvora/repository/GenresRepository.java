package com.syvora.syvora.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syvora.syvora.entity.Genres;

public interface GenresRepository extends JpaRepository<Genres, Integer> {

}
