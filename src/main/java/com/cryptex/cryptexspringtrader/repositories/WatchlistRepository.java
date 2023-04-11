package com.cryptex.cryptexspringtrader.repositories;
import com.cryptex.cryptexspringtrader.models.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
}