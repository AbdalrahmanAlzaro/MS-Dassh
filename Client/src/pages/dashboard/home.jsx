import React from "react";
import { StatisticsCard } from "@/widgets/cards";
import {
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaReceipt } from "react-icons/fa";

export function Home() {
  const [contactInfo, setContactInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    userCount: 0,
    userOrder: 0,
    totalSubtotal: 0,
  });
  let totalSubtotal;
  let userOrder;
  let userCount;
  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:3000/user-count"),
        axios.get("http://localhost:3000/user-orders"),
        axios.get("http://localhost:3000/calculate-subtotal"),
      ])
      .then(
        axios.spread(
          (userCountResponse, userOrderResponse, subtotalResponse) => {
            userCount = userCountResponse.data.userCount;
            userOrder = userOrderResponse.data.userOrder;
            totalSubtotal = subtotalResponse.data.totalSubtotal;

            setUserData({ userCount, userOrder, totalSubtotal });
          }
        )
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(userData.totalSubtotal);

  useEffect(() => {
    axios
      .get("http://localhost:3000/contact-info") // Assuming your API endpoint is mounted at '/contact-info'
      .then((response) => {
        setContactInfo(response.data[0]); // Assuming you only have one contact info object
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contact info:", error);
        setLoading(false);
      });
  }, []);

  const handleUpdate = () => {
    // Make a PUT request to update the contact information
    axios
      .put("http://localhost:3000/contact-infoo", contactInfo) // Assuming your update endpoint is mounted at '/contact-info'
      .then((response) => {
        console.log("Contact info updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating contact info:", error);
      });
  };

  return (
    <>
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {/* ...map and render your StatisticsCard components */}

          {/* User Count */}
          <StatisticsCard
            title="User Count"
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                {React.createElement(UserIcon, {
                  className: "w-6 h-6 text-white",
                })}
              </div>
            }
            footer={`${userData.userCount} Users`}
          />

          {/* User Orders */}
          <StatisticsCard
            title="User Orders"
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                {React.createElement(FaReceipt, {
                  className: "w-6 h-6 text-white",
                })}
              </div>
            }
            footer={`${userData.userOrder} Orders`}
          />

          {/* Total Subtotal */}
          <StatisticsCard
            title="Total Sales"
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                {React.createElement(ChartBarIcon, {
                  className: "w-6 h-6 text-white",
                })}
              </div>
            }
            footer={`${userData.totalSubtotal}`}
          />
        </div>
      </div>

      <div className="mx-auto max-w-lg">
        <h1 className="mb-4 text-center">Edit Contact Information</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form className="rounded-md bg-white p-6 shadow-md">
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">Address:</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={contactInfo.address}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, address: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">
                Phone Number:
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={contactInfo.phone_number}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    phone_number: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">Email:</label>
              <input
                type="email"
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="w-full rounded-md bg-blue-500 py-2 px-4 text-white transition-colors duration-300 hover:bg-blue-600"
              onClick={handleUpdate}
            >
              Update Contact Info
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Home;
