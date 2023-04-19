package com.cryptex.cryptexspringtrader.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "coin_data")
public class CoinData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String contactAddress;
    private String apiId;

    @ManyToMany(mappedBy = "coinDataList")
    private List<Watchlist> watchlists;

    // Getters, setters, and constructors

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setContactAddress(String contactAddress) {
        this.contactAddress = contactAddress;
    }

    public String getContactAddress() {
        return contactAddress;
    }

    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public String getApiId() {
        return apiId;
    }

    public List<Watchlist> getWatchlists() {
        return watchlists;
    }

    public void setWatchlists(List<Watchlist> watchlists) {
        this.watchlists = watchlists;
    }
}