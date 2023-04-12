package com.cryptex.cryptexspringtrader.models;
 import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String email;
    @Column(nullable = false, length = 100)
    private String password;
    @Column(nullable = false, length = 50)
    private String username;
    @Column(nullable = false, length = 20)
    private String phonenumber;
    @OneToMany(mappedBy = "user")
    private List<Watchlist> watchlists;

    // Getters, setters, and constructors


    public User(String email, String password, String username, String phonenumber) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.phonenumber = phonenumber;

    }

    public User() {

    }

    public Long getId() {
        return id;
    }

    public void setWatchlists(List<Watchlist> watchlists) {
        this.watchlists = watchlists;
    }

    public List<Watchlist> getWatchlists() {
        return watchlists;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhonenumber(){ return phonenumber; }
    public void setPhonenumber(){this.phonenumber = phonenumber; }
}
