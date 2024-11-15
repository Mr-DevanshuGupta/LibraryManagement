package com.syvora.syvora.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syvora.syvora.entity.BookImage;
import com.syvora.syvora.entity.Books;

public interface BookImageRepository extends JpaRepository<BookImage, Integer> {

	BookImage findByBook(Books book);

}
