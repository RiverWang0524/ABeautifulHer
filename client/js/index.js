document.addEventListener("DOMContentLoaded",() => {render_post();})

async function get_post(){
    // alert('Hi')
    try {
        let res = await fetch('HTTP://127.0.0.1:3000/gallery/get_post');
        var response = await res.text();
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
    
}
 

async function render_post(){
    // alert('Hi')
    let response = await get_post();

    var people_data = JSON.parse(response);
    console.log(people_data);
    
    // render all posts
    const post_container = document.getElementsByClassName('g-3')[0];
    // const post_container = document.getElementsByClassName('container')[0];
    for (let i=0; i<people_data.length; i++){
        // convert skills into html strings
        var list_item = "";
        people_data[i].Skills.map((skill)=>{
            list_item += '<li class="list-group-item">'+skill+'</li>'
        })
        console.log(people_data[i].Skills);
        post_container.innerHTML += `
    <div class="col">
        <div class="card h-100">
            <div class="row d-flex flex-wrap align-items-center g-0">
                <div class="col-5 text-center">
                    <img src="${people_data[i].ImageURL}" alt="Cover image" class="thumbnail">
                </div>
                <div class="col-7 py-3 ml-6">
                    <div class="card-body">
                        <h5 class="card-title pb-0">${people_data[i].Name}</h5>
                        <p class="card-subtitle mb-2 text-muted">${people_data[i].Birthday}</p>
                        <p class="card-subtitle mb-2 text-muted">${people_data[i].Country}</p>
                    </div>
                </div>
            </div>
            <div class="row d-flex flex-wrap align-items-center g-0">
                <div class="px-3 pb-3 text-center">
    
                    <ul class="list-group mb-3">
                        <li class="list-group-item list-group-item-secondary fw-bold">Skills:</li>
                        ${list_item}
                    </ul>
                    <ul class="list-group mb-3">
                        <li class="list-group-item list-group-item-secondary fw-bold">About:</li>
                        <li class="list-group-item">${people_data[i].About}</li>
                    </ul>
                    <ul class="list-group mb-2">
                        <button type="button" class="btn btn-outline-dark viewperson" id="person001">Read
                            More</button>
                    </ul>
    
                </div>
            </div>
        </div>
    </div>`
    }
    configReadMoreBtns();
}

// make sure details are loaded when button is pressed
function configReadMoreBtns () {
    const btns = document.getElementsByClassName('viewperson');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', async function (event) {
            event.preventDefault();
            const id = this.id;
            const fetchurl = 'http://127.0.0.1:3000/people/' + id;
            try {
                const response = await fetch(fetchurl);
                const details = await response.json();
                loadDetails(details);
            } catch (error) {
                alert('Error: Unable to fetch details, please try again later');
            }
        });
    };
};

// load details of individual manhwa
function loadDetails (details) {
    document.getElementById('detailspane').hidden = false;
    document.getElementById('staticImage').src = details['ImageURL'];
    document.getElementById('staticName').innerHTML = details['Name'];
    document.getElementById('staticBirthday').innerHTML = details['Birthday'];
    document.getElementById('staticCountry').innerHTML = details['Country'];
    html = '';
    for (let x of details['Skills']) {
        html += '<li class="list-group-item">';
        html += x;
        html += '</li>';
    };
    document.getElementById('staticSkills').innerHTML = html;
    document.getElementById('staticLegacy').innerHTML = details['Legacy'];
    document.getElementById('staticAbout').innerHTML = details['About'];
};
