import { homedir } from 'os';
// import { join, basename, dirname, extname, relative, isAbsolute, resolve, sep } from 'path';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');
const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
};

const saveKeyValue = async (key, value) => {
    //говорить що треба зробити щоб прийти з першого аргумента до другого,
    //вказує відносний шлях від першого аргумента до другого
    //.. означає зробити 1 крок назад
    // console.log(relative(filePath, dirname(filePath)));

    let data = {};
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }
    data[key] = value;

    await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);

        return data[key];
    }

    return undefined
}

const isExist = async (path) => {
    try {
        //promises.stat() повертає статиститку про файл
        //якщо файла зовсім немає то й статистики не буде - тому можна
        //використовувати для перевірки наявності файла
      await promises.stat(path);

      return true;
    } catch (e) {
        return false;
    }
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
