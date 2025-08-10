import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import registerLottieData from "../assets/lottie/register.json";
import loginPic from "../assets/loginpic.jpg";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(async (result) => {
        const userEmail = result.user.email;
        await axios.post(
          "https://blog-share-server.vercel.app/jwt",
          { email: userEmail },
          {
            withCredentials: true,
          }
        );

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google Sign-in Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Google Sign-in Failed",
          text: error.message,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        const user = { email: email };
        axios
          .post("https://blog-share-server.vercel.app/jwt", user, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
          });
        e.target.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log("Firebase login error:", error.code);

        switch (error.code) {
          case "auth/user-not-found":
            Swal.fire({
              icon: "error",
              title: "User Not Found",
              text: "No user found with this email.",
            });
            break;

          case "auth/wrong-password":
            Swal.fire({
              icon: "error",
              title: "Wrong Password",
              text: "The password you entered is incorrect.",
            });
            break;

          case "auth/invalid-email":
            Swal.fire({
              icon: "warning",
              title: "Invalid Email",
              text: "Please enter a valid email address.",
            });
            break;

          case "auth/too-many-requests":
            Swal.fire({
              icon: "info",
              title: "Too Many Attempts",
              text: "Please wait and try again later.",
            });
            break;

          default:
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: "Something went wrong. Please try again.",
            });
        }
      });
  };

  return (
    <div
      className="mt-2 min-h-screen max-w-7xl mx-auto flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(203,195,227,0.99), rgba(170,152,169,0.85))",
        border: "1.5px solid rgba(170, 152, 169, 0.5)",
      }}
    >
      <div className="relative w-full max-w-7xl h-full rounded-3xl overflow-hidden flex">
        {/* Left side image hidden on small screens */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={loginPic}
            alt="Login Illustration"
            className="object-cover h-full w-full rounded-l-3xl"
            loading="lazy"
          />
        </div>

        {/* Right side form container */}
        <div className="w-full lg:w-1/2 bg-[#2A2540] rounded-r-3xl p-6 sm:p-8 flex flex-col justify-center items-center max-w-md mx-auto">
          <div className="w-40 h-40 mb-6 mx-auto">
            <Lottie animationData={registerLottieData} loop={true} />
          </div>

          <h2
            className="text-3xl font-semibold text-[#AA98A9] mb-6 text-center"
            style={{ letterSpacing: "0.05em" }}
          >
            Login to Your Account
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full" autoComplete="off">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="input input-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-[#AA98A9]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input input-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-[#AA98A9]"
            />

            <div className="text-right">
              <a
                href="#"
                className="text-[#8B74A4] hover:text-[#A58BBE] text-sm transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-[#5F4D7A] to-[#8B74A4] hover:from-[#8B74A4] hover:to-[#A58BBE] text-white font-bold text-lg transition-all duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-[#AA98A9] text-sm">
            New to this website?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-600 font-semibold">
              Register Now
            </Link>
          </p>

          <button
            onClick={handleSignInWithGoogle}
            className="btn w-full mt-6 flex items-center justify-center gap-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 text-gray-700 shadow-md hover:bg-gray-100 transition-all"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
