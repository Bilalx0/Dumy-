"use client"
import { useParams } from "react-router-dom"
import { useMansions } from "../context/MansionContext"
import { Phone, Mail, MessageSquare, Check, MapPin, Home, Bed, Bath, Square, Tag, Info } from "lucide-react"

const ListingPage = () => {
  const { reference } = useParams()
  const { mansions, loading, error } = useMansions()

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )

  if (error)
    return (
      <div className="p-4 max-w-3xl mx-auto text-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700">Error loading mansion</h2>
          <p className="text-red-600 mt-2">{error.message || "Please try again later."}</p>
        </div>
      </div>
    )

  const mansion = mansions.find((m) => m.reference === reference)

  if (!mansion)
    return (
      <div className="p-4 max-w-3xl mx-auto text-center">
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-700">Mansion not found</h2>
          <p className="text-green-600 mt-2">The property you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )

  // Parse amenities string to array (assuming it's comma-separated)
  const amenitiesList = mansion.amenities ? mansion.amenities.split(",").map((item) => item.trim()) : []

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="relative h-[50vh] w-full">
        <img src={`http://localhost:5001${mansion.image}`} alt={mansion.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end">
          <div className="p-6 text-white max-w-7xl mx-auto w-full">
            <div className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md mb-3">
              {mansion.status}
            </div>
            {mansion.tag && (
              <div className="inline-block ml-2 px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-md mb-3">
                {mansion.tag}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold">{mansion.title}</h1>
            <p className="text-xl mt-1 opacity-90">{mansion.subtitle}</p>
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              <p className="text-sm opacity-90">
                {mansion.propertyaddress}, {mansion.community}, {mansion.subcommunity}, {mansion.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* Price and Key Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-green-700">AED {mansion.price}</p>
              <p className="text-gray-500 text-sm">Unit No: {mansion.unitno}</p>
            </div>
            <div className="flex flex-wrap gap-6 mt-4 sm:mt-0">
              <div className="flex items-center">
                <Bed className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="text-lg font-semibold">{mansion.bedrooms}</p>
                  <p className="text-xs text-gray-500">Bedrooms</p>
                </div>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="text-lg font-semibold">{mansion.bathrooms}</p>
                  <p className="text-xs text-gray-500">Bathrooms</p>
                </div>
              </div>
              <div className="flex items-center">
                <Square className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="text-lg font-semibold">{mansion.size}</p>
                  <p className="text-xs text-gray-500">sqft</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Property Details</h2>
              <p className="text-gray-700 mb-6">{mansion.description || "No description provided."}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Home className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium">{mansion.propertytype}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Info className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Furnishing</p>
                    <p className="font-medium">{mansion.furnishingtype}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Square className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Built-up Area</p>
                    <p className="font-medium">{mansion.builtuparea} sqft</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Tag className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Project Status</p>
                    <p className="font-medium">{mansion.projectstatus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {amenitiesList.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {amenitiesList.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Section */}
            {mansion.video && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Property Video</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={mansion.video}
                    title="Property Video"
                    className="w-full h-64 rounded-lg"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Agent Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-green-800 mb-4">Contact Agent</h2>
              <div className="flex items-center mb-4">
                {mansion.agentimage ? (
                  <img
                    src={`http://localhost:5001${mansion.agentimage}`}
                    alt={mansion.agentname}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <span className="text-green-700 font-bold text-xl">
                      {mansion.agentname ? mansion.agentname.charAt(0).toUpperCase() : "A"}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{mansion.agentname}</h3>
                  <p className="text-gray-600 text-sm">{mansion.designation}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a href={`tel:${mansion.callno}`} className="flex items-center text-gray-700 hover:text-green-700">
                  <Phone className="h-5 w-5 mr-3 text-green-600" />
                  <span>{mansion.callno}</span>
                </a>
                <a
                  href={`https://wa.me/${mansion.whatsaapno}`}
                  className="flex items-center text-gray-700 hover:text-green-700"
                >
                  <MessageSquare className="h-5 w-5 mr-3 text-green-600" />
                  <span>{mansion.whatsaapno}</span>
                </a>
                <a href={`mailto:${mansion.email}`} className="flex items-center text-gray-700 hover:text-green-700">
                  <Mail className="h-5 w-5 mr-3 text-green-600" />
                  <span>{mansion.email}</span>
                </a>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition duration-200">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingPage

