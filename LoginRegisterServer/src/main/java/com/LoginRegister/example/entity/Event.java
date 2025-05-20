package com.LoginRegister.example.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;
    private String location;
    private String artistName;
    private String duration;
    private LocalDate date;
    private String time;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] artistPhoto;
}
