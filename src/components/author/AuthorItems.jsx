import React from "react";
import NFTCard from "../UI/NFTCard";

const AuthorItems = ({ cards, authorImage, authorId }) => {


  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          <NFTCard nftItems={cards} authorImage={authorImage} authorId={authorId} /> 
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
