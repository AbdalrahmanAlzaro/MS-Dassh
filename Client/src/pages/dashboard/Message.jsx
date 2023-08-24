import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

function Message() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get("http://localhost:3000/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchMessages();
  }, []);

  const handleReply = (email) => {
    // You can implement the logic to open the email client with pre-filled data
    const subject = "Re: HarvestMart Store";
    const body = `Dear customer,\n\nThank you for your message. Here's a reply...\n\nBest regards,\nYour Name: HarvestMart Team
    `;

    // Use the mailto link to open the default email client
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Messages
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    ID
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Name
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Email
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Message
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    {message.id}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    {message.name}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    {message.email}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    {message.message}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <button
                      style={{ backgroundColor: "#454545" }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#519341")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#454545")
                      }
                      onClick={() => handleReply(message.email)}
                      className="focus:shadow-outline-blue inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:border-blue-700 focus:outline-none active:bg-blue-800"
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Message;
