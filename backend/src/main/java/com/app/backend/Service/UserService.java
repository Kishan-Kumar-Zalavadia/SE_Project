package com.app.backend.Service;

import com.app.backend.Entity.User;
import com.app.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;
    public User saveUser(User user) {
        return repo.save(user);
    }

    public User fetchUserByEmailId(String emailID) {
        return repo.findByEmailId(emailID);
    }

    public User fetchUserByEmailIdAndPassword(String emailId, String password) {
        return repo.findByEmailIdAndPassword(emailId, password);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User getUserById(int userId) {
        return repo.findById(userId).orElse(null);
    }
}
