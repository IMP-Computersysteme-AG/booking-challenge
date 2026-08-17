# The whole application — Spring Boot backend and React frontend — ends up in a single image.
# `docker build .` needs no prior local Gradle run: Gradle drives the frontend build too, so the
# image and `./gradlew bootJar` can never drift apart.

# --- Build stage -------------------------------------------------------------------------------
FROM eclipse-temurin:21-jdk AS build
WORKDIR /build

# Resolve the Gradle distribution and the plugins in their own layer, so editing sources does not
# re-download the toolchain on every build.
COPY gradlew settings.gradle build.gradle ./
COPY gradle gradle
RUN ./gradlew --no-daemon help > /dev/null

COPY frontend frontend
COPY src src
RUN ./gradlew --no-daemon bootJar

# --- Runtime stage -----------------------------------------------------------------------------
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /build/build/libs/booking-challenge.jar app.jar

RUN useradd -m app
USER app

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
