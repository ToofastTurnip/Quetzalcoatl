package com.toofast.spring_quez.controller;

import com.toofast.spring_quez.entity.Glyph;
import com.toofast.spring_quez.service.GlyphService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/posts")
public class GlyphController {

    @Autowired
    private GlyphService glyphService;

    @GetMapping("/{id}")
    public Glyph getGlyph(@PathVariable String id) {
        return glyphService.getGlyphByRune(id);
    }

    @GetMapping
    public List<Glyph> getAllGlyphs() {
        return glyphService.getAllGlyphs();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Glyph postGlyph(@RequestBody Glyph glyph) {
        return glyphService.createGlyph(glyph);
    }

    @PostMapping(path = "/load",consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void loadGlyphs(@RequestBody List<Glyph> glyphs) {
        glyphService.loadGlyphs(glyphs);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    public void deleteGlyph(@PathVariable String id) {
        glyphService.deleteGlyphByRune(id);
    }

    @DeleteMapping("/danger")
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    @Transactional
    public void deleteAllGlyphs() {
        glyphService.deleteAllGlyphs();
    }
    // DO NOT IMPLEMENT THIS ENDPOINT IN THE FRONTEND, BRO! IT'S ONLY FOR TESTING/DEV!

}
