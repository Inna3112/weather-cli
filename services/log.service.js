import chalk from 'chalk';
import dedent from 'dedent-js';

// dedent для того щоб прибрати відступ під час виводу зліва

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        without parameters - output weather
        -s [CITY] set a city
        -h output help
        -t [API_KEY] save token
        `
    )
};

const printWeather = (response, icon) => {
    console.log(
        dedent`${chalk.bgYellow(' WEATHER ')} Weather in city ${response.name}
        ${icon} ${response.weather[0].description}
        temperature: ${response.main.temp} (feels like ${response.main.feels_like})
        Humidity: ${response.main.humidity}%
        Wind: ${response.wind.speed}
        `
    )
};

export { printError, printSuccess, printHelp, printWeather };
