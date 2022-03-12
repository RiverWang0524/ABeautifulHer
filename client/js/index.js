// const { get } = require("express/lib/response");

// document.addEventListener("DOMContentLoaded",() => {
//     alert("Hi")
//     fetch('http://127.0.0.1:3000/gallery')
//     .then(response => console.log(response.text()))
//     // response.ok
//     .then(body => {
//         alert("Hi");
//         document.getElementById('content').innerHTML=body;
//         render_post();
//     })
//     // .then(get_post())
//     .catch( (error => alert(error)))
//  })

// alert('Hi');

async function get_post(){
    // alert('Hi')
    try {
        let res = await fetch('HTTP://127.0.0.1:3000/gallery/get_post');
        var response = await res.text();
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
    
}
 

async function render_post(){
    // alert('Hi')
    let response = await get_post();

    var people_data = JSON.parse(response);
    // render all posts
    const post_container = document.getElementsByClassName('g-3')[0];
    for (let i=0; i<people_data.length; i++){
        post_container.innerHTML += '<div class="col">'
        post_container.innerHTML += '<div class="card shadow-sm">'
        post_container.innerHTML += '<img class="bd-placeholder-img card-img-top" width="100%" height="225" src="'+people_data[i].ImageURL+'" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"></img>'
        post_container.innerHTML += '<div class="card-body">'
        post_container.innerHTML += '<p class="card-text">'+people_data[i].About+'</p>'
        post_container.innerHTML += '<div class="d-flex justify-content-between align-items-center">'
        post_container.innerHTML += '<div class="btn-group">'
        post_container.innerHTML += '<button type="button" class="btn btn-sm btn-outline-secondary">View</button>'
        post_container.innerHTML += '<button type="button" class="btn btn-sm btn-outline-secondary">Like</button>'
        post_container.innerHTML += '</div>'
        post_container.innerHTML += '<small class="text-muted">'+people_data[i].Name+'</small>'
        post_container.innerHTML += '</div>'
        post_container.innerHTML += '</div>'
        post_container.innerHTML += '</div>'
        post_container.innerHTML += '</div>'
    }
}

render_post()