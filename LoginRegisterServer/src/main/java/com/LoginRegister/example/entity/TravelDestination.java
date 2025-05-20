package com.LoginRegister.example.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravelDestination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String place;
    private String category;
    private String destinationName;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] photo;

    @Column(length = 1000)
    private String description;
}
