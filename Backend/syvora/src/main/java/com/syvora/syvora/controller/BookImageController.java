package com.syvora.syvora.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.syvora.syvora.entity.BookImage;
import com.syvora.syvora.service.BookImageService;
import com.syvora.syvora.service.FileStorageService;

@RestController
@RequestMapping("/books/image")
public class BookImageController {
	
	
	@Autowired
	private BookImageService bookImageService;
	
	@Autowired FileStorageService fileStorageService;
	
	@PostMapping("/{bookId}")
	public ResponseEntity<HttpStatus> addImage(@RequestParam("file") MultipartFile file,
			@PathVariable("bookId") Integer bookId) throws IOException {
		System.out.println("Inside a addImage controller");
		return bookImageService.addImage(bookId, file);
	}
	
	@GetMapping("/{bookId}")
	public byte[] getImageWithProductId(@PathVariable Integer bookId) throws IOException {
		BookImage image = bookImageService.getImage(bookId);
		if (image == null) {
			throw new RuntimeException("No images found for product ID " + bookId);
		}
		return fileStorageService.loadFile(image.getFileName());
	}
	
	@PutMapping("/{bookId}")
	public ResponseEntity<HttpStatus> updateImage(@RequestParam("file") MultipartFile file, @PathVariable("bookId") Integer bookId) throws IOException{
		return bookImageService.updateImage(bookId, file);
	}
}
