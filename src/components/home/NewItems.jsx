import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Slider from "react-slick";
import { get } from "firebase/database";

const NewItems = () => {
  const [newItems, setNewItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [likedItems, setLikedItems] = useState([]);
  const [time, setTime] = useState(Date.now());

  async function getNewItems() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    getNewItems();
  }, []);

  useEffect(() => {
    console.log(newItems);
  }, [newItems]);

  let settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function like(id) {
    id -= 1;
    if (likedItems.includes(id)) {
      return;
    } else {
      const updateItems = [...newItems];

      updateItems[id] = {
        ...updateItems[id],
        likes: newItems[id].likes + 1,
      };
      setLikedItems([...likedItems, id]);
      setNewItems(updateItems);

      for (let i = 0; i < likedItems.length; i++) {
        const heart = document.getElementById("heart" + likedItems[i])
        if (heart) heart.style.color = "#f08080"
      }
    }
  }

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          filter: "invert()",
          transform: "scale(1.4)",
          right: "-5px",
        }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          filter: "invert()",
          transform: "scale(1.4)",
          left: "-5px",
        }}
        onClick={onClick}
      />
    );
  }

  const formatTime = (expiryDate) => {
    const timeRemaining = expiryDate - time
    const hours = Math.floor(timeRemaining / 3600000)
    const minutes = Math.floor((timeRemaining / 60000) % 60)
    const seconds = Math.floor((timeRemaining / 1000) % 60)

    if (timeRemaining <= 0) {
      return "0h 0m 0s"
    }
    return `${hours}h ${minutes}m ${seconds}s`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <Slider {...settings}>
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-12 col-md-12 col-sm-10 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div
                      className="skeleton-box"
                      style={{
                        position: "absolute",
                        width: "110px",
                        height: "32px",
                        borderRadius: "30px",
                        right: "25px",
                      }}
                    ></div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "100%",
                            height: "200px",
                            borderRadius: "8px",
                          }}
                        ></div>
                      </Link>
                    </div>

                    <div
                      className="nft_coll_info"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Link to="/explore">
                        <div
                          className="skeleton-box"
                          style={{ width: "100px", height: "20px" }}
                        ></div>
                      </Link>
                      <span>
                        {" "}
                        <div className="d-flex justify-content-between">
                          <div
                            className="skeleton-box"
                            style={{ width: "60px", height: "20px" }}
                          ></div>
                          <div
                            className="skeleton-box"
                            style={{ width: "30px", height: "20px" }}
                          ></div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {Object.values(newItems).map((item) => (
                <div className="pl-2 pr-2" key={item.id}>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 d-inline">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.authorName}`}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div
                        className={item.expiryDate ? "de_countdown" : "d-none"}
                      >
                        {formatTime(item.expiryDate)}
                      </div>

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to="/item-details">
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>Pinky Ocean</h4>
                        </Link>
                        <div className="nft__item_price">
                          {item.price + " ETH"}
                        </div>
                        <div
                          className="nft__item_like"
                          onClick={() => like(item.id)}
                        >
                          <i id={`heart${item.id}`} className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}

        </div>
      </div>
    </section>
  );
};

export default NewItems;
