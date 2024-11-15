package com.syvora.syvora.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.syvora.syvora.dto.AuthorDTO;
import com.syvora.syvora.dto.BookDTO;
import com.syvora.syvora.dto.BooksRequestDTO;
import com.syvora.syvora.dto.BooksResponseDTO;
import com.syvora.syvora.dto.GenreDTO;
import com.syvora.syvora.entity.Authors;
import com.syvora.syvora.entity.BookImage;
import com.syvora.syvora.entity.Books;
import com.syvora.syvora.entity.Genres;
import com.syvora.syvora.exceptions.NoSuchExists;
import com.syvora.syvora.repository.AuthorRepository;
import com.syvora.syvora.repository.BookImageRepository;
import com.syvora.syvora.repository.BooksRepository;
import com.syvora.syvora.repository.GenresRepository;

@Service
public class BooksService {

	@Autowired
	private BooksRepository booksRepository;

	@Autowired
	private AuthorRepository authorRepository;

	@Autowired
	private GenresRepository genresRepository;
	
	@Autowired
	private BookImageRepository bookImageRepository;

	@Autowired
	private FileStorageService fileStorageService;

	public ResponseEntity<BooksResponseDTO> getAll(Integer pageSize, Integer pageNumber, String keyword) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		Page<Books> booksPage;
		System.out.println("This is the keyword for fetching all books " + keyword);
		booksPage = booksRepository.findByKeyword(pageable, keyword);
		BooksResponseDTO booksResponse = new BooksResponseDTO(booksPage.getContent(),
				(int) booksPage.getTotalElements());
		return new ResponseEntity<BooksResponseDTO>(booksResponse, HttpStatus.OK);
	}

	public ResponseEntity<Books> add(BooksRequestDTO booksDTO) throws IOException {
		Books book = new Books();
		book.setBookName(booksDTO.getBookName());
		Authors author = authorRepository.findById(booksDTO.getAuthorID()).orElse(null);
		if (author == null) {
			throw new NoSuchExists("Author does not exists with authorId: " + booksDTO.getAuthorID());
		} else {
			book.setAuthor(author);
			book.setPrice(booksDTO.getPrice());
			book.setSummary(booksDTO.getSummary());
			book.setPublicationDate(booksDTO.getPublicationDate());
			List<Genres> genres = new ArrayList<>();
			for (Integer genreId : booksDTO.getGenreID()) {
				Genres genre = genresRepository.findById(genreId).orElse(null);
				if (genre != null) {
					genres.add(genre);
				} else {
					throw new NoSuchExists("Genres does not exists with genreID: " + genreId);
				}
			}
			book.setGenres(genres);

			Books savedBook = booksRepository.save(book);
			return new ResponseEntity<Books>(savedBook, HttpStatus.OK);
		}
	}

	public ResponseEntity<Books> update(Integer bookId, BooksRequestDTO request) {
		Books book = booksRepository.findById(bookId).orElse(null);
		if (book == null) {
			throw new NoSuchExists("Book with this id does not exists :" + bookId);
		}
		book.setBookName(request.getBookName());
		Authors author = authorRepository.findById(request.getAuthorID()).orElse(null);
		if (author == null) {
			throw new NoSuchExists("Author does not exists with authorId: " + request.getAuthorID());
		} else {
			book.setAuthor(author);
			book.setPrice(request.getPrice());
			book.setSummary(request.getSummary());
			book.setPublicationDate(request.getPublicationDate());
			List<Genres> genres = new ArrayList<>();
			for (Integer genreId : request.getGenreID()) {
				Genres genre = genresRepository.findById(genreId).orElse(null);
				if (genre != null) {
					genres.add(genre);
				} else {
					throw new NoSuchExists("Genres does not exists with genreID: " + genreId);
				}
			}
			book.setGenres(genres);

			Books savedBook = booksRepository.save(book);
			return new ResponseEntity<Books>(savedBook, HttpStatus.OK);
		}
	}

	public ResponseEntity<HttpStatus> delete(Integer id) {
		Books book = booksRepository.findById(id).orElse(null);
		if (book == null) {
			throw new NoSuchExists("Book does not exists with id: " + id);
		}
		
		BookImage image = bookImageRepository.findByBook(book);
		bookImageRepository.delete(image);
		booksRepository.delete(book);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}

}
