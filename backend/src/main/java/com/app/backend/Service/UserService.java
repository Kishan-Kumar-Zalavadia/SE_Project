package com.app.backend.Service;

import com.app.backend.Entity.User;
import com.app.backend.Repository.UserRepository;
import org.springframework.beans.BeanUtils;
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

    public List<User> findUsersByProductForGroupPurchase(int product_id) {
        return repo.getUsersByProductForGroupPurchase(product_id);
    }

    public User increaseBonusPoints(int userId, int n) {
        User user = repo.findById(userId).orElseThrow(null);
        int currentBonusPoints = user.getBonusPoints();
        int updatedBonusPoints = currentBonusPoints + n;

        // Update bonus points and profile level
        user.setBonusPoints(updatedBonusPoints);
        updateProfileLevel(user);

        repo.save(user);
        return user;
    }

    private void updateProfileLevel(User user) {
        int bonusPoints = user.getBonusPoints();

        if (bonusPoints < 50) {
            user.setProfileLevel("Bronze");
        } else if (bonusPoints < 100) {
            user.setProfileLevel("Silver");
        } else if (bonusPoints < 150) {
            user.setProfileLevel("Gold");
        } else if (bonusPoints < 200) {
            user.setProfileLevel("Platinum");
        } else if (bonusPoints < 250) {
            user.setProfileLevel("Diamond");
        } // You can add more conditions as needed
    }


//    ----------------------------------------------------------------------------------------
//    For Amin
    public User updateUserDetails(int userId, User updatedUser) {
        User existingUser = repo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update all fields with the values from updatedUser
        existingUser.setEmailId(updatedUser.getEmailId());
        existingUser.setUserName(updatedUser.getUserName());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setProfileLevel(updatedUser.getProfileLevel());
        existingUser.setAddress(updatedUser.getAddress());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setBonusPoints(updatedUser.getBonusPoints());
        existingUser.setUserType(updatedUser.getUserType());

        return repo.save(existingUser);
    }
}
