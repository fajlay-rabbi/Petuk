const jwt = require('jsonwebtoken');

exports.createToken = (email) => {
    const token = jwt.sign({ Email: email }, "mySecretkeyIsCse347MmsuFall2022", {
        expiresIn: "2 days"
    });
    return token;
}



exports.verifyToken = (userJWT) => {
    const userIsverify = jwt.verify(userJWT, "mySecretkeyIsCse347MmsuFall2022");
    // console.log(userIsverify.Email);
    return userIsverify.Email;
}