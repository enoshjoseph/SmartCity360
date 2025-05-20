package com.LoginRegister.example.controller;

import com.LoginRegister.example.dto.TravelDestinationDTO;
import com.LoginRegister.example.entity.TravelDestination;
import com.LoginRegister.example.repository.TravelDestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "http://localhost:3003")
@RestController
@RequestMapping("/api/destinations")
public class TravelDestinationController {

    private static final Logger logger = LoggerFactory.getLogger(TravelDestinationController.class);
    private static final long MAX_FILE_SIZE = 10_000_000; // 10MB

    @Autowired
    private TravelDestinationRepository destinationRepository;

    @GetMapping
    public ResponseEntity<?> getAllDestinations() {
        return ResponseEntity.ok(destinationRepository.findAll());
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addDestination(
            @RequestPart("data") TravelDestinationDTO dto,
            @RequestPart("photo") MultipartFile photoFile) {

        try {
            if (photoFile.isEmpty()) {
                return ResponseEntity.badRequest().body("Photo is required");
            }

            if (!photoFile.getContentType().startsWith("image/")) {
                return ResponseEntity.badRequest().body("Only image files are allowed");
            }

            if (photoFile.getSize() > MAX_FILE_SIZE) {
                return ResponseEntity.badRequest().body("Image size must be less than 10MB");
            }

            if (dto.getPlace() == null || dto.getPlace().trim().isEmpty() ||
                    dto.getCategory() == null || dto.getCategory().trim().isEmpty() ||
                    dto.getDestinationName() == null || dto.getDestinationName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Required fields are missing");
            }

            TravelDestination destination = new TravelDestination();
            destination.setPlace(dto.getPlace().trim());
            destination.setCategory(dto.getCategory().trim());
            destination.setDestinationName(dto.getDestinationName().trim());
            destination.setDescription(dto.getDescription() != null ? dto.getDescription().trim() : null);
            destination.setPhoto(photoFile.getBytes());

            TravelDestination savedDestination = destinationRepository.save(destination);

            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Destination added successfully",
                    "id", savedDestination.getId()
            ));
        } catch (IOException e) {
            logger.error("File processing error", e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "File processing failed: " + e.getMessage()));
        }
    }
}
