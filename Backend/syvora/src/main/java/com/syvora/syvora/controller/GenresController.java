package com.syvora.syvora.controller;

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
import com.syvora.syvora.dto.GenreDTO;
import com.syvora.syvora.dto.GenresResponseDTO;
import com.syvora.syvora.entity.Genres;
import com.syvora.syvora.service.GenresService;

@RestController
@RequestMapping("/genres")
public class GenresController {
	@Autowired
	private GenresService genreService;
	
	@GetMapping("/")
	public ResponseEntity<GenresResponseDTO> getAll(@RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "pageNumber", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) Integer pageNumber){
		return genreService.getAll(pageSize, pageNumber-1);
	}
	
	@PostMapping("/")
	public ResponseEntity<Genres> add(@RequestBody GenreDTO request){
		return genreService.add(request);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Genres> update(@PathVariable Integer id ,@RequestBody GenreDTO request){
		return genreService.update(id, request);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable Integer id){
		return genreService.delete(id);
	}
}
