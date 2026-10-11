let menuToggle = document.querySelector(".menuToggle");
let Links = document.querySelector(".Links");
let TotalMovieH = document.querySelector(".TotalMovieH");
let HighestRateH = document.querySelector(".HighestRateH");
let AverageRateH = document.querySelector(".AverageRateH");
let CardsInBox = document.querySelector(".CardsInBox");

//selects
let GenreSelect = document.querySelector(".GenreSelect");
let SortSelect = document.querySelector(".SortSelect");

//resetBtn
let ResetBtn = document.querySelector(".ResetBtn");

//Send Message btn
let SendBtn = document.querySelector(".SendBtn");
//Inputs for Message Send
let name1 = document.getElementById("name");
let email = document.getElementById("email");
let textA = document.getElementById("textA");

let namerror = document.querySelector(".namerror");
let Emailerror = document.querySelector(".Emailerror");
let textareaerror = document.querySelector(".textareaerror");
let SentP = document.querySelector(".SentP");



let lis = document.querySelectorAll("li");

let SearchInp = document.getElementById("SearchInp");



let CardsDiv = document.querySelector(".CardsDiv");
let Movies = [
    {id:1, title:"Top Gun: Maverick",year:2022, genre:"Action", rating:8.2, imagine: "./MovieImgs/TopGun.jpg",description: "The story involves Maverick confronting his past while training a group of younger Top Gun graduates, including the son of his deceased best friend, for a dangerous mission."},
    {id:2, title:"The Hangover",year:2009, genre:"Comedy", rating:7.7, imagine: "./MovieImgs/Hangover.webp",description: "Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night and the bachelor missing. They must make their way around the city in order to find their friend in time for his wedding."},
    {id:3, title:"Obsession",year:2026, genre:"Horror", rating:7.8, imagine: "./MovieImgs/Obsession.webp",description: "After breaking the mysterious 'One Wish Willow' to win his crush's heart, a hopeless romantic finds himself getting exactly what he asked for but soon discovers that some desires come at a dark, sinister price."},
    {id:4, title:"Step Brothers",year:2008, genre:"Comedy", rating: 6.9, imagine: "./MovieImgs/StepBros.jpg",description: "Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry."},
    {id:5, title:"The Drama",year:2026, genre:"Drama", rating:7.1, imagine: "./MovieImgs/TheDrama.webp",description: "A happily-engaged couple is put to the test when an unexpected turn sends their wedding week off the rails."},
    {id:6, title:"Arrival",year:2016, genre:"Sci-Fi", rating:7.9, imagine: "./MovieImgs/Arrival.jpg",description: "Linguist Louise Banks leads a team of investigators when gigantic spaceships touch down around the world. As nations teeter on the verge of global war, Banks and her crew must find a way to communicate with the extraterrestrial visitors."}

]

lis.forEach(li=>{
   li.onclick = () =>{
       lis.forEach(l =>{
          l.classList.remove("Active")
       })
       li.classList.add("Active")
   }
})

menuToggle.addEventListener("click",()=>{
    Links.classList.toggle("hide")
})

function renderMovies() {

   Movies.forEach(movie=>{
         let Card = document.createElement("div");
         Card.classList.add("Card");

         Card.innerHTML = `
        <div class="CardUpDiv">
            <img src="${movie.imagine}" alt="">
        </div>
        <div class="CardImgUp">
            <h3>★ <span>${movie.rating}</span></h3>
            <button class="Click"><i class="fa-solid fa-heart"></i></button>

        </div>
        <div class="CardImgDown">
            <h4>${movie.genre} · ${movie.year}</h5>
            <h1>${movie.title}</h2>
        </div>
        <div class="DownCardDiv">
            <h4>Year: <span>${movie.year}</span> <p></p> Genre: <span class="GenreH">${movie.genre}</span> <p></p> ★ <span>${movie.rating}</span></h4>
            <button class="DetailsBtn" data-id= "${movie.id}">Details <span>→</span></button>
        </div>
         
         `
         CardsDiv.appendChild(Card)
   }) 

}

CardsDiv.addEventListener("click", (event)=>{
    let ClickBtn =  event.target.closest(".Click");
    if(ClickBtn){
        ClickBtn.classList.toggle("Clicked")
        Click()
        return
    }

    let detailsBtn = event.target.closest(".DetailsBtn");

    if(detailsBtn){

          let btnID = detailsBtn.dataset.id;

    let movie = Movies.find(m => m.id == btnID);


    if(movie){
          let Modal = document.createElement("div");
          Modal.classList.add("Modal");

          Modal.innerHTML =  `
            <div class="DivImgModal"><img src="${movie.imagine}" alt=""></div>

           <div class="ModalInfo">
              <div class="needed121">
                   <h5><span class="ModalGenre">${movie.genre}</span> · <span class="ModalYear">${movie.year}</span></h5>
                   <h1>${movie.title}</h1>
                   <h4>★ <span class="ModalRate">${movie.rating}</span>  / 10</h4>
                   <h3 class="ModalDesc">${movie.description}</h3>
              </div>
               <button class="CloseBtn">Close <i class="fa-solid fa-xmark"></i></button>
           </div>`

            document.body.appendChild(Modal);
            Modal.style.display = 'flex'

            let CloseBtn = Modal.querySelector(".CloseBtn")
              CloseBtn.addEventListener("click",()=>{
              Modal.remove()
            })
         }
    }

  
})
function Click(){
    let Cards = document.querySelectorAll(".Card");
    let ClickedCount = 0;

    for(let i = 0; i < Cards.length; i++){
        let btn = Cards[i].querySelector(".Click")
        if(btn.classList.contains("Clicked")){
            ClickedCount++
        }
    }
    
   let ClickedHearts = document.querySelector(".ClickedHearts");
   ClickedHearts.innerHTML = ClickedCount
}
function SearchSelectDe(){
     let SearchValue = SearchInp.value.toLowerCase();
     let GenreSel = GenreSelect.value;

     let FilteredMovies = Movies.filter(movie =>{
         let searched = movie.title.toLowerCase().includes(SearchValue); 
         let Selected = GenreSel === "All genres" || GenreSel === movie.genre;
         return searched && Selected
     })

     if(SortSelect.value === "HighLow"){
         FilteredMovies.sort((a,b) => b.rating - a.rating)
     }else if(SortSelect.value === "LowHigh"){
        FilteredMovies.sort((a,b) => a.rating - b.rating)
     }else if(SortSelect.value === "Newest"){
        FilteredMovies.sort((a,b) => b.year - a.year)
     }else if(SortSelect.value === "Oldest"){
        FilteredMovies.sort((a,b) => a.year - b.year)
     }

     CardsDiv.innerHTML = ""
     FilteredMovies.forEach(movie =>{
            let Card = document.createElement("div");
         Card.classList.add("Card");

         Card.innerHTML = `
        <div class="CardUpDiv">
            <img src="${movie.imagine}" alt="">
        </div>
        <div class="CardImgUp">
            <h3>★ <span>${movie.rating}</span></h3>
            <button class="Click"><i class="fa-solid fa-heart"></i></button>

        </div>
        <div class="CardImgDown">
            <h4 >${movie.genre} · ${movie.year}</h5>
            <h1>${movie.title}</h2>
        </div>
        <div class="DownCardDiv">
            <h4>Year: <span>${movie.year}</span> <p></p> Genre: <span class="GenreH">${movie.genre}</span> <p></p> ★ <span>${movie.rating}</span></h4>
            <button class="DetailsBtn" data-id ="${movie.id}">Details <span>→</span></button>
        </div>
         
         `
         CardsDiv.appendChild(Card)

    })


    statistics()


}

function Search(){
  SearchSelectDe()
}

function statistics(){

    let rates = Movies.reduce((a,b) =>{
        a.push(b.rating);
        return a
    },[]);
    
    let HighestRate = Math.max(...rates);

    
    let Total = Movies.reduce((a,b) => a += b.rating,0);
    let Average = (Total / Movies.length).toFixed(1)


    TotalMovieH.innerHTML = Movies.length;
    HighestRateH.innerHTML = HighestRate;
    AverageRateH.innerHTML = Average;
    CardsInBox.innerHTML = CardsDiv.children.length;

}

function Selects(){
    SearchSelectDe()
}
function sort(){
     SearchSelectDe()
}

ResetBtn.addEventListener("click", () =>{
    SearchInp.value = ""
    GenreSelect.selectedIndex = 0;
    SortSelect.selectedIndex = 0;
    SearchSelectDe()
})

SearchInp.addEventListener("input", Search)
GenreSelect.addEventListener("change", Selects)
SortSelect.addEventListener("change", sort)



SendBtn.addEventListener("click",(event)=>{
    event.preventDefault();

    let sent = true;


    if(name1.value === "" || name1.value === " "){
        name1.style.border = "1px solid var(--red)"
        namerror.style.display = "flex"
        sent = false
    }else{
        namerror.style.display = "none"
        name1.style.border = "none"
    }

    if(textA.value === "" || textA.value === " "){
        textA.style.border = "1px solid var(--red)"
        textareaerror.style.display = "flex"
        sent = false
    }else{
        textareaerror.style.display = "none"
        textA.style.border = "none"
    }

    if(email.value === "" || email.value === " " || !email.value.includes("@") || !((email.value.toLowerCase())).includes("gmail.com")){
        email.style.border = "1px solid var(--red)"
        Emailerror.style.display = "flex"
        sent = false
    }else{
        Emailerror.style.display = "none"
        email.style.border = "none"
    }

    if(sent){
        SentP.style.display = "flex"
        email.style.border = "none"
        textA.style.border = "none"
        name1.style.border = "none"

        textA.value = ""
        email.value = ""
        name1.value = ""
    }else{
        SentP.style.display = "none"
    }
})

renderMovies()
statistics()















// some cute effect
let MainDiv = document.querySelector(".MainDiv");

if(MainDiv){

    let smth = false;

    MainDiv.addEventListener("mousemove",(event) =>{
        if(!smth){
            window.requestAnimationFrame(() =>{
                const thing = MainDiv.getBoundingClientRect();
                const mouseX = event.clientX - thing.left;
                const mouseY = event.clientY - thing.top;
                 MainDiv.style.setProperty("--mouse-x", `${mouseX}px`);
                 MainDiv.style.setProperty("--mouse-y", `${mouseY}px`);
                 smth = false;
            })
            smth = true;
        }

        MainDiv.addEventListener("mouseleave",()=>{
             MainDiv.style.setProperty("--mouse-x", "50px");
             MainDiv.style.setProperty("--mouse-y", "50px");
        })
    })
}