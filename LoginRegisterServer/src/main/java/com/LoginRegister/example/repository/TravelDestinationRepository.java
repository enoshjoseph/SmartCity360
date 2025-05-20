package com.LoginRegister.example.repository;

import com.LoginRegister.example.entity.TravelDestination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelDestinationRepository extends JpaRepository<TravelDestination, Long> {
}
