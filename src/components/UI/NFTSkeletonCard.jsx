import React from "react";
import { Link } from "react-router-dom";

const NFTSkeletonCard = ({ numOfCards }) => {
  return (
    <>
      {new Array(numOfCards).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
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
            <div className="nft__item_info">
              <Link to="/item-details/">
                <div
                  className="skeleton-box"
                  style={{ width: "100px", height: "20px" }}
                ></div>
              </Link>
              <div className="nft__item_price">
                <div
                  className="skeleton-box"
                  style={{ width: "50px", height: "20px" }}
                ></div>
              </div>
              <div className="nft__item_like">
                <span>
                  <div
                    className="skeleton-box"
                    style={{ width: "20px", height: "20px" }}
                  ></div>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NFTSkeletonCard;
