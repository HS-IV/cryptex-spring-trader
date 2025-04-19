# Use Java 17 JDK base image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy only what's needed to cache dependencies better
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Pre-download dependencies
RUN ./mvnw dependency:go-offline -B

# Now copy the rest of the code
COPY src ./src

# Build the app (skip tests for speed)
RUN ./mvnw clean package -DskipTests

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/cryptex-spring-trader-0.0.1-SNAPSHOT.jar"]
