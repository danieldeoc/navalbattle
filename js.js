const root = document.getElementById("root"); // root
let gameStep = 0; // etapa do jogo
var mode = "horizontal"; // controla o modo de inserção de navios horizontal/vertical
let playerTime = "p";   // controla a vez do jogador
var shipSize = 1;

const playerShips = []; // navios do Player
const aiShip = []; // navios do AI

const tableCells = [
    [0,1,2,3,4,5,6,7],
    [8,9,10,11,12,13,14,15],
    [16,17,18,19,20,21,22,23],
    [24,25,26,27,28,29,30,31],
    [32,33,34,35,36,37,38,39],
    [40,41,42,43,44,45,46,47],
    [48,49,50,51,52,53,54,55],
    [56,57,58,59,60,61,62,63]
]
const tableColumns = [
    [0,8,16,24,32,40,48,56],
    [1,9,17,25,33,41,49,57],
    [2,10,18,26,34,42,50,58],
    [3,11,19,27,35,43,51,59],
    [4,12,20,28,36,44,52,60],
    [5,13,21,29,37,45,53,61],
    [6,14,22,30,38,46,54,62],
    [7,15,23,31,39,47,55,63]
]

let playerShipsPlace = {
    total: 15,
    boats: 8,
    ships: 4,
    subs: 2,
    carrier: 1
}



////////////////////////
// DRAW THE TABLES AND CELLS
function drawGame(){
    for (let index = 0; index < 64; index++) {
        document.getElementById("ai").innerHTML += "<div class='cell' id='ai"+index+"' onClick='bomb("+index+")'></div>";
        document.getElementById("player").innerHTML += "<div class='cell' id='p"+index+"' onClick='place("+index+")' onmouseenter='lightning("+index+")' onmouseleave='lightoff()'>"+index+"</div>";
    }
}
drawGame();

/////////////////////////////
function changeMode(){
    mode == "horizontal" ? mode = "vertical" : mode = "horizontal";
    document.getElementById("pos").textContent = mode;
}

////////////////////////
// INICIA O JOGO
document.getElementById("start").addEventListener('click', () => { 
    document.getElementById("gamePanel").innerHTML = "<div id='fase'>Place your ships!</div>";
} )


/// define o numer de celulas a clarear ou preencher
function cellToFill(initCell, size){ // 32, 2
    cells = [];
    for (let index = 0; index < size; index++) { // 32, 33
        if(mode == "horizontal"){
            cells.push(initCell)
            initCell++
        } else {    // 32, 40
            cells.push(initCell)
            initCell = initCell + 8;
        }
    }
    return cells;
}

// verifca se um array existe dentro de outro
function checker(arr, target){
    return target.every(v => arr.includes(v));
}

/////////////////////
// controla o placment dos navios do player
function place(cellId){
    
    if(gameStep == 0){

        placeToShip = cellToFill(cellId, shipSize);
        if(checker(placeToShip,playerShips)){
            console.log("true")
        }



        if(playerShipsPlace.boats > 0){
            playerShipsPlace.boats = playerShipsPlace.boats - 1;
            document.getElementById("boats").textContent = playerShipsPlace.boats;
        } else if(playerShipsPlace.ships > 0){
            playerShipsPlace.ships = playerShipsPlace.ships - 1;
            shipSize = 2;
            document.getElementById("ships").textContent = playerShipsPlace.ships;
        } else if(playerShipsPlace.subs > 0){
            playerShipsPlace.subs =  playerShipsPlace.subs - 1;   
            shipSize = 3;     
            document.getElementById("submarines").textContent = playerShipsPlace.subs;
        } else if(playerShipsPlace.carrier > 0){
            playerShipsPlace.carrier = playerShipsPlace.carrier - 1;
            shipSize = 4;             
            document.getElementById("carriers").textContent = playerShipsPlace.carrier;
        } else {
            console.log("All Ships placed")
        }
        if(playerShipsPlace.total > 0){
            let cellsToFill = cellToFill(id, shipSize)

            for (let index = 0; index < cellsToFill.length; index++) {
                document.getElementById(playerTime+cellsToFill[index]).classList.add("shipped")
            }
            // update the num size var
            if(placebeShips === 8 || placebeShips === 4 || placebeShips === 2 ){
                shipSize++
            } else if(placebeShips === 1){
                gameStep = 1
            }
            placebeShips--;

            totalShips = totalPlacementShips();
        } */
    } 
}

//////////////////////////////////////////////////
// adiciona os lugares pela Inteligencia Artificial
function putAiShips(){

//    randomId = Math.floor(Math.random() * 10);

}
var preview_ocupiedSpaces_mouse = new Array([]);
var preview_ocupiedSpaces = new Array([]);



///////////////////
// marca a posicao como Ocupada
function checkExistence(id, num){
    for (let index = 0; index < num; index++) {
        id++        
        document.getElementById(playerTime+id).classList.add("shipped");
        return
    }
}

// funcao que exibe a mensagem de erro para o jogador
function mensagem(msg){
    const pop = document.getElementById("msgPop");
    pop.innerHTML = msg;
    pop.classList.add("visible")
    setTimeout(function(){
        pop.classList.remove("visible")
    }, 4000)
}



////////////////////
// lights ship place
function lightning(cellId_lg){
    cellToLight = cellToFill(cellId_lg, shipSize);
    light = false;
    if(mode == "horizontal"){
        for (let index = 0; index < tableCells.length; index++) {
            if(checker(tableCells[index], cellToLight)){
                light = true;
                break;
            }    
        }
    } else {
        for (let index = 0; index < tableColumns.length; index++) {
            if(checker(tableColumns[index], cellToLight)){
                light = true;
                break;
            }    
        }
    }
    // ilumina as celulas
    if(light == true){
        for (let index = 0; index < cellToLight.length; index++) {
            document.getElementById(playerTime+cellToLight[index]).classList.add("light");
        }
    }
    light = false;
}

///////////////////////////
/// Desliga as luzes
function lightoff(){
    var lights = document.querySelectorAll(".light")
    for (let index = 0; index < lights.length; index++) {
        lights[index].classList.remove("light")
    }
}
    
function bomb(id){
    
}

    
    
    
  