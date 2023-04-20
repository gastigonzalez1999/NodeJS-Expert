const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {
        const { file } = files;

        const fixedName = file.name.split('.');

        const extension = fixedName[fixedName.length - 1];

        if (!validExtensions.includes(extension)) {
           return reject( `The extension ${extension} is not valid`);
        }

        const tempName = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname + '../uploads/', folder, tempName);

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {

            if (err) {
                reject(err);
            }

            resolve(uploadPath);
        });
    });
};

module.exports = {
    uploadFile,
}