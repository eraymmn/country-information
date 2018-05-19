<?php
    $countries = file_get_contents('https://restcountries.eu/rest/v2/all');
    $countries = json_decode($countries, true);

    if(isset($_GET["search"])){
        $search = htmlentities($_GET["search"]);
        $result = [];
        $idx = 0;
        $found = false;
        foreach ($countries as $country){
            if(strstr(strtolower($country["name"]), strtolower($search))){
                $result[] = [
                    "name"=>$country["name"],
                    "flag" => $country['flag'],
                    "capital" => $country['capital'],
                    "region" => $country['region'],
                    "population" => $country['population'],
                    "languages" => $country['languages'],
                    "currencies" => [
                        'code' => $country['currencies'][0]["code"],
                        'name' => $country['currencies'][0]["name"],
                        'symbol' => $country['currencies'][0]["symbol"],
                    ],
                ];
                $found = true;
                $idx++;
            }
            if($idx == 5){
                break;
            }
        }
        if(!$found){
            echo "Country not found";
        }
        else{
            echo json_encode($result);
        }
    }