"use client"

import { useState } from "react"
import axios from "axios"

const HomePageForm = () => {
  const [heroData, setHeroData] = useState({
    heading: "",
    subheading: "",
    image: null,
  })

  const [mansionData, setMansionData] = useState({
    description: "",
    btntext: "",
  })

  const [penthouseData, setPenthouseData] = useState({
    description: "",
    btntext: "",
  })

  const [collectiblesData, setCollectiblesData] = useState({
    description: "",
    btntext: "",
  })

  const [magazineData, setMagazineData] = useState({
    heading: "",
    subheading: "",
    image: null,
  })

  const [featuredListings, setFeaturedListings] = useState({
    ref1: "",
    ref2: "",
    ref3: "",
    ref4: "",
  })

  const [newlyListedMansions, setNewlyListedMansions] = useState({
    ref1: "",
    ref2: "",
    ref3: "",
    ref4: "",
  })

  const [newlyListedPenthouses, setNewlyListedPenthouses] = useState({
    ref1: "",
    ref2: "",
    ref3: "",
    ref4: "",
  })

  const [newlyListedCollectibles, setNewlyListedCollectibles] = useState({
    ref1: "",
    ref2: "",
    ref3: "",
    ref4: "",
  })

  const [clientReviews, setClientReviews] = useState([{ message: "", author: "" }])

  const [saleLinks, setSaleLinks] = useState({
    mansionsText: "",
    mansionsUrl: "",
    penthousesText: "",
    penthousesUrl: "",
  })

  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleHeroSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    if (!heroData.heading || !heroData.subheading || !heroData.image) {
      setMessage("All fields are required!")
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("heading", heroData.heading)
    formData.append("subheading", heroData.subheading)
    formData.append("image", heroData.image)

    try {
      const response = await axios.post("http://localhost:5001/api/hero", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setMessage("Hero content saved successfully!")
      console.log("Hero saved:", response.data)

      // Reset form
      setHeroData({
        heading: "",
        subheading: "",
        image: null,
      })
    } catch (error) {
      console.error("Error saving hero:", error)
      setMessage(error.response?.data?.message || "Failed to save hero content")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMansionSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    if (!mansionData.description || !mansionData.btntext) {
      setMessage("All fields are required!")
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post("http://localhost:5001/api/mansion", mansionData)

      setMessage("Mansion content saved successfully!")
      console.log("Mansion saved:", response.data)

      // Reset form
      setMansionData({
        description: "",
        btntext: "",
      })
    } catch (error) {
      console.error("Error saving mansion:", error)
      setMessage(error.response?.data?.message || "Failed to save mansion content")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePenthouseSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    if (!penthouseData.description || !penthouseData.btntext) {
      setMessage("All fields are required!")
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post("http://localhost:5001/api/penthouse", penthouseData)

      setMessage("Penthouse content saved successfully!")
      console.log("Penthouse saved:", response.data)

      setPenthouseData({
        description: "",
        btntext: "",
      })
    } catch (error) {
      console.error("Error saving penthouse:", error)
      setMessage(error.response?.data?.message || "Failed to save penthouse content")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCollectiblesSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    if (!collectiblesData.description || !collectiblesData.btntext) {
      setMessage("All fields are required!")
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post("http://localhost:5001/api/collectibles", collectiblesData)

      setMessage("Collectibles content saved successfully!")
      console.log("Collectibles saved:", response.data)

      setCollectiblesData({
        description: "",
        btntext: "",
      })
    } catch (error) {
      console.error("Error saving collectibles:", error)
      setMessage(error.response?.data?.message || "Failed to save collectibles content")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagazineSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    if (!magazineData.heading || !magazineData.subheading || !magazineData.image) {
      setMessage("All fields are required!")
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("heading", magazineData.heading)
    formData.append("subheading", magazineData.subheading)
    formData.append("image", magazineData.image)

    try {
      const response = await axios.post("http://localhost:5001/api/magazine", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setMessage("Magazine content saved successfully!")
      console.log("Magazine saved:", response.data)

      setMagazineData({
        heading: "",
        subheading: "",
        image: null,
      })
    } catch (error) {
      console.error("Error saving magazine:", error)
      setMessage(error.response?.data?.message || "Failed to save magazine content")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFeaturedListingsSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await axios.post("http://localhost:5001/api/featured-listings", featuredListings)
      setMessage("Featured listings saved successfully!")
      console.log("Featured listings saved:", response.data)
    } catch (error) {
      console.error("Error saving featured listings:", error)
      setMessage(error.response?.data?.message || "Failed to save featured listings")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewlyListedMansionsSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await axios.post("http://localhost:5001/api/newly-listed-mansions", newlyListedMansions)
      setMessage("Newly listed mansions saved successfully!")
      console.log("Newly listed mansions saved:", response.data)
    } catch (error) {
      console.error("Error saving newly listed mansions:", error)
      setMessage(error.response?.data?.message || "Failed to save newly listed mansions")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewlyListedPenthousesSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await axios.post("http://localhost:5001/api/newly-listed-penthouses", newlyListedPenthouses)
      setMessage("Newly listed penthouses saved successfully!")
      console.log("Newly listed penthouses saved:", response.data)
    } catch (error) {
      console.error("Error saving newly listed penthouses:", error)
      setMessage(error.response?.data?.message || "Failed to save newly listed penthouses")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewlyListedCollectiblesSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await axios.post("http://localhost:5001/api/newly-listed-collectibles", newlyListedCollectibles)
      setMessage("Newly listed collectibles saved successfully!")
      console.log("Newly listed collectibles saved:", response.data)
    } catch (error) {
      console.error("Error saving newly listed collectibles:", error)
      setMessage(error.response?.data?.message || "Failed to save newly listed collectibles")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClientReviewsSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await axios.post("http://localhost:5001/api/client-reviews", { reviews: clientReviews })
      setMessage("Client reviews saved successfully!")
      console.log("Client reviews saved:", response.data)
    } catch (error) {
      console.error("Error saving client reviews:", error)
      setMessage(error.response?.data?.message || "Failed to save client reviews")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaleLinksSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await axios.post("http://localhost:5001/api/sale-links", saleLinks)
      setMessage("Sale links saved successfully!")
      console.log("Sale links saved:", response.data)
    } catch (error) {
      console.error("Error saving sale links:", error)
      setMessage(error.response?.data?.message || "Failed to save sale links")
    } finally {
      setIsLoading(false)
    }
  }

  const addReview = () => {
    setClientReviews([...clientReviews, { message: "", author: "" }])
  }

  const updateReview = (index, field, value) => {
    const updatedReviews = [...clientReviews]
    updatedReviews[index][field] = value
    setClientReviews(updatedReviews)
  }

  return (
    <div className="w-full mx-auto p-4 md:p-20 mb-8 font-inter">
      <h2 className="text-xl font-bold mb-4">Home Page Settings</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleHeroSubmit}>
        <div className="bg-white shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg">Hero Section</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setHeroData({ ...heroData, image: e.target.files[0] })}
            className="w-full p-2 border outline-none mb-2"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={heroData.heading}
              onChange={(e) => setHeroData({ ...heroData, heading: e.target.value })}
              placeholder="Hero Title"
              className="p-2 border w-full outline-none"
              required
            />
            <input
              type="text"
              value={heroData.subheading}
              onChange={(e) => setHeroData({ ...heroData, subheading: e.target.value })}
              className="w-full p-2 border outline-none"
              placeholder="Hero Subtitle"
              required
            />
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 mt-4 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Apply"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handleFeaturedListingsSubmit}>
        <div className="bg-white shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg">Featured Listing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              className="w-full p-2 border outline-none"
              placeholder="Reference 1"
              value={featuredListings.ref1}
              onChange={(e) => setFeaturedListings({ ...featuredListings, ref1: e.target.value })}
            />
            <input
              type="text"
              className="w-full p-2 border outline-none"
              placeholder="Reference 2"
              value={featuredListings.ref2}
              onChange={(e) => setFeaturedListings({ ...featuredListings, ref2: e.target.value })}
            />
            <input
              type="text"
              className="w-full p-2 border outline-none"
              placeholder="Reference 3"
              value={featuredListings.ref3}
              onChange={(e) => setFeaturedListings({ ...featuredListings, ref3: e.target.value })}
            />
            <input
              type="text"
              className="w-full p-2 border outline-none"
              placeholder="Reference 4"
              value={featuredListings.ref4}
              onChange={(e) => setFeaturedListings({ ...featuredListings, ref4: e.target.value })}
            />
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 mt-4 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Apply"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handleNewlyListedMansionsSubmit}>
        <div className="bg-white shadow-md p-6 mb-6">
          <div className="">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Newly Listed Mansion</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 1"
                value={newlyListedMansions.ref1}
                onChange={(e) => setNewlyListedMansions({ ...newlyListedMansions, ref1: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 2"
                value={newlyListedMansions.ref2}
                onChange={(e) => setNewlyListedMansions({ ...newlyListedMansions, ref2: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 3"
                value={newlyListedMansions.ref3}
                onChange={(e) => setNewlyListedMansions({ ...newlyListedMansions, ref3: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 4"
                value={newlyListedMansions.ref4}
                onChange={(e) => setNewlyListedMansions({ ...newlyListedMansions, ref4: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Newly Listed Mansion Description</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 border outline-none"
                  value={mansionData.description}
                  onChange={(e) => setMansionData({ ...mansionData, description: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Button Text"
                  className="w-full p-2 border outline-none"
                  value={mansionData.btntext}
                  onChange={(e) => setMansionData({ ...mansionData, btntext: e.target.value })}
                  required
                />
              </ul>
            </div>

            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 mt-4 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handleNewlyListedPenthousesSubmit}>
        <div className="bg-white shadow-md p-6 mb-6">
          <div className="">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Newly Listed Penthouse</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 1"
                value={newlyListedPenthouses.ref1}
                onChange={(e) => setNewlyListedPenthouses({ ...newlyListedPenthouses, ref1: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 2"
                value={newlyListedPenthouses.ref2}
                onChange={(e) => setNewlyListedPenthouses({ ...newlyListedPenthouses, ref2: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 3"
                value={newlyListedPenthouses.ref3}
                onChange={(e) => setNewlyListedPenthouses({ ...newlyListedPenthouses, ref3: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 4"
                value={newlyListedPenthouses.ref4}
                onChange={(e) => setNewlyListedPenthouses({ ...newlyListedPenthouses, ref4: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Newly Listed Penthouse Description</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 border outline-none"
                  value={penthouseData.description}
                  onChange={(e) => setPenthouseData({ ...penthouseData, description: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Button Text"
                  className="w-full p-2 border outline-none"
                  value={penthouseData.btntext}
                  onChange={(e) => setPenthouseData({ ...penthouseData, btntext: e.target.value })}
                  required
                />
              </ul>
            </div>

            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 mt-4 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handleNewlyListedCollectiblesSubmit}>
        <div className="bg-white shadow-md p-6 mb-6">
          <div className="">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Newly Listed Collectibles</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 1"
                value={newlyListedCollectibles.ref1}
                onChange={(e) => setNewlyListedCollectibles({ ...newlyListedCollectibles, ref1: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 2"
                value={newlyListedCollectibles.ref2}
                onChange={(e) => setNewlyListedCollectibles({ ...newlyListedCollectibles, ref2: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 3"
                value={newlyListedCollectibles.ref3}
                onChange={(e) => setNewlyListedCollectibles({ ...newlyListedCollectibles, ref3: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 border outline-none"
                placeholder="Reference 4"
                value={newlyListedCollectibles.ref4}
                onChange={(e) => setNewlyListedCollectibles({ ...newlyListedCollectibles, ref4: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Newly Listed Collectibles Description</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 border outline-none"
                  value={collectiblesData.description}
                  onChange={(e) => setCollectiblesData({ ...collectiblesData, description: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Button Text"
                  className="w-full p-2 border outline-none"
                  value={collectiblesData.btntext}
                  onChange={(e) => setCollectiblesData({ ...collectiblesData, btntext: e.target.value })}
                  required
                />
              </ul>
            </div>

            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 mt-4 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handleMagazineSubmit}>
        <div className="bg-white shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg">The Magazine Collection</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMagazineData({ ...magazineData, image: e.target.files[0] })}
            className="w-full p-2 border outline-none mb-2"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Magazine Title"
              className="p-2 border w-full outline-none"
              value={magazineData.heading}
              onChange={(e) => setMagazineData({ ...magazineData, heading: e.target.value })}
              required
            />
            <input
              type="text"
              className="w-full p-2 border outline-none"
              placeholder="Magazine Subtitle"
              value={magazineData.subheading}
              onChange={(e) => setMagazineData({ ...magazineData, subheading: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 mt-4 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Apply"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handleClientReviewsSubmit}>
        <div className="bg-white shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg">Client Reviews</h3>

          {clientReviews.map((review, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Review Message"
                className="w-full p-2 border outline-none"
                value={review.message}
                onChange={(e) => updateReview(index, "message", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Author Name"
                className="w-full p-2 border outline-none"
                value={review.author}
                onChange={(e) => updateReview(index, "author", e.target.value)}
                required
              />
            </div>
          ))}

          <div className="flex justify-between mt-2">
            <button
              type="button"
              onClick={addReview}
              className="px-4 py-2 border border-[#00603A] text-black hover:bg-[#00603A] hover:text-white transition"
            >
              + Add Review
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-[#00603A] text-black hover:bg-[#00603A] hover:text-white transition disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Submit"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handleSaleLinksSubmit}>
        <div className="bg-white shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg">Mansions for Sale</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter text"
              className="w-full p-2 border outline-none"
              value={saleLinks.mansionsText}
              onChange={(e) => setSaleLinks({ ...saleLinks, mansionsText: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Enter URL"
              className="w-full p-2 border outline-none"
              value={saleLinks.mansionsUrl}
              onChange={(e) => setSaleLinks({ ...saleLinks, mansionsUrl: e.target.value })}
              required
            />
          </div>

          <h3 className="font-semibold text-lg mt-4">Penthouses for Sale</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter text"
              className="w-full p-2 border outline-none"
              value={saleLinks.penthousesText}
              onChange={(e) => setSaleLinks({ ...saleLinks, penthousesText: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Enter URL"
              className="w-full p-2 border outline-none"
              value={saleLinks.penthousesUrl}
              onChange={(e) => setSaleLinks({ ...saleLinks, penthousesUrl: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-[#00603A] text-black hover:bg-[#00603A] hover:text-white transition disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default HomePageForm

