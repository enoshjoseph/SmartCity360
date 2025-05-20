import com.LoginRegister.example.dto.EventDTO;
import com.LoginRegister.example.entity.Event;
import com.LoginRegister.example.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;

@CrossOrigin(origins = "http://localhost:3003")
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addEvent(
            @RequestPart("data") EventDTO dto,
            @RequestPart("artistPhoto") MultipartFile artistPhotoFile
    ) {
        Event event = new Event();

        event.setEventName(dto.getEventName());
        event.setLocation(dto.getLocation());
        event.setArtistName(dto.getArtistName());
        event.setDuration(dto.getDuration());
        event.setTime(dto.getTime());

        try {
            event.setDate(LocalDate.parse(dto.getDate()));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Invalid date format. Use yyyy-MM-dd");
        }

        try {
            event.setArtistPhoto(artistPhotoFile.getBytes());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing image.");
        }

        eventRepository.save(event);
        return ResponseEntity.ok("Event added successfully");
    }
}




//
//import com.LoginRegister.example.Service.EventService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.LoginRegister.example.Service.EventService;
//
//
//@RestController
//@RequestMapping("/api/events")
//@CrossOrigin(origins = "http://localhost:3003") // Add this if your frontend runs on a different port
//public class EventController {
//
//    @Autowired
//    private EventService eventService;
//
//    @PostMapping("/add")
//    public ResponseEntity<String> addEvent(
//            @RequestPart("data") EventDTO eventData,
//            @RequestPart(value = "artistPhoto", required = false) MultipartFile artistPhoto) {
//
//        try {
//            // Call your service method to handle the event creation
//            eventService.createEvent(eventData, artistPhoto);
//            return ResponseEntity.ok("Event added successfully");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Failed to add event: " + e.getMessage());
//        }
//    }
//
//    // Other endpoint methods for events...
//}