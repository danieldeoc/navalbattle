const root = document.getElementById("root"); // root
let gameStep = 0; // etapa do jogo
var actionMode = null;
var mode = "horizontal"; // controla o modo de inserção de navios horizontal/vertical

const playerShips = new Set([]); // navios do Player
const aiShip = new Set([]); // navios do AI

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



let playerTime = "p";   // controla a vez do jogador
let shipPlacement = 0;  // posicao da disposicao
let placebeShips = 15; // numero de navios colocaveis
let placedShips = 0; // numero de navios colocados
var lineBreakStatus = false; // status da quebra de linha, impede execucoes indevidas
var lineBreakStatusLight = false // status da quebra de linha do efeito de sobreposição

const endLinesH = [56,57,58,59,60,61,62,63]; // array de linhas horizontais
const endLines = [7,15,23,31,39,47,55,63]; // array de linhas verticais

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

////////////////////////////////////////////////
// controla a quantidade de placementes de navios e espaço ocupado
let shipSize = 1;
var totalShips = 15
var boats = 8;
var ships = 4;
var sub = 2;
var carrier = 1;
function totalPlacementShips(){
    var totalShips = boats + ships + sub + carrier;
    return totalShips;
}


 /////////////////////////////
 // controla o placement dos navios na quebra de linha
 function lineBreakCheck(id, numPlace, actionMode){
    if(mode == "horizontal"){
        var ocupiedSpace = (id + numPlace) - 1;
        for (let index = 0; index < 8; index++) {
            lineBreak = endLines[index];
            if(id <= lineBreak){    
                if(ocupiedSpace > lineBreak){
                    
                    ocupiedResult(actionMode);
                }
            }
        }
    } else {
        var ocupiedSpaceH = (id + numPlace) - 1;
        for (let index = 0; index < 8; index++) {
            lineBreakH = endLinesH[index];
            if(id <= lineBreakH){    
                
                if(ocupiedSpaceH > lineBreakH){
                    
                    ocupiedResult(actionMode);
                }
            }
        }
    }
    if(actionMode == "click"){
        occupiedPlace(id, numPlace);
    }
}

function ocupiedResult(actionMode){
    //mensagem("linha ultrapassada");
    if(actionMode == "click"){
        lineBreakStatus = true;
    } else if(actionMode == "mouse"){
        lineBreakStatusLight = true;
    }
}


/////////////////////////////
 // controla o placement de lugares ocupados
 var occupiedPlaceStatus = false;
 function occupiedPlace(id, numPlace){
    // valida se o lugar esta vazio na horizontal
    let provId = id;
    var empty = true
    if(mode == "horizontal"){
        for (let index = 0; index < numPlace; index++) {
            if(playerShips.has(provId)){
                var empty = false;
            }
            provId++
        }
    } else {
        var provIdH = provId;
        for (let index = 0; index < numPlace; index++) {
            if(playerShips.has(provIdH)){
                var empty = false;
            }
            provIdH = provIdH + 8;
        }
    }
    if(!empty){
        occupiedPlaceStatus = true;
        mensagem("lugar ocupado");
    }
 }

/////////////////////
// controla o placment dos navios do player
function place(id){
    actionMode = "click";

    if( gameStep == 0){
        

        lineBreakCheck(id, shipSize, "click");
       
        // verifica linha e lugar
        if( !lineBreakStatus && !occupiedPlaceStatus){
            if(placebeShips > 7){
                boats--;
                document.getElementById("boats").textContent = boats;
            } else if(placebeShips > 3){
                ships--;
                
                document.getElementById("ships").textContent = ships;
            } else if(placebeShips > 1){
                sub--;            
                document.getElementById("submarines").textContent = sub;
            } else {
                carrier--;                
                document.getElementById("carriers").textContent = carrier;
            }
            if(totalShips >= 1){
                addAditionalPlace(id, shipSize);
                totalShips = totalPlacementShips();
            }
        }
        lineBreakStatus = false;
        occupiedPlaceStatus = false;
    } 
}

//////////////////////////////////////////////////
// adiciona os lugares pela Inteligencia Artificial
function putAiShips(){

//    randomId = Math.floor(Math.random() * 10);

}
var preview_ocupiedSpaces_mouse = new Array([]);
var preview_ocupiedSpaces = new Array([]);


//////////////////////////////////////////////////
// cotrola a adicao e posicao dos lugares
function addAditionalPlace(id, numPlace){
    // adiciona o navio ao tabuleiro
    if(mode == "horizontal"){
        for (let index = 0; index < numPlace; index++) {
            document.getElementById(playerTime+id).classList.add("shipped")
            playerShips.add(id);
            id++
        }
    } else {
        var verticalMarkup = id
        for (let index = 0; index < numPlace; index++) {
            document.getElementById(playerTime+verticalMarkup).classList.add("shipped")
            playerShips.add(id);
            verticalMarkup = verticalMarkup + 8
        }
    }
    // update the num size var
    if(placebeShips === 8 || placebeShips === 4 || placebeShips === 2 ){
        shipSize++
    } else if(placebeShips === 1){
        gameStep = 1
    }
    placebeShips--;
}

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

/// define o numer de celulas a clarear
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



////////////////////
// lights ship place
function lightning(cellId_lg){
    actionMode = "mouse";
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

    
    
    
  