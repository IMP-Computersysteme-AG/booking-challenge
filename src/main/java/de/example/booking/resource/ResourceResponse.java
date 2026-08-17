package de.example.booking.resource;

/**
 * What the API returns for a resource.
 *
 * <p>A separate type from the entity on purpose: it keeps the JSON shape independent of the
 * database mapping.
 */
public record ResourceResponse(
        Long id, String name, String category, String location, int capacity) {

    static ResourceResponse from(Resource resource) {
        return new ResourceResponse(
                resource.getId(),
                resource.getName(),
                resource.getCategory(),
                resource.getLocation(),
                resource.getCapacity());
    }
}
