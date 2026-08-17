package de.example.booking.resource;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Example test for the example feature. It boots the full application, so it also proves that the
 * schema is created and {@code data.sql} is applied.
 */
@SpringBootTest
@AutoConfigureMockMvc
class ResourceControllerTest {

    @Autowired private MockMvc mockMvc;

    @Test
    void returnsAllSeededResourcesSortedByName() throws Exception {
        mockMvc
                .perform(get("/api/resources"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(8)))
                .andExpect(jsonPath("$[0].name").value("Besprechungsraum Nord"))
                .andExpect(jsonPath("$[0].category").value("ROOM"))
                .andExpect(jsonPath("$[0].capacity").value(8));
    }

    @Test
    void reportsAnUnknownResourceAsProblemDetail() throws Exception {
        mockMvc
                .perform(get("/api/resources/999999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Nicht gefunden"))
                .andExpect(jsonPath("$.detail").value("Es gibt keine Ressource mit der ID 999999"));
    }
}
