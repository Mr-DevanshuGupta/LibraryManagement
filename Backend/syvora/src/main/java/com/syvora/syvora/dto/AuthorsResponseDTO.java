package com.syvora.syvora.dto;

import java.util.List;

import com.syvora.syvora.entity.Authors;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class AuthorsResponseDTO {
	private final List<Authors> authors;
	private final Integer totalAuthors;
}
