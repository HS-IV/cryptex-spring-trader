package com.cryptex.cryptexspringtrader.repositories;
import com.cryptex.cryptexspringtrader.model.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
}
