#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather, getIcon} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("You don't add token!")
       return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token saved');
    } catch (err) {
        printError(err.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError("You don't add city!")
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved');
    } catch (err) {
        printError(err.message);
    }
};

const getForecast = async () => {
    try {
        const city = await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if(e?.response?.status === 404) {
           printError('The city name is incorrect');
        } else if(e?.response?.status === 401) {
            printError('The token is incorrect');
        } else {
            printError(e.message);
        }
    }
};

const initCLI = () => {
    const args = getArgs(process.argv);
    // console.log(args);

    if(args.h) {
        //вивід хелп
        return printHelp()
    }
    if(args.s) {
        //зберегти місто
        return saveCity(args.s);
    }
    if(args.t) {
        //зберегти токен
        return saveToken(args.t);
    }

    return getForecast();
};

initCLI();
