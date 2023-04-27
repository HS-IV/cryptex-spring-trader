package com.cryptex.cryptexspringtrader.controllers;//package com.cryptex.cryptexspringtrader.controllers;
//
//import com.cryptex.cryptexspringtrader.models.User;
//import com.cryptex.cryptexspringtrader.models.Watchlist;
//import com.cryptex.cryptexspringtrader.repositories.UserRepository;
//import com.cryptex.cryptexspringtrader.repositories.WatchlistRepository;
//import com.cryptex.cryptexspringtrader.services.WatchlistService;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.csrf.CsrfToken;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//
//@Controller
//public class IndexController {
//    @Autowired
//    private WatchlistService watchlistService;
//
//    @Autowired
//    private UserRepository userRepository;
//
//
//    @RequestMapping("/index")
//    public String index() {
//        return "index";
//    }
//
//    @RequestMapping("/dashboard")
//    public String dashboard() {
//        return "dashboard";
//    }
////    @PostMapping("/dashboard")
////    public String createWatchlist(@ModelAttribute Watchlist watchlist){
////        User user = new User();
////        System.out.println(user.getId());
////        watchlist.setUser(userDao.findById(user.getId()).get());
////        System.out.println(watchlistService);
////        watchlistService.save(watchlist);
////        return "redirect:/dashboard";
////    }
////@PostMapping("/dashboard")
////public String createWatchlist(@ModelAttribute Watchlist watchlist) {
////    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
////    String currentUsername = authentication.getName();
////    User currentUser = userRepository.findByUsername(currentUsername);
////
////    watchlist.setUser(currentUser);
////    watchlistService.createOrUpdateWatchlist(watchlist);
////    return "redirect:/dashboard";
////}
//    // Inside your WatchlistController.java (or similar) class
//    @PostMapping("/api/watchlists")
//    public ResponseEntity<Void> createWatchlist(@RequestBody Watchlist watchlist) {
//        // Get the authenticated user from the SecurityContextHolder
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//
//        // Save the watchlist using the createWatchlistForUser method
//        watchlistService.createWatchlistForUser(watchlist, userDetails);
//
//        // Return a response indicating success
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }
//
//    @GetMapping("/dashboard")
//    public String showDashboard() {
////        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
////        if (csrfToken != null) {
////            model.addAttribute("_csrf", csrfToken);
////        }
//        // Other logic and model attributes
//
//        return "dashboard";
//    }
//
//}


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @GetMapping("/dashboard")
    public String showDashboard() {
        return "dashboard";
    }
    @RequestMapping("/market")
    public String market() {return "market";}

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








