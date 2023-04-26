package com.cryptex.cryptexspringtrader.controllers;

import com.cryptex.cryptexspringtrader.models.MarketCapJackson;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


    @RestController
    @RequestMapping("/REST/watchlists/")
    public class MarketAPI {

        private final String MARKETCAP_URL = "";

        private final RestTemplate restTemplate;

        public MarketAPI(RestTemplateBuilder restTemplateBuilder) {
            this.restTemplate = restTemplateBuilder.build();
        }
        @GetMapping("/marketcap")
        public MarketCapJackson[] getMarketCap() throws JsonProcessingException {
            String marketCapJson = restTemplate.getForObject(MARKETCAP_URL, String.class);
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(marketCapJson, MarketCapJackson[].class);
        }
    }

