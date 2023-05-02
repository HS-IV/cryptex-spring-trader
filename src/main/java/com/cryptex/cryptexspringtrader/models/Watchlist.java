package com.cryptex.cryptexspringtrader.models;


import com.cryptex.cryptexspringtrader.models.CoinData;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "watchlists")
public class Watchlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "watchlist_coin_data",
            joinColumns = @JoinColumn(name = "watchlist_id"),
            inverseJoinColumns = @JoinColumn(name = "coin_data_id"))
    private List<CoinData> coinDataList;


    private String name;

    // Constructors

    public Watchlist() {}

    public Watchlist(Long ID, String name, User user) {
        this.id = ID;
        this.name = name;
        this.user = user;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<CoinData> getCoinDataList() {
        return coinDataList;
    }

//    public void setCoinDataList(List<CoinData> coinDataList) {
//        this.coinDataList = coinDataList;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

//    public void setCoinDataList(List<WatchlistController.CoinData> coinDataList) {
//    }
//    public void setCoinDataList(List<com.cryptex.cryptexspringtrader.models.CoinData> coinDataList) {
//        this.coinDataList = coinDataList;
//    }

    public void setCoinDataList(List<CoinData> coinDataList) {
        this.coinDataList = coinDataList;
    }

    public void addCoinData(CoinData existingCoinData) {
    }


//    public void setCoinDataList(List<WatchlistController.CoinData> coinDataList) {
//        this.coinDataList = coinDataList;
//    }
}

