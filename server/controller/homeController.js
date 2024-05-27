const bodyParser = require('body-parser');
const hash = require('../util/hash');
const sendEmail = require('../util/sendEmail')
const sendmsg = require('../util/sendSms');
const signUp = require('../model/signUp');
const signIn = require('../model/signIn');
const fetchHData = require('../model/home');

const generateToken = require('../util/generateToken');




exports.homeRes = async (req, res, next) => {
    const fetchData = await fetchHData.fetchHomeRes();
    // console.log(JSON.stringify(fetchData));
    res.send(JSON.stringify(fetchData));
}

exports.homeItem = async (req, res, next) => {
    const fetchData = await fetchHData.fetchHomeItem();
    res.send(JSON.stringify(fetchData));
}



exports.signUp = async (req, res, next) => {

    // console.log(req.body.JSONUserData);

    const password = req.body.JSONUserData.users[0].Password;

    let hashPassw;
    await hash.hashPassword(password).then((hashpass) => {
        hashPassw = hashpass;
    });

    // console.log(hashPassw);

    const Fname = req.body.JSONUserData.users[0].Fname;
    const Lname = req.body.JSONUserData.users[0].Lname;
    const Email = req.body.JSONUserData.users[0].Email;
    const Img = req.body.JSONUserData.users[0].Img;

    const newSignUp = new signUp(Fname, Lname, Email, hashPassw, null, null, null, Img);



    try {
        const newSignIn = new signIn(Email);
        const userIsExist = await newSignIn.findEmail();
        console.log("user: " + userIsExist[0].email);
        const email = userIsExist[0];
        console.log("exist: ", email[0].email);
        res.send("exists");
    } catch (error) {
        try {
            newSignUp.createUser();
            console.log("User created");
        } catch (err) {
            console.log(err);
        }

        // // console.log("Cookie jwt: " + req.cookies.jwt);

        const jwt = generateToken.createToken(Email);
        res.cookie("jwt", jwt, {
            expires: new Date(Date.now() + 300000000),
            httpOnly: true
        });

        res.status(200).send("created");
        console.log("I am running");
    }
}


exports.signIn = async (req, res, next) => {

    console.log("running");

    const email = req.body.JSONUserData.users[0].Email;
    const userPassword = req.body.JSONUserData.users[0].Password;

    // console.log(req.body.JSONUserData.users[0].Email);


    const newSignIn = new signIn(email);


    // const userIsExist = await newSignIn.findEmail();


    // if (userIsExist[0][0].length !== 0) {

    try {
        const user = await newSignIn.userDetails();
        const hashPass = user[0][0].password;

        const Isvaild = await hash.matchPassword(userPassword, hashPass);

        if (Isvaild) {
            const jwt = generateToken.createToken(email);
            res.cookie("jwt", jwt, {
                expires: new Date(Date.now() + 300000000),
                httpOnly: true
            });
            res.status(200);
            res.send("success");
        } else {
            res.status(403);
            res.send("invalidPassword");
        }
    }
    catch (error) {
        res.status(404);
        res.send("invalidEmail")
    }
};


exports.authUser = async (req, res, next) => {
    const email = req.userEmail;
    const user = await fetchHData.authUser(email);

    // console.log(user[0][0]);

    res.contentType('json');
    res.send(user[0][0]);
};



exports.forgetemail = async (req, res) => {

    const userEmail = req.body.JSONUserData.users[0].Email;

    const newSignIn = new signIn(userEmail)

    // const userIsExist = await newSignIn.findEmail();

    var minm = 100000;
    var maxm = 999999;
    const OTP = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    const myOTP = `Your OTP: ${OTP}`;


    try {
        console.log("Sending Email...");
        const send = sendEmail.sendEmail(userEmail, myOTP);
        newSignIn.saveOTP(OTP)
        res.status(200);
        res.send("success");
    }

    catch (error) {
        res.status(404);
        res.send("invalidEmail")
    }
}


exports.checkotp = async (req, res) => {

    const otp = req.body.JSONUserData.users[0].otp;
    const email = req.body.JSONUserData.users[0].email

    const newSignIn = new signIn(email);
    const user = await newSignIn.userDetails();



    try {
        if (user[0][0].forgetCode === otp) {
            res.status(200);
            res.send("validOtp");
        } else {
            res.status(404);
            res.send("invalidOtp");
        }
    } catch (e) {
        res.status(404);
        res.send("invalidOtp");
    }
}


exports.chngpass = async (req, res) => {
    const email = req.body.JSONUserData.users[0].email
    const password = req.body.JSONUserData.users[0].password;

    let hashPassw;
    await hash.hashPassword(password).then((hashpass) => {
        hashPassw = hashpass;
    });

    const newSignIn = new signIn(email);


    try {
        await newSignIn.chngPass(hashPassw);
        const jwt = generateToken.createToken(email);
        res.cookie("jwt", jwt, {
            expires: new Date(Date.now() + 300000000),
            httpOnly: true
        });

        res.status(200);
        res.send("success");

    } catch (e) {
        res.status(404);
        res.send("unsuccessful");
    }

};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.redirect('http://localhost:3000/')
    } catch (error) {
        console.log(error);
    }
};

exports.bkashOTP = async (req, res) => {
    console.log("otp");

    var minm = 100000;
    var maxm = 999999;
    const OTP = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    const msg = `Your Bkash OTP: ${OTP}`

    sendmsg.sendMsg(msg);

    res.send({ OTP })
};


exports.placeorder = async (req, res) => {



    //for payment table update
    const userEmail = req.userEmail;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    const newSignIn = new signIn(userEmail)
    const user = await newSignIn.userDetails();
    const userId = user[0][0].id;





    const data = req.body.JSONUserData.order[0];

    try {
        const payment = await fetchHData.payOrder(data.totalAmount, data.payment, currentDate, userId);
        // console.log("INSERTED: " + JSON.stringify(payment[0].insertId));
        const paymentID = JSON.stringify(payment[0].insertId)

        const restID = await fetchHData.findRestID(data.item_id)
        // console.log(restID[0][0].id);
        const resID = restID[0][0].id;
        const restName = restID[0][0].name;

        const Insert = await fetchHData.placeOrder(date, data.totalAmount, data.status, data.qty, data.address, paymentID, userId, resID, data.item_id)

        // console.log("order DOne!!");

        const Address = await fetchHData.insertAdd(data.address, data.phone, userId);

        // console.log("Insert Address..");


        res.status(200).send("confirmed");

        try {
            const msg = `You order ${restName}, Total Amount: ${data.totalAmount}`
            const send = sendEmail.sendEmail(userEmail, msg);
            try {
                sendmsg.sendMsg(msg);
            } catch (error) {
                console.log(error);
            }

        } catch (error) {
            console.log(error);
        }

    } catch (error) {

        console.log(error);
    }
};


exports.orders = async (req, res, next) => {
    const data = req.body.JSONUserData.user[0];

    if (data.id != undefined) {
        const orders = await fetchHData.getOrder(data.id);

        res.status(200).send(orders[0]);
    }
}

exports.findrest = async (req, res, next) => {
    const data = req.body.JSONUserData.user[0];

    if (data.restId != undefined) {
        const itemOne = await fetchHData.getOneItem(data.restId);
        // console.log(itemOne[0]);
        res.status(200).send(itemOne[0]);
    }
}

exports.dOrder = async (req, res, next) => {
    console.log("Hitting");
    const data = req.body.JSONUserData.user[0];

    console.log(data);

    if (data.orderId != undefined) {
        try {
            const deleteOne = await fetchHData.dltOneOrder(data.orderId);
        } catch (error) {
            console.log(error);
        }
        res.status(200).send("success");
    }
}

exports.admin = async (req, res, next) => {
    // const data = req.body.JSONUserData.users[0];
    const email = req.body.JSONUserData.users[0].email;
    const password = req.body.JSONUserData.users[0].password;


    // let hashPassw;
    // await hash.hashPassword(password).then((hashpass) => {
    //     hashPassw = hashpass;
    // });
    // console.log(hashPassw);


    try {
        const newSignIn = new signIn(email);
        const user = await newSignIn.adminDetails()
        const hashPass = user[0][0].password;
        const Isvaild = await hash.matchPassword(password, hashPass);
        if (Isvaild) {

            var minm = 100000;
            var maxm = 999999;
            const OTP = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
            const myOTP = `${OTP} is your verification code`;

            const send = sendEmail.sendEmail(email, myOTP);
            const saveOTP = await newSignIn.saveOTPAdmin(OTP, email);
            // const jwt = generateToken.createToken(email);
            // res.cookie("jwt", jwt, {
            //     expires: new Date(Date.now() + 100000000),
            //     httpOnly: true
            // });
            console.log("Valid");
            res.status(200);
            res.send("success");

        } else {
            res.status(404);
            res.send("invalidPassword");
        }
    }
    catch (error) {
        res.status(404);
        res.send("invalidPassword")
    }
}


exports.checkAdmin = async (req, res) => {

    const otp = req.body.JSONUserData.users[0].otp;
    const email = req.body.JSONUserData.users[0].email

    console.log(otp, email);

    const newSignIn = new signIn(email);
    const user = await newSignIn.adminDetails();

    console.log(user[0][0].login_code);


    try {
        if (user[0][0].login_code === otp) {
            const jwt = generateToken.createToken(email);
            res.cookie("jwt", jwt, {
                expires: new Date(Date.now() + 100000000),
                httpOnly: true
            });
            res.status(200);
            res.send("validOtp");
        } else {
            res.status(404);
            res.send("invalidOtp");
        }
    } catch (e) {
        res.status(404);
        res.send("invalidOtp");
    }


}


exports.addRest = async (req, res) => {
    const { name, address, email, phone } = req.body;
    const { filename } = req.file;


    try {
        const addData = await fetchHData.addRest(name, address, email, phone, filename);
        console.log("successfully added data");
        res.status(201).send('Success');
    } catch (error) {
        console.log(error);
    }


};



exports.addItem = async (req, res) => {
    const {name, price, description, category, rest_id} = req.body; 
    const {filename} = req.file;

    try {
        const addData = await fetchHData.addItem(name, price, description, category, filename, rest_id);
        console.log("successfully added data");
        res.status(201).send('Success');
    } catch (error) {
        console.log(error);
    }
};


exports.dashboardRest = async (req, res) => {
    const fetchData = await fetchHData.fetchHomeRes();
    res.send(JSON.stringify(fetchData));
}


exports.deleteRest = async (req, res) => {
    const fetchData = await fetchHData.fetchHomeRes();
    res.status(200).send('success');
}