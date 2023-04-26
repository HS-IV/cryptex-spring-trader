package com.cryptex.cryptexspringtrader.models;

import java.util.ArrayList;
import java.util.Date;

public class MarketCapJackson {

        public double times;
        public String currency;
        public double percentage;


    public static class Root{
        public String id;
        public String symbol;
        public String name;
        public String image;
        public double current_price;
        public Object market_cap;
        public int market_cap_rank;
        public Object fully_diluted_valuation;
        public Object total_volume;
        public double high_24h;
        public double low_24h;
        public double price_change_24h;
        public double price_change_percentage_24h;
        public Object market_cap_change_24h;
        public double market_cap_change_percentage_24h;
        public double circulating_supply;
        public double total_supply;
        public double max_supply;
        public double ath;
        public double ath_change_percentage;
        public Date ath_date;
        public double atl;
        public double atl_change_percentage;
        public Date atl_date;
        public MarketCapJackson roi;
        public Date last_updated;
        public SparklineIn7d sparkline_in_7d;
        public double price_change_percentage_1h_in_currency;
        public double price_change_percentage_24h_in_currency;
        public double price_change_percentage_7d_in_currency;
    }

    public static class SparklineIn7d {
        public ArrayList<Double> price;
    }


}
