var load = $("#loading");
var list = $('#list');
var result = $('#result');
var content = $('#content');
var countryRequest = new XMLHttpRequest();
var img = $("<img class='loadingImg' src='assets/img/loading.gif'>");
$("#countryName").keyup(function(){
    list.empty();
    load.empty();
    result.empty();
    if(this.value == ""){
        result.empty();
        return;
    }
    countryRequest.open("GET", "server.php?search=" + this.value);
    load.append(img);

    countryRequest.onload = function (ev) {
        if(this.responseText === 'Country not found') {
            load.empty();
            var notFound = $(`<li class="not-found">${this.responseText}</li>`);
            result.append(notFound);
            return;
        }
        var countries = JSON.parse(this.responseText);
        var ul = $('<ul>');
        ul.attr("id","list");
        result.empty();

        for(var country of countries) {
            var li = $(`<li id="${country.name}" class="item"><div>${country.name}</div></li>`);
            var img = $(`<img src="${country.flag}" class="searchImg">`);
            li.append(img);
            ul.append(li);
        }
        result.append(ul);
        load.empty();

        $('.item').click(function () {
            content.empty();
            var clickedCountry = this.textContent;
            for(var country of countries) {
                if (clickedCountry === country['name']) {
                    var countryInfo = $('<ul class="countryInfo">');
                    var countryName = $(`<h1 class="countryName">${country.name}</h1>`);
                    var countryFlag = $(`<img src="${country.flag}" class="resultImg">`);
                    var countryCapital = $(`<li class="item">Capital: <span class="infoText">${country.capital}</span></li>`);
                    var countryLanguages = $(`<ul class="languages">Languages:</ul>`);
                    for(var i = 0; i < country.languages.length; i++) {
                        var language = $(`<li class="item"><span class="infoText">${country.languages[i].name}</span></li>`);
                        countryLanguages.append(language);
                    }
                    var countryRegion = $(`<li  class="item">Region: <span class="infoText">${country.region}</span></li>`);
                    var countryPopulation = $(`<li class="item">Population: <span class="infoText">${country.population}</span></li>`);
                    var currenciName = $(`<li class="item">Currency name: <span class="infoText">${country.currencies['name']}</span></li>`);
                    var currenciCode = $(`<li class="item">Currency code: <span class="infoText">${country.currencies['code']}</span></li>`);
                    var currenciSymbol = $(`<li class="item">Currency symbol: <span class="infoText">${country.currencies['symbol']}</span></li>`);
                    var countryContainer = $('<div class="countryContainer"></div>');
                    var countryFlagContainer = $('<div class="countryContainer"></div>');
                    countryInfo
                        .append(countryCapital)
                        .append(countryRegion)
                        .append(countryPopulation)
                        .append(countryLanguages)
                        .append(currenciName)
                        .append(currenciCode);
                    if(country.currencies['symbol'] !== null) {
                        countryInfo.append(currenciSymbol);
                    }

                    countryContainer.append(countryInfo);
                    countryFlagContainer.append(countryFlag);
                    content
                        .append(countryName)
                        .append(countryFlagContainer)
                        .append(countryContainer);
                }
            }
            $('#countryName').val('');
            $('#countryName').val(this.textContent);
            $('#result').empty();
        });
    };
    countryRequest.send();
});