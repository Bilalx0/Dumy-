import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assests/TMM-LANDING PAGE 1.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Dashboard = ({
  viewType,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 5,
  onPageChange = () => {},
}) => {
  const [posts, setPosts] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [sortOrder, setSortOrder] = useState(null); // Sorting order: null, "asc", "desc"
  const [filterStatus, setFilterStatus] = useState(""); // Filter by Status

  // Sorting logic
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price; // Ascending Order
    } else if (sortOrder === "desc") {
      return b.price - a.price; // Descending Order
    }
    return 0; // Default (No sorting)
  });

  // Filtering logic
  const filteredPost = sortedPosts.filter((post) => {
    if (!filterStatus) return true;
    if (filterStatus === "New") return post.isNew;
    return filterStatus === "Available" ? post.isAvailable : !post.isAvailable;
  });
  useEffect(() => {
    fetchPosts();
  }, [viewType]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://mansion-back-production.up.railway.app/${viewType}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(
        `https://mansion-back-production.up.railway.app/${viewType}/${id}`
      );
      setPosts(posts.filter((post) => post._id !== id));
      alert("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, filteredPosts.length);
  const currentPosts = filteredPosts.slice(startItem - 1, endItem);

  const handleRowClick = (post) => {
    setSelectedLead(post); // Set the clicked lead to selectedLead
    setIsFormOpen(true); // Open the form/modal
  };

  const handleCloseForm = () => {
    setIsFormOpen(false); // Close the form/modal
    setSelectedLead(null); // Clear selected lead
  };
  const [properties, setProperties] = useState([
    {
      id: "01",
      email: "Cozy Apartment",
      category: "Newsletter Signup",
      createdTime: "7pm",
    },
    {
      id: "02",
      email: "Cozy Apartment",
      category: "Magazine Signup",
      createdTime: "7pm",
    },
    {
      id: "03",
      email: "Cozy Apartment",
      category: "Magazine Signup",
      createdTime: "7pm",
    },
  ]);

  const [filterCategory, setFilterCategory] = useState("All");
  const filteredPostss = posts.filter(
    (post) =>
      post.name &&
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "All" || post.category === filterCategory)
  );

  const filteredProperties = properties.filter((property) =>
    property.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [selectedDate, setSelectedDate] = useState(null);

  let formPath = "";

  if (viewType === "mansions") {
    formPath = "/mansionform";
  } else if (viewType === "penthouses") {
    formPath = "/penthouseform";
  } else if (viewType === "magazine") {
    formPath = "/magazineform";
  } else if (viewType === "luxurycollectibles") {
    formPath = "/collectiblesform";
  } else if (viewType === "home") {
    formPath = "/homeform";
  } else if (viewType === "new-development") {
    formPath = "/new-developmentform";
  } else {
    formPath = "/dashboard"; // Provide a fallback in case of unknown viewType
  }

  const handleEditClick = () => {
    let formPath = "";

    if (viewType === "mansions") {
      formPath = "/mansionform";
    } else if (viewType === "penthouses") {
      formPath = "/penthouseform";
    } else {
      return; // Do nothing if the viewType is not "mansions" or "penthouses"
    }

    navigate(formPath);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts1 = posts.slice(startItem, startItem + itemsPerPage);
  return (
    <div className="flex-1 bg-[#F9F9F8]">
      <div className="flex bg-[#F9F9F8] pr-4 flex-col sm:flex-row justify-end py-6">
        <img src={logo} className="w-[400px]" alt="logo" />
      </div>
      <div className="p-6">
        {viewType === "leads" ? (
          <div className="overflow-x-auto  font-inter">
            <div className="flex justify-between items-center mb-2">
              <h2>All Leads</h2>

              <div className="flex">
                <input
                  type="text"
                  placeholder="Search Listing Agent"
                  className="flex-1 px-4 py-2 text-gray-700 focus:outline-none border border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-[#00603A] px-4 py-2 text-white hover:text-[#00603A] border border-[#00603A] hover:bg-transparent transition">
                  <FaSearch />
                </button>
              </div>
            </div>
            <div className="bg-[#00603A] text-white py-2 px-4 flex justify-between items-center">
              <h2 className="text-base font-inter">Leads</h2>

              <div className="flex gap-2">
                <button className="bg-white text-[#00603A] px-3 py-1  hover:bg-gray-200">
                  Import
                </button>
                <button className="bg-white text-[#00603A] px-3 py-1  hover:bg-gray-200">
                  Export
                </button>
              </div>
            </div>

            <table className="min-w-full border text-sm font-inter">
              <thead>
                <tr className="bg-[#BAD4CA]">
                  <td className="py-2 px-2 border">Reference No</td>
                  <td className="py-2 px-2 border">Status</td>
                  <td className="py-2 px-2 border">Listing Reference No</td>
                  <td className="py-2 px-2 border">First Name</td>
                  <td className="py-2 px-2 border">Last Name</td>
                  <td className="py-2 px-2 border">Email</td>
                  <td className="py-2 px-2 border">Phone</td>
                  <td className="py-4 px-2  flex">
                    Created Time{" "}
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      showTimeSelect
                      dateFormat="Pp"
                      customInput={
                        <button className=" px-2 py-1  cursor-pointer">
                          {selectedDate ? selectedDate.toLocaleString() : ""} 🔽
                        </button>
                      }
                    />
                  </td>
                  <td className="py-2 px-2 border">Listing Status</td>
                  <td className="py-2 px-2 border">Listing Link</td>
                  <td className="py-2 px-2 border">Listing Agent</td>

                  <td className="py-2 px-2 border">Message</td>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((post, index) => (
                  <tr
                    key={post._id}
                    className={`hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                    onClick={() => handleRowClick(post)} // Open form/modal on row click
                  >
                    <td className="py-2 border text-center">INQ9102</td>
                    <td className="py-2 px-2 border">NEW</td>
                    <td className="py-2 px-2 border">TMM920</td>
                    <td className="py-2 px-2 border">First Name</td>
                    <td className="py-2 px-2 border">Last Name</td>
                    <td className="py-2 border text-center">test@email.com</td>
                    <td className="py-2 px-2 border">971382932</td>
                    <td className="py-2 px-2 border">16:15PM | 15 Jan 2025</td>
                    <td className="py-2 px-2 border">Active/Inactive</td>
                    <td className="py-2 px-2 border">url</td>
                    <td className="py-2 border text-center">agent</td>
                    <td className="py-2 px-2 border">Test Custom Message</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="flex justify-between mt-4">
                {currentPage > 1 && (
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="bg-gray-700 text-white px-4 py-2"
                  >
                    Previous
                  </button>
                )}
                {currentPage < totalPages && (
                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="bg-gray-700 text-white px-4 py-2"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        ) : viewType === "property" ? (
          <div className="overflow-x-auto font-inter">
            <h1 className="text-2xl mb-4">NewsLetter</h1>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-5 text-sm">
              <h1 className="flex flex-col text-base">
                {/* <span>Property List</span> */}
                <span>
                  Dashboard <span className="text-blue-600">/ {viewType} </span>
                </span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                {/* <Link to={formPath}>
                  <button className="bg-[#00603A] text-white text-2xl px-4 text-center pb-1 hover:bg-blue-700">
                    +
                  </button>
                </Link> */}
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search By Email"
                    className="flex-1 px-4 py-2 text-gray-700 focus:outline-none border border-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="bg-[#00603A] px-4 py-2 text-white hover:text-[#00603A] border border-[#00603A] hover:bg-transparent transition">
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto font-inter">
              <div className="flex bg-[#00603A] text-white py-2 px-4 flex justify-between items-center">
                <h2 className="text-base font-inter">Property List</h2>
                <div className="flex gap-2">
                  <button className="bg-white text-[#00603A] px-3 py-1  hover:bg-gray-200">
                    Export
                  </button>
                </div>
              </div>
              <table className="min-w-full border font-inter text-sm">
                <thead>
                  <tr className="bg-[#BAD4CA]">
                    <td className="py-2 px-4 border">S.NO</td>
                    <td className="py-2 px-4 border">Email</td>
                    <td className="py-2 px-4 border">
                      <label className=" px-2">Category</label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="border  py-2 rounded"
                      >
                        <option value="All">All</option>
                        <option value="Magazine">Magazine</option>
                        <option value="Newsletter Signup">
                          Newsletter Signup
                        </option>
                      </select>
                    </td>
                    <td className="py-2 px-4 border">
                      <label className=" px-2">Created Time</label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        customInput={
                          <button className="border px-2 py-1 rounded bg-white shadow-sm cursor-pointer">
                            {selectedDate
                              ? selectedDate.toLocaleString()
                              : "Select Time"}{" "}
                            🔽
                          </button>
                        }
                      />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.map((property, index) => (
                    <tr
                      key={property.id}
                      className={`hover:bg-gray-100 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                      onClick={() => handleRowClick(property)}
                    >
                      <td className="py-2 px-2 border">{property.id}</td>
                      <td className="py-2 px-2 border">{property.email}</td>
                      <td className="py-2 px-2 border">{property.category}</td>
                      <td className="py-2 px-2 border">
                        {property.createdTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl  mb-4">
              {viewType.toUpperCase().replace("-", " ")}
            </h1>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-5 text-sm">
              <h1 className="flex flex-col text-base ">
                <span>Post List</span>
                <span>
                  Dashboard <span className="text-blue-600">/ {viewType} </span>
                </span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <Link to={formPath}>
                  <button className="bg-[#00603A] text-white text-2xl px-4 text-center pb-1 hover:bg-blue-700">
                    +
                  </button>
                </Link>

                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search"
                    className="flex-1 px-4 py-2 text-gray-700 focus:outline-none border border-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="bg-[#00603A] px-4 py-2 text-white hover:text-[#00603A] border border-[#00603A] hover:bg-transparent transition">
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto  font-inter">
              <div className="bg-[#00603A] text-white py-2 px-4">
                <h2 className="text-base font-inter">List View</h2>
              </div>
              <table className="min-w-full border font-inter text-sm  ">
                <thead>
                  <tr className="bg-[#BAD4CA]">
                    <td className="py-2 px-4 border">SL.No</td>
                    <td className="py-2 px-4 border">Name</td>
                    <td className="py-2 px-4 border">Category</td>
                    <td
                      className="py-2 px-4 border cursor-pointer flex items-center gap-1"
                      onClick={() =>
                        setSortOrder(
                          sortOrder === "asc"
                            ? "desc"
                            : sortOrder === "desc"
                            ? ""
                            : "asc"
                        )
                      }
                    >
                      Price
                      {sortOrder === "asc" ? (
                        <FaArrowUp className="text-green-600" />
                      ) : sortOrder === "desc" ? (
                        <FaArrowDown className="text-red-600" />
                      ) : (
                        <>
                          <FaArrowUp className="text-gray-400" />
                          <FaArrowDown className="text-gray-400" />
                        </>
                      )}
                    </td>

                    <td
                      className="py-2 px-4 border cursor-pointer  items-center gap-2"
                      onClick={() =>
                        setFilterStatus(
                          filterStatus === "New"
                            ? "Available"
                            : filterStatus === "Available"
                            ? ""
                            : "New"
                        )
                      }
                    >
                      <span>Status</span>
                      <span
                        className={`ml-2 ${
                          filterStatus === "New"
                            ? "text-blue-600"
                            : filterStatus === "Available"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {filterStatus === "New"
                          ? "New"
                          : filterStatus === "Available"
                          ? "Available"
                          : "All"}
                      </span>
                    </td>

                    <td className="py-2 px-4 border">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map((post, index) => (
                    <tr
                      key={post._id}
                      className={`hover:bg-gray-100 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="py-2 px-4 border text-center">
                        {startItem + index}
                      </td>
                      <td className="py-2 px-4 border">{post.name}</td>
                      <td className="py-2 px-4 border">
                        {viewType.replace("-", " ")}
                      </td>
                      <td className="py-2 px-4 border">
                        ${post.price} {/* Assuming price is a number */}
                      </td>
                      <td className="py-2 px-4 border">
                        {post.isNew ? (
                          <span className="text-blue-600">New</span>
                        ) : post.isAvailable ? (
                          <span className="text-green-600">Available</span>
                        ) : (
                          <span className="text-red-600">Sold</span>
                        )}
                      </td>

                      <td className="py-2 px-4  flex justify-center gap-2">
                        <button className="text-blue-600  hover:text-blue-800">
                          <FaEye />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800"
                          onClick={handleEditClick}
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDelete(post._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
