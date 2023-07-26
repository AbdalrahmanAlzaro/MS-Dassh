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
      .get("http://localhost:3000/allOrders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders", error));
  }, []);

  console.log(orders);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Orders table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Order ID", "Customer", "Products", "Status"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(({ id, product_data, user_id }, index) => {
                const orderId = id;
                const customerName = user_id;
                const Products = product_data;
                const status = "completed"; // You can modify this based on your data

                const className = `py-3 px-5 ${
                  index === orders.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={orderId}>
                    <td className={className}>{orderId}</td>
                    <td className={className}>{customerName}</td>
                    <td className={`${className} overflow-hidden`}>
                      <div className="flex flex-col gap-2">
                        {Products.map((element) => (
                          <div key={element.name} className="mb-2">
                            <p>{element.name}</p>
                            <p>{element.price}</p>
                            <p>{element.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color={status === "completed" ? "green" : "blue"}
                        value={status}
                        className="py-0.5 px-2 text-[11px] font-medium"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Orders;
