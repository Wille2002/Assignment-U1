"use strict"

document.getElementById("register").addEventListener("click", make_register_page)

function make_register_page(event) {
    let wrapper = document.getElementById("wrapper")
    wrapper.classList.toggle("register_account")
    if (wrapper.classList.contains("register_account")) {
        document.querySelector("h1").textContent = "REGISTER"
        document.getElementById("register").textContent = "Already have an account? Go to login"
        document.querySelector("h3").textContent = "Ready when you are..."
        document.querySelector("button").textContent = "Register"
    } else {
        document.querySelector("h1").textContent = "LOGIN"
        document.getElementById("register").textContent = "New to this? Register for free"
        document.querySelector("h3").textContent = "let the magic start"
        document.querySelector("button").textContent = "Login"
    }


}


