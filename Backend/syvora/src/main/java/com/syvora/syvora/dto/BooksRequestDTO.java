package com.syvora.syvora.dto;

import java.sql.Date;
import java.util.List;

import lombok.Data;

@Data
public class BooksRequestDTO {
	private String bookName;
	private String summary;
	private Date publicationDate;
	private Integer price;
	private Integer authorID;
	private List<Integer> genreID;
}
