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
public class Mage {
    // a mage is a user, because h2 doesn't like when you use its keywords lol
    @Id
    private String username;
    private String encrypted_pass;
    private String first_name;
    private String last_name;
    // might want a bio and profile picture at some point? *shrugs audibly*
}
