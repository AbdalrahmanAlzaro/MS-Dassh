import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Product() {
  const [selectedOption, setSelectedOption] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a unique id for the product
    const id = uuidv4();

    // Prepare the data to send to the server
    const productData = {
      id: id,
      category: selectedOption,
      image: image,
      Description: description,
      price: price,
    };

    // Send the data to the server using Axios
    axios
      .post("http://localhost:3000/products", productData)
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully!");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("An error occurred while adding the product.");
      });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-md bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-medium">Card Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Select Category:
            </label>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="">-- Select Option --</option>
              <option value="option1">Agricultural Nursery</option>
              <option value="option2">Animal Farm</option>
              <option value="option3">Agricultural Tool</option>
              <option value="option4">Animal Farm Tool</option>
              <option value="option5">Offer</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Choose Image:
            </label>
            <div
              className="flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 p-2 hover:bg-gray-100"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {image ? (
                <div>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected"
                    className="mb-2 h-32 w-full object-cover"
                  />
                  <p className="text-sm">{image.name}</p>
                </div>
              ) : (
                <label htmlFor="imageInput" className="text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 0 1 1 1v4.586l2.707-2.707a1 1 0 0 1 1.414 1.414L11.414 9l2.707 2.707a1 1 0 0 1-1.414 1.414L10 10.414l-2.707 2.707a1 1 0 1 1-1.414-1.414L8.586 9 5.879 6.293A1 1 0 0 1 7.293 4.88L10 7.586V3a1 1 0 0 1 1-1z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2 8a1 1 0 0 1 1-1h4.586l-2.293-2.293a1 1 0 1 1 1.414-1.414L9 6.586l2.707-2.707a1 1 0 0 1 1.414 1.414L10.414 8l2.707 2.707a1 1 0 0 1-1.414 1.414L9 9.414l-2.707 2.707a1 1 0 0 1-1.414-1.414L6.586 8H3a1 1 0 0 1-1-1z"
                    />
                  </svg>
                  <p className="mt-1">Drag and drop or click to select</p>
                </label>
              )}
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Description:
            </label>
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Price:</label>
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 px-4 text-white transition-colors duration-300 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Product;
