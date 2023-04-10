package com.cryptex.cryptexspringtrader.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMapping;

@Controller
    public class IndexController {

        @RequestMapping("/index")
        public String index() {
            return "index";
        }
    }

