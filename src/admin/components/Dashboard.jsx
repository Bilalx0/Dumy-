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
import logo from "../../assests/TMM-LANDING PAGE 1.svg"; // apne hisaab sey fix krlo
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = ({
  viewType,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 5,
  onPageChange = () => {},
}) => {
  // Define state variables
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = inquiries.slice(startIndex, startIndex + itemsPerPage);

  // Dummy data for filteredProperties (replace with actual data fetching if needed)
  const filteredProperties = [
    { id: 1, email: "example1@example.com", category: "Newsletter Signup", createdTime: "2023-10-01 10:00" },
    { id: 2, email: "example2@example.com", category: "Magazine", createdTime: "2023-10-02 12:00" },
  ];

  // Form path for adding new posts
  const formPath = `/admin/${viewType}/new`;

  // Fetch inquiries
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/inquiries");
        if (!response.ok) throw new Error("Failed to fetch inquiries");
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();
  }, []);

  // Handlers
  const handleRowClick = (item) => {
    console.log("Row clicked:", item); // Implement navigation or modal logic
  };

  const handleEditClick = () => {
    console.log("Edit clicked"); // Implement edit logic
  };

  const handleDelete = (id) => {
    console.log("Delete clicked for ID:", id); // Implement delete logic
  };

  return (
    <div className="flex-1 bg-[#F9F9F8]">
      <div className="flex bg-[#F9F9F8] pr-4 flex-col sm:flex-row justify-end py-6">
        <img src={logo} className="w-[400px]" alt="logo" />
      </div>
      <div className="p-6">
        {viewType === "leads" ? (
          <div className="overflow-x-auto font-inter">
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
                <button className="bg-white text-[#00603A] px-3 py-1 hover:bg-gray-200">
                  Import
                </button>
                <button className="bg-white text-[#00603A] px-3 py-1 hover:bg-gray-200">
                  Export
                </button>
              </div>
            </div>

            <table className="min-w-full border text-sm font-inter">
              <thead>
                <tr className="bg-[#BAD4CA]">
                  <th className="py-2 px-2 border">Status</th>
                  <th className="py-2 px-2 border">First Name</th>
                  <th className="py-2 px-2 border">Last Name</th>
                  <th className="py-2 px-2 border">Email</th>
                  <th className="py-2 px-2 border">Phone</th>
                  <th className="py-4 px-2 flex">
                    Created Time{" "}
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      showTimeSelect
                      dateFormat="Pp"
                      customInput={
                        <button className="px-2 py-1 cursor-pointer">
                          {selectedDate ? selectedDate.toLocaleString() : ""} 🔽
                        </button>
                      }
                    />
                  </th>
                  <th className="py-2 px-2 border">Message</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((inquiry) => (
                  <tr
                    key={inquiry._id}
                    className={`hover:bg-gray-100`}
                    onClick={() => handleRowClick(inquiry)}
                  >
                    <td className="py-2 border text-center">{inquiry.reference || "N/A"}</td>
                    <td className="py-2 px-2 border">{inquiry.firstName || "NEW"}</td>
                    <td className="py-2 px-2 border">{inquiry.lastName || "N/A"}</td>
                    <td className="py-2 border text-center">{inquiry.email || "N/A"}</td>
                    <td className="py-2 px-2 border">{inquiry.phone || "N/A"}</td>
                    <td className="py-2 px-2 border">
                      {inquiry.createdAt
                        ? `${new Date(inquiry.createdAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })} | ${new Date(inquiry.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}`
                        : "N/A"}
                    </td>
                    <td className="py-2 px-2 border">
                      <div className="max-w-[200px] truncate" title={inquiry.message}>
                        {inquiry.message || "N/A"}
                      </div>
                    </td>
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
            <h1 className="text-2xl mb-4">Newsletter</h1>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-5 text-sm">
              <h1 className="flex flex-col text-base">
                <span>
                  Dashboard <span className="text-blue-600">/ {viewType} </span>
                </span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
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
                  <button className="bg-white text-[#00603A] px-3 py-1 hover:bg-gray-200">
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
                      <label className="px-2">Category</label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="border py-2 rounded"
                      >
                        <option value="All">All</option>
                        <option value="Magazine">Magazine</option>
                        <option value="Newsletter Signup">Newsletter Signup</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 border">
                      <label className="px-2">Created Time</label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        customInput={
                          <button className="border px-2 py-1 rounded bg-white shadow-sm cursor-pointer">
                            {selectedDate ? selectedDate.toLocaleString() : "Select Time"} 🔽
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
                      className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                      onClick={() => handleRowClick(property)}
                    >
                      <td className="py-2 px-2 border">{property.id}</td>
                      <td className="py-2 px-2 border">{property.email}</td>
                      <td className="py-2 px-2 border">{property.category}</td>
                      <td className="py-2 px-2 border">{property.createdTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl mb-4">{viewType.toUpperCase().replace("-", " ")}</h1>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-5 text-sm">
              <h1 className="flex flex-col text-base">
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
            <div className="overflow-x-auto font-inter">
              <div className="bg-[#00603A] text-white py-2 px-4">
                <h2 className="text-base font-inter">List View</h2>
              </div>
              <table className="min-w-full border font-inter text-sm">
                <thead>
                  <tr className="bg-[#BAD4CA]">
                    <td className="py-2 px-4 border">SL.No</td>
                    <td className="py-2 px-4 border">Name</td>
                    <td className="py-2 px-4 border">Category</td>
                    <td
                      className="py-2 px-4 border cursor-pointer flex items-center gap-1"
                      onClick={() =>
                        setSortOrder(
                          sortOrder === "asc" ? "desc" : sortOrder === "desc" ? "" : "asc"
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
                      className="py-2 px-4 border cursor-pointer items-center gap-2"
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
                      className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="py-2 px-4 border text-center">{startIndex + index + 1}</td>
                      <td className="py-2 px-4 border">{post.name || "N/A"}</td>
                      <td className="py-2 px-4 border">{viewType.replace("-", " ")}</td>
                      <td className="py-2 px-4 border">${post.price || 0}</td>
                      <td className="py-2 px-4 border">
                        {post.isNew ? (
                          <span className="text-blue-600">New</span>
                        ) : post.isAvailable ? (
                          <span className="text-green-600">Available</span>
                        ) : (
                          <span className="text-red-600">Sold</span>
                        )}
                      </td>
                      <td className="py-2 px-4 flex justify-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
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