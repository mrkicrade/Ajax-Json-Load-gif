// http://mysafeinfo.com/api/data?list=bestnovels&format=json
// http://mysafeinfo.com/api/data?list=nflseasonscores2015-2016&format=json
// http://mysafeinfo.com/api/data?list=nbafinals&format=json

let red = document.querySelector('#red');
let tbody = document.querySelector('tbody');
let myLink = document.querySelectorAll('.myLink');
let link1 = 'http://mysafeinfo.com/api/data?list=bestnovels&format=json'
let link2 = 'http://mysafeinfo.com/api/data?list=nflseasonscores2015-2016&format=json'
let link3 = 'http://mysafeinfo.com/api/data?list=nbafinals&format=json'
let links = [link1, link2, link3];
let h3 = document.querySelector('h3');
let naslov = ['Books', 'NFL', 'NBA'];
let myLi = document.querySelectorAll('li');
let loading = document.querySelector('#loading');
let tabela = document.querySelector('#tabela');
let baza = [];

for (let i = 0; i < myLink.length; i++) {
    myLink[i].addEventListener('click' , show);
    myLink[i].id = i;
    myLi[i].id = i;
}

let xml = new XMLHttpRequest();

xml.open('get', link1); //zelim da napisem zahtev
xml.addEventListener('readystatechange' , function(){
    if (xml.readyState == 4 && xml.status == 200) {
       display();//ako se ovo desi onda mozemo da pozovemo neku funkciju i da sa njom radimo sta hocemo. 
        loading.style.display = 'none';
    }
})
xml.send(); //zelim da posaljem zahtev

function display(){
    let data = JSON.parse(xml.responseText);
    let first = data[0];
    console.log(data);
    baza.push(data);
    console.log(baza);
    
    // removeDuplicates();
    function removeDuplicates(){
        let novaBaza = [];
        // for (let i = 0; i < baza.length; i++) {
            if (baza.indexOf(data) == -1) {
                novaBaza.push(data)
            }
        // }
        // return novaBaza()
        console.log(baza);
        console.log(novaBaza);
    }
    
    
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
    for (let i = 0; i < myLi.length; i++) {
        myLi[i].classList.remove('active');
    }
    tbody.innerHTML = '<img id="loading" src="images/loading_icon.gif" alt="">';
    h3.innerHTML = naslov[this.id];
    myLi[this.id].className = 'active';
    e.preventDefault();
    // console.log(this.getAttribute('href'));
    
    xml.open('get', links[this.id]); //zelim da napisem zahtev
    xml.addEventListener('readystatechange', function () {
        if (xml.readyState == 4 && xml.status == 200) {
            loading.style.display = 'none';
            display();//ako se ovo desi onda mozemo da pozovemo neku funkciju i da sa njom radimo sta hocemo. 
        }
    })
    xml.send(); //zelim da posaljem zahtev  
    // console.log(xml);
    
    // localStorage.links = JSON.stringify(links[this.id]);
}

// function show1(){
//     if (condition) {
        
//     }
    
// }



