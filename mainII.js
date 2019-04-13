// http://mysafeinfo.com/api/data?list=bestnovels&format=json
// http://mysafeinfo.com/api/data?list=nflseasonscores2015-2016&format=json
// http://mysafeinfo.com/api/data?list=nbafinals&format=json

let red = document.querySelector('#red');
let tbody = document.querySelector('tbody');
let myLink = document.querySelectorAll('.myLink');

for (let i = 0; i < myLink.length; i++) {
    myLink[i].addEventListener('click' , show);
}


let xml = new XMLHttpRequest();

xml.open('get', 'http://mysafeinfo.com/api/data?list=bestnovels&format=json');//zelim da napisem zahtev
xml.addEventListener('readystatechange' , function(){
    if (xml.readyState == 4 && xml.status == 200) {
       display();//ako se ovo desi onda mozemo da pozovemo neku funkciju i da sa njom radimo sta hocemo. 
    }
})
xml.send(); //zelim da posaljem zahtev

function display(){
    let data = JSON.parse(xml.responseText);
    let first = data[0];
    let text = "";
    for(let prop in first){ // prop je key u property-u
        text += '<th>' + prop + '</th>'
    }
    red.innerHTML = text;
    text = "";
    for (let i = 0; i < data.length; i++) {
        text += '<tr>';
        for (let prop in data[i]){
            text += '<td>' + data[i][prop] + '</td>'
        }
        text += '</tr>';
    }
    tbody.innerHTML = text;
}

function show(e){
    e.preventDefault();
    console.log(this.getAttribute('href'));
    
    xml.open('get', 'http://mysafeinfo.com/api/data?list=bestnovels&format=json');//zelim da napisem zahtev
    xml.addEventListener('readystatechange', function () {
        if (xml.readyState == 4 && xml.status == 200) {
            display();//ako se ovo desi onda mozemo da pozovemo neku funkciju i da sa njom radimo sta hocemo. 
        }
    })
    xml.send(); //zelim da posaljem zahtev  
}


//KADA SE POKRENE STRANICA DA SE VIDE KNJIGE, A DOK NE STIGNU DA IDE LOADING ANIMACIJA
//ISTO TAKO SVAKI PUT KADA SE KLIKNE NA NOVI TAB.
//DA SE OBELEZI AKTIVNA STRANICA

//EKSTRA: AKO JE NEKADA BIO NA NEKOJ STRANICI DA SE VISE NE POVLACE PODACI



// let person = {
//     name : "Danilo"
// }
// console.log(person['name']);