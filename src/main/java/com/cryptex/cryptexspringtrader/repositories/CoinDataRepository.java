package com.cryptex.cryptexspringtrader.repositories;

import com.cryptex.cryptexspringtrader.model.CoinData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinDataRepository extends JpaRepository<CoinData, Long> {
}
