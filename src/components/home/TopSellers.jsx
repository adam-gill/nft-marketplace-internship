import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

const TopSellers = () => {
  AOS.init();
  const [topSellers, setTopSellers] = useState({});
  const [loading, setLoading] = useState(true);

  async function getTopSellers() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setTopSellers(data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    getTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-in" data-aos-duration="1500">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">

          

            {loading ? (<ol className="author_list">
              {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
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
                  <div className="author_list_info">
                    <div className="d-flex flex-column">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "80px",
                          height: "20px",
                          borderRadius: "8px",
                          marginBottom: "4px",
                          marginTop: "4px",
                        }}
                      ></div>
                      <div
                        className="skeleton-box"
                        style={{
                          width: "40px",
                          height: "20px",
                          borderRadius: "8px",
                        }}
                      ></div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>) : (<ol className="author_list" data-aos="fade-up" data-aos-duration="1500">
              {Object.values(topSellers).map((item) => (
                <li key={item.id}>
                  <div className="author_list_pp">
                    <Link to={"/author/" + item.authorId}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={"/author/" + item.authorId}>{item.authorName}</Link>
                    <span>{item.price + " ETH"}</span>
                  </div>
                </li>
              ))}
            </ol>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
