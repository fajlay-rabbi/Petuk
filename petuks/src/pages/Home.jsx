import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import "./active.css";
import Nav from "../components/Nav";
import Hcard from "../UI/Hcard";
import FoodItem from "../components/FoodItem";
import Res from "../components/Res";
import axios from "axios";
import Cart from "../components/Cart";

function Home() {
  const [res, setRes] = useState([]);
  const [item, setItem] = useState([]);

  const [userInfo, setUserInfo] = useState([]);
  const [bufImg, setBufImg] = useState("");

  const [cartClick, setCartClick] = useState(false);

  const [IsDishActive, setDishActive] = useState(true);
  const [IsFastfoodActive, setFastfoodActive] = useState(false);
  const [IsDessertActive, setDessertActive] = useState(false);
  const [IsChineseActive, setChineseActive] = useState(false);
  const [IsThaiActive, setThaiActive] = useState(false);
  const [showItem, setShowItem] = useState("Dishes");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/res", { withCredentials: true })
      .then((res) => {
        setRes(res.data[0]);
      });
    
    

    axios
      .get("http://localhost:4000/item", { withCredentials: true })
      .then((res) => {
        setItem(res.data[0]);
      });

    // const getData = async () => {
    //   let options = {
    //     method: 'GET',
    //     url: 'http://localhost:4000/user',
    //     responseType: 'json',
    //     charset: 'utf-8',
    //     responseEncodig: 'utf-8',
    //     withCredentials: true
    //   };

    //   const response = await axios.request(options);
    //   return response;
    // };

    // const setuserIn = async () => {
    //   const data = await getData();

    //   console.log(data.data);
    //   setUserInfo(data.data)
    //   setBufImg(data.data.img.data)
    //   // console.log(data.data.img.data);
    // }
    // setuserIn();

    // axios.get('http://localhost:4000/user',
    //   { withCredentials: true }).then((res) => {
    //     setUserInfo(res.data);
    //   });
  }, []);

  const cartClickHandler = () => {
    setCartClick(!cartClick);
  };

  //menu click handler
  const dishHandler = () => {
    setShowItem("Dishes");
    setDishActive(true);
    setFastfoodActive(false);
    setDessertActive(false);
    setChineseActive(false);
    setThaiActive(false);
  };

  const fastHandler = () => {
    setShowItem("Fast Food");
    setDishActive(false);
    setFastfoodActive(true);
    setDessertActive(false);
    setChineseActive(false);
    setThaiActive(false);
  };
  const dessertHandler = () => {
    setShowItem("Dessert");
    setDishActive(false);
    setFastfoodActive(false);
    setDessertActive(true);
    setChineseActive(false);
    setThaiActive(false);
  };
  const chineseHandler = () => {
    setShowItem("Chinese");
    setDishActive(false);
    setFastfoodActive(false);
    setDessertActive(false);
    setChineseActive(true);
    setThaiActive(false);
  };
  const thaiHandler = () => {
    setShowItem("Thai");
    setDishActive(false);
    setFastfoodActive(false);
    setDessertActive(false);
    setChineseActive(false);
    setThaiActive(true);
  };

  const searchHandler = (e) => {
    const str = e.target.value;
    setSearch(str);
  };

  return (
    <>
      <div className={styles.container}>
        <Nav crossHandler={cartClickHandler} />

        {cartClick && (
          <div>
            <div className={styles.backdrop} onClick={cartClickHandler}></div>
            <div className={styles.modal}>
              <Cart crossHandler={cartClickHandler} />
            </div>
          </div>
        )}

        <div className={styles.heroWrapper}>
          <div className={styles.herotxt}>
            <p>
              Order Tasty & <br /> Fresh Food <br /> <span> anytime!</span>
            </p>
            <div className={styles.herobtn}>
              <a href="#menu">See menu</a>{" "}
            </div>
          </div>
          <div className={styles.heroImg}>
            <img src="./img/herof.png" alt="" />
          </div>
        </div>
        <img className={styles.wave} src="./img/wavef.png" alt="" />
      </div>

      <div className={styles.menuSectionWrapper}>
        <div className={styles.moto}>
          <div className={styles.motoTxt}>
            <p>
              Are you <span>hungry?</span>
            </p>
          </div>

          <div className={styles.motoCardWarapper}>
            <Hcard className={styles.hcard}>
              <div className={styles.hcardWrapper}>
                <img src="./img/moto1.png" alt="" />
                <p>
                  1. Choose your <span>Food</span>
                </p>
              </div>
            </Hcard>

            <Hcard className={styles.hcard}>
              <div className={styles.hcardWrapper}>
                <img src="./img/moto2f.png" alt="" />
                <p>
                  2. Make your <span>payment</span>
                </p>
              </div>
            </Hcard>

            <Hcard className={styles.hcard}>
              <div className={styles.hcardWrapper}>
                <img src="./img/moto3.png" alt="" />
                <p>
                  3. Receive your <span>meal</span>
                </p>
              </div>
            </Hcard>
          </div>

          {/* our menu section */}

          <div className={styles.ourMenuWrapper}>
            <p id="menu">
              Our <span>Menus</span>
            </p>
            <div className={styles.menudiv}>
              <div onClick={dishHandler}>
                <Hcard
                  className={`${styles.scard} ${
                    IsDishActive ? "scardActive" : ""
                  }`}
                >
                  <div className={styles.menuimg}>
                    <img src="./img/allfood.png" alt="" />
                  </div>
                  <p>Dishes</p>
                </Hcard>
              </div>

              <div onClick={fastHandler}>
                <Hcard
                  className={`${styles.scard} ${
                    IsFastfoodActive ? "scardActive" : ""
                  }`}
                >
                  <div className={styles.menuimg}>
                    <img src="./img/fast.png" alt="" />
                  </div>
                  <p>Fast food</p>
                </Hcard>
              </div>

              <div onClick={dessertHandler}>
                <Hcard
                  className={`${styles.scard} ${
                    IsDessertActive ? "scardActive" : ""
                  }`}
                >
                  <div className={styles.menuimg}>
                    <img src="./img/dessert.png" alt="" />
                  </div>
                  <p>Dessert</p>
                </Hcard>
              </div>

              <div onClick={chineseHandler}>
                <Hcard
                  className={`${styles.scard} ${
                    IsChineseActive ? "scardActive" : ""
                  }`}
                >
                  <div className={styles.menuimg}>
                    <img src="./img/chinese.png" alt="" />
                  </div>
                  <p>Chinese Food</p>
                </Hcard>
              </div>

              <div onClick={thaiHandler}>
                <Hcard
                  className={`${styles.scard} ${
                    IsThaiActive ? "scardActive" : ""
                  }`}
                >
                  <div className={styles.menuimg}>
                    <img src="./img/thai.png" alt="" />
                  </div>
                  <p>Thai Food</p>
                </Hcard>
              </div>
            </div>
          </div>

          <div className={styles.searchWrapper}>
            <div className={styles.sWrapper}>
              <p>
                Find your desire <span>food</span>
              </p>
              <input
                type="search"
                name="search"
                id=""
                onChange={searchHandler}
              />
            </div>

            <div className={styles.foodSec}>
              <p>
                Best <span>{showItem}</span> for you
              </p>
              <div className={styles.foodItemGrid}>
                {/* 
                {item.filter((data) => {
                  return (showItem == '' ? item : item.category.includes(showItem));
                }).map((d) => {
                  return (
                    <FoodItem data={d} key={d.id} />
                  )
                })} */}

                {/* {item.map(d => <FoodItem data={d} key={d.id} />)} */}

                {search === ""
                  ? item
                      .filter((d) => {
                        return (
                          showItem.toLowerCase() === d.category.toLowerCase()
                        );
                      })
                      .map((d) => {
                        return <FoodItem data={d} key={d.id} />;
                      })
                  : item
                      .filter((data) => {
                        return data.name.includes(search);
                      })
                      .map((d) => {
                        return <FoodItem data={d} key={d.id} />;
                      })}
              </div>
            </div>

            <div className={styles.bannerContainer}>
              <img src="./img/banner.png" alt="" />
            </div>

            <div className={styles.foodSec}>
              <p className={styles.restxt}>
                Best <span>Restaurants</span> for you
              </p>
              <div className={styles.resItemGrid}>
                {/* {res.map(d => <Res data={d}  key={d.id} />)} */}
                {res.map((d) => (
                  <Res data={[d, item]} key={d.id} />
                ))}
              </div>
            </div>

            <footer>
              <div className={styles.footerwrapper}>
                <img src="./img/logo.png" alt="" />
                <p>@2022 All rights receives</p>
                <div className={styles.footerfb}>
                  <p>Follow us: </p>
                  <a
                    href="https://www.facebook.com/shekh.shovon.3/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="./img/fb.png" alt="" />
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
