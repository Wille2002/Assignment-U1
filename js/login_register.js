"use strict"

document.getElementById("register").addEventListener("click", make_register_page)

function make_register_page(event) {
    let wrapper = document.getElementById("wrapper")
    wrapper.classList.toggle("register_account")
    if (wrapper.classList.contains("register_account")) {
        document.querySelector("h1").textContent = "REGISTER"
        document.getElementById("register").textContent = "Already have an account? Go to login"
        document.querySelector("h3").textContent = "Ready when you are..."
        document.querySelector("#login_or_register").textContent = "Register"
    } else {
        document.querySelector("h1").textContent = "LOGIN"
        document.getElementById("register").textContent = "New to this? Register for free"
        document.querySelector("h3").textContent = "let the magic start"
        document.querySelector("#login_or_register").textContent = "Login"
    }



}

document.querySelector("#login_or_register").addEventListener("click", username_or_login)

async function username_or_login(event) {

    let user_name = document.querySelector("#user_name").value
    let password = document.querySelector("#password").value


    let body_post = {
        action: "register",
        user_name: `${user_name}`,
        password: `${password}`,
    }

    const options = {
        method: `POST`,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(body_post),
    }



    if (event.target.textContent === "Register") {

        let post_rqst = new Request(`https://teaching.maumt.se/apis/access/`, options)

        fetch_function(post_rqst)
    }
    if (event.target.textContent === "Login") {
        let rqst = new Request(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${body_post.user_name}&password=${body_post.password}`)
        fetch_function(rqst)
    }
}

async function fetch_function(url) {
    let response = await fetch(url)
    let resource = await response.json()
    console.log(resource);
    console.log(response);
    return resource
}


