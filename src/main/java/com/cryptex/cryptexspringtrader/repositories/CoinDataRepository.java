package com.cryptex.cryptexspringtrader.repositories;

import com.cryptex.cryptexspringtrader.models.CoinData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoinDataRepository extends JpaRepository<CoinData, Long> {
    CoinData findByApiId(String apiId);
}
