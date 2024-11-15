package com.syvora.syvora.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
public class Books {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, unique = true)
	private String bookName;
	
	@Column(nullable = false)
	private Date publicationDate;
	
	@Column(nullable = false)
	private String summary;
	
	@ManyToOne
	private Authors author;
	
	@ManyToMany
	private List<Genres> genres;
	
	@Column(nullable = false)
	private Integer price;
}
