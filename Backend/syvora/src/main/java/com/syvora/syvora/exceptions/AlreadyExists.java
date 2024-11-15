package com.syvora.syvora.exceptions;

public class AlreadyExists extends RuntimeException {
	private String message;

	public AlreadyExists() {
		super();
	}

	public AlreadyExists(String message) {
		super(message);
		this.message = message;
	}
}
