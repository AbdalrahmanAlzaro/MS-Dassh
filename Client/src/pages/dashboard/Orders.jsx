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
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/join-data-for-all-order")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders", error));
  }, []);

  console.log(orders);

  const handleStateChange = (orderNumber, newState) => {
    axios
      .put(`http://localhost:3000/update-order-state/${orderNumber}`, {
        newState,
      })
      .then(() => {
        // Update the local state to reflect the change
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.ordernumber === orderNumber
              ? { ...order, state: newState }
              : order
          )
        );
      })
      .catch((error) => console.error("Error updating order state", error));
  };

  const sortedOrders = orders.slice().sort((a, b) => {
    const stateOrder = {
      "In Factory": 1,
      "On The Way": 2,
      Delivered: 3,
    };
    return stateOrder[a.state] - stateOrder[b.state];
  });

  const completedOrderss = sortedOrders.filter(
    (order) => order.state === "Delivered"
  );

  const activeOrders = sortedOrders.filter(
    (order) => order.state !== "Delivered"
  );
  return (
    <>
      <div className="mx-auto mt-12 mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {activeOrders.map(
            (
              {
                date,
                ordernumber,
                product_data,
                subtotal,
                username,
                email,
                phonenumber,
                state,
              },
              index
            ) => {
              const orderId = ordernumber;
              const customerName = username;
              const userEmail = email;
              const userPhone = phonenumber;
              const Products = product_data;

              return (
                <div
                  key={orderId}
                  className={`space-y-4 rounded-lg bg-white p-6 shadow-md ${
                    state === "In Factory"
                      ? "border-red-500"
                      : state === "On The Way"
                      ? "border-gray-500"
                      : "border-green-500"
                  }`}
                >
                  <h6 className="text-lg font-semibold">
                    Order Number: {orderId}
                  </h6>
                  <div className="flex justify-between">
                    <p className="font-medium">Customer:</p>
                    <p>{customerName}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Email:</p>
                    <p>{userEmail}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Phone Number:</p>
                    <p>{userPhone}</p>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <p className="font-medium">Products:</p>
                    <div className="mt-2 rounded-lg border bg-gray-100 p-4">
                      {Products.map((product) => (
                        <div key={product.id} className="mb-2">
                          <p>Name: {product.description}</p>
                          <p>Price: {product.price}</p>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Subtotal:</p>
                    <p>${subtotal}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Date:</p>
                    <p>{new Date(date).toLocaleDateString()}</p>
                  </div>
                  <div
                    className={`flex justify-between ${
                      state === "Delivered" ? "hidden" : ""
                    }`}
                  >
                    <p className="font-medium">Order status :</p>
                    <div className="flex items-center">
                      <select
                        value={state}
                        onChange={(e) =>
                          handleStateChange(orderId, e.target.value)
                        }
                      >
                        <option value="In Factory">In Factory</option>
                        <option value="On The Way">On The Way</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      <hr />

      <div className="mx-auto mt-12 mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Completed Orders
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {completedOrderss.map(
            (
              {
                date,
                ordernumber,
                product_data,
                subtotal,
                username,
                email,
                phonenumber,
                state,
              },
              index
            ) => {
              const orderId = ordernumber;
              const customerName = username;
              const userEmail = email;
              const userPhone = phonenumber;
              const Products = product_data;

              return (
                <div
                  key={orderId}
                  className={`space-y-4 rounded-lg bg-white p-6 shadow-md ${
                    state === "In Factory"
                      ? "border-red-500"
                      : state === "On The Way"
                      ? "border-gray-500"
                      : "border-green-500"
                  }`}
                >
                  <h6 className="text-lg font-semibold">
                    Order Number: {orderId}
                  </h6>
                  <div className="flex justify-between">
                    <p className="font-medium">Customer:</p>
                    <p>{customerName}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Email:</p>
                    <p>{userEmail}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Phone Number:</p>
                    <p>{userPhone}</p>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <p className="font-medium">Products:</p>
                    <div className="mt-2 rounded-lg border bg-gray-100 p-4">
                      {Products.map((product) => (
                        <div key={product.id} className="mb-2">
                          <p>Name: {product.description}</p>
                          <p>Price: {product.price}</p>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Subtotal:</p>
                    <p>${subtotal}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Date:</p>
                    <p>{new Date(date).toLocaleDateString()}</p>
                  </div>
                  <div
                    className={`flex justify-between ${
                      state === "Delivered" ? "hidden" : ""
                    }`}
                  >
                    <p className="font-medium">Order status :</p>
                    <div className="flex items-center">
                      <select
                        value={state}
                        onChange={(e) =>
                          handleStateChange(orderId, e.target.value)
                        }
                      >
                        <option value="In Factory">In Factory</option>
                        <option value="On The Way">On The Way</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
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
