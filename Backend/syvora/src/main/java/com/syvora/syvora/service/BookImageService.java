package com.syvora.syvora.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.syvora.syvora.entity.BookImage;
import com.syvora.syvora.entity.Books;
import com.syvora.syvora.exceptions.NoSuchExists;
import com.syvora.syvora.repository.BookImageRepository;
import com.syvora.syvora.repository.BooksRepository;

@Service
public class BookImageService {
	
	@Autowired
	private FileStorageService fileStorageService;
	
	@Autowired
	private BookImageRepository bookImageRepository;
	
	@Autowired
	private BooksRepository booksRepository;
	
	public ResponseEntity<HttpStatus> addImage(Integer bookId, MultipartFile file) throws IOException {
		BookImage image = new BookImage();
		Books book = booksRepository.findById(bookId).orElse(null);
		if(book == null) {
			throw new NoSuchExists("Book does not exists with this bookID: " + bookId);
		}else {			
			image.setBook(book);
			String fileName = fileStorageService.storeFile(file);
			image.setFileName(fileName);
			bookImageRepository.save(image);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}
	}

	public BookImage getImage(Integer bookId) {
		Books book = booksRepository.findById(bookId).orElse(null);
		if(book == null) {
			throw new NoSuchExists("Book does not exists with this bookID: " + bookId);
		}else {	
			return bookImageRepository.findByBook(book);			
		}
	}

	public ResponseEntity<HttpStatus> updateImage(Integer bookId, MultipartFile file) throws IOException {
		Books book = booksRepository.findById(bookId).orElse(null);
		if(book == null) {
			throw new NoSuchExists("Book does not exists with this bookID: " + bookId);
		}
		BookImage image = bookImageRepository.findByBook(book);
		image.setBook(book);
		String fileName = fileStorageService.storeFile(file);
		image.setFileName(fileName);
		bookImageRepository.save(image);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		
	}

}
