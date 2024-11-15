package com.syvora.syvora.exceptions;

public class NoSuchExists extends RuntimeException {
	private String message;

	public NoSuchExists() {
		super();
	}

	public NoSuchExists(String message) {
		super(message);
		this.message = message;
	}
}
