package com.syvora.syvora.dto;

import java.sql.Date;
import java.util.List;

import lombok.Data;

@Data
public class BookDTO {

	private Integer id;
	private String bookName;
	private Date publicationDate;
	private String summary;
	private Integer price;
	private AuthorDTO author;
	private List<GenreDTO> genres;

}
