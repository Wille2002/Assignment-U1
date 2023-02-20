"use strict"

function make_quiz_layout(un) {
    let body = document.querySelector("body")
    body.innerHTML = `
    <body>
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
         <div>
             <button id="btn_1"></button>
             <button id="btn_2"></button>
             <button id="btn_3"></button>
             <button id="btn_4"></button>
         </div>


        <p id="info_api">The Dog Breed Quiz is made possible thanks to the free API by <span>DOG CEO Zine</span></p>

    </div>

    </body>
`
    document.getElementById("name").textContent = un

    localStorage.setItem("quiz_html", body.innerHTML)



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

    <script src="js/login_register.js"></script>
    <script src="js/quiz.js"></script>
</body>`

}
