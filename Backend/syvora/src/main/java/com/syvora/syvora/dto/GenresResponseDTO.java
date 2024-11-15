package com.syvora.syvora.dto;

import java.util.List;

import com.syvora.syvora.entity.Genres;

import lombok.Data;

@Data
public class GenresResponseDTO {
	private final List<Genres> genres;
	private final Integer totalGenres;
}
