CREATE TABLE user
(
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(500) NOT NULL,
  activationCode VARCHAR(50),
  forgetCode VARCHAR(50),
  token VARCHAR(500),
  img LONGBLOB,
  PRIMARY KEY (id)
);

CREATE TABLE user_address
(
  id INT NOT NULL AUTO_INCREMENT,
  address VARCHAR(100) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  road VARCHAR(100),
  house VARCHAR(50),
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE restaurant
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(200) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  img LONGBLOB,
  PRIMARY KEY (id)
);

CREATE TABLE item
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price VARCHAR(50) NOT NULL,
  description VARCHAR(700) NOT NULL,
  img LONGBLOB,
  rest_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rest_id) REFERENCES restaurant(id)
);

CREATE TABLE rating
(
  id INT NOT NULL AUTO_INCREMENT,
  score VARCHAR(20) NOT NULL,
  date VARCHAR(50),
  rest_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rest_id) REFERENCES restaurant(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE payment
(
  id INT NOT NULL AUTO_INCREMENT,
  amount VARCHAR(100) NOT NULL,
  paid_by VARCHAR(20) NOT NULL,
  date VARCHAR(50),
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE admin
(
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(500) NOT NULL,
  forget_code VARCHAR(50),
  login_code VARCHAR(50),
  img LONGBLOB
);

CREATE TABLE promo_code
(
  id INT NOT NULL AUTO_INCREMENT,
  code VARCHAR(20) NOT NULL,
  amount INT NOT NULL,
  rest_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rest_id) REFERENCES restaurant(id)
);

CREATE TABLE orders
(
  id INT NOT NULL AUTO_INCREMENT,
  date VARCHAR(50) NOT NULL,
  tot_amount VARCHAR(100) NOT NULL,
  status VARCHAR(30) NOT NULL,
  qty VARCHAR(100) NOT NULL,
  address VARCHAR(200) NOT NULL,
  payment_id INT NOT NULL,
  user_id INT NOT NULL,
  rest_id INT NOT NULL,
  item_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (payment_id) REFERENCES payment(id),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (rest_id) REFERENCES restaurant(id),
  FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE rider
(
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50) NOT NULL,
  address VARCHAR(200) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(500) NOT NULL,
  id INT NOT NULL AUTO_INCREMENT,
  NID LONGBLOB,
  forget_code VARCHAR(50),
  activation_code VARCHAR(50),
  approve VARCHAR(20),
  salary VARCHAR(50),
  del_order VARCHAR(50),
  rating VARCHAR(10),
  img LONGBLOB,
  order_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE rider_rating
(
  id INT NOT NULL LONGBLOB,,
  score VARCHAR(20) NOT NULL,
  rider_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rider_id) REFERENCES rider(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);