// load data when screen loads
window.addEventListener('load', async function (event) {
    event.preventDefault();
    try {
        let response = await fetch('http://127.0.0.1:8090/people');
        let body = await response.json();
        loadPeople('galleryalbum', body);
    } catch (error) {
        alert('Error: ' + error);
    }
});

// load people on site
function loadPeople (mediumID, json) {
    let html = '';
    for (let i = 0; i < json.length; i++) {
        const id = json[i]['ID'];
        const name = json[i]['Name'];
        const bday = json[i]['Birthday'];
        const country = json[i]['Country'];
        const dp = json[i]['Image URL'];
        const about = json[i]['About'];
        const skills = json[i]['Skills'];
        const legacy = json[i]['Legacy'];
        html += '<div class="col"><div class="card h-100"><div class="row d-flex flex-wrap align-items-center g-0"><div class="col-5 text-center"><img src="';
        html += dp;
        html += '" alt="Cover image" class="thumbnail"></div><div class="col-7 py-3 ml-6"><div class="card-body"><h5 class="card-title pb-0">';
        html += name;
        html += '</h5><p class="card-subtitle mb-2 text-muted">';
        html += bday;
        html += '</p><p class="card-subtitle mb-2 text-muted">';
        html += country;
        html += '</p></div></div></div><div class="row d-flex flex-wrap align-items-center g-0"><div class="px-3 pb-3 text-center"><ul class="list-group mb-3"><li class="list-group-item list-group-item-secondary fw-bold">Skills:</li>';
        for (let x of skills) {
            html += '<li class="list-group-item">';
            html += x;
            html += '</li>';
        };
        html += '</ul><ul class="list-group mb-3"><li class="list-group-item list-group-item-secondary fw-bold">Legacy:</li><li class="list-group-item">';
        html += legacy;
        html += '</li></ul><ul class="list-group mb-2"><button type="button" class="btn btn-outline-dark viewperson" id="';
        html += id;
        html += '">Read More</button></ul></div></div></div></div>'
    };
    const medium = document.getElementById(mediumID);
    medium.innerHTML = html;
};