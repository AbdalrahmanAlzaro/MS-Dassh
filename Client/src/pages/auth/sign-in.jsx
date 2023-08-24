import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios"; // You'll need to install this package for making HTTP requests
import { useState } from "react";

export function SignIn() {
  const navigate = useNavigate(); // Initialize the navigate function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const response = await axios.post("http://localhost:3000/LogIn", {
        email: email,
        password: password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
  

      navigate("/home"); // Replace "/home" with the actual path of your home page
    } catch (err) {
      setError("Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <img
        src="https://media.istockphoto.com/id/670157616/photo/symmetrical-overview-of-lots-of-small-chrysanthemum-cuttings-in-long-rows.jpg?b=1&s=612x612&w=0&k=20&c=5ehK6qyGWvdzV-u9ODHrMFQYny7MA7oTPHSGLkMnPoA="
        className="absolute inset-0 z-0 h-full w-full object-cover"
        alt="Background"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[30rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="green"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input
                type="email"
                label="Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                label="Password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                style={{ backgroundColor: "#454545" }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#519341")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#454545")}
                fullWidth
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              {error && (
                <Typography variant="small" color="red" className="mt-2">
                  {error}
                </Typography>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
