package com.toofast.spring_quez.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Glyph {
    // a rune is the id of the post
    @Id
    private String rune;
    private String username;
    private String glyph_date;
    private String glyph_content;
}
