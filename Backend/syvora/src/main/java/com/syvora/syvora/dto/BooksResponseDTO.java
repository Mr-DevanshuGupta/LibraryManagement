package com.syvora.syvora.dto;

import java.util.List;

import com.syvora.syvora.entity.Books;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class BooksResponseDTO {
	private final List<Books> books;
	private final Integer totalBooks;
}
