package com.cryptex.cryptexspringtrader.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CreatorPageController {

    @GetMapping("/creators")
    public String showCreatorPage(){
        return "creators";
    }
}
