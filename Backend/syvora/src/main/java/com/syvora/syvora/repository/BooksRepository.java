package com.syvora.syvora.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.syvora.syvora.entity.Books;

public interface BooksRepository extends JpaRepository<Books, Integer> {

	@Query("SELECT b FROM Books b " + "JOIN b.author a " + "JOIN b.genres g "
			+ "WHERE (:keyword IS NULL OR :keyword = '' "
			+ "OR LOWER(b.bookName) LIKE LOWER(CONCAT('%', :keyword, '%')) "
			+ "OR LOWER(b.summary) LIKE LOWER(CONCAT('%', :keyword, '%')) "
			+ "OR LOWER(a.name) LIKE LOWER(CONCAT('%', :keyword, '%')) "
			+ "OR LOWER(g.name) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	Page<Books> findByKeyword(Pageable pageable, String keyword);

}
