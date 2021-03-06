/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./resources/js/signup-login.js ***!
  \**************************************/
//switch between login and signup #START
var login = document.getElementById("login_header");
var signup = document.querySelector("#signup_header");
var loginForm = document.querySelector("#login_form");
var signupForm = document.querySelector("#signup_form");
var loginFormData = document.querySelectorAll("#login_form input");
var signupFormData = document.querySelectorAll("#signup_form input");
var registrationSuccess = document.querySelector('.registration_success_response');
var registrationFail = document.querySelector('.registration_fail_response');
var loginFail = document.querySelector('.login_fail_response');
login.addEventListener('click', function () {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
  login.classList.add("active");
  signup.classList.remove("active");
});
signup.addEventListener('click', function () {
  loginForm.style.display = "none";
  signupForm.style.display = "block";
  signup.classList.add("active");
  login.classList.remove("active");
}); //switch between login and signup #END
//collecting data from form
//collecting user data from login form

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var userEmail = loginFormData[0].value;
  var userPassword = loginFormData[1].value;
  var loginFailMsgField = document.querySelector('.login_fail_response p');
  fetch('http://localhost:3333/login', {
    method: "post",
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.result) {
      localStorage.user_id = data.id;
      localStorage.role = data.role;
      loginFail.style.display = "none";
      window.location = 'http://localhost:3333/';
    } else {
      loginFail.style.display = "block";
      loginFail.classList.add('failed_message');
      loginFailMsgField.innerText = data.message;
      loginFormData[1].value = ""; // setTimeout(()=>{
      //     loginFail.style.display = "none";
      //     loginFormData[1].value = "";
      // }, 2200)
    }
  })["catch"](function (err) {
    console.error(err);
  });
}); //collecting user data from signup form

signupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var userEmail = signupFormData[0].value;
  var userPassword = signupFormData[1].value;
  var firstName = signupFormData[2].value;
  var lastName = signupFormData[3].value;
  var failMessageField = document.querySelector('.registration_fail_response p');
  fetch('http://localhost:3333/register', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      role: 'customer',
      email: userEmail,
      password: userPassword,
      firstname: firstName,
      lastname: lastName
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (!isNaN(data.id)) {
      localStorage.user_id = data.id;
      localStorage.role = data.role;
      registrationSuccess.style.display = "block";
      registrationSuccess.classList.add('success_message');
      registrationFail.style.display = "none";
      setInterval(function () {
        window.location = "http://localhost:3333/";
      }, 2000);
    } else {
      registrationSuccess.style.display = "none";
      registrationFail.style.display = "block";
      registrationFail.classList.add('failed_message');
      failMessageField.innerText = data.message;
      setInterval(function () {// registrationFail.style.display = "none";
        // window.location = "http://localhost:3333/signup-login"
      }, 6000);
    }
  })["catch"](function (err) {// console.log(err)
  });
});

function redirectIfLoggedIn() {
  if (localStorage.user_id) {
    window.location = "/";
  }
}

redirectIfLoggedIn();
/******/ })()
;