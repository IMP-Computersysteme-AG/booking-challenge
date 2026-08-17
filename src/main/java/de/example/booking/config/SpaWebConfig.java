package de.example.booking.config;

import java.io.IOException;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

/**
 * Serves the built single-page application from the jar and falls back to {@code index.html} for
 * paths the frontend router owns, so a page reload on a deep link keeps working.
 *
 * <p>Requests below {@code /api} are never rewritten — an unknown API path still returns 404.
 *
 * <p>In the dev loop ({@code ./gradlew bootRun} + {@code npm run dev}) no frontend is on the
 * classpath; the fallback then does nothing and Vite serves the UI on port 5173.
 */
@Configuration
class SpaWebConfig implements WebMvcConfigurer {

    private static final ClassPathResource INDEX_HTML = new ClassPathResource("static/index.html");

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new SpaFallbackResolver());
    }

    private static final class SpaFallbackResolver extends PathResourceResolver {

        @Override
        protected Resource getResource(String resourcePath, Resource location) throws IOException {
            Resource requested = location.createRelative(resourcePath);
            if (requested.exists() && requested.isReadable()) {
                return requested;
            }
            if (resourcePath.startsWith("api/")) {
                return null;
            }
            return INDEX_HTML.exists() ? INDEX_HTML : null;
        }
    }
}
