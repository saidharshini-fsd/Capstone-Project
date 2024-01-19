import React from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
// import { GoogleLogin } from '@react-oauth/google';
// import jwtDecode from 'jwt-decode';
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  var count = 0;
  let navigate = useNavigate();

  useEffect(() => {
    getAllRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllRecipes() {
    try {
      let res = await axios.get("https://recipe-wbww.onrender.com/recipes");
      sessionStorage.setItem("recipes", JSON.stringify(res.data));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          errorToastMessage();
        }
      } else {
        errorToastMessage();
      }
    }
  }

  function emailValidate() {
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    if (email.value === "") {
      emailError.innerText = "*Required";
    } else {
      emailError.innerText = "";
    }
  }

  function passwordValidate() {
    const password = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    if (password.value === "") {
      passwordError.innerText = "*Required";
    } else {
      passwordError.innerText = "";
    }
  }

  async function loginClick() {
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const password = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (email.value === "") {
      emailError.innerText = "*Required";
    } else {
      if (email.value.match(emailPattern)) {
        emailError.innerText = "";
      } else {
        emailError.innerText = "*Invalid";
      }
    }
    if (password.value === "") {
      passwordError.innerText = "*Required";
    } else {
      passwordError.innerText = "";
    }
    if (emailError.innerText === "" && passwordError.innerText === "") {
      try {
        let res = await axios.get(
          `https://recipe-wbww.onrender.com/users/login/${email.value}/${password.value}`
        );
        console.log(res)
        sessionStorage.setItem(
          "userData",
          JSON.stringify(res.data.userData[0])
        );
        sessionStorage.setItem("token", JSON.stringify(res.data.tokenData));
        successToastMessage();
        setTimeout(() => {
          navigate("/home");
        }, 3500);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            warnToastMessage();
          }
        } else {
          errorToastMessage("");
        }
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

  // const response = async (res) => {
  //     let password = '';
  //     let userObject = jwtDecode(res.credential);
  //     let loginError = document.getElementById('loginError');
  //     axios.get(`https://recipe-wbww.onrender.com/login?email=${userObject.email}&password=${password}`)
  //         .then((res) => {
  //             if (res.data.message === "Login Successful") {
  //                 axios.get('https://recipe-wbww.onrender.com/allRecipes')
  //                     .then((res) => {
  //                         sessionStorage.setItem('allRecipes', JSON.stringify(res.data))
  //                     })
  //                     .catch((error) => {
  //                         console.log(error);
  //                     })
  //                 setOpen(true)
  //                 sessionStorage.setItem('userData', JSON.stringify(userObject));
  //                 setTimeout(() => {
  //                     navigate('/home')
  //                 }, 2000);
  //             }
  //             else {
  //                 loginError.innerText = "*Email address not exist"
  //                 setTimeout(() => {
  //                     loginError.innerText = ""
  //                 }, 3000);
  //             }
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         })
  // }

  // const error = (error) => {
  //     console.log(error)
  // }

  function successToastMessage() {
    toast.success("Login successful", {
      position: "bottom-left",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function warnToastMessage() {
    toast.warn("Invalid login credentials !", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function errorToastMessage() {
    toast.error("Something went wrong. Please try again !", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <>
      <Navbar myProfile={false} logout={false} />
      <div
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/031/425/067/non_2x/thanks-giving-flat-lay-in-wooden-board-table-with-copy-space-ai-generated-free-photo.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
      </div>

      <div className="loginMainDiv shadow rounded mt-4" style={{}}>
        <div className="text-center">
          <h3 style={{ color: "white" }}>Login</h3>
        </div>
        <div>
          <label
            htmlFor="email"
            className="form-label"
            style={{ color: "white" }}
          >
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            autoComplete="off"
            onKeyUp={() => emailValidate()}
          />
          <span id="emailError" className="text-danger"></span>
        </div>
        <div className="mt-3">
          <label htmlFor="password" style={{ color: "white" }}className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            aria-describedby="emailHelp"
            autoComplete="off"
            onKeyUp={() => passwordValidate()}
          />
          <span id="passwordError" className="text-danger"></span>
        </div>
        <div className="mt-2">
          <input
          style={{ color: "white" }}
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            
            onClick={() => showPasswordClick()}
          />{" "}
          Show password
        </div>
        <div className="text-center mt-3">
          <button
            type="button"
            class="btn btn-dark"
            onClick={() => loginClick()}
            style={{ color: "white" }}
          >
            Login
          </button>
          {/* <div className="" style={{ width: 'fit-content', marginLeft: '60px', marginTop: '10px' }}>
                        <div>
                            <GoogleLogin onSuccess={response} onError={error} />
                        </div>
                    </div> */}
          <h6
            className="mt-3 hoverText"
            style={{ color: "white" }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            new user? <span className=" text-dark text-decoration-underline">create account</span>
          </h6>
          <h6
            className=" hoverText"
            style={{ color: "white" }}
            onClick={() => {
              navigate("/change-password");
            }}
          >
            forgot password? <span className="text-dark text-decoration-underline">click here</span>
          </h6>
          <button
            className="btn btn-outline-primary btn-sm mt-2"
            style={{ color: "white" }}
            onClick={() => navigate("/admin-login")}
          >
            <i className="fa-solid fa-circle-user"></i> click here for admin
            login
          </button>
        </div>
        {/* <div className="text-center mt-3 border rounded p-2">
          <span style={{ color: "white" }}>Test login credentials</span>
          <br />
          <span style={{ color: "white" }}>
            Email address: userone@gmail.com
          </span>
          <br />
          <span style={{ color: "white" }}>Password: userone</span>
        </div> */}
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
