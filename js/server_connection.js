"use strict"



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

