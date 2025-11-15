let gameLinks = document.querySelectorAll(".gameLinks")
let gameContainer = document.querySelector(".gameContainer")
let home = document.getElementById("home")
let gameData = document.getElementById("gameData")
let gamesArr = []

for ( let i = 0 ; i < gameLinks.length ; i++){
    gameLinks[i].addEventListener("click" , function(e){
    var gameGenre = gameLinks[i].innerHTML
    // console.log(e.target.innerHTML);
    displayGames(gameGenre)
})
}


async function displayGames(gameGenre) {
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'f8bc025352mshcb9bd43f165a006p1f82c0jsndae2fffbcbd2',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

    let games = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${gameGenre}` , options)
    let response = await games.json()
    gamesArr.push(response)
    let showInfo = document.querySelectorAll(".showInfo")
    let cartona = ""
    for ( let i = 0 ; i < response.length ; i++){
        cartona += `<div class="col-lg-3 col-md-4 col-sm-6 position-relative showInfo" data-gameId = "${response[i].id}">
              <div class="card h-100 pt-3 px-3 pb-0  border-black bg-transparent text-white">
                <div class="position-relative">
                <img src="${response[i].thumbnail}" class="card-img-top w-100" alt="...">
                 <div class="layer"></div>
                </div>
                <div class="card-body px-0">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="card-title">${response[i].title}</h5>
                    <button class="gameBtn btn">Free</button>
                  </div>
                  <p class="card-text text-secondary text-center">${response[i].short_description.split(" ").slice(0,7).join(" ")}...</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center px-0 py-1">
                  <small class="p-0 my-1 gameTypeColor fw-bolder rounded-2 px-2">${response[i].genre}</small>
                  <small class="p-0 my-1 gameTypeColor fw-bolder rounded-2 px-2">${response[i].platform}</small>
                </div>
              </div>
            </div>`
            
        }
    document.querySelector(".gameContainer").innerHTML = cartona
    
}
    displayGames("mmorpg")


gameContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".showInfo");
    if (card == null) return;
    let id = card.getAttribute("data-gameId")
    console.log(id);
    getGameDetails(id)
});




console.log(gamesArr);

async function getGameDetails(gameId){
    let req = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}` , {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'f8bc025352mshcb9bd43f165a006p1f82c0jsndae2fffbcbd2',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
})
    let gameDetails = await req.json()
    console.log(gameDetails.description);
    home.classList.add("d-none")
    gameData.classList.remove("d-none")
    document.querySelector(".gameDetailsContainer").innerHTML = `<div class="col-md-4">
          <img src="${gameDetails.thumbnail}" class="w-100" alt="">
        </div>
        <div class="col-md-8 ">
          <div class="text-white">
            <h3>Title: ${gameDetails.title}</h3>
          <p>Category: <span class="rounded-3 gameDetails small fw-bolder">${gameDetails.genre}</span> </p>
          <p>Platform: <span class="rounded-3 gameDetails small fw-bolder">${gameDetails.platform}</span> </p>
          <p>Status: <span class="rounded-3 gameDetails small fw-bolder">${gameDetails.status}</span> </p> 
          <p>${gameDetails.description}</p>
          <a href="${gameDetails.game_url}" target="_blank" class="btn-outline-warning btn text-white">Show Game</a>
          </div>
        </div>`
    console.log(gameDetails);
    let closeX = document.querySelector(".closeX")
    closeX.addEventListener("click" , function(){
    home.classList.remove("d-none")
    gameData.classList.add("d-none")
        
    })
}


