package com.cryptex.cryptexspringtrader.controllers;//package com.cryptex.cryptexspringtrader.controllers;
import com.cryptex.cryptexspringtrader.models.CoinData;
import com.cryptex.cryptexspringtrader.models.User;
import com.cryptex.cryptexspringtrader.models.Watchlist;
import com.cryptex.cryptexspringtrader.repositories.CoinDataRepository;
import com.cryptex.cryptexspringtrader.repositories.UserRepository;
import com.cryptex.cryptexspringtrader.repositories.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class IndexController {
@Autowired
    CoinDataRepository coinService;
@Autowired
    UserRepository userService;
@Autowired
    WatchlistRepository watchlistService;
    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @RequestMapping("/market")
    public String market() {return "market";}
//databaseTester


    @GetMapping("/overview")
    public String showOverview() {
        return "overview";
    }
    @GetMapping("/lesson-1")
    public String showOverview1() {
        return "lessons/lesson1";
    }
    @GetMapping("/lesson-2")
    public String showOverview2() {
        return "lessons/lesson2";
    }

    @GetMapping("/lesson-3")
    public String showOverview3() {
        return "lessons/lesson3";
    }

    @GetMapping("/lesson-4")
    public String showOverview4() {
        return "lessons/lesson4";
    }
    @GetMapping("/lesson-5")
    public String showOverview5() {
        return "lessons/lesson5";
    }


    @GetMapping("/about-us")
    public String showAboutUs() {
        return "aboutUs";
    }
}








