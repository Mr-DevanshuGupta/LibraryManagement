package com.syvora.syvora.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.syvora.syvora.dto.AuthorDTO;
import com.syvora.syvora.dto.AuthorsResponseDTO;
import com.syvora.syvora.entity.Authors;
import com.syvora.syvora.exceptions.NoSuchExists;
import com.syvora.syvora.repository.AuthorRepository;

@Service
public class AuthorService {

	@Autowired
	private AuthorRepository authorRepository;

	public ResponseEntity<AuthorsResponseDTO> getAll(Integer pageSize, Integer pageNumber) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		Page<Authors> authorsPage;
		authorsPage = authorRepository.findAll(pageable);
		AuthorsResponseDTO authorsResponse = new AuthorsResponseDTO(authorsPage.getContent(),
				(int) authorsPage.getTotalElements());
		return new ResponseEntity<AuthorsResponseDTO>(authorsResponse, HttpStatus.OK);
	}

	public ResponseEntity<Authors> add(AuthorDTO request) {
		Authors author = new Authors();
		author.setBiography(request.getBiography());
		author.setBirthDate(request.getBirthDate());
		author.setName(request.getName());
		Authors addedAuthor = authorRepository.save(author);
		return new ResponseEntity<Authors>(author, HttpStatus.OK);
	}

	public ResponseEntity<Authors> update(Integer id, AuthorDTO request) {
		Authors author = authorRepository.findById(id).orElse(null);
		if (author == null) {
			throw new NoSuchExists("Author does not exists with authorId: " + id);
		} else {
			author.setBiography(request.getBiography());
			author.setBirthDate(request.getBirthDate());
			author.setName(request.getName());
			Authors updatedAuthor = authorRepository.save(author);
			return new ResponseEntity<Authors>(updatedAuthor, HttpStatus.OK);
		}
	}

	public ResponseEntity<HttpStatus> delete(Integer id) {
		Authors author = authorRepository.findById(id).orElse(null);
		if (author == null) {
			throw new NoSuchExists("Author does not exists with authorId: " + id);
		} else {
			authorRepository.delete(author);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}
	}

}
