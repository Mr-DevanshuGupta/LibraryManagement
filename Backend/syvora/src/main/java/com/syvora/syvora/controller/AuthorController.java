package com.syvora.syvora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.syvora.syvora.dto.AuthorDTO;
import com.syvora.syvora.dto.AuthorsResponseDTO;
import com.syvora.syvora.entity.Authors;
import com.syvora.syvora.service.AuthorService;

@RestController
@RequestMapping("/author")
@CrossOrigin(origins = "http://localhost:3000/",maxAge = 3600)
public class AuthorController {
	
	@Autowired
	private AuthorService authorService;
	
	@GetMapping("/")
	public ResponseEntity<AuthorsResponseDTO> getAll(@RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "pageNumber", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) Integer pageNumber
){
		return authorService.getAll(pageSize, pageNumber-1);
	}
	
	@PostMapping("/")
	public ResponseEntity<Authors> add(@RequestBody AuthorDTO request){
		return authorService.add(request);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Authors> update(@PathVariable Integer id ,@RequestBody AuthorDTO request){
		return authorService.update(id, request);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable Integer id){
		return authorService.delete(id);
	}
}
