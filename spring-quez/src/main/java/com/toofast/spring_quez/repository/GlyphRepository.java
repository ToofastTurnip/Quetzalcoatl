package com.toofast.spring_quez.repository;

import com.toofast.spring_quez.entity.Glyph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GlyphRepository extends JpaRepository<Glyph, String> {

    Glyph findByRune(String rune);
}
