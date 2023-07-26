import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";

export function Tables() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/allUsers")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users", error));
  }, []);
  console.log(users);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["users", "role", "number", "state"].map((el) => (
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
              {users.map(({ username, email, role, online, id }, index) => {
                const className = `py-3 px-5 ${
                  index === users.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={username}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar
                          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4PDxASEBAPERESEBAQFRAQFxAODRgSFREWFhURFRUYHyggJBolGxYVIjEhJSkrLi4vFx8zODMsNygtLi4BCgoKDQ0NDg4NDisZHxkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAgQDB//EADsQAQACAAMEBggEAwkAAAAAAAABAgMEEQUhMVESIkFhcZEyUoGhscHR4RNCcoIzQ1MGI2KSorLC8PH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APrgCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxe8ViZmYiI4zO6AZa4uLWka2tFY750RGc2xO+MKP3zx9kfVFYl7WnW0zM853yCexdsYUcOlbwjSPe57bc5YfnP2Q4CXjbk/048/s9cPbdJ9Klo8NLIMBaMDO4V/RvGvKerPlLoU525XaWJh7telX1bfKQWQc+TzlMWOrO+ONZ4w6AAAAAAAAAAAAAAAAAAAa42LWlZtadIhW8/nrYs8qxwr8572+1c7+LbSPQrw759ZxAAKAAAAAAM4d5rMTWZiY4THFYdm5+MWNJ0i8eUxzhXWcO81mJrOkxOsSC3jnyOajFpFu3hMcpdCAAAAAAAAAAAAAAAj9tZnoYfRjjfd+3tSCt7XxunjW5V6sezj79QcYCgAAAAAAAAADs2Tmfw8SNfRt1Z+UrKpy05HG6eHS3bMb/ABjdKD3AAAAAAAAAAAAAAtOkTPKNVQtbWZnnMz5ytean+7v+i3+2VSBkBQAAAAAAAAAATuwL64do5W19kxH0lBJj+z0/xP2f8kEwAAAAAAAAAAAAADTHrrS0c62jzhUVxVPNYfQxL15Wny7AeYCgAAAAAAAAAAmf7PV3Yk99Y+P1QyxbFw+jgxPrTNvlHwQdwAAAAAAAAAAAAACD29gaWi8cLRpPjH2+CceOby8YlJrPbwnlPZIKqM4lJrMxMaTE6TDCgAAAAAAAAADbBw5vaKxxmYhbMOkViIjhERHkith5T+ZPfFfnPyS6AAAAAAAAAAAAAAAACN2tkPxI6dY68RvjnH1QK4I7aOzIxOtTSL9scIn7ggBtiUmszFomJjsndLVQAAAABgGXZs3Izi237qRxnn3Q3yGzLYmk21rT/VPh9U/h4daxEVjSI4Qg2rERERG6I3aAAAAAAAAAAAAAAAAAAAWmIjWd0c54A8sxlqYkaWrE9/CY8JROZ2LaN+HaLd1t1vPglsHNYd5mK2iZjsj5PUFUxcriU9Klo79JmPPg8Vxa2w6zxiJ8YiQVBtSlrejEz4RMrZGDSPy18obgruBsrGtxiKxztx8kplNl4dN89e3OeHsh3MYl4rGtpiIjtndAMjTBxqXjWtot4NwAAAAAAAAAAAAAAAACZeePj1w6za06R7/CFfz20b4u6OrT1efiCRzm1613YfWnn+T7ofMZm+JPXtM935fZDyFCJd+X2ti13TpeP8XpebgAT2FtnCn0otWf80e5012hgT/Mr7dY+KsCC0TnsH+pTz1eWJtXAj80z+mJ+auAJbH23P5K6d9t/uhG4+PfEnW9pnx4eyHmKM0tMTrEzE843Sk8pti0bsSOlHrR6XkiwFtwcat41rMTHd826p5fHvhzrWdJ9090wsGQ2hXF3ejf1effCDsAAAAAAAAAAAAeWazFcOs2t7I7ZnlDfFxIrWbWnSIjWVZz2bti21ndEboryj6g1zeati21t7I7Ih4goAAAAAAAAAAAAFbTExMTpMb4mOIAsGy9ofiR0bbrx5T3+KQVCtpiYmJ0mN8THFZNm52MWu/0o4x84QdYAAAAAAAAOTaeZ/Dw5mPSnq18efsBGbZznSt0Kz1azv77fZGsMqAAAAAAAAAAAAAAAAD1y2POHeLR2dnOO2HkAtuDixesWjhMat0JsLNaWnDnhO+vj2wm0AAAAAABXdsZjp4sxHCnVjx7Z/7yTuaxehS1uUTPt7PeqkyAAoAAAAAAAAAAAAAAAAAAzS81mJjjE6x7FswMWL1raOExr9lSTmwMbWtqerOseE8ff8UEoAAAAACM29iaYda+tb3R99EEk9v31xKxyr75n/xGAAKAAAAAAAAAAAAAAAAAADt2PidHGrytrX6e9xNsG/RtW3K0T5TqC3AIAAAAK7tv+NP6a/BwgoAAAAAAAAAAAAAAAAAAAAMSyAt9OEeEMggAA//Z"
                          alt={username}
                          size="sm"
                        />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {username}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {role}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {/* Additional role-related information */}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {id}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {/* Additional role-related information */}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color={online ? "green" : "green"}
                        value={online ? "online" : "online"}
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
