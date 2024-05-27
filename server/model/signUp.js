const db = require('../database/db');

module.exports = class signUp {
    constructor(fname, lname, email, password, activationCode, forgetCode, token, img) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.activationCode = activationCode;
        this.forgetCode = forgetCode;
        this.token = token;
        this.img = img;
    }

    createUser() {
        return db.execute("INSERT INTO user (firstName, lastName, email, password, activationCode, forgetCode, token, img) VALUES (?,?,?,?,?,?,?,?)",
            [this.fname, this.lname, this.email, this.password, this.activationCode, this.forgetCode, this.token, this.img]);
    }
}