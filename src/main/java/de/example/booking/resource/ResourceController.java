package de.example.booking.resource;

import de.example.booking.common.NotFoundException;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Read-only API for bookable resources — the example feature of this template.
 *
 * <p>Nothing here is binding for the exercise: name your own endpoints however you see fit.
 */
@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceRepository resources;

    ResourceController(ResourceRepository resources) {
        this.resources = resources;
    }

    @GetMapping
    public List<ResourceResponse> findAll() {
        return resources.findAllByOrderByNameAsc().stream().map(ResourceResponse::from).toList();
    }

    @GetMapping("/{id}")
    public ResourceResponse findById(@PathVariable Long id) {
        return resources
                .findById(id)
                .map(ResourceResponse::from)
                .orElseThrow(() -> new NotFoundException("Es gibt keine Ressource mit der ID " + id));
    }
}
