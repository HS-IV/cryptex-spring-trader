package com.cryptex.cryptexspringtrader.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GettingStartedController {

    @GetMapping("/gettingStarted")
    public String gettingStartedPage(){
        return "GettingStarted";
    }
}
