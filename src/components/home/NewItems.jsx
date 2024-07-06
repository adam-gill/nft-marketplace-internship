import React, { useState, useEffect } from "react";
import axios from "axios";
import NFTSkeletonCard from "../UI/NFTSkeletonCard";
import NFTCard from "../UI/NFTCard";
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewItems = () => {
  AOS.init();
  const [newItems, setNewItems] = useState({});
  const [loading, setLoading] = useState(true);

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
