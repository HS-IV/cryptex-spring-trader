package com.cryptex.cryptexspringtrader.controllers;

import com.cryptex.cryptexspringtrader.models.User;
import com.cryptex.cryptexspringtrader.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class UserController {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userDao;

    public UserController(UserRepository userDao, PasswordEncoder passwordEncoder ){
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/login")
    public String showLoginForm(){
        return "login";
    }


    @GetMapping("/sign-up")
    public String showSignupForm(Model model){
        model.addAttribute("user", new User());
        return "signup";
    }


        @PostMapping("/sign-up")
        public String publishAd(
                @Valid User user,
                Errors validation,
                Model model
        ) {
            if (validation.hasErrors()) {
                model.addAttribute("errors", validation);
                model.addAttribute("user", user);
                return "signup";
            }
            String hash = passwordEncoder.encode(user.getPassword());
            user.setPassword(hash);
            userDao.save(user);
            return "redirect:/login";
        }



//    @PostMapping("/sign-up")
//    public String saveUser(@ModelAttribute User user){
//         String hash = passwordEncoder.encode(user.getPassword());
//        user.setPassword(hash);
//        userDao.save(user);
//        return "redirect:/login";
//    }

    @GetMapping("/profile")
    public String profilePage(Model model){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user" , user);
        return "profile";
    }


    @PostMapping("/profile")
    public String editProfile(@ModelAttribute User user){
        userDao.save(user);
        return "redirect:/login";
    }



}
