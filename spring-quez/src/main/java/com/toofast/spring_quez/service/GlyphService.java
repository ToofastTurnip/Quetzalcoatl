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

    public Glyph getGlyphByRune(String id) {
        return glyphRepository.findByRune(id);
    }

    // one of these two will work hopefully haha
//    public List<Glyph> getAllPosts() {
//        return glyphRepository.getGlyphs();
//    }
    public List<Glyph> getAllGlyphs() {
        return glyphRepository.findAll();
    }

}
