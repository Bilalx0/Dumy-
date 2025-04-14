import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import newImage from "../assests/about.jpeg";
import carImage from "../assests/BrandedResi-P.jpg";
import carThumbnail1 from "../assests/WhatsApp Image 2025-01-08 at 01.27.10 (1).jpeg";
import carThumbnail2 from "../assests/Golf Community.jpg";
import carThumbnail3 from "../assests/The Magazine Collecton Placholder.jpeg";
import carThumbnail4 from "../assests/Waterfront Living.jpeg";
import Footer from "../components/Footer";
import logo from "../assests/TMM-LANDING PAGE 1.svg";
import { Menu, X } from "lucide-react";

const Magazine = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dummyArticles = [
    {
      type: "The Mansion Guide",
      title:
        "A Look at the Most Existinig Racing Cars at the RM Sotheby's Monterey Auction",
      date: "20 min read",
      image: carThumbnail1,
      category: "mansion",
      description:
        "Discover some of the most remarkable cars featured in the Tegernsee Auction...",
    },
    {
      type: "The Penthouse Guide",
      title: "RM Sotheby’s Inaugural Dubai Auction",
      date: "12 min read",
      category: "mansion",
      image: carThumbnail2,
      description:
        "Explore the highlights of the inaugural Dubai Auction hosted by RM Sotheby’s...",
    },
    {
      type: "THE PENTHOUSE GUIDE",
      title:
        "In Search of 'Gold and Treasures: 3000 Years of Chinese Ornaments'",
      date: "6 min read",
      image: carThumbnail3,
      category: "mansion",
      description:
        "A deep dive into the world of Chinese ornaments spanning 3000 years of history...",
    },
    {
      type: "THE PENTHOUSE GUIDE",
      title: "Dubai’s Branded Residences",
      date: "8 min read",
      category: "mansion",
      image: carThumbnail4,
      description:
        "Luxury living redefined in Dubai with branded residences offering unmatched opulence...",
    },
  ];

  const dummySelectedArticle = {
    type: "The Penthouse Guide",
    title:
      "A Look at the Most Exciting Racing Cars at the RM Sotheby’s Monterey Auction",
    date: "4 min read",
    image: carImage,
    category: "mansion",
    description:
      "One of the most enduring partnerships in the automotive world returns to California’s picturesque Monterey Peninsula for the 27th year. Monterey Car Week and RM...",
  };

  const [fetchedMagazines, setFetchedMagazines] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(dummySelectedArticle);
  const [sectionsToShow, setSectionsToShow] = useState(5);

  useEffect(() => {
    fetch("https://mansion-back-production.up.railway.app/magazines")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setFetchedMagazines(data);
          setSelectedArticle(data[0]);
        }
      })
      .catch((error) =>
        console.error("Error fetching magazines from backend:", error)
      );
  }, []);

  const articlesToDisplay =
    fetchedMagazines.length > 0 ? fetchedMagazines : dummyArticles;

  const dummyArticles2 = [
    {
      type: "The Mansion Guide",
      title:
        "A Look at the Most Exciting Racing Cars at the RM Sotheby's Monterey Auction",
      date: "20 min read",
      image: carThumbnail1,
      category: "mansion",
      description:
        "Discover some of the most remarkable cars featured in the Tegernsee Auction...",
    },
    {
      type: "The Penthouse Guide",
      title: "RM Sotheby’s Inaugural Dubai Auction",
      date: "12 min read",
      image: carThumbnail2,
      category: "mansion",
      description:
        "Explore the highlights of the inaugural Dubai Auction hosted by RM Sotheby’s...",
    },
    {
      type: "THE PENTHOUSE GUIDE",
      title:
        "In Search of 'Gold and Treasures: 3000 Years of Chinese Ornaments'",
      date: "6 min read",
      image: carThumbnail3,
      category: "mansion",
      description:
        "A deep dive into the world of Chinese ornaments spanning 3000 years of history...",
    },
    {
      type: "THE PENTHOUSE GUIDE",
      title: "Dubai’s Branded Residences",
      date: "8 min read",
      image: carThumbnail4,
      category: "mansion",
      description:
        "Luxury living redefined in Dubai with branded residences offering unmatched opulence...",
    },
    {
      type: "The Mansion Guide",
      title:
        "A Look at the Most Exciting Racing Cars at the RM Sotheby's Monterey Auction",
      date: "20 min read",
      image: carThumbnail1,
      category: "mansion",
      description:
        "Discover some of the most remarkable cars featured in the Tegernsee Auction...",
    },
    {
      type: "The Penthouse Guide",
      title: "RM Sotheby’s Inaugural Dubai Auction",
      date: "12 min read",
      image: carThumbnail2,
      category: "mansion",
      description:
        "Explore the highlights of the inaugural Dubai Auction hosted by RM Sotheby’s...",
    },
    {
      type: "THE PENTHOUSE GUIDE",
      title:
        "In Search of 'Gold and Treasures: 3000 Years of Chinese Ornaments'",
      date: "6 min read",
      image: carThumbnail3,
      category: "mansion",
      description:
        "A deep dive into the world of Chinese ornaments spanning 3000 years of history...",
    },
    {
      type: "THE PENTHOUSE GUIDE",
      title: "Dubai’s Branded Residences",
      date: "8 min read",
      image: carThumbnail4,
      category: "mansion",
      description:
        "Luxury living redefined in Dubai with branded residences offering unmatched opulence...",
    },
  ];

  const [visibleArticles, setVisibleArticles] = useState(0);

  // Function to load more articles
  const loadMore = () => {
    setVisibleArticles(() => Math.min(dummyArticles2.length)); // Load 4 more articles each time
  };

  return (
    <>
      <div className="flex flex-col items-center px-4 md:px-10 lg:px-20 py-12 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 relative">
          {/* Logo */}
          <img src={logo} className="w-[250px] md:w-[400px]" alt="logo" />

          <div className="flex gap-2 w-full md:w-auto items-center">
            {/* Search Bar */}
            <div className="flex items-center w-full md:w-[300px] border border-[#000000] overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Country, Area, District..."
                className="w-full px-4 py-2 text-[#000000] text-sm bg-[#f5f5f5] focus:outline-none"
              />
            </div>

            {/* Search Button */}
            <button className="bg-[#00603A] px-4 py-2 flex items-center justify-center border border-[#00603A] text-white hover:text-[#00603A] hover:bg-transparent transition">
              <FaSearch className="font-thin hover:text-[#00603A]" />
            </button>

            {/* Menu Icon (Visible on all screen sizes) */}
            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-6 h-6 text-[#000000]" />
              ) : (
                <Menu className="w-6 h-6 text-[#000000]" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Popup (Works on all screen sizes) */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-4/5 md:w-1/2 lg:w-1/3 flex flex-col items-start space-y-4 relative">
              {[
                { name: "Mansions", href: "/mansions" },
                { name: "Penthouses", href: "/penthouses" },
                { name: "New Developments", href: "/listingpage" },
                { name: "Magazine", href: "/magazine" },
                { name: "Luxe Collectibles", href: "/listingpage" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-inter pb-2 text-gray-800 hover:text-[#00603A] text-lg"
                >
                  {link.name}
                </a>
              ))}

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-black"
                onClick={() => setMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-wrap   flex-row   md:items-center justify-start md:justify-center text-center md:space-x-6 pt-8 py-4 md:mt-6 space-x-0  md:space-y-0">
          {[
            { name: "THE MANSION GUIDE", href: "/mansions" },
            { name: "THE PENTHOUSE GUIDE", href: "/penthouses" },
            { name: "THE LIFESTYLE GUIDE", href: "/blogpage" },
            { name: "DEVELOPMENTS", href: "#" },
            { name: "NEWSROOM", href: "#" },
          ].map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-800 hover:text-[#00603A] p-2  font-inter text-center text-sm sm:text-base"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <div className="border-b border-[#00603A] mb-8"></div>
      {Array.from({ length: sectionsToShow }).map((_, index) => (
        <section key={index} className=" px-4 py-10 md:px-10 lg:px-20">
          <h2 className="text-3xl  mb-8 text-center md:text-start font-playfair text-[#00603A]">
            {selectedArticle?.type}
          </h2>

          <div className="grid md:grid-cols-1 gap-8">
            {/* Main Article */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={selectedArticle?.mainImage || selectedArticle?.image || ""}
                alt="Main Article"
                className="w-full h-60 md:h-auto object-cover"
              />
              <div className="flex flex-col">
                {/* <span className="text-sm   uppercase mb-2 font-playfair text-[#00603A]">
                    {selectedArticle?.category}
                  </span> */}
                <div className="space-y-10">
                  <h3 className="text-2xl  font-playfair">
                    {selectedArticle?.title}
                  </h3>
                  <p className="text-gray-700 mt-2 font-inter">
                    {selectedArticle?.body || selectedArticle?.description}
                  </p>
                  <p className="text-gray-700 mt-2 font-inter">
                    {selectedArticle?.category || selectedArticle?.category}
                  </p>
                  <p className="text-sm text-gray-500 font-inter">
                    {selectedArticle?.date}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {articlesToDisplay.map((article, idx) => (
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
                    <h4 className="text-lg  mt-2 min-h-24 font-playfair">
                      {article.title}
                    </h4>
                    <p className="text-gray-700 mt-2 font-inter">
                      {article.category}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{article.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="flex justify-center mt-8">
        <div className="text-center">
          <div className="grid md:grid-cols-4 grid-cols-1 gap-6  px-4 md:px-20">
            {dummyArticles2.slice(0, visibleArticles).map((article, index) => (
              <div key={index} className=" ">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-60 object-cover"
                />
                <h3 className="text-lg  mt-2 min-h-24 font-playfair text-center md:text-start">
                  {article.title}
                </h3>
                <p className="mt-2 min-h-24 font-inter text-center md:text-start">
                  {article.description}
                </p>
                <p className="text-gray-600    font-inter text-center md:text-start">
                  {article.category}
                </p>
                <p className="text-gray-600   mt-2 min-h-24 font-playfair text-center md:text-start">
                  {article.date}
                </p>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleArticles < dummyArticles2.length && (
            <button
              onClick={loadMore}
              className="font-inter px-20 my-8 py-3 text-black  border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300"
            >
              Load More
            </button>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Magazine;
