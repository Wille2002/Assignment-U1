"use strict"

function make_quiz_layout(un) {



    let body = document.querySelector("body")

    body.innerHTML = `
    <body"> 
    <div id="container">
    <div id="container_logo_Header">
    <img src="media/logo.png" alt="">
    <p id="header">Dog Breed Quiz</p>
    </div>
    
    <div id="log_out_menu">
    <p id="name"></p>
    <button id="log_out_button">logout</button>
    </div>
    
    <div id="div_containing_img">
    
    </div>
    
    <div id="options">
    </div>
    
    
    <p id="info_api">The Dog Breed Quiz is made possible thanks to the free API by <span>DOG CEO Zine</span></p>
    
    </div>
    
    </body>
    `
    document.getElementById("name").textContent = un

    localStorage.setItem("quiz_html", body.innerHTML)

    dog_quiz()
    document.getElementById("log_out_button").addEventListener("click", log_out)

}
document.getElementById("log_out_button").addEventListener("click", log_out)




function log_out(event) {
    localStorage.clear("quiz_html")
    document.querySelector("body").innerHTML = `<body>
    
    <div id="wrapper">
    <div id="container_logo_Header">
    <img src="media/logo.png" alt="">
    <p id="header">Dog Breed Quiz</p>
    </div>
    
    <h1>LOGIN</h1>
    
    
    <div class="input_fields">
    <h2>User Name:</h2>
    <input type="text" id="user_name">
    </div>
    <div class="input_fields">
    <h2>Password:</h2>
    <input type="password" id="password">
    </div>
    
    <h3>let the magic start</h3>
    
    <button id="login_or_register">Login</button>
    
    <div id="register">
    <p>New to this? Register for free</p>
    </div>
    
    <p id="info_api">The Dog Breed Quiz is made possible thanks to the free API by <span>DOG CEO Zine</span></p>
    
    </div>
    
    </body>`

    document.getElementById("register").addEventListener("click", make_register_page)
    document.querySelector("#login_or_register").addEventListener("click", username_or_login)


}
dog_quiz()

async function dog_quiz(params) {

    let random_number = get_number(ALL_BREEDS.length)
    let dog_url = ALL_BREEDS[random_number].url
    let dog_name = ALL_BREEDS[random_number].name

    const dog_rqst = new Request(`https://dog.ceo/api/breed/${dog_url}/images/random`)
    let response = await fetch_function(dog_rqst)

    let img_div = document.querySelector("#div_containing_img")
    let img = document.createElement("img")
    img_div.append(img)
    img.src = `${response.message}`

    make_quiz_buttons(4, dog_name)
}


function make_quiz_buttons(number, dog_name) {

    let random_button = get_number(4)

    let buttons_div = document.querySelector("#options")
    for (let i = 0; i < number; i++) {
        let option_buttons = document.createElement("button")
        buttons_div.append(option_buttons)
        option_buttons.classList.add("choose_a_dog")
        option_buttons.setAttribute("id", i)

    }


    let index_position = get_number(number)
    create_choises(index_position, dog_name)
}

// let right_awnser = document.getElementById(`${random_button}`)
//right_awnser.textContent = dog_name


function create_choises(index_position, correct_dog) {
    console.log(correct_dog);
    for (let i = 0; i < 4; i++) {
        let random_number = get_number(ALL_BREEDS.length)
        let dog_name = ALL_BREEDS[random_number].name
        document.getElementById(`${i}`).textContent = dog_name
    }
    document.getElementById(`${index_position}`).textContent = correct_dog

}


function get_number(length) {
    return Math.floor(Math.random() * length);
}