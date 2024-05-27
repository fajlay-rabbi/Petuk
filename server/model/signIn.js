const db = require('../database/db');

module.exports = class signIn {

    constructor(email) {
        this.email = email;
    }

    userDetails() {
        return db.execute("SELECT * FROM user WHERE user.email = ?",
            [this.email]);
    }

    adminDetails() {
        return db.execute("SELECT * FROM admin WHERE admin.email = ?",
            [this.email]);
    }

    findEmail() {
        return db.execute("SELECT email FROM user WHERE user.email = ?", [this.email]);
    }

    saveOTP(otp) {
        return db.execute("UPDATE user SET forgetCode = ? WHERE user.email = ?", [otp, this.email]);
    }

    chngPass(password) {
        return db.execute("UPDATE user SET password = ? WHERE user.email = ?", [password, this.email]);
    }

    saveOTPAdmin(otp) {
        return db.execute("UPDATE admin SET login_code = ? WHERE admin.email = ?", [otp, this.email]);
    }
}

