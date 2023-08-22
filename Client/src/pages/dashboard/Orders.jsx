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
    <div className="mx-auto mt-12 mb-8 flex w-3/4 flex-col gap-12">
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
              <Card key={orderId} className="p-6 shadow-md ">
                <Typography variant="h6" className="mb-4 ">
                  Order ID: {orderId}
                </Typography>
                <div className="mb-4 flex justify-between">
                  <Typography className="font-medium">Customer:</Typography>
                  <Typography>{customerName}</Typography>
                </div>
                <div className="mb-4 flex justify-between">
                  <Typography className="font-medium">Email:</Typography>
                  <Typography>{userEmail}</Typography>
                </div>
                <div className="mb-4 flex justify-between">
                  <Typography className="font-medium">Phone Number:</Typography>
                  <Typography>{userPhone}</Typography>
                </div>
                <div className="mb-4">
                  <Typography className="font-medium">Products:</Typography>
                  <div className="mt-2 space-y-2">
                    {Products.map((product) => (
                      <div key={product.id}>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4 flex justify-between">
                  <Typography className="font-medium">Subtotal:</Typography>
                  <Typography>${subtotal}</Typography>
                </div>
                <div className="mb-4 flex justify-between">
                  <Typography className="font-medium">Date:</Typography>
                  <Typography>{new Date(date).toLocaleDateString()}</Typography>
                </div>
                <div className="flex justify-between">
                  <Chip
                    variant="gradient"
                    color={status === "completed" ? "green" : "blue"}
                    value={status}
                    className="py-0.5 px-2 text-[11px] font-medium"
                  />
                  <Typography className="font-medium">{status}</Typography>
                </div>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
}

export default Orders;
