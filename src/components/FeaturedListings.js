import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const FeaturedListings = () => {
  const [mansions, setMansions] = useState([]);
  const [penthouses, setPenthouses] = useState([]);
  const [collectibles, setCollectibles] = useState([]);

  useEffect(() => {
    axios
      .get("https://mansion-back-production.up.railway.app/mansions")
      .then((response) => setMansions(response.data))
      .catch((error) => console.error("Error fetching mansions:", error));

    axios
      .get("https://mansion-back-production.up.railway.app/penthouses")
      .then((response) => setPenthouses(response.data))
      .catch((error) => console.error("Error fetching penthouses:", error));

    axios
      .get("https://mansion-back-production.up.railway.app/luxury-collectibles")
      .then((response) => setCollectibles(response.data))
      .catch((error) => console.error("Error fetching collectibles:", error));
  }, []);

  console.log("mansions: ", mansions);

  const renderPropertyCard = (property) => {
    const imageUrl = property.mainImage;

    return (
      <div key={property._id} className="bg-white  overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={property.name}
            className="w-[100%]  h-96 object-cover"
          />
        ) : (
          <img
            src="/path/to/default-image.jpg" // fallback image
            alt="Default"
            className="w-[100%]  h-96 object-cover"
          />
        )}
        <div className="px-0 py-4">
          <p className="font-inter text-black font-bold text-lg">
            ${property.price.toLocaleString()}
          </p>
          <p className="font-inter text-gray-700 text-sm mt-2 mb-2">
            {property.bedrooms} Beds | {property.bathrooms} Baths |{" "}
            {property.size} sqft
          </p>
          <p className="font-inter text-gray-500 text-sm mb-2 mt-2">
            {property.name}
          </p>
          <p className="font-inter text-gray-500 text-sm mt-2 mb-2">
            {property.location.city}, {property.location.state},{" "}
            {property.location.country}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="px-4 md:px-8 lg:px-20 py-20 border-b border-[#00603A]">
        <h2 className="text-2xl md:text-3xl text-center md:text-left font-playfair text-[#00603A] mb-6">
          Featured Listings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {mansions.slice(0, 4).map(renderPropertyCard)}
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-20 py-20 border-b border-[#00603A]">
        <h2 className="text-2xl md:text-3xl text-center md:text-left font-playfair text-[#00603A] mb-6">
          Newly Listed Mansions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {mansions.slice(0, 4).map(renderPropertyCard)}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 space-y-6 md:space-y-0">
          <p className="font-inter text-gray-600 text-center md:text-left max-w-2xl">
            Explore the off-plan and under-construction mansions and penthouses
            gaining attention and recently launched. This exclusive collection
            showcases the most desirable properties from renowned developers and
            private entities in the UAE's freehold areas.
          </p>
          <a href="/mansions">
            <button className="font-inter px-20 py-3 text-black  border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300">
              Discover all
            </button>
          </a>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-20 py-20 border-b border-[#00603A]">
        <h2 className="text-2xl md:text-3xl text-center md:text-left font-playfair text-[#00603A] mb-6">
          Newly Listed Penthouses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {penthouses.slice(0, 4).map(renderPropertyCard)}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 space-y-6 md:space-y-0">
          <p className="font-inter text-gray-600 text-center md:text-left max-w-2xl">
            Discover the exquisite mansions and penthouses that are currently in
            the spotlight and newly available. This curated collection showcases
            the most sought-after properties on the market right now.
          </p>
          <a href="/penthouses">
            <button className="font-inter px-20 py-3 text-black  border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300">
              Discover all
            </button>
          </a>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-20 py-20 border-b border-[#00603A]">
        <h2 className="text-2xl md:text-3xl text-center md:text-left  font-playfair text-[#00603A] mb-6">
          Newly Listed Collectibles
        </h2>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
          {collectibles.slice(0, 4).map((item) => (
            <div key={item._id} className="  overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-96 object-cover"
              />
              <div className="py-4">
                <p className="font-inter text-black font-bold text-lg">
                  ${item.price.toLocaleString()}
                </p>
                <p className="font-inter text-gray-500 text-sm">{item.name}</p>
                <p className="font-inter text-gray-500 text-sm">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {collectibles.slice(0, 4).map((item) => (
            <Link
              key={item._id}
              to={`/collectible/${item._id}`}
              state={{ item }} // Pass data to the next page
              className="overflow-hidden block"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-[100%]  h-96 object-cover"
              />
              <div className="py-4">
                <p className="font-inter text-black font-bold text-lg">
                  ${item.price.toLocaleString()}
                </p>
                <p className="font-inter text-gray-500 text-sm mt-2 mb-2">
                  {item.name}
                </p>
                <p className="font-inter text-gray-500 text-sm mt-2 mb-2">
                  {item.category}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-8 space-y-6 md:space-y-0">
          <p className="font-inter text-gray-600 text-center md:text-left max-w-2xl">
            Explore the luxury collectibles gaining attention. This exclusive
            collection showcases the most desirable items from renowned
            designers and private collectors.
          </p>
          <a href="/listedcollectibles">
            <button className="font-inter px-20 py-3 text-black  border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300">
              Discover all
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default FeaturedListings;
