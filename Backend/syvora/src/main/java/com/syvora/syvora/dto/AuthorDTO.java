package com.syvora.syvora.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class AuthorDTO {
	private String name;
	private String biography;
	private Date birthDate;
}
