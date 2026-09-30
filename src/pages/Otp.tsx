import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { verifyOtp } from "../api";
import bgImage from "../assets/background.jpg";

function Otp() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromSignup =
    (location.state as { email?: string } | null)?.email ?? "";

  const [email, setEmail] = useState(emailFromSignup);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      await verifyOtp({ email, otp });

      toast.success("Account verified! You can now log in.");
      navigate("/signin");
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
          Verify Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          We sent a code to your email. Enter the 6-digit OTP below.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
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
            <label htmlFor="otp" className="block text-sm font-semibold mb-1">
              6-digit OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              maxLength={6}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2.5 rounded-lg mt-2 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>

          <p className="text-center text-sm mt-2">
            Already verified?{" "}
            <Link to="/signin" className="text-blue-500 font-semibold">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Otp;
