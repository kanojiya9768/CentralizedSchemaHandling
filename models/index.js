const fs = require('fs');

const UTILITY_FOLDERS = Object.freeze([
    'plugins',
]);

const exportObject = {};

const getExports = (folderName) => {
    const files = fs.readdirSync(folderName);

    files.forEach((file) => {
        if(file === 'index.js' || UTILITY_FOLDERS.includes(file)) return;

        const stat = fs.lstatSync(`${folderName}/${file}`);
        if(stat.isDirectory()) {
            getExports(`${folderName}/${file}`);
        } else {
            const fileName = file.split('.')[0];
            exportObject[fileName] = require(`${folderName}/${file}`);
        }
    });

    return exportObject;
};

module.exports = getExports(__dirname);