package com.toofast.spring_quez.repository;

import com.toofast.spring_quez.entity.Mage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MageRepository extends JpaRepository<Mage, String> {
    Mage findByUsername(String username);
    void deleteByUsername(String username);
}
