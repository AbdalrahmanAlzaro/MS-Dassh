import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Product() {
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/deleteProduct/${productId}`
      );
      console.log("Product deleted successfully:", response.data.message);
      // You can also update your products state to remove the deleted product
      // Fetch the updated list of products after deletion
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("category", editingProduct.category);
      formData.append("description", editingProduct.description);
      formData.append("price", editingProduct.price);

      if (editingProduct.image) {
        formData.append("image", editingProduct.image);
      }

      const response = await axios.put(
        `http://localhost:3000/editeProducts/${editingProduct.id}`,
        formData
      );

      console.log("Product updated successfully:", response.data);
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? response.data[0] : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/allproducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [refresh]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("category", selectedOption);
    formData.append("description", description);
    formData.append("image", file);
    formData.append("price", price);

    axios
      .post("http://localhost:3000/products", formData)
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully!");
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("An error occurred while adding the product.");
      });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const openEditForm = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setEditingProduct(productToEdit);
  };

  const closeEditForm = () => {
    setEditingProduct(null);
  };

  return (
    <>
      <br />
      <br />
      <div className="flex items-center justify-center">
        <h1 className="text-center text-4xl">Add Product</h1>
      </div>
      <br />
      <br />
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
                <option value="AgriculturalNursery">
                  Agricultural Nursery
                </option>
                <option value="AgriculturalTool">Agricultural Tool</option>
                <option value="AnimalFarm">Animal Farm</option>
                <option value="AnimalFarmTool">Animal Farm Tool</option>
                <option value="Offer">Offer</option>
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
                {file ? (
                  <div>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Selected"
                      className="mb-2 h-32 w-full object-cover"
                    />
                    <p className="text-sm">{file.name}</p>
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
      <br />
      <br />
      <br />
      <br />
      <div className="flex items-center justify-center">
        <h1 className="text-center text-4xl">All product</h1>
      </div>
      <br />
      <br />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-md bg-white p-4 shadow-md">
            <img
              src={product.image}
              alt="product image"
              className="mx-auto mb-2 h-32 w-32 object-contain"
            />
            <h2 className="mb-2 text-lg font-medium">{product.description}</h2>
            <p className="mb-1">Category: {product.category}</p>
            <p className="mb-2">Price: ${product.price}</p>
            <div className="flex justify-between">
              <button
                className="rounded-md bg-red-500 py-1 px-2 text-white transition-colors duration-300 hover:bg-red-600"
                onClick={() => deleteProduct(product.id)} // Call the deleteProduct function
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 inline-block h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Delete
              </button>
              <button
                className="rounded-md bg-blue-500 py-1 px-2 text-white transition-colors duration-300 hover:bg-blue-600"
                onClick={() => openEditForm(product.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 inline-block h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v2m0 8v2m-6-6h2m8 0h2"
                  />
                </svg>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingProduct && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProduct();
            closeEditForm();
          }}
        >
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-96 rounded-md bg-white p-6 shadow-md">
              <h2 className="mb-2 text-lg font-medium">Edit Product</h2>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  Select Category:
                </label>
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  <option value="">-- Select Option --</option>
                  <option value="AgriculturalNursery">
                    Agricultural Nursery
                  </option>
                  <option value="AgriculturalTool">Agricultural Tool</option>
                  <option value="AnimalFarm">Animal Farm</option>
                  <option value="AnimalFarmTool">Animal Farm Tool</option>
                  <option value="Offer">Offer</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  Choose Image:
                </label>
                <div className="flex w-full cursor-pointer items-center justify-between rounded-md border bg-white px-4 py-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-500">
                  {editingProduct?.image?.name ? (
                    <span className="text-gray-500">
                      {editingProduct.image.name}
                    </span>
                  ) : (
                    <span className="text-gray-500">Select an image...</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        image: e.target.files[0],
                      })
                    }
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
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
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  Description:
                </label>
                <input
                  type="text"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Price:</label>
                <input
                  type="text"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white"
                  onClick={handleUpdateProduct}
                >
                  Update
                </button>
                <button
                  className="rounded-md bg-gray-300 px-4 py-2 text-gray-800"
                  onClick={closeEditForm}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Product;
