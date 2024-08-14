package com.toofast.spring_quez.service;

import com.toofast.spring_quez.entity.Mage;
import com.toofast.spring_quez.repository.MageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MageService {

    @Autowired
    private MageRepository mageRepository;

    public Mage createUser(Mage mage) {
        return mageRepository.save(mage);
    }

    public void loadUsers(List<Mage> mages) {
        mageRepository.saveAll(mages);
    }

    public Mage getUserByUsername(String username) {
        return mageRepository.findByUsername(username);
    }

    public List<Mage> getAllUsers() {
        return mageRepository.findAll();
    }

    public void deleteUserByUsername(String username) {
        mageRepository.deleteByUsername(username);
    }

    public void deleteAllUsers() {
        mageRepository.deleteAll();
    }

}
