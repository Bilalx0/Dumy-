import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import newImage from "../assests/about.jpeg";
import Footer from "../components/Footer";
import logo from "../assests/TMM-LANDING PAGE 1.svg";
import { Menu, X } from "lucide-react";

const BlogPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const articles = [
    {
      title: "1955 Ferrari 410 Sport Spider by Scaglietti",
      image: newImage,
      description:
        "This year’s lots include a number of vintage roadsters and competition cars that have participated in the most prestigious racing events, from F1 to Le Mans, as well as a vehicle that embodies the spirit of a racer in the body of a street car.",
    },

    {
      title: "1957 Ferrari 425 TRC Spider by Scaglietti",
      image: newImage,
      description:
        "Explore the intricate world of classic car auctions and the fascinating stories behind each car sold.",
    },
    {
      title: "2002 Ferrari F2001b Formula 1",
      image: newImage,
      description:
        "Explore the intricate world of classic car auctions and the fascinating stories behind each car sold.",
    },
    {
      title: "1967 Ferrari 275 GTB/4NART Alloy by  Scaglietti",
      image: newImage,
      description:
        "Explore the intricate world of classic car auctions and the fascinating stories behind each car sold.",
    },
    {
      title: "1954  Ferrari 500 Mondial Spider by Pinna Farina ",
      image: newImage,
      description:
        "Explore the intricate world of classic car auctions and the fascinating stories behind each car sold.",
    },
    {
      title: "1995 Ferrari F50",
      image: newImage,
      description:
        "Explore the intricate world of classic car auctions and the fascinating stories behind each car sold.",
    },
    {
      title: "1955 Porsche 550 Spider by Wendler",
      image: newImage,
      description:
        "Explore the intricate world of classic car auctions and the fascinating stories behind each car sold.",
    },
    {
      title: "2006 McLaren-Mercedes MP4-21 Formula 1",
      image: newImage,
      description:
        "Explore the intricate world of classic car auctions and the fascinating stories behind each car sold.",
    },
  ];

  const [showAll, setShowAll] = useState(false); // State to toggle visibility of all cards

  const newsData = [
    {
      image: newImage, // Replace with actual image URL
      category: "LIFESTYLE",
      title: "RM Sotheby's The Tegernsee Auction – Cars to Watch Out For",
      date: "February 14th, 2024",
      readTime: "4 min read",
    },
    {
      image: newImage,
      category: "LIFESTYLE",
      title: "RM Sotheby's Inaugural Dubai Auction",
      date: "February 14th, 2024",
      readTime: "7 min read",
    },
    {
      image: newImage,
      category: "LIFESTYLE",
      title:
        "In Search of “Gold and Treasures: 3000 Years of Chinese Ornaments”",
      date: "February 14th, 2024",
      readTime: "5 min read",
    },
    {
      image: newImage,
      category: "LIFESTYLE",
      title: "Dubai's Branded Residences",
      date: "February 14th, 2024",
      readTime: "6 min read",
    },
    {
      image: newImage,
      category: "LIFESTYLE",
      title: "New Luxury Homes in Dubai",
      date: "March 1st, 2024",
      readTime: "8 min read",
    },
    {
      image: newImage,
      category: "LIFESTYLE",
      title: "Exclusive Private Jets to Watch in 2024",
      date: "March 5th, 2024",
      readTime: "9 min read",
    },
  ];

  const visibleNews = showAll ? newsData : newsData.slice(0, 4);

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
      </div>

      <div className="px-4 py-8 md:px-10 lg:px-24">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4 font-inter">
          <a href="#" className="hover:underline">
            Home
          </a>{" "}
          &gt;{" "}
          <a href="#" className="hover:underline">
            The Journal
          </a>{" "}
          &gt; <span className="text-gray-700">Lifestyle</span>
        </div>

        <div className="px-0 sm:px-24 mt-16">
          <h1 className="text-2xl md:text-3xl font-playfair  text-center  text-[#00603A] leading-tight mb-6  ">
            A Look at the Most Exciting Racing Cars at the RM Sotheby’s Monterey
            Auction
          </h1>
          <p className="text-gray-700 text-base text-center md:text-lg leading-relaxed mb-6 font-inter">
            One of the most enduring partnerships in the automotive world
            returns to California’s picturesque Monterey Peninsula for the 27th
            year. Monterey Car Week and RM Sotheby’s have routinely showcased
            rare gems at auction, such as 2023’s Lost and Found Collection. This
            lot of 20 Ferraris that had languished in storage for decades found
            new life in the event’s spotlight. RM Sotheby’s ended up claiming
            five of the top ten sales of that week, more than any other auction
            house present.
          </p>
          <div className="w-full h-auto mb-6">
            <img
              src={newImage}
              alt="Racing Car"
              className="w-full h-auto object-cover  shadow-md"
            />
          </div>

          <p className="text-gray-700 text-base text-center font-inter md:text-lg leading-relaxed">
            This year’s lots include a number of vintage roadsters and
            competition cars that have participated in the most prestigious
            racing events, from F1 to Le Mans, as well as a vehicle that
            embodies the spirit of a racer in the body of a street car.
          </p>
          <div className=" py-12">
            {articles.map((article, index) => (
              <div key={index} className="mb-12">
                <h1 className="text-2xl md:text-3xl font-playfair text-[#00603A] text-center   leading-tight mb-6">
                  {article.title}
                </h1>
                <div className="w-full h-auto mb-6">
                  <img
                    src={article.image}
                    alt="Article"
                    className="w-full h-auto object-cover  "
                  />
                </div>
                <p className="text-gray-700 text-base text-center font-inter md:text-lg leading-relaxed">
                  {article.description}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl  text-center  font-playfair text-[#00603A] leading-tight mb-6  ">
              Final Take
            </h1>
            <p className="text-gray-700 text-base font-inter text-center md:text-lg leading-relaxed mb-6">
              One of the most enduring partnerships in the automotive world
              returns to California’s picturesque Monterey Peninsula for the
              27th year. Monterey Car Week and RM Sotheby’s have routinely
              showcased rare gems at auction, such as 2023’s Lost and Found
              Collection. This lot of 20 Ferraris that had languished in storage
              for decades found new life in the event’s spotlight. RM Sotheby’s
              ended up claiming five of the top ten sales of that week, more
              than any other auction house present.
            </p>
          </div>
        </div>
        <div className="container mx-auto py-12">
          <h2 className="text-2xl md:text-3xl  text-center mb-8 font-playfair text-[#00603A]">
            Related Publishings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleNews.map((news, index) => (
              <div key={index} className="">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-80 object-cover"
                />
                <div className="py-4 text-start">
                  <p className="text-sm font-inter text-[#00603A] uppercase underline md:underline-offset-4">
                    {news.category}
                  </p>
                  <h3 className="text-lg  mt-2 font-playfair text-[#000000]">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-4 font-inter">
                    {news.readTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            {!showAll && (
              <button
                onClick={() => setShowAll(true)} // Show all cards when clicked
                className="w-60 py-2 flex items-center justify-center gap-2 font-inter px-0 md:px-20 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300"
              >
                View All
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
