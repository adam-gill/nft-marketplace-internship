import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import NFTSkeletonCard from "../UI/NFTSkeletonCard";
import NFTCard from "../UI/NFTCard";
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewItems = () => {
  AOS.init();
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

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-in" data-aos-duration="1500">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="1000">
          {loading ? (
            <NFTSkeletonCard numOfCards={4} />
          ) : (
              <NFTCard nftItems={newItems} inSlider={true} />
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
