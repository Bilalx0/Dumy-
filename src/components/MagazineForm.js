import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MagazineForm = () => {
  const [formData, setFormData] = useState({
    author: "",
    category: "",
    title: "",
    subtitle: "",
    mainimage: null,
    bodytext: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, mainimage: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setFormData({
      author: "",
      category: "",
      title: "",
      subtitle: "",
      mainimage: null,
      bodytext: "",
      time: "",
    });
  };

  const quillRef = useRef(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor(); // Get Quill instance
      quill.getModule("toolbar").addHandler("bold", customBoldHandler);
    }
  }, []);

  const customBoldHandler = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.format("bold", !quill.getFormat().bold);
    }
  };

  return (
    <div className="w-full p-4 md:p-20  mb-8 font-inter">
      <div className="bg-white shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <label className="block font-semibold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border outline-none"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="THE MANSION GUIDE">THE MANSION GUIDE</option>
              <option value="THE PENTHOUSE GUIDE">THE PENTHOUSE GUIDE</option>
              <option value="THE LIFESTYLE GUIDE">THE LIFESTYLE GUIDE</option>
              <option value="DEVELOPMENTS">DEVELOPMENTS</option>
              <option value="NEWSROOM">NEWSROOM</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
            {["Author", "Title", "Sub-Title", "Time", "Main Image"].map(
              (field) => (
                <div key={field} className="w-full">
                  <label className="block font-semibold mb-2">{field}</label>
                  {field === "Main Image" ? (
                    <input
                      type="file"
                      name="mainimage"
                      onChange={handleImageChange}
                      className="w-full p-2 border outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      name={field.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")}
                      value={
                        formData[
                          field.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")
                        ]
                      }
                      onChange={handleChange}
                      className="w-full p-2 border outline-none"
                      placeholder={`Enter ${field}`}
                    />
                  )}
                </div>
              )
            )}

            {/* Body Text with ReactQuill */}
            <div className="w-full md:col-span-2">
              <label className="block font-semibold mb-1">Body Text</label>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={setValue}
                modules={{
                  toolbar: {
                    container: [
                      ["bold", "italic", "underline"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                    ],
                  },
                }}
              />
            </div>
          </div>
        </form>

        <div className="text-center mt-32 md:mt-4">
          <button
            type="submit"
            className="font-inter px-20 py-3 text-black mt-8 border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MagazineForm;
