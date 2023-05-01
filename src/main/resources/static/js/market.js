






const getTrending = async () => {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/search/trending?vs_currency=usd");
        const data = await response.json();
        data.coins.forEach((coin) => {
            let price = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact",
                compactDisplay: "short",
                maximumSignificantDigits: 3
            }).format(coin.item.price_btc * 28000);
            let coinCard = ""
            coinCard +=
                `<div class="">
             <div class="mt-1">
              <a style="cursor:pointer;" onclick="getShow('${coin.item.id}')" data-bs-toggle="modal" data-bs-target="#largeModal"> <span style="display:flex;margin:2px;"><img style="margin-right:1em; height: 200px; width: 200px;" src='${coin.item.large}' alt="${coin.item.name} icon"></span></a>                 
              
                <div class="flex-column">
                    <h1 class="coin-name p-0">${coin.item.name}</h1>
                    <h4 class="coin-ticker" > ${coin.item.symbol}</h4>
                    <h3 class="coin-mc">Marketcap Rank #${coin.item.market_cap_rank}</h3>                 
                     <h3 class="coin-price">${price}</h3> <!--hardcode BTC current price--> 
                    <h5 class="user-rating">User Score: ${coin.item.score}/10</h5>
                </div>
               
             </div>
            </div>
                `
            $("#trending").append(coinCard);
        })
    } catch (error) {
        console.log("API request failed: " + error);
        try {
            const response = await fetch("/mockdb/trending.json");
            const data = await response.json();
            data.coins.forEach((coin) => {
                let price = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    compactDisplay: "short",
                    maximumSignificantDigits: 3
                }).format(coin.item.price_btc * 28000);
                let coinCard = ""
                coinCard +=
                    `<div class="">
             <div class="mt-1">
               <a style="cursor:pointer;" onclick="getShow('${coin.item.id}')" data-bs-toggle="modal" data-bs-target="#largeModal"><span style="display:flex;margin:2px;"><img style="margin-right:1em; height: 200px; width: 200px;" src='${coin.item.large}' alt="${coin.item.name} icon"></span></a>                 
              
                <div class="flex-column">
                    <h1 class="coin-name p-0">${coin.item.name}</h1>
                    <h4 class="coin-ticker" > ${coin.item.symbol}</h4>
                    <h3 class="coin-mc">Marketcap Rank #${coin.item.market_cap_rank}</h3>                 
                     <h3 class="coin-price">${price}</h3> <!--hardcode BTC current price--> 
                    <h5 class="user-rating">User Score: ${coin.item.score}/10</h5>
                </div>
               
             </div>
            </div>
                `
                $("#trending").append(coinCard);
            })
        } catch (error) {
            console.log("Local JSON request failed: " + error);
        }
    }
};


    const getTicker = async () => {
        try {
            $.getJSON('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h&locale=en')
                .done(function (data) {
                    data.forEach((coin) => {
                        let Chng = (coin.price_change_percentage_24h).toFixed(2)
                        let color = Chng > 0 ? 'green' : 'red';
                        let price = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            notation: "compact",
                            compactDisplay: "short",
                            maximumSignificantDigits: 3
                        }).format(coin.current_price);
                        // console.log(Object.entries(coin)[0][1].usd)
                        let tickerElement = "";
                        tickerElement +=
                            `<div class="ticker__item">${coin.name}: ${price} <span class="dayChange" style="color:${color};">${Chng}%</span></div></div>`
                        $('.ticker').append(tickerElement)
                    })
                }).fail(function (jqxhr, textStatus, error) {
                console.log("Ticker API request failed: " + error);
                try {
                    $.getJSON("/mockdb/ticker.json")
                        .done(function (data) {
                            data.forEach((coin) => {
                                let Chng = (coin.price_change_percentage_24h).toFixed(2)
                                let color = Chng > 0 ? 'green' : 'red';
                                let price = new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    notation: "compact",
                                    compactDisplay: "short",
                                    maximumSignificantDigits: 3
                                }).format(coin.current_price);
                                // console.log(Object.entries(coin)[0][1].usd)
                                let tickerElement = "";
                                tickerElement +=
                                    `<div class="ticker__item">${coin.name}: ${price} <span class="dayChange" style="color:${color};">${Chng}%</span></div></div>`
                                $('.ticker').append(tickerElement)
                            })
                        })
                } catch (error) {
                    console.log("Local JSON request failed: " + error);
                }
            })
        }catch (e) {
        console.error("getTicker failed " + e)}
    }

const getGeckoTerminal = (Contract) => {
    if($('#terminal')){
        $('#terminal').empty();
    }
    $('#selectedTable').empty()
    $('#coinChart').empty()
    let terminalContent = '';
    terminalContent +=
        `<iframe height="100%" width="100%" id="geckoterminal-embed" title="GeckoTerminal Embed"
            src="https://www.geckoterminal.com/eth/pools/${Contract}?embed=1&info=0&swaps=1"
            frameBorder="0" allow="clipboard-write" allowFullScreen></iframe>`;

    $('#terminal').append(terminalContent)
}

function getPools(url,header) {
    $('#terminal').empty();
    $('#coinChart').empty()
    $('#selectedTable').empty()
    try {

        $.getJSON(url)
            .done(function (data) {


                let poolTable = '';
                poolTable +=
                    `<h1>Top 20 ${header} Pools</h1>
   <table class="table table-dark">
                    <thead id="tableHead">
                <tr>
                    <th scope="col">name</th>
                    <th scope="col">price</th>                 
                    <th scope="col">exchange</th>
                    <th scope="col">created</th>
                    
                  
                
                </tr>
            </thead>
                <tbody id="coinChart"></tbody>
            </table>`
                $('#selectedTable').append(poolTable);


                var th = $('#tableHead th');
                th.click(function () {
                    console.log('sorting table');
                    let table = $(this).parents('table').eq(0);
                    let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
                    this.asc = !this.asc;
                    if (!this.asc) {
                        rows = rows.reverse();
                    }
                    for (var i = 0; i < rows.length; i++) {
                        table.append(rows[i]);
                    }
                });

                function comparer(index) {
                    return function (a, b) {
                        let valA = getCellValue(a, index), valB = getCellValue(b, index);
                        let numA = parseFloat(valA.replace(/[^0-9.-]+/g, ""));
                        let numB = parseFloat(valB.replace(/[^0-9.-]+/g, ""));
                        if ($.isNumeric(numA) && $.isNumeric(numB)) {
                            return numA - numB;
                        } else {
                            return valA.toString().localeCompare(valB);
                        }
                    };
                }

                function getCellValue(row, index) {
                    let cell = $(row).children('td').eq(index);
                    if (cell.data('numeric')) {
                        return cell.attr('data-raw');
                    } else {
                        return cell.text();
                    }
                }
                let pools = data.data;
                pools.forEach((pool) => {

                    const currencyFormat = (input) => {
                        if (input !== 'NA' && input !== 0) {
                            return '$' + (input).toLocaleString('en-US')
                        } else {
                            return `<span style="color:red;">${input}</span>`
                        }
                    }

                    const s = "PEPE / WETH";
                    const match = s.match(/\w+/);
                    if (match) {
                        console.log(match[0]);  // output: PEPE
                    }

                    let poolData = '';
                    poolData +=
                        `<tr>
<td style="cursor:pointer;" onclick="getGeckoTerminal('${pool.attributes.address}')">${pool.attributes.name}</td>
<td>${pool.attributes.base_token_price_usd}</td>
<td>${pool.relationships.dex.data.id}</td>
<td>${pool.attributes.pool_created_at}</td>

</tr>`
                    $('#coinChart').append(poolData)
                })

            })
    } catch (e) {
        console.error(e)
    }
}
function getExchanges(url) {
    $('#terminal').empty();
    $('#coinChart').empty()
    $('#selectedTable').empty()
    try {
        $.getJSON(url)
            .done(function (data) {
                let chartTable = '';
                chartTable +=
                    `<h1 class="text-justify">Exchanges</h1>                
                     <table class="table table-dark">
                    <thead id="tableHead">
                <tr>
                    <th scope="col" style="cursor:pointer;">name</th>
                    <th scope="col">trust score</th>                 
                    <th scope="col">trust rank</th>
                    <th scope="col">24h volume (BTC)</th>
                    
                  
                
                </tr>
            </thead>
                <tbody id="coinChart"></tbody>
            </table>`

                $('#selectedTable').append(chartTable);

                var th = $('#tableHead th');
                th.click(function () {
                    console.log('sorting table');
                    let table = $(this).parents('table').eq(0);
                    let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
                    this.asc = !this.asc;
                    if (!this.asc) {
                        rows = rows.reverse();
                    }
                    for (var i = 0; i < rows.length; i++) {
                        table.append(rows[i]);
                    }
                });

                function comparer(index) {
                    return function (a, b) {
                        let valA = getCellValue(a, index), valB = getCellValue(b, index);
                        let numA = parseFloat(valA.replace(/[^0-9.-]+/g, ""));
                        let numB = parseFloat(valB.replace(/[^0-9.-]+/g, ""));
                        if ($.isNumeric(numA) && $.isNumeric(numB)) {
                            return numA - numB;
                        } else {
                            return valA.toString().localeCompare(valB);
                        }
                    };
                }

                function getCellValue(row, index) {
                    let cell = $(row).children('td').eq(index);
                    if (cell.data('numeric')) {
                        return cell.attr('data-raw');
                    } else {
                        return cell.text();
                    }
                }


                data.forEach((ex) => {



                    let volume_formatted = '$' + (ex.trade_volume_24h_btc).toLocaleString('en-US');
                    const marketCap = (input) => {
                        if (input !== null || input === 0) {
                            return input
                        } else {
                            return 'NA'
                        }
                    }

                    const volume = (input) => {
                        if (input !== null || input === 0) {
                            return input
                        } else {
                            return 'NA'
                        }
                    }


                    let catElement = '';
                    catElement +=
                        `<tr>
<td class='exchange-name'><a style="text-decoration: none; color:white!important;" href="#search" onclick="getPools('https://api.geckoterminal.com/api/v2/networks/eth/dexes/${ex.id}/pools', '${ex.name}')"><img src='${ex.image}' alt=''>${ex.name}</a></td>
<td class="exchange-score">${ex.trust_score}</td>
<td class="exchange-rank">${ex.trust_score_rank}</td>
<td class="exchange-volume">₿ ${volume(volume_formatted)}</td>

</tr>`
                    $('#coinChart').append(catElement)


                })
            })//done
    } catch (e) {
        console.error(e)
    }    try {
        $.getJSON("/mockdb/exchanges.json")
            .done(function (data) {
                let chartTable = '';
                chartTable +=
                    `<h1 class="text-justify">Exchanges</h1>                
                     <table class="table table-dark">
                    <thead id="tableHead">
                <tr>
                    <th scope="col" style="cursor:pointer;">name</th>
                    <th scope="col">trust score</th>                 
                    <th scope="col">trust rank</th>
                    <th scope="col">24h volume (BTC)</th>
                    
                  
                
                </tr>
            </thead>
                <tbody id="coinChart"></tbody>
            </table>`

                $('#selectedTable').append(chartTable);

                var th = $('#tableHead th');
                th.click(function () {
                    console.log('sorting table');
                    let table = $(this).parents('table').eq(0);
                    let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
                    this.asc = !this.asc;
                    if (!this.asc) {
                        rows = rows.reverse();
                    }
                    for (var i = 0; i < rows.length; i++) {
                        table.append(rows[i]);
                    }
                });

                function comparer(index) {
                    return function (a, b) {
                        let valA = getCellValue(a, index), valB = getCellValue(b, index);
                        let numA = parseFloat(valA.replace(/[^0-9.-]+/g, ""));
                        let numB = parseFloat(valB.replace(/[^0-9.-]+/g, ""));
                        if ($.isNumeric(numA) && $.isNumeric(numB)) {
                            return numA - numB;
                        } else {
                            return valA.toString().localeCompare(valB);
                        }
                    };
                }

                function getCellValue(row, index) {
                    let cell = $(row).children('td').eq(index);
                    if (cell.data('numeric')) {
                        return cell.attr('data-raw');
                    } else {
                        return cell.text();
                    }
                }


                data.forEach((ex) => {



                    let volume_formatted = '$' + (ex.trade_volume_24h_btc).toLocaleString('en-US');
                    const marketCap = (input) => {
                        if (input !== null || input === 0) {
                            return input
                        } else {
                            return 'NA'
                        }
                    }

                    const volume = (input) => {
                        if (input !== null || input === 0) {
                            return input
                        } else {
                            return 'NA'
                        }
                    }


                    let catElement = '';
                    catElement +=
                        `<tr>
<td class='exchange-name'><a style="text-decoration: none; color:white!important;" href="#search" onclick="getPools('https://api.geckoterminal.com/api/v2/networks/eth/dexes/${ex.id}/pools', '${ex.name}')"><img src='${ex.image}' alt=''>${ex.name}</a></td>
<td class="exchange-score">${ex.trust_score}</td>
<td class="exchange-rank">${ex.trust_score_rank}</td>
<td class="exchange-volume">₿ ${volume(volume_formatted)}</td>

</tr>`
                    $('#coinChart').append(catElement)


                })
            })//done
    } catch (e) {
        console.error(e)
    }
}

    const getChart = async (url,header) => {
        $('#terminal').empty();
        $('#coinChart').empty()
        $('#selectedTable').empty()
        try {
            $.getJSON(url)
                .done(function (data) {
                    let chartTable = '';
                    chartTable +=

                        `<h1>${header}</h1>                
            <table class="table table-dark">
            <thead id="tableHead">
            
            <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">ticker</th>
                <th scope="col">price</th>
                <th scope="col">1h</th>
                <th scope="col">24h</th>
                <th scope="col">7d</th>
                <th scope="col">volume</th>
                <th scope="col">marketcap</th>
                <th scope="col">24h Hi</th>
                <th scope="col">24h Lo</th>
                <th scope="col">Last 7 days</th>
            </tr>
            </thead>
            <tbody id="coinChart"></tbody>
            </table>`

                    $('#selectedTable').append(chartTable);

                    var th = $('#tableHead th');
                    th.click(function () {
                        console.log('sorting table');
                        let table = $(this).parents('table').eq(0);
                        let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
                        this.asc = !this.asc;
                        if (!this.asc) {
                            rows = rows.reverse();
                        }
                        for (var i = 0; i < rows.length; i++) {
                            table.append(rows[i]);
                        }
                    });

                    function comparer(index) {
                        return function (a, b) {
                            let valA = getCellValue(a, index), valB = getCellValue(b, index);
                            let numA = parseFloat(valA.replace(/[^0-9.-]+/g, ""));
                            let numB = parseFloat(valB.replace(/[^0-9.-]+/g, ""));
                            if ($.isNumeric(numA) && $.isNumeric(numB)) {
                                return numA - numB;
                            } else {
                                return valA.toString().localeCompare(valB);
                            }
                        };
                    }

                    function getCellValue(row, index) {
                        let cell = $(row).children('td').eq(index);
                        if (cell.data('numeric')) {
                            return cell.attr('data-raw');
                        } else {
                            return cell.text();
                        }
                    }


                    data.forEach((coin) => {


                        let colorDay = coin.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red';
                        let color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
                        let colorWeek = coin.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red';


                        const numberNotationCheck = (input) => {
                            return '$' + (input).toLocaleString("en-US")
                        }

                        let sparkValue = coin.sparkline_in_7d.price
                        let chartElement = "";
                        chartElement +=
                            `<tr>
<td class="coin-marketcapRank"><span>${coin.market_cap_rank}</span></td>
<td><a style="cursor:pointer;" onclick="getShow('${coin.id}')" data-bs-toggle="modal" data-bs-target="#largeModal"><img class="coin-icon" src="${coin.image}" alt=""><strong>${coin.name}</strong></a></td>
<td class="coin-ticker">${coin.symbol.toUpperCase()}</td>
<td class="coin-price">${numberNotationCheck(coin.current_price)}</td>
<td class="coin-volChange" style="color: ${colorDay}">${(coin.price_change_percentage_1h_in_currency).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${color};">${(coin.price_change_percentage_24h).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${colorWeek}">${(coin.price_change_percentage_7d_in_currency).toFixed(2)}%</td>
<td class="coin-volume">${numberNotationCheck(coin.total_volume)}</td>
<td class="coin-marketcap">${numberNotationCheck(coin.market_cap)}</td>
<td class="coin-high">${numberNotationCheck(coin.high_24h)}</td>
<td class="coin-low">${numberNotationCheck(coin.low_24h)}</td>
<td id="${coin.id}-sparkline" class="sparkline">
<div class="loading"><span>L</span>
  <span>o</span>
  <span>a</span>
  <span>d</span>
  <span>i</span>
  <span>n</span>
  <span>g</span>
  <span>.</span>
  <span>.</span>
  <span>.</span>
  </div></td>`

                        $('#coinChart').append(chartElement)
                        if($(`#${coin.id}-sparkline`) !== null) {$(`#${coin.id}-sparkline`).sparkline(sparkValue,{myPrefixes: [],
                            tooltipFormatter: function(sp, options, fields) {
                                var format =  $.spformat();
                                var result = '';
                                $.each(fields, function(i, field) {
                                    field.myprefix = options.get('myPrefixes')[i];
                                    result += format.render(field, options.get('tooltipValueLookups'), options);
                                })
                                return result;
                            },type: 'line',lineWidth: 2, lineColor:`${colorWeek}`,fillColor:false, width: 200, height:50,  normalRangeMax: coin.ath})}
                        else{
                            return 'NA'
                        }


                    }); //forEach
                }) //done
                .fail(function (jqxhr, textStatus, error) {
                    console.log("API request failed: " + error);
                    try {
                        $.getJSON("/mockdb/marketcap.json")
                            .done(function (data) {
                                let chartTable = '';
                                chartTable +=

                                    `<h1>${header}</h1>                
            <table class="table table-dark">
            <thead id="tableHead">
            
            <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">ticker</th>
                <th scope="col">price</th>
                <th scope="col">1h</th>
                <th scope="col">24h</th>
                <th scope="col">7d</th>
                <th scope="col">volume</th>
                <th scope="col">marketcap</th>
                <th scope="col">24h Hi</th>
                <th scope="col">24h Lo</th>
                <th scope="col">Last 7 days</th>
            </tr>
            </thead>
            <tbody id="coinChart"></tbody>
            </table>`

                                $('#selectedTable').append(chartTable);

                                var th = $('#tableHead th');
                                th.click(function () {
                                    console.log('sorting table');
                                    let table = $(this).parents('table').eq(0);
                                    let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
                                    this.asc = !this.asc;
                                    if (!this.asc) {
                                        rows = rows.reverse();
                                    }
                                    for (var i = 0; i < rows.length; i++) {
                                        table.append(rows[i]);
                                    }
                                });

                                function comparer(index) {
                                    return function (a, b) {
                                        let valA = getCellValue(a, index), valB = getCellValue(b, index);
                                        let numA = parseFloat(valA.replace(/[^0-9.-]+/g, ""));
                                        let numB = parseFloat(valB.replace(/[^0-9.-]+/g, ""));
                                        if ($.isNumeric(numA) && $.isNumeric(numB)) {
                                            return numA - numB;
                                        } else {
                                            return valA.toString().localeCompare(valB);
                                        }
                                    };
                                }

                                function getCellValue(row, index) {
                                    let cell = $(row).children('td').eq(index);
                                    if (cell.data('numeric')) {
                                        return cell.attr('data-raw');
                                    } else {
                                        return cell.text();
                                    }
                                }


                                data.forEach((coin) => {


                                    let colorDay = coin.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red';
                                    let color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
                                    let colorWeek = coin.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red';


                                    const numberNotationCheck = (input) => {
                                        return '$' + (input).toLocaleString("en-US")
                                    }

                                    let sparkValue = coin.sparkline_in_7d.price
                                    let chartElement = "";
                                    chartElement +=
                                        `<tr>
<td class="coin-marketcapRank"><span>${coin.market_cap_rank}</span></td>
<td><a style="cursor:pointer;" onclick="getShow('${coin.id}')" data-bs-toggle="modal" data-bs-target="#largeModal"><img class="coin-icon" src="${coin.image}" alt=""><strong>${coin.name}</strong></a></td>
<td class="coin-ticker">${coin.symbol.toUpperCase()}</td>
<td class="coin-price">${numberNotationCheck(coin.current_price)}</td>
<td class="coin-volChange" style="color: ${colorDay}">${(coin.price_change_percentage_1h_in_currency).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${color};">${(coin.price_change_percentage_24h).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${colorWeek}">${(coin.price_change_percentage_7d_in_currency).toFixed(2)}%</td>
<td class="coin-volume">${numberNotationCheck(coin.total_volume)}</td>
<td class="coin-marketcap">${numberNotationCheck(coin.market_cap)}</td>
<td class="coin-high">${numberNotationCheck(coin.high_24h)}</td>
<td class="coin-low">${numberNotationCheck(coin.low_24h)}</td>
<td id="${coin.id}-sparkline" class="sparkline">
<div class="loading"><span>L</span>
  <span>o</span>
  <span>a</span>
  <span>d</span>
  <span>i</span>
  <span>n</span>
  <span>g</span>
  <span>.</span>
  <span>.</span>
  <span>.</span>
  </div></td>`

                                    $('#coinChart').append(chartElement)
                                    $(`#${coin.id}-sparkline`).sparkline(sparkValue, {
                                        myPrefixes: [],
                                        tooltipFormatter: function (sp, options, fields) {
                                            var format = $.spformat();
                                            var result = '';
                                            $.each(fields, function (i, field) {
                                                field.myprefix = options.get('myPrefixes')[i];
                                                result += format.render(field, options.get('tooltipValueLookups'), options);
                                            })
                                            return result;
                                        },
                                        type: 'line',
                                        lineWidth: 2,
                                        lineColor: `${colorWeek}`,
                                        fillColor: false,
                                        width: 200,
                                        height: 50,
                                        normalRangeMax: coin.ath
                                    })


                                }); //forEach
                            }) //done
                        console.log("JSON GET successful")
                    } catch (e) {
                        console.error(e)
                    }
                })
        } catch (e) {
            console.error(e)
        }

    }
function getCategories(url) {
    $('#terminal').empty();
    $('#coinChart').empty()
    $('#selectedTable').empty()
    try {
        $.getJSON(url)
            .done(function (data) {
                let chartTable = '';
                chartTable +=
                    `<h1 class="text-justify">Categories</h1>                
                     <table class="table table-dark">
                    <thead id="tableHead">
                <tr>
                    <th scope="col">name</th>
                    <th scope="col">marketcap</th>                 
                    <th scope="col">top 3 tokens</th>
                    <th scope="col">24h volume</th>
                    
                  
                
                </tr>
            </thead>
                <tbody id="coinChart"></tbody>
            </table>`



                $('#selectedTable').append(chartTable);

                var th = $('#tableHead th');
                th.click(function() {
                    console.log('sorting table');
                    let table = $(this).parents('table').eq(0);
                    let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
                    this.asc = !this.asc;
                    if (!this.asc) {
                        rows = rows.reverse();
                    }
                    for (var i = 0; i < rows.length; i++) {
                        table.append(rows[i]);
                    }
                });
                function comparer(index) {
                    return function(a, b) {
                        let valA = getCellValue(a, index), valB = getCellValue(b, index);
                        let numA = parseFloat(valA.replace(/[^0-9.-]+/g,""));
                        let numB = parseFloat(valB.replace(/[^0-9.-]+/g,""));
                        if ($.isNumeric(numA) && $.isNumeric(numB)) {
                            return numA - numB;
                        } else {
                            return valA.toString().localeCompare(valB);
                        }
                    };
                }
                function getCellValue(row, index) {
                    let cell = $(row).children('td').eq(index);
                    if (cell.data('numeric')) {
                        return cell.attr('data-raw');
                    } else {
                        return cell.text();
                    }
                }
                data.forEach((cat) => {

                    const currencyFormat = (input) => {
                        if(input !== 'NA' && input !== 0) {
                            return '$' + (input).toLocaleString('en-US')
                        }else{
                            return `<span style="color:red;">${input}</span>`
                        }
                    }

                    const marketCap = (input) => {
                        if(input == null || input == '$0'){
                            return 0
                        } else {
                            return input
                        }
                    }

                    const volume = (input) => {
                        if(input == null || input === '$0'){
                            return 0
                        } else {
                            return input
                        }
                    }

                    let catElement ='';
                    catElement +=
                        `<tr>
<td id='cat-${cat.name}'><span style="cursor:pointer;" onclick="getChart('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${cat.id}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en','${cat.name}')">${cat.name}</span></td>
<td>${currencyFormat(marketCap(cat.market_cap))}</td>
<td><img src='${cat.top_3_coins[0]}' alt=''><img src='${cat.top_3_coins[1]}' alt=''><img src='${cat.top_3_coins[2]}' alt=''></td>
<td>${(currencyFormat(volume(cat.volume_24h)))}</td>

</tr>`
                    $('#coinChart').append(catElement)
                })
            })//done
    } catch (error) {
        console.log("API request failed: " + error);
    } try {
        $.getJSON("/mockdb/categories.json")
            .done(function (data) {
                let chartTable = '';
                chartTable +=
                    `<h1 class="text-justify">Categories</h1>                
                     <table class="table table-dark">
                    <thead id="tableHead">
                <tr>
                    <th scope="col">name</th>
                    <th scope="col">marketcap</th>                 
                    <th scope="col">top 3 tokens</th>
                    <th scope="col">24h volume</th>
                    
                  
                
                </tr>
            </thead>
                <tbody id="coinChart"></tbody>
            </table>`



                $('#selectedTable').append(chartTable);

                var th = $('#tableHead th');
                th.click(function() {
                    console.log('sorting table');
                    let table = $(this).parents('table').eq(0);
                    let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
                    this.asc = !this.asc;
                    if (!this.asc) {
                        rows = rows.reverse();
                    }
                    for (var i = 0; i < rows.length; i++) {
                        table.append(rows[i]);
                    }
                });
                function comparer(index) {
                    return function(a, b) {
                        let valA = getCellValue(a, index), valB = getCellValue(b, index);
                        let numA = parseFloat(valA.replace(/[^0-9.-]+/g,""));
                        let numB = parseFloat(valB.replace(/[^0-9.-]+/g,""));
                        if ($.isNumeric(numA) && $.isNumeric(numB)) {
                            return numA - numB;
                        } else {
                            return valA.toString().localeCompare(valB);
                        }
                    };
                }
                function getCellValue(row, index) {
                    let cell = $(row).children('td').eq(index);
                    if (cell.data('numeric')) {
                        return cell.attr('data-raw');
                    } else {
                        return cell.text();
                    }
                }
                data.forEach((cat) => {

                    const currencyFormat = (input) => {
                        if(input !== 'NA' && input !== 0) {
                            return '$' + (input).toLocaleString('en-US')
                        }else{
                            return `<span style="color:red;">${input}</span>`
                        }
                    }

                    const marketCap = (input) => {
                        if(input == null || input == '$0'){
                            return 0
                        } else {
                            return input
                        }
                    }

                    const volume = (input) => {
                        if(input == null || input === '$0'){
                            return 0
                        } else {
                            return input
                        }
                    }

                    let catElement ='';
                    catElement +=
                        `<tr>
<td id='cat-${cat.name}'><span style="cursor:pointer;" onclick="getChart('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${cat.id}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en','${cat.name}')">${cat.name}</span></td>
<td>${currencyFormat(marketCap(cat.market_cap))}</td>
<td><img src='${cat.top_3_coins[0]}' alt=''><img src='${cat.top_3_coins[1]}' alt=''><img src='${cat.top_3_coins[2]}' alt=''></td>
<td>${(currencyFormat(volume(cat.volume_24h)))}</td>

</tr>`
                    $('#coinChart').append(catElement)
                })
            })//done
    } catch (error) {
        console.log("Local JSON request failed: " + error);
    }
}










//Search and Debouncer
const searchQuery = (input) => {
    $('#searchResults').empty()
    try {
        $.getJSON(`https://api.coingecko.com/api/v3/search?query=${input}`)
            .done(function (data) {
                let info = data.coins;
                $('#searchResults').append(`<span style="background:rgba(255,255,255,0.5);z-index: 12;position: relative;right: -96%;top: 21px;color:red;cursor:pointer;" onclick="$('#searchResults').empty()">X</span>`);
                info.forEach((coin) => {
                    let marketCap = coin.market_cap_rank;
                    if (marketCap == null) {
                        return "NA";
                    }

                    let searchContent = "";
                    searchContent +=
                        `<li><a onclick="$('#searchResults').empty();getShow('${coin.id}');$('#largeModal').modal('toggle');"><span>#${marketCap} </span><img src="${coin.thumb}" alt="${coin.id}">${coin.symbol} ${coin.id}</a></li>`;
                    $('#searchResults').append(searchContent);
                });
            });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

const debouncedFunction = debounce(searchQuery, 5000);

$('#search').on('input', function () {
    $('#searchResults').empty();
    debouncedFunction($(this).val());
});


const getGlobal = async () => {
    $('#global').empty()
    try {
        $.getJSON("https://api.coingecko.com/api/v3/global")
            .done(function (data) {
                console.log(data)
                let coin = data.data
                let price = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    compactDisplay: "long",
                    maximumSignificantDigits: 3
                }).format(coin.total_volume.usd);
                coin.total_volume.usd
                let Global = "";
                Global +=
                    `<span>Coins: <span class="globalValue">${coin.active_cryptocurrencies}</span> Exchanges: <span class="globalValue">${coin.markets}</span> 24hr Volume: <span class="globalValue">${price} </span> BTC Dominance: <span class="globalValue">${coin.market_cap_percentage.btc.toFixed(2)}%</span> </span>`
                $('#global').append(Global)

            })
            .fail(function (jqxhr, textStatus, error) {
                console.log("API request failed: " + error);
                $('#global').empty(); try {
                    $.getJSON("/mockdb/global.json")
                        .done(function (data) {
                            console.log(data)
                            let coin = data.data
                            let price = new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                notation: "compact",
                                compactDisplay: "long",
                                maximumSignificantDigits: 3
                            }).format(coin.total_volume.usd);
                            coin.total_volume.usd
                            let Global = "";
                            Global +=
                                `<span>Coins: <span class="globalValue">${coin.active_cryptocurrencies}</span> Exchanges: <span class="globalValue">${coin.markets}</span> 24hr Volume: <span class="globalValue">${price} </span> BTC Dominance: <span class="globalValue">${coin.market_cap_percentage.btc.toFixed(2)}%</span> </span>`
                            $('#global').append(Global)

                        })
                } catch (e) {
                    console.error(e + "Global JSON fetch failed");
                }
            })
    } catch (e) {
        console.error(e + "Global API call failed");
    }
}
const getGas = async () => {
    $('#global').empty()
    try {
        // $.getJSON('../mockdb/gas.json')
        $.getJSON('https://api.etherscan.io/api?module=gastracker&action=gasoracle')
            .done(function (data) {
                let gas = "";
                gas +=
                    `<span>Gas: <span class="globalValue">${data.result.FastGasPrice}gwei </span></span>`
                $('#global').append(gas)
            })
            .fail(function (jqxhr, textStatus, error) {
                console.log("Ticker API request failed: " + error);
                try {
                    $('#global').empty()
                    $.getJSON("/mockdb/gas.json")
                        .done(function (data) {
                            let gas = "";
                            gas +=
                                `<span>Gas: <span class="globalValue">${data.result.FastGasPrice}gwei </span></span>`
                            $('#global').append(gas)
                        })
                } catch (error) {
                    console.log("Local JSON request failed: " + error);
                }
        })
    } catch (error) {
        console.log("API request failed: " + error);
    }
}

    const getShow = async (input) => {
        $('#coin-description').empty()
        try {
            $.getJSON(`https://api.coingecko.com/api/v3/coins/${input}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`)
                .done(function (coin) {


                    const findTop5 = () => {
                        let top5Tickers = coin.tickers.sort((a, b) => b.volume - a.volume).slice(0, 5);
                        return top5Tickers;
                    }

                    const top5Tickers = findTop5();
                    // console.log('The first ticker in the top 5 is:', top5Tickers[0]);
                    const findMax = () => {
                        let maxTicker = coin.tickers.reduce((acc, ticker) => {
                            let volume = ticker.volume;
                            return (volume > acc.volume) ? ticker : acc;
                        }, {volume: 0});
                        // console.log('The largest volume is:', maxTicker.volume);
                        return maxTicker;
                    }

                    const maxTicker = findMax();
                    // console.log('The parent object of the largest volume is:', maxTicker);


                    let marketCap = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.market_cap.usd);
                    let maxSupply_formatted = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.max_supply);
                    let totalSupply_formatted = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.total_supply)
                    let circulatingSupply_formatted = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.circulating_supply);
                    let fullyDilutedValuation = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.fully_diluted_valuation.usd);
                    let price = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.current_price.usd);
                    let followers = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.community_data.twitter_followers);
                    let volume = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.total_volume.usd)
                    let high = new Intl.NumberFormat("en-US", {
                        style: "decimal",
                        maximumSignificantDigits: 5
                    }).format((coin.market_data.high_24h.usd).toFixed(2))
                    let low = new Intl.NumberFormat("en-US", {
                        style: "decimal",
                        maximumSignificantDigits: 5
                    }).format((coin.market_data.low_24h.usd).toFixed(2))
                    let ath = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.ath.usd);
                    let atl = (coin.market_data.atl.usd).toLocaleString('en-US');


                    //null checks

                    const progressBar = () => {
                        let difference = coin.market_data.high_24h.usd - coin.market_data.current_price.usd
                        let percent = difference / coin.market_data.high_24h.usd * 100
                        console.log(difference)
                        console.log(percent)
                        return percent * 100;
                    }
                    const week_priceChange = () => {
                        if(coin.market_data.price_change_percentage_7d_in_currency.usd > 0){
                            return `risen <span style="color:${colorWeek}">${(weekVol).toFixed(2)}%</span>`
                        }else if(coin.market_data.price_change_percentage_7d_in_currency.usd < 0){
                            return `dropped <span style="color:${colorWeek}">${(weekVol).toFixed(2)}%</span>`
                        }
                    }
                    const sentiment = () => {
                        let coinSentiment = coin.sentiment_votes_up_percentage;
                        if(coin.sentiment_votes_up_percentage === null){
                            return `Not enough of the community has voted on <span class="text-white">${coin.name}</span> today.`
                        }
                        else if(coin.sentiment_votes_up_percentage > 60){
                            return `The community is <strong style="color:green">bullish</strong> with more than <strong style="color:green;">${coinSentiment}%</strong> feeling optimistic about <span class="text-white">${coin.name}</span> in polls today.`
                        }else if(coin.sentiment_votes_up_percentage === 50) {
                            return `The community is <strong style="color:gray">mixed</strong> with <strong>${coinSentiment}%</span> feeling optimistic about <span class="text-white">${coin.name}</span> in polls today.`
                        }else if(coin.sentiment_votes_up_percentage < 49){
                            return `The community is <strong style="color:red;">bearish</strong> with less than <strong style="color:red">${coinSentiment}%</span> optimistic about <span class="text-white">${coin.name}</span> in polls today.`
                        }
                    }
                    const maxSupply = () => {
                        if (coin.market_data.max_supply === null) {
                            return "∞"
                        } else {
                            return maxSupply_formatted
                        }
                    }
                    const totalSupply = () => {
                        if (coin.market_data.total_supply === null) {
                            return "∞"
                        } else {
                            return totalSupply_formatted
                        }
                    }
                    const FDV = () => {
                        if(isNaN(coin.market_data.fully_diluted_valuation.usd)){
                            return "∞"
                        }else {
                            return "$" + fullyDilutedValuation;
                        }
                    }
                    const circulatingSupply = () => {
                        if(coin.market_data.circulating_supply === null){
                            return "No information available yet"
                        }else {
                            return circulatingSupply_formatted;
                        }
                    }
                    //null checks ^

                    let marketCapRank = coin.market_data.market_cap_rank

                    let colorHour = coin.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'green' : 'red';
                    let colorDay = coin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? 'green' : 'red';
                    let colorWeek = coin.market_data.price_change_percentage_7d_in_currency.usd > 0 ? 'green' : 'red';

                    let hourVol = coin.market_data.price_change_percentage_1h_in_currency.usd
                    let dayVol = coin.market_data.price_change_percentage_24h_in_currency.usd
                    let weekVol = coin.market_data.price_change_percentage_7d_in_currency.usd
                    console.log(price)
                    console.log(volume)
                    console.log(high)
                    console.log(low)
                    console.log(marketCapRank)
                    console.log(marketCap)

                    let sparkValue = coin.market_data.sparkline_7d.price

                    let chartElement = "";
                    chartElement +=
                        `<div class="container bg-dark">    
<div class="row">
<div class="col-md-8">
               <div class="coin-links "><a href="../index.html">Cryptocurrencies   >  </a> <span class="fw-bold">${coin.name}</span></div>
               <br>
<button type="button" class="btn btn-outline-success" data-delay="0" data-toggle="tooltip" data-placement="top" title="${coin.name} is ranked #${marketCapRank} in market cap.">Rank #${marketCapRank}</button>

<div class="col-md-12 my-3 display-5"><img class="coin-icon" src="${coin.image.small}" alt=""><strong class="text-white fw-bold"> ${coin.name}</strong>
<span class="coin-links">${coin.symbol.toUpperCase()}</span>
</div>
<div class="row"><span class="coin-price text-white display-3 fw-bold">$${price} <span class="coin-volChange fs-4" style="position:relative;top:-20px;color: ${colorHour}">${(hourVol).toFixed(2)}%</span>
</div>

<div class="pt-2 d-inlineflex col-md-12">
<span class="btn-group" role="group" aria-label="Third group">
    <a href="/dashboard" type="button" class="btn btn-secondary border border-dark" data-delay="0" data-toggle="tooltip" data-placement="top" title="Sign up to set price alerts on ${coin.name}!" ><i class="bi bi-bell-fill"></i></a>
    <a href="/dashboard" type="button" class="btn btn-secondary border border-dark" data-delay="0" data-toggle="tooltip" data-placement="top" title="Add ${coin.name} to your Watchlist!"><i class="bi bi-star"></i></a>
    </span>
  <span class="bg-dark col-md-6 py-1 fs-6 fw-bold px-1">☆ On ${followers} watchlists</span>
</span>
</div>
<div class="progress m-t-20">
<progress class="progress-bar bg-success"  style="position:relative;width:${progressBar()}%;height:16px;box-shadow: 1px 1px 4px rgba( 0, 0, 0, 0.2 );" max="${coin.market_data.high_24h.usd}" value="${coin.market_data.current_price.usd}"><span style="color:white; text-shadow:1px 1px 0 black;position:absolute;z-index: 5;">${price}</span></progress>
</div>
<div class="row m-t-20">
<span class="col-md-4 d-flex justify-content-start text-white">$${low}</span>
<span class="col-md-4 d-flex text-light justify-content-center align-center">24h Range</span>
<span class="col-md-4 d-flex text-light justify-content-end">$${high}</span>
</span>
</div>
</div>
</div>
<div class="col-md-4 d-flex">
<h1 class="text-white justify-content-center align-self-center"> henlo</h1>
</div>


<div class="row">

<ul class="col-md-6 list-group list-group-flush bg-dark text-white">
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Valuation derived from multiplying the current price by the circulating supply of tokens available for trade.">?</a> Market Cap: <span style="text-shadow: 1px 1px black;" class="coin-marketcap text-white" style="text-shadow: 1px 1px black;">$${marketCap}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Fully Diluted Valuation. Theoretical value of a currency multiplied by the current price and total supply, includes tokens that are locked in token governance wallets or otherwise withheld from circulation.">?</a> FDV: <span class="coin-marketcap text-white" style="text-shadow: 1px 1px black;">${FDV()}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Trade valuation last 24 hours across all trading platforms.">?</a> 24h Volume: <span class="coin-volume text-white" style="text-shadow: 1px 1px black;">$${volume}</span> <span style="color: ${colorDay};text-shadow:1px 1px 0 black;">${(dayVol).toFixed(2)}%</span></li>
</ul>

<ul class="col-md-6 d-flex list-group list-group-flush text-white">
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Current amount of tokens tradable on the market, excludes 'burned', staked or otherwise 'locked' tokens taken out of circulation.">?</a> Circulating Supply: <span style="text-shadow: 1px 1px black;" class="coin-volume text-white" style="text-shadow: 1px 1px black;">${circulatingSupply()}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Total tokens that already exist minus any that have been 'burned' (removed from circulation). Equivalent to outstanding shares in the stock market.">?</a> Total Supply: <span style="text-shadow: 1px 1px black;" class="coin-marketcap text-white" style="text-shadow: 1px 1px black;">${totalSupply()}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Maximum tokens that could exist, some currencies are programmed to theoretically be printed indefintely, their max supply is denoted with the '∞' symbol.">?</a> Max Supply : <span style="text-shadow: 1px 1px black;" class="coin-volume text-white" style="text-shadow: 1px 1px black;">${maxSupply()}</span></li>
</ul>
</div>
<div class="row">
<div class="py-2 bg-dark text-white">
<h3 class="pb-1 text-success">What is ${coin.name}?</h3>
<p>${coin.description.en}</p>
</div>
</div>  
<div class="row">
<ul class="col-md-6 list-group list-group-flush">
<li class="list-group-item fw-bold bg-dark text-secondary"><h3 class="text-primary">${coin.name} Historical</h3></li>
<li class="list-group-item fw-bold bg-dark text-white"> Current price: <span style="color:${colorDay}">$${price}</span> </li>
<li class="list-group-item fw-bold bg-dark text-white"> Today's high: <span class="text-success">$${high}</span> Today's low: <span class="text-warning">$${low}</span></li>
<li class="list-group-item fw-bold bg-dark text-white"> All time high: <span class="text-success">$${ath}</span><span class="text-secondary"> ${new Date(coin.market_data.ath_date.usd).toLocaleDateString('en')}</span></li>
<li class="list-group-item fw-bold bg-dark text-white"> All time low: <span class="text-warning">$${atl}</span><span class="text-secondary">  ${new Date(coin.market_data.atl_date.usd).toLocaleDateString('en')}</span></li>

</ul>
</div>

<div class="row">
<div class="container">
<hr class="text-white">
<div class="col-md-12">
<h2 class="pb-1 text-white">What is the market cap of ${coin.name}?</h2>
<h6 class="py-1 text-secondary"><span class="text-white">${coin.name}</span> is ranked <span class="text-white">#${marketCapRank}</span> with a market cap of <span class="text-white">$${marketCap}</span>. Market capitalization is a valuation of total supply multiplied by the current price. </h6>
</div>

<div class="col-md-12">
<h2 class="pb-1 text-white">What is the market sentiment of ${coin.name} today?</h2>
<h6 class="py-1 text-secondary">The price of <span class="text-white">${coin.name}</span> has ${week_priceChange()} in the past 7 days. ${sentiment()} </h6>
</div>

<div class="col-md-12">
<h2 class="pb-1 text-white">Where can you buy ${coin.name}?</h2>
<h6 class="py-1 text-secondary"><span class="text-white">${coin.name}</span> can be traded on <span class="text-white">${maxTicker.market.name}</span> where its 24h trade volume was <span class="text-success">$${(maxTicker.volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</span> , the <span class="text-white">highest</span> trade volume of all other exchanges.</h6>
<table class="table table-dark">
<thead>
<h4 class="text-secondary">${coin.name} can also be traded on the following exchanges.</h4>
<tr>
<th scope="col" class="text-white">name</th>
<th scope="col" class="text-white">24h volume</th>
</tr>
</thead>
<tbody>
<tr><td class="text-white">${top5Tickers[0].market.name}</td><td class="text-white">$${(top5Tickers[0].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[1].market.name}</td><td class="text-white">$${(top5Tickers[1].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[2].market.name}</td><td class="text-white">$${(top5Tickers[2].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[3].market.name}</td><td class="text-white">$${(top5Tickers[3].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[4].market.name}</td><td class="text-white">$${(top5Tickers[4].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
</tbody>
</table>
</div>
<div class="row">
<div class="py-2 col-md-12">

<!--market table goes here-->

</div>
</div>
</div>
</div> <!--bg-container dark-->

`
                    $('#coin-description').append(chartElement)
                }); //done
        } //try
        catch (e) {
            console.error(e)
        }
    }//getShow function

getChart('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en',"Cryptocurrency Prices by Market Cap")
getGlobal()
getGas()
getTrending()
getTicker()


var scrollAmount = 100;
var scrollDelay = 5000;
var scrollRight = true;


setInterval(function() {
    $('#trending').animate({scrollLeft: '+=300px'}, 500);
    setTimeout(function() {
        $('#trending').animate({scrollLeft: '-=300px'}, 500);
    }, 10000);
}, 2000);

$(document).ready(function (){
    $('#dropdownBlockchain').click(function () {
        $('.dropdown-Blockchain-item').toggleClass('show');
    });
    $('.dropdown-Blockchain-item').click(function (){
        $('.dropdown-Blockchain-item').toggleClass('show');
    })
});

