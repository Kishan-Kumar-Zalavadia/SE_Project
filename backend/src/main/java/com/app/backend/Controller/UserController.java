package com.app.backend.Controller;

import com.app.backend.Entity.User;
import com.app.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "http://loud-egg-production.up.railway.app")
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) throws Exception {
//        User tempUser = user;
        String tempEmailId = user.getEmailId();
        if (tempEmailId != null && !tempEmailId.isEmpty()) {
            User existingUser = service.fetchUserByEmailId(tempEmailId);
            if (existingUser != null) {
                throw new Exception("User with " + tempEmailId + " already exists");
            }
        }
        String tempProfileLevel = user.getProfileLevel();
        if(tempProfileLevel ==null)
            user.setProfileLevel("Bronze");
        return service.saveUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) throws Exception {
        String tempEmailId = user.getEmailId();
        String tempPass = user.getPassword();
        User userObj = null;
        if (tempEmailId != null && tempPass != null) {
            userObj = service.fetchUserByEmailIdAndPassword(tempEmailId, tempPass);
        }
        if (userObj == null) {
            throw new Exception("Bad Credentials");
        }
        return userObj;
    }

    @GetMapping("")
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable int userId) throws Exception{
        User user = service.getUserById(userId);
        if (user == null) {
            // Handle the case where the user with the specified ID is not found.
            throw new Exception("User with ID " + userId + " not found");
        }
        return user;
    }

    @GetMapping("/getUsersByProductGroupPurchases/{product_id}")
    public List<User> fetchUsersByProductForGroupPurchase(@PathVariable int product_id) {
        return service.findUsersByProductForGroupPurchase(product_id);
    }

    @PatchMapping("/{userId}/increaseBonus")
    public User increaseBonusPoints(@PathVariable int userId, @RequestBody int n) {
        return service.increaseBonusPoints(userId, n);
    }


//    ----------------------------------------------------------------------------------------
//    For ADMIN
    @PutMapping("/update/{userId}")
    public User updateUserDetails(@PathVariable int userId, @RequestBody User updatedUser) {
        return service.updateUserDetails(userId, updatedUser);
    }
}
