package de.example.booking.common;

/**
 * Thrown when a requested entity does not exist. Translated into a 404 by {@link
 * ApiExceptionHandler}.
 */
public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }
}
