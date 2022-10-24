let newUser;

const getUser = (email) => {
    if (email === newUser.email) {return newUser}
    else {return "newUser not found"}
}

const createNewUser = (name, email, password, uploadedImage) => {
    newUser = {name : name, email : email, password : password, uploadedImage : uploadedImage }
    return newUser
}

module.exports = {
    getUser,
    createNewUser
}