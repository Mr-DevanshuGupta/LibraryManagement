package com.syvora.syvora.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.syvora.syvora.dto.GenreDTO;
import com.syvora.syvora.dto.GenresResponseDTO;
import com.syvora.syvora.entity.Genres;
import com.syvora.syvora.exceptions.NoSuchExists;
import com.syvora.syvora.repository.GenresRepository;

@Service
public class GenresService {

	@Autowired
	private GenresRepository genresRepository;

	public ResponseEntity<GenresResponseDTO> getAll(Integer pageSize, Integer pageNumber) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		Page<Genres> genresPage;
		genresPage = genresRepository.findAll(pageable);
		GenresResponseDTO genresResponse = new GenresResponseDTO(genresPage.getContent(),
				(int) genresPage.getTotalElements());

		return new ResponseEntity<GenresResponseDTO>(genresResponse, HttpStatus.OK);
	}

	public ResponseEntity<Genres> add(GenreDTO request) {
		Genres genres = new Genres();
		genres.setDescription(request.getDescription());
		genres.setName(request.getName());
		genresRepository.save(genres);
		return new ResponseEntity<Genres>(genres, HttpStatus.OK);

	}

	public ResponseEntity<Genres> update(Integer id, GenreDTO request) {
		Genres genre = genresRepository.findById(id).orElse(null);
		if (genre == null) {
			throw new NoSuchExists("Genre with id: " + id + " does not exists");
		}
		genre.setDescription(request.getDescription());
		genre.setName(request.getName());

		Genres updatedGenre = genresRepository.save(genre);
		return new ResponseEntity<Genres>(updatedGenre, HttpStatus.OK);
	}

	public ResponseEntity<HttpStatus> delete(Integer id) {
		Genres genre = genresRepository.findById(id).orElse(null);
		if (genre == null) {
			throw new NoSuchExists("Genre with id: " + id + " does not exists");
		}
		genresRepository.delete(genre);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}

}
