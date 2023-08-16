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
      // Save the token in local storage or cookies for future requests
      localStorage.setItem("token", token);
      // Handle token storage or redirection as needed
      // For example, you can store the token in localStorage and then navigate
      console.log("User logged in successfully:", token);

      // Navigate to the home page
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
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        alt="Background"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
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
                variant="gradient"
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
              <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account?
                <Link to="/auth/sign-up">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
