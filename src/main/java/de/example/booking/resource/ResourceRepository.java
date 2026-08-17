package de.example.booking.resource;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findAllByOrderByNameAsc();
}
