
//package com.cryptex.cryptexspringtrader.models;
//import jakarta.persistence.*;
//import java.util.List;
//
//@Entity
//@Table(name = "coin_data")
//public class CoinData {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String apiId;
//
//
//@ManyToMany(mappedBy = "coinDataList")
//private List<Watchlist> watchlists;
//
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setApiId(String apiId) {
//        this.apiId = apiId;
//    }
//
//    public String getApiId() {
//        return apiId;
//    }
//
//
//    public List<Watchlist> getWatchlists() {
//        return watchlists;
//    }
//
//    public void setWatchlists(List<Watchlist> watchlists) {
//        this.watchlists = watchlists;
//    }
//
//    public void setWatchlist(Watchlist savedWatchlist) {
//    }
//}
package com.cryptex.cryptexspringtrader.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "coin_data")
public class CoinData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "api_id")
    private String apiId;

    @ManyToMany(mappedBy = "coinDataList")
    private List<Watchlist> watchlists;

    public CoinData() {
    }

    public CoinData(String apiId) {
        this.apiId = apiId;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApiId() {
        return apiId;
    }

    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public List<Watchlist> getWatchlists() {
        return watchlists;
    }

    public void setWatchlists(List<Watchlist> watchlists) {
        this.watchlists = watchlists;
    }

    @Override
    public String toString() {
        return "CoinData{" +
                "id=" + id +
                ", apiId='" + apiId + '\'' +
                ", watchlists=" + watchlists +
                '}';
    }

    public void setWatchlist(Watchlist savedWatchlist) {
    }
}

