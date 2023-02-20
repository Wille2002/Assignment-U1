"use strict"

document.getElementById("register").addEventListener("click", make_register_page)

if (localStorage.getItem("quiz_html")) {
    document.querySelector("body").innerHTML = localStorage.getItem("quiz_html")
}

function make_register_page(event) {
    let wrapper = document.getElementById("wrapper")
    wrapper.classList.toggle("register_account")
    if (wrapper.classList.contains("register_account")) {
        document.querySelector("h3").classList.remove("wrong_login")
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

        make_feedback_square(post_rqst)

    }
    if (event.target.textContent === "Login") {
        let get_rqst = new Request(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${body_post.user_name}&password=${body_post.password}`)
        feedback_login(get_rqst)
    }
}




async function fetch_function(url) {
    let response = await fetch(url)
    let resource = await response.json()
    if (response.status !== 200) {
        return response
    }
    console.log(response);
    console.log(resource);
    return resource
}






async function feedback_login(get_rqst) {

    let wrapper = document.querySelector("#wrapper")
    let body = document.querySelector("body")
    wrapper.classList.add("feedback")
    let feedback = document.createElement("div")
    feedback.textContent = "Contacting server..."
    body.appendChild(feedback)
    feedback.classList.add("connecting")

    let response = await fetch_function(get_rqst)

    let wrong_login = document.querySelector("h3")

    switch (response.status) {

        case 418:
            feedback.textContent = "The server think it`s not a teapot"

            feedback.classList.add("feedback_square")
            let closing_button = document.createElement("button")
            closing_button.textContent = "CLOSE"
            feedback.appendChild(closing_button)
            closing_button.classList.add("feedback_button_close")
            closing_button.addEventListener("click", remove_closing_button)
            break;

        default:
            wrong_login.classList.add("wrong_login")
            wrong_login.textContent = "Wrong user name or password"
            wrapper.classList.remove("feedback")
            feedback.remove()

            break;

    }
    let user = document.querySelector("#user_name").value
    let pass = document.querySelector("#password").value


    if (response.data.password === pass && response.data.user_name === user) {

        make_quiz_layout(user)
    }
}






async function make_feedback_square(post_rqst) {
    let wrapper = document.querySelector("#wrapper")
    let body = document.querySelector("body")
    wrapper.classList.add("feedback")
    let feedback = document.createElement("div")
    feedback.textContent = "Contacting server..."
    body.appendChild(feedback)
    feedback.classList.add("connecting")




    let response = await fetch_function(post_rqst)


    switch (response.status) {
        case 418:
            feedback.textContent = "The server think it`s not a teapot"
            break;
        case 409:
            feedback.textContent = "Sorry that name is taken. Please try with another one"
            break
        case 400:
            feedback.textContent = "Bad request"
            break
        default:
            feedback.textContent = "Registration Complete. Please proceed to Login"

            break;

    }

    feedback.classList.add("feedback_square")
    let closing_button = document.createElement("button")
    closing_button.textContent = "CLOSE"
    feedback.appendChild(closing_button)
    closing_button.classList.add("feedback_button_close")
    closing_button.addEventListener("click", remove_closing_button)




}




function remove_closing_button(event) {

    let div = document.querySelector(".feedback_square")
    div.remove()
    document.querySelector("#wrapper").classList.remove("feedback")
}