import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { signupUser } from "../api";
import bgImage from "../assets/background.jpg";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"landlord" | "tenant">("landlord");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error("You must agree to the Terms & Conditions");
      return;
    }

    if (password.length < 7) {
      toast.error("Password must be at least 7 characters long");
      return;
    }

    if (!/\d/.test(password)) {
      toast.error("Password must contain at least one number");
      return;
    }

    try {
      setLoading(true);

      const data = await signupUser({
        email,
        password,
        termsAndCondition: agreedToTerms,
        role,
      });

      console.log("Your OTP code is:", data.otp);

      toast.success("Account created! Check your email for the OTP.");

      navigate("/sendotp", {
        state: { email },
      });
    } catch (error) {
      const msg = axios.isAxiosError(error)
        ? error.response?.data?.message ||
          error.response?.data?.error ||
          error.message
        : "Something went wrong";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-center mb-1">
          Sign Up
        </h2>

        <p className="text-sm text-gray-500 text-center mb-4">
          I am creating an account as a
        </p>

        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setRole("landlord")}
            className={`flex-1 py-2 rounded-lg border-2 capitalize ${
              role === "landlord"
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-300 text-gray-700"
            }`}
          >
            Landlord
          </button>

          <button
            type="button"
            onClick={() => setRole("tenant")}
            className={`flex-1 py-2 rounded-lg border-2 capitalize ${
              role === "tenant"
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-300 text-gray-700"
            }`}
          >
            Tenant
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-1"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={7}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-red-500 mt-1">
              Must be at least 7 characters and contain a number.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) =>
                setAgreedToTerms(e.target.checked)
              }
            />

            I hereby declare that I have read and agree to the
            Terms and Conditions
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2.5 rounded-lg mt-2 disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-semibold"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;