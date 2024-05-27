const db = require('../database/db');


const resData = "SELECT * FROM restaurant";
const itemData = "SELECT * FROM item";
const userSQL = "SELECT id, firstName, lastName, email, img FROM user WHERE email = ?"

const paySQL = "INSERT INTO payment (amount, paid_by, date, user_id) VALUES (?,?,?,?)"

const addSQL = "INSERT INTO user_address (address, phoneNumber, user_id) VALUES (?,?,?)"

const addRestSQL = "INSERT INTO restaurant (name, address, email, phone, img) VALUES (?,?,?,?,?)"

const addItemSQL = "INSERT INTO item (name, price, description, category, img, rest_id) VALUES (?,?,?,?,?,?)"

const orderSQL = "INSERT INTO orders (date, tot_amount, status, qty, address, payment_id, user_id, rest_id, item_id) values (?,?,?,?,?,?,?,?,?)"

exports.fetchHomeRes = () =>{
    const rest = db.query(resData);
    return rest;
}

exports.fetchHomeItem = () =>{
    const items = db.query(itemData);
    return items;
}

exports.authUser = (email) => {
    const user = db.query(userSQL, [email]);
    return user;
};


exports.payOrder = (amount, paid_by, date, user_id) => {
    const payOrder = db.query(paySQL, [amount, paid_by, date, user_id]);
    return payOrder;
}

exports.placeOrder = (date, amount, status, qty, address, payment_id, user_id, rest_id, item_id) => {
    const payOrder = db.query(orderSQL, [date, amount, status, qty, address, payment_id, user_id, rest_id, item_id]);
    return payOrder;
}

exports.findRestID = (id) => {
    const rest = db.query("SELECT * FROM restaurant JOIN item WHERE restaurant.id = item.rest_id AND item.id = ?",[id]);
    return rest;
};

exports.insertAdd = (address, phone, user_id) => {
    const userAdd = db.query(addSQL, [address, phone, user_id]);
    return userAdd;
}


exports.getOrder = (id) => {
    const userAdd = db.query("SELECT * from orders WHERE user_id = ?", [id]);
    return userAdd;
}


exports.getOneItem = (id) => {
    const userAdd = db.query("SELECT * from item WHERE item.id = ?", [id]);
    return userAdd;
}

exports.dltOneOrder = (id) => {
    const userAdd = db.query("DELETE FROM orders WHERE id = ?", [id]);
    return userAdd;
}

exports.deleteRest = (id) => {
    
}






exports.addRest = (name, address, email, phone, img) =>{
    const userAdd = db.query(addRestSQL, [name, address, email, phone, img]);
    return userAdd;
}


exports.addItem = (name, price, description, category, filename, rest_id) =>{
    const userAdd = db.query(addItemSQL, [name, price, description, category, filename, rest_id]);
    return userAdd;
}

