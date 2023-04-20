package com.cryptex.cryptexspringtrader.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "watchlists")
public class Watchlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long portfolioId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(
            name = "watchlist_coin_data",
            joinColumns = @JoinColumn(name = "watch_id"),
            inverseJoinColumns = @JoinColumn(name = "coin_id")
    )
    private List<CoinData> coinDataList;

    // Getters, setters, and constructors

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CoinData> getCoinDataList() {
        return coinDataList;
    }

    public Long getPortfolioId() {
        return portfolioId;
    }
}