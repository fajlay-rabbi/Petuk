const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');
const auth = require('../middleware/auth');
const bodyParser = require('body-parser');
const multer = require("multer");




const js = bodyParser.json({ limit: '25mb' });
const urlencodedParser = bodyParser.urlencoded({ extended: false, limit: '25mb' })


router.get('/res', homeController.homeRes);
router.get('/item', homeController.homeItem);

router.get('/user', auth, homeController.authUser);


router.post('/sign-in', urlencodedParser, js, homeController.signIn);

// router.post('/sign-up', urlencodedParser, js, auth,  homeController.signUp);
router.post('/sign-up', urlencodedParser, js, homeController.signUp);

router.post('/forgetemail', urlencodedParser, js, homeController.forgetemail);

router.post('/checkotp', urlencodedParser, js, homeController.checkotp);

router.post('/chngpass', urlencodedParser, js, homeController.chngpass);

router.get('/logout', urlencodedParser, js, homeController.logout);

router.post('/bkashOTP', urlencodedParser, js, homeController.bkashOTP);

router.post('/placeorder', urlencodedParser, js, auth, homeController.placeorder);

router.post('/orders', urlencodedParser, js, auth, homeController.orders);

router.post('/findrest', urlencodedParser, js, homeController.findrest);

router.post('/dltOrder', urlencodedParser, js, homeController.dOrder);



//admin
router.post('/admin', urlencodedParser, js, homeController.admin);

router.post('/checkAdmin', urlencodedParser, js, homeController.checkAdmin);

router.get('/dashboardRest', urlencodedParser, js, homeController.dashboardRest);

router.get('/deleteRest', urlencodedParser, js, homeController.deleteRest);











var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./upload");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
});

var upload = multer({
    storage: imgconfig
})


router.post('/addRest', urlencodedParser, js, upload.single("photo"), homeController.addRest)

router.post('/addItem', urlencodedParser, js, upload.single("photo"), homeController.addItem);



module.exports = router;