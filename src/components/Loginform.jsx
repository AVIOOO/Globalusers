// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../reducers/loginUser";

// const LoginForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, error } = useSelector((state) => state.auth);

//   const [email, setEmail] = useState("eve.holt@reqres.in");
//   const [password, setPassword] = useState("cityslicka");
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");

//     if (storedToken) {
//       setToken(storedToken);
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const resultAction = await dispatch(loginUser({ email, password }));

//     // Check if login was successful
//     if (loginUser.fulfilled.match(resultAction)) {
//       navigate("/users"); // Redirect to /users only on success
//     } else {
//       console.error("Login failed:", resultAction.payload);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center text-gray-700">
//           Login
//         </h2>
//         <form onSubmit={handleSubmit} className="mt-4">
//           <div className="mb-4">
//             <label className="block text-gray-600 text-sm mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-600 text-sm mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//             disabled={status === "loading"}
//           >
//             {status === "loading" ? "Logging in..." : "Login"}
//           </button>

//           {/* Show Error Message */}
//           {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/loginUser";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/users");
    } else {
      console.error("Login failed:", resultAction.payload);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">Login to continue</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
