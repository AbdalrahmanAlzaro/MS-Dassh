import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/join-data-for-all-order")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders", error));
  }, []);

  console.log(orders);

  return (
    <>
    <div className="mx-auto mt-12 mb-8 flex w-11/12 flex-col gap-12 md:w-3/4">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {orders.map(
          (
            {
              date,
              ordernumber,
              product_data,
              subtotal,
              username,
              email,
              phonenumber,
            },
            index
          ) => {
            const orderId = ordernumber;
            const customerName = username;
            const userEmail = email;
            const userPhone = phonenumber;
            const Products = product_data;
            const status = "completed"; // You can modify this based on your data

            return (
              <div
                key={orderId}
                className="mb-6 rounded-lg bg-white p-6 shadow-md"
              >
                <h6 className="mb-4 text-lg font-semibold">
                  Order ID: {orderId}
                </h6>
                <div className="mb-4 flex justify-between">
                  <p className="font-medium">Customer:</p>
                  <p>{customerName}</p>
                </div>
                <div className="mb-4 flex justify-between">
                  <p className="font-medium">Email:</p>
                  <p>{userEmail}</p>
                </div>
                <div className="mb-4 flex justify-between">
                  <p className="font-medium">Phone Number:</p>
                  <p>{userPhone}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Products:</p>
                  <div className="mt-2 space-y-2">
                    {Products.map((product) => (
                      <div key={product.id}>
                        <p>Name: {product.description}</p>
                        <p>Price: {product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4 flex justify-between">
                  <p className="font-medium">Subtotal:</p>
                  <p>${subtotal}</p>
                </div>
                <div className="mb-4 flex justify-between">
                  <p className="font-medium">Date:</p>
                  <p>{new Date(date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`py-1 px-2 text-xs font-medium ${
                      status === "completed"
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {status}
                  </span>
                  <p className="font-medium">{status}</p>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    </>
  );
}

export default Orders;
