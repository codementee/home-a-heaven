//switch between login and signup #START
const login = document.getElementById("login_header");
const signup = document.querySelector("#signup_header");
const loginForm = document.querySelector("#login_form");
const signupForm = document.querySelector("#signup_form");
const loginFormData = document.querySelectorAll("#login_form input");
const signupFormData = document.querySelectorAll("#signup_form input");
const registrationSuccess = document.querySelector('.registration_success_response');
const registrationFail = document.querySelector('.registration_fail_response');
const loginFail = document.querySelector('.login_fail_response');

login.addEventListener('click', ()=>{
    signupForm.style.display = "none";
    loginForm.style.display = "block";
    login.classList.add("active");
    signup.classList.remove("active")
})

signup.addEventListener('click', ()=>{
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    signup.classList.add("active");
    login.classList.remove("active")
})
//switch between login and signup #END

//collecting data from form

//collecting user data from login form
loginForm.addEventListener('submit', function(e) {
	e.preventDefault();
    let userEmail = loginFormData[0].value;
    let userPassword = loginFormData[1].value;
    const loginFailMsgField = document.querySelector('.login_fail_response p')
    fetch('http://localhost:3333/login', {
            method: "post",
            mode: 'cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword
                })
        }).then(response => {
            return response.json()
        }).then(data => {
            if(data.result) {
                localStorage.user_id = data.id;
                localStorage.role = data.role;
                loginFail.style.display = "none";
                window.location = 'http://localhost:3333/adminOrders'
            } else {
                loginFail.style.display = "block";
                loginFail.classList.add('failed_message');
                loginFailMsgField.innerText = data.message;
                loginFormData[1].value = "";
            }
        })
        .catch(err=> {
            console.log(err)
        })
})


//collecting user data from signup form
signupForm.addEventListener('submit', function(e) {
	e.preventDefault();
    const userEmail = signupFormData[0].value;
    const userPassword = signupFormData[1].value;
    const failMessageField = document.querySelector('.registration_fail_response p')

    fetch('http://localhost:3333/register', {
            method: "post",
            headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    role: 'admin',
                    email: userEmail,
                    password: userPassword,
                    firstname: 'admin',
                    lastname: 'admin'
                })
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            if(!isNaN(data.id)){
                localStorage.user_id = data.id;
                localStorage.role = data.role;
                registrationSuccess.style.display = "block";
                registrationSuccess.classList.add('success_message');
                registrationFail.style.display = "none";
                setInterval(function(){
                    window.location = 'http://localhost:3333/adminOrders'
            }, 2000);
            }else {
                registrationSuccess.style.display = "none";
                registrationFail.style.display = "block";
                registrationFail.classList.add('failed_message');
                failMessageField.innerText = data.message;
                setInterval(function(){ 
                    // registrationFail.style.display = "none";
                    // window.location = "http://localhost:3333/signup-login"
            }, 6000);

            }
        }).catch(err => {
            console.error(err)

        })
})


function redirectIfLoggedIn() {
    if(localStorage.user_id) {
        window.location = "/";
    }
}
redirectIfLoggedIn();
