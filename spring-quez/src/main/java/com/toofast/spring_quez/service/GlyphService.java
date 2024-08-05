package com.toofast.spring_quez.service;

import com.toofast.spring_quez.entity.Glyph;
import com.toofast.spring_quez.repository.GlyphRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GlyphService {

    @Autowired
    private GlyphRepository glyphRepository;

    public Glyph createGlyph(Glyph glyph) {
        return glyphRepository.save(glyph);
    }

    public void loadGlyphs(List<Glyph> glyphs) {
        glyphRepository.saveAll(glyphs);
    }

    public Glyph getGlyphByRune(String id) {
        return glyphRepository.findByRune(id);
    }

    public List<Glyph> getAllGlyphs() {
        return glyphRepository.findAll();
    }

    public void deleteGlyphByRune(String id) {
        glyphRepository.deleteByRune(id);
    }

}
