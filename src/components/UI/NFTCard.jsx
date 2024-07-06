import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NFTCard = ({ nftItems, inSlider, authorImage, authorId }) => {
  const [time, setTime] = useState(Date.now());

  const formatTime = (expiryDate) => {
    const timeRemaining = expiryDate - time;
    const hours = Math.floor(timeRemaining / 3600000);
    const minutes = Math.floor((timeRemaining / 60000) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    if (timeRemaining <= 0) {
      return "0h 0m 0s";
    }
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
          zIndex: "50",
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
          zIndex: "50",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <>
      {inSlider ? (
        <Slider {...settings}>
          {Object.values(nftItems).map((item) => (
            <div className="pl-2 pr-2" key={item.id}>
              <div
                className={"d-inline col-lg-3 col-md-6 col-sm-6 col-xs-12"}
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={"/author/" + item.authorId}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className={item.expiryDate ? "de_countdown" : "d-none"}>
                    {formatTime(item.expiryDate)}
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="/#" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="/#" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="/#">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={"/item-details/" + item.nftId}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        style={{ maxWidth: "300px" }}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={"/item-details/" + item.nftId}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price + " ETH"}</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        Object.values(nftItems).map((item) => (
          <div
            key={item.id}
            className={"d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"}
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={item.authorId ? "/author/" + item.authorId : "/author/" + authorId}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage ? item.authorImage : authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className={item.expiryDate ? "de_countdown" : "d-none"}>
                {formatTime(item.expiryDate)}
              </div>

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="/#" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="/#" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="/#">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={"/item-details/" + item.nftId}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    style={{ maxWidth: "300px" }}
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={"/item-details/" + item.nftId}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price + " ETH"}</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default NFTCard;
