import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import NFTSkeletonCard from "../components/UI/NFTSkeletonCard";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState();
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    async function getAuthor() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthor(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    }

    getAuthor();
  }, [id]);

  const follow = () => {
    setFollowing(!following);
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const copyToClipboard = async () => {
    try {
      navigator.clipboard.writeText(author.address);
      const button = document.getElementById("btn_copy");
      button.innerHTML = "Copied!";
      await delay(1000);
      button.innerHTML = "Copy";
    } catch (error) {
      console.log("Error copying to clipboard.");
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <i className="fa fa-check"></i>

                        <div className="profile_name">
                          <h4>
                            <div
                              className="skeleton-box"
                              style={{
                                width: "140px",
                                height: "32px",
                                borderRadius: "8px",
                              }}
                            ></div>
                            <span className="profile_username">
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "90px",
                                  height: "24px",
                                  borderRadius: "8px",
                                }}
                              ></div>
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "200px",
                                  height: "24px",
                                  borderRadius: "8px",
                                }}
                              ></div>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <div
                            className="skeleton-box skeleton-box__author"
                            style={{
                              display: "flex",
                              width: "200px",
                              height: "24px",
                              borderRadius: "8px",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          ></div>
                        </div>
                        <div
                          className="skeleton-box skeleton-box__author"
                          style={{
                            width: "124px",
                            height: "48px",
                            borderRadius: "8px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button
                              disabled={loading}
                              id="btn_copy"
                              title="Copy Text"
                              onClick={() => copyToClipboard()}
                            >
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {following
                            ? author.followers + 1 + " followers"
                            : author.followers + " followers"}
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={() => follow()}
                        >
                          {following ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div
                  className={
                    loading ? "authorLoadingState" : "de_tab tab_simple"
                  }
                >
                  {loading ? (
                    <NFTSkeletonCard numOfCards={8} />
                  ) : (
                    <AuthorItems
                      cards={author.nftCollection}
                      authorImage={author.authorImage}
                      authorId={id}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
