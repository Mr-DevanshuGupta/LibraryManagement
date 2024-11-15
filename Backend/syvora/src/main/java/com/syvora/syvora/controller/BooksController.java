package com.syvora.syvora.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.syvora.syvora.config.AppConstants;
import com.syvora.syvora.dto.BooksRequestDTO;
import com.syvora.syvora.dto.BooksResponseDTO;
import com.syvora.syvora.entity.Books;
import com.syvora.syvora.service.BooksService;

@RestController
@RequestMapping("/books")
public class BooksController {

	@Autowired
	private BooksService booksService;

	@GetMapping("/")
	public ResponseEntity<BooksResponseDTO> getAll(@RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "pageNumber", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "keyword", required = false) String keyword
) {
		return booksService.getAll(pageSize, pageNumber-1, keyword);
	}

	@PostMapping("/")
	public ResponseEntity<Books> add(@RequestBody BooksRequestDTO booksDTO) throws IOException {
		return booksService.add(booksDTO);
	}

	@PutMapping("/{bookId}")
	public ResponseEntity<Books> update(@PathVariable Integer bookId, @RequestBody BooksRequestDTO request) {
		return booksService.update(bookId, request);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable Integer id) {
		return booksService.delete(id);
	}
}
