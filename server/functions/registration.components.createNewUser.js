const currentDatabaseInUse = require("../databases/settings/database.currentdatabase");
const { userCreationHelpers } = require("./registration.helpers");
const generate_token = require("../config/token");
const cloudinary = require("cloudinary").v2;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const currentCacheEngine = require("./cache.connection");

const createAndReturnNewUser = async (image, name, email, password, token) => {
    const currentDatabase = await currentDatabaseInUse()
    const cacheEngine = (await currentCacheEngine()).client

    const uploadedImage = await cloudinary.uploader
        .upload(image, userCreationHelpers.userProfilePictureSettings, userCreationHelpers.returnImage)
        
        .then(async (uploadedImage) => {
            console.log(currentDatabase, '<--- current database');
            const user = await currentDatabase.createNewUser(name, email, password, uploadedImage);
        }
    );
    const newUserCreated = await currentDatabase.getUser(email);

    async function passwordMatch(enteredPassword) {
        console.log(newUserCreated.password, '1');
        console.log(enteredPassword, '2')
        const encryptPassword = cryptr.encrypt(newUserCreated.password);
        newUserCreated.password = encryptPassword
        console.log(newUserCreated.password, '3');
        console.log(encryptPassword, '4');
        return encryptPassword
    }

    const safePassword = passwordMatch()
    cacheEngine.set(email, JSON.stringify(newUserCreated))

    return {
        newUser: newUserCreated,
        token: generate_token(newUserCreated._id),
        passwordMatch: safePassword,
        registrationSucceded: userCreationHelpers.registrationSucceded,
        registrationFailed: userCreationHelpers.registrationFailed,
    };
};

module.exports = createAndReturnNewUser


