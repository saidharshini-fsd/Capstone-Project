import React from "react";
import Navbar from "../Navbar/Navbar";
import "./adminLogin.css";
import { useNavigate } from "react-router";

function AdminLogin() {
  let count = 0;
  let navigate = useNavigate();

  function adminPasswordValidate() {
    const password = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    if (password.value === "") {
      passwordError.innerText = "*Required";
    } else {
      passwordError.innerText = "";
    }
  }

  function loginAdminClick() {
    const password = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    if (password.value === "") {
      passwordError.innerText = "*Required";
    } else {
      if (password.value === "admin@123") {
        navigate("/admin");
      } else {
        passwordError.innerText = "*Invalid";
      }
    }
  }

  function showPasswordClick() {
    const password = document.getElementById("password");
    count++;
    if (count % 2 === 0) {
      password.setAttribute("type", "password");
    } else {
      password.removeAttribute("type");
    }
  }
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517178313064-9447953f46e8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGFyayUyMGZvb2R8ZW58MHx8MHx8fDA%3D')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
      <div className="adminLoginMainDiv shadow rounded p-3">
        <div className="">
          <label htmlFor="password" className="form-label text-white">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            aria-describedby="emailHelp"
            autoComplete="off"
            onKeyUp={() => adminPasswordValidate()}
          />
          <span id="passwordError" className="text-danger"></span>
        </div>
        <div className="mt-2 text-white">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onClick={() => showPasswordClick()}
          />{" "}
          Show password
        </div>
        <div className="text-center mt-2">
          <button
            className="btn btn-light btn-sm mt-2"
            onClick={() => loginAdminClick()}
          >
            Login as Admin
          </button>
        </div>
        <div className="text-center mt-2 text-white">
          <span>Password: admin@123</span>
        </div>
        <div className="text-center text-primary m-2 text-white">
          <h6 className="m-0 backToLogin" onClick={() => navigate("/")}>
            back to login
          </h6>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
