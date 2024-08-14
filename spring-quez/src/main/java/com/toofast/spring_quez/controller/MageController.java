package com.toofast.spring_quez.controller;

import com.toofast.spring_quez.entity.Mage;
import com.toofast.spring_quez.service.MageService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/mages")
public class MageController {

    @Autowired
    private MageService mageService;

    @GetMapping("/{id}")
    public Mage getUser(@PathVariable String id) {
        return mageService.getUserByUsername(id);
    }

    @GetMapping
    public List<Mage> getAllUsers() {
        return mageService.getAllUsers();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mage postUser(@RequestBody Mage mage) {
        return mageService.createUser(mage);
    }

    @PostMapping(path = "/load",consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void loadUsers(@RequestBody List<Mage> mages) {
        mageService.loadUsers(mages);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    public void deleteUser(@PathVariable String id) {
        mageService.deleteUserByUsername(id);
    }
    //probably don't implement this either, maybe late make functionality for a user to deactivate their account

    @DeleteMapping("/danger")
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    @Transactional
    public void deleteAllUsers() {
        mageService.deleteAllUsers();
    }
    // DO NOT IMPLEMENT THIS ENDPOINT IN THE FRONTEND, BRO! IT'S ONLY FOR TESTING/DEV!

}
