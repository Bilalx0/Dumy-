import React, { useState, useEffect } from "react";
import magzizeimg from "../assests/The Magazine Collecton Placholder.jpeg";
import mockupimg from "../assests/Mockup.png";
import { ClickAwayListener } from "@mui/material";
import arrowimg from "../assests/Arrow.svg";
import carThumbnail1 from "../assests/WhatsApp Image 2025-01-08 at 01.27.10 (1).jpeg";
import carThumbnail2 from "../assests/Golf Community.jpg";
import carThumbnail3 from "../assests/The Magazine Collecton Placholder.jpeg";
import carThumbnail4 from "../assests/Waterfront Living.jpeg";

const MagazineCollection = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPopup(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const dummyArticles = [
    {
      title:
        "A Look at the Most Existinig Racing Cars at the RM Sotheby's Monterey Auction",
      category: "LIFESTYLE",
      image: carThumbnail1,
      description:
        "Discover some of the most remarkable cars featured in the Tegernsee Auction...",
    },
    {
      title: "RM Sotheby’s Inaugural Dubai Auction",
      category: "LIFESTYLE",
      image: carThumbnail2,
      description:
        "Explore the highlights of the inaugural Dubai Auction hosted by RM Sotheby’s...",
    },
    {
      title:
        "In Search of 'Gold and Treasures: 3000 Years of Chinese Ornaments'",
      category: "LIFESTYLE",
      image: carThumbnail3,
      description:
        "A deep dive into the world of Chinese ornaments spanning 3000 years of history...",
    },
    {
      title: "Dubai’s Branded Residences",
      category: "LIFESTYLE",
      image: carThumbnail4,
      description:
        "Luxury living redefined in Dubai with branded residences offering unmatched opulence...",
    },
  ];
  const dummySelectedArticle = {
    title:
      "A Look at the Most Exciting Racing Cars at the RM Sotheby’s Monterey Auction",
    category: "LIFESTYLE",
    image: carThumbnail4,
    description:
      "One of the most enduring partnerships in the automotive world returns to California’s picturesque Monterey Peninsula for the 27th year. Monterey Car Week and RM...",
  };

  const [selectedArticle, setSelectedArticle] = useState(dummySelectedArticle);

  const [magazine, setMagazine] = useState(null);
  useEffect(() => {
    fetch("https://mansion-back-production.up.railway.app/magazines")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA", data);

        if (data.length > 0) {
          setMagazine(data[0]);
        }
      })
      .catch((error) => console.error("Error fetching magazine:", error));
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white py-8 px-4  md:px-8 lg:px-16  ">
        {/* Header Section */}
        <div className="text-start">
          <h2 className="text-lg md:text-3xl text-center md:text-left font-playfair text-[#00603A] mt-8 mb-16">
            The Magazine Collection
          </h2>
        </div>

        {/* Main Content Section */}
        <div className="mt-8 grid grid-cols-1 gap-0 p-0 ">
          <div className="relative">
            <img
              src={
                magazine && magazine.mainImage ? magazine.mainImage : magzizeimg
              }
              alt="Magazine"
              className="w-full h-4/6 "
            />
            <div className="absolute h-4/6 inset-0 bg-gradient-to-t from-black/55 to-transparent flex flex-col justify-end items-start text-white p-4 md:p-12 ">
              <h3 className="text-xl md:text-3xl font-playfair  ">
                {magazine
                  ? magazine.title
                  : "Former Charles Schwab CEO to Sell California 'Dream House' at Auction"}
              </h3>
              <p className="mt-0 md:mt-4  text-sm md:text-base font-inter mb-0 md:mb-8 w-3xl">
                {magazine
                  ? magazine.body
                  : "The 18-acre wine country property in Santa Barbara will have a $15.25 million reserve price."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6  -mt-12  md:-mt-64">
            {dummyArticles.map((article, idx) => (
              <div
                key={idx}
                className="flex flex-col cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <img
                  src={article.mainImage || article.image || ""}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <div className="mt-4">
                  <span className="text-sm text-gray-500 uppercase font-inter">
                    {article.category}
                  </span>
                  <p className="text-base   font-playfair  mt-2 min-h-24">
                    {article.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between space-x-0 mt-0 md:mt-8 md:space-x-6   space-y-12   md:space-y-0">
            <p className="text-gray-600  font-inter text-center md:text-left max-w-2xl">
              Explore expert articles, market insights, and lifestyle features
              that showcase the latest in luxury properties and valuable assets.
              Check out our journal for exclusive updates, tips, and intriguing
              stories that celebrate the world of high-end real estate in Dubai
              and beyond.
            </p>

            <button className=" z-0 font-inter mr-0 md:mr-20 font-inter px-20 py-3 text-black  border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300">
              Read journals
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen  px-4 py-12  mt-8   md:px-8 lg:px-8 border-t   border-[#00603A]">
        <div className=" p-6 ">
          <div className="text-center flex-1 p-4 md:p-6 flex flex-col justify-center items-center">
            <h2 className="text-xl md:text-3xl  mb-8">
              <span className="text-[#00603A] font-playfair">
                The Spotlight On Iconic Estate
              </span>{" "}
              <span className="text-[#000000] font-inter font-thin pr-4">
                |
              </span>
              <span className="text-black font-inter tracking-[8px]">2025</span>
              <span className="text-[#000000] font-inter font-thin">
                {" "}
                EDITION
              </span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="w-[250px] md:w-[740px] md:h-[320px] lg:h-[420px]  font-inter  flex flex-col items-center  pl-0 lg:pl-32  justify-center space-y-4 ">
              <h3 className="text-xl md:text-3xl  text-gray-700  leading-[2] text-center  tracking-[2px]">
                SPOT LIGHTS ON
              </h3>
              <p className="text-gray-600 text-[12px] md:text-base mt-2 leading-[2] tracking-[1px] text-center ">
                LUXURY LIVING | EXPERT INTERVIEW <br /> TRAVEL TO LUXURY
              </p>
              <a href="/signupsection">
                <button className="w-[100%] mt-6  p-2  md-px:0 px-4 text-base leading-[0] tracking-[0px] md:leading-[2] md:tracking-[4px] font-inter px-0 md:px-20 py-4 text-[#00603A]  border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300">
                  SIGN UP FOR YOUR COPY
                </button>
              </a>
            </div>
            <div className="min-w-[320px] md:w-[740px] px-6  h-[300px] mt-4 md:mt-0  md:p-16 md:p-0 flex justify-center items-center">
              <img src={mockupimg} alt="Book Cover" className="  md:w-full " />
            </div>
          </div>
        </div>

        <div className="bg-[#f5f5f5] py-12 px-4 md:px-8 lg:px-16 mx-2 mt-0 md:mt-8 ">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl md:text-3xl  font-playfair text-[#00603A] mb-16">
              Read the opinions shared by our clients
            </h2>
            <p className="text-gray-700 text-lg  leading-relaxed mb-16">
              The Mansion Market has tremendous potential for attracting a
              diverse and qualified clientele. We chose to engage with The
              Mansion Market, which is now one of our leading partners in the
              luxury industry.
            </p>
            <p className="mt-4 text-gray-900  text-sm md:text-base">
              - Angel Cherry, Nordstern International Realty
            </p>

            <div className="flex justify-center items-center mt-6">
              {/* Button to Open Popup */}
              <button className="text-gray-700 hover:text-gray-900 text-xl mt-4">
                <img src={arrowimg} className="w-8" alt="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MagazineCollection;
