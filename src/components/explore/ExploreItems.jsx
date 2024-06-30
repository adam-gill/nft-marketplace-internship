import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import NFTCardSkeleton from "../UI/NFTSkeletonCard";
import NFTCard from "../UI/NFTCard";

const ExploreItems = () => {
  const [loading, setLoading] = useState(false);
  const [exploreItems, setExploreItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(8);


  async function getExploreItems(filter) {
    setLoading(true);
    try {
      if (filter) {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        );
        setExploreItems(data);
        setLoading(false);
      } else {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        setExploreItems(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    getExploreItems("");
  }, []);

  // remove like function for now, can't get react to update parent from child
  // const like = (id) => {
  //   if (likedItems && likedItems.includes(id)) {
  //     return;
  //   } else {
  //     const updateItems = [...exploreItems];

  //     updateItems[id - 1] = {
  //       ...updateItems[id - 1],
  //       likes: exploreItems[id - 1].likes + 1,
  //     };
  //     setLikedItems([...likedItems, id]);
  //     setExploreItems(updateItems);
  //   }
  // }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => getExploreItems(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <NFTCardSkeleton numOfCards={8} />
      ) : (
        <NFTCard
          nftItems={exploreItems.slice(0, itemsToShow)}
          inSlider={false}
        />
      )}

      {/* given */}

      <div className={itemsToShow >= 16 ? "d-none" : "col-md-12 text-center"}>
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={() => setItemsToShow(itemsToShow + 4)}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
