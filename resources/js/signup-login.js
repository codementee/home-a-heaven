function redirectIfLoggedIn() {
    if(localStorage.user_id) {
        window.location = "/authorizedUser";
    }
}
redirectIfLoggedIn()


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

    fetch('http://localhost:3333/auth/login', {
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
                window.location = 'http://localhost:3333/authorizedUser'
            } else {
                loginFail.style.display = "block";
                loginFail.classList.add('failed_message');
                setTimeout(()=>{
                    loginFail.style.display = "none";
                    loginFormData[0].value = "";
                    loginFormData[1].value = "";
                }, 2200)
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
    const firstName = signupFormData[2].value;
    const lastName = signupFormData[3].value;

    fetch('http://localhost:3333/auth/register', {
            method: "post",
            headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                    firstname: firstName,
                    lastname: lastName
                })
        }).then(response => {
            return response.json()
        }).then(data => {
            if(!isNaN(data.id)){
                localStorage.user_id = data.id;
                registrationSuccess.style.display = "block";
                registrationSuccess.classList.add('success_message');
                registrationFail.style.display = "none";
                setInterval(function(){ 
                    window.location = "http://localhost:3333/authorizedUser";
            }, 2000);
            }else {
                registrationFail.style.display = "block";
                registrationFail.classList.add('failed_message');
                registrationSuccess.style.display = "none";
                setInterval(function(){ 
                    window.location = "http://localhost:3333/signup-login"
            }, 2000);

            }
        }).catch(err => {
            // console.log(err)

        })
})






