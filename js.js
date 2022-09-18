////////////////////////
// DRAW THE TABLES AND CELLS
function drawGame(){
    for (let index = 0; index < 64; index++) {
        console.log("e")
        document.getElementById("ai").innerHTML += "<div class='cell' id='ai"+index+"' onClick='bomb("+index+")'></div>";
        document.getElementById("player").innerHTML += "<div class='cell' id='p"+index+"' onClick='place("+index+")'></div>";
    }
}
drawGame();

let gameStep = 0;

////////////////////////
// INICIA O JOGO
document.getElementById("start").addEventListener('click', () => { 

    document.getElementById("gamePanel").innerHTML = "<div id='fase'>Place your ships!</div>";
 } )





const root = document.getElementById("root");


const playerShips = new Set([]);
const aiShip = new Set([]);
let playerTime = "p";
let shipPlacement = 0;
let placebeShips = 15;
let placedShips = 0;

    
function bomb(id){
    
}
function place(id){
    if( gameStep == 0){
        if(placebeShips > 7){
            addAditionalPlace(id, 1)
        } else if( placebeShips > 5){
            addAditionalPlace(id, 2)
        } else if(placebeShips > 2){
            addAditionalPlace(id, 3)
        } else if(placebeShips > 1){
            addAditionalPlace(id, 4)
        } else {
            putAiShips();
        }   
    }
}

function putAiShips(){
    randomId = Math.floor(Math.random() * 10);
    
    console.log(randomId)
}


function addAditionalPlace(id, num){
    let provId = id;
    var empty = true
    for (let index = 0; index < num; index++) {
        if(playerShips.has(provId)){
            var empty = false;
        }
        provId++
    }
    if(!empty){
        console.log("lugar ocupado")
    } else {
        for (let index = 0; index < num; index++) {
            document.getElementById(playerTime+id).classList.add("shipped")
            playerShips.add(id);
            console.log(playerShips)   
            id++
        }
        placebeShips--;
        console.log(placebeShips)
    }
}

function checkExistence(id, num){
    for (let index = 0; index < num; index++) {
        id++        
        document.getElementById("p"+id).classList.add("shipped");
        return
    }
}
    
    
    
    
  