const root = document.getElementById("root"); // root
let gameStep = 0; // etapa do jogo
    /*
        0 - ship placement
        1 - bombardings
        2 - results

    */
var mode = "horizontal"; // controla o modo de inserção de navios horizontal/vertical
let playerTime = "p";   // controla a vez do jogador
var shipSize = 1; // start the size of the ship 
const playerShips = []; // navios do Player
const aiShips = []; // navios do AI

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

var playerShipsPlace = {
    total: 15,
    boats: 8,
    ships: 4,
    subs: 2,
    carrier: 1
}
var aiShipsPlace = {
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
        document.getElementById("ai").innerHTML += "<div class='cell' id='ai"+index+"' onClick='bomb("+index+")'>"+index+"</div>";
        document.getElementById("player").innerHTML += "<div class='cell' id='p"+index+"' onClick='place("+index+")' onmouseenter='lightning("+index+")' onmouseleave='lightoff()'>"+index+"</div>";
    }
}
drawGame();

/////////////////////////////
/// changes horizontal and vertical placement mode
function changeMode(){
    mode == "horizontal" ? mode = "vertical" : mode = "horizontal";
    document.getElementById("pos").textContent = mode;
}

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
function checkerSome(arr, target){
    return arr.some(r=> target.includes(r))
    /*
    some(..) checks each element of the array against a test function 
    and returns true if any element of the array passes the test function, 
    otherwise, it returns false.
    */
}

function checkerEvery(arr, target){
    return target.every(v => arr.includes(v));
}


////////////////////////////
/// Ship size
function sizeShip(){
    if(playerShipsPlace.boats > 0){
        shipSize = 1;
    } else if(playerShipsPlace.ships > 0){
        shipSize = 2;
    } else if(playerShipsPlace.subs > 0){
        shipSize = 3;
    } else if(playerShipsPlace.carrier > 0){
        shipSize = 4;
    } else {
        shipSize = 0;
    }
}

/////////////////////
// controla o placment dos navios do player
function place(cellId){
    if(gameStep == 0){
        placeToShip = cellToFill(cellId, shipSize);
        if(inTable(placeToShip)){// esta dentro da tabela?
            if( !checkerSome(placeToShip, playerShips) ) { // lugar esta ocupado
                sizeShip(); // controls the shipzie
                // controls the ship place info board 
                if(playerShipsPlace.boats > 0){
                    playerShipsPlace.boats = playerShipsPlace.boats - 1;
                    document.getElementById("boats").textContent = playerShipsPlace.boats;
                } else if(playerShipsPlace.ships > 0){
                    playerShipsPlace.ships = playerShipsPlace.ships - 1;
                    document.getElementById("ships").textContent = playerShipsPlace.ships;
                } else if(playerShipsPlace.subs > 0){
                    playerShipsPlace.subs =  playerShipsPlace.subs - 1;   
                    document.getElementById("submarines").textContent = playerShipsPlace.subs;
                } else if(playerShipsPlace.carrier > 0){
                    playerShipsPlace.carrier = playerShipsPlace.carrier - 1;         
                    document.getElementById("carriers").textContent = playerShipsPlace.carrier;
                } else {
                    mensagem("All Ships placed")
                }
                if(playerShipsPlace.total > 0){
                    playerShipsPlace.total = playerShipsPlace.total - 1;
                    for (let index = 0; index < shipSize; index++) {
                        playerShips.push(cellId);
                        document.getElementById(playerTime+cellId).classList.add("shipped")
                        if(mode == "horizontal"){
                            cellId++
                        } else {
                            cellId = cellId + 8;
                        }
                    }    
                } else {
                    putAiShips();
                }
            
            } else {
                mensagem("Lugar ocupado")
            }            
        } else {
            mensagem("Deves colocar o navio em apenas uma linha ou coluna")
        }
    } 
}

///////////////////////////
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
    sizeShip();
    cellToLight = cellToFill(cellId_lg, shipSize);
    light = false;
    if(mode == "horizontal"){
        for (let index = 0; index < tableCells.length; index++) {
            if(checkerEvery(tableCells[index], cellToLight)){
                light = true;
                break;
            }    
        }
    } else {
        for (let index = 0; index < tableColumns.length; index++) {
            if(checkerEvery(tableColumns[index], cellToLight)){
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


//////////////////////////////////////////////////
// adiciona os lugares pela Inteligencia Artificial
function inTable(cells){
    if(mode == "horizontal"){
        for (let index = 0; index < tableCells.length; index++) {
            if(checkerEvery(tableCells[index], cells)){
                return true;
            }    
        }
    } else {
        for (let index = 0; index < tableColumns.length; index++) {
            if(checkerEvery(tableColumns[index], cells)){
                return true;
            }    
        }
    }
}
///////////////////////////
//aiShipsPlace
function randomCell(){
    const random = Math.floor(Math.random() * (62 - 0)) + 0 + 1; // gera posição randomica > 28
    return random;
}


function putAiShips(){
    playerTime = "ai";
    var tempAiShipSpaces = [];
    var openPositon = true;
    var positions = ["horizontal", "vertical"]
    // put the 15 ships
    for (let index = 0; index < 15; index++) {
        if(aiShipsPlace.boats > 0){
            aiShipsPlace.boats = aiShipsPlace.boats - 1;
            shipSize = 1;
        } else if(aiShipsPlace.ships > 0){
            shipSize = 2;
            aiShipsPlace.ships = aiShipsPlace.ships - 1;
        } else if(aiShipsPlace.subs > 0){
            shipSize = 3;
            aiShipsPlace.subs = aiShipsPlace.subs - 1;
        } else if(aiShipsPlace.carrier > 0){
            shipSize = 4;
            aiShipsPlace.carrier = aiShipsPlace.carrier - 1;
        }
        //////////
        while(openPositon){
            cellToPut = randomCell();
            let aiMode = positions[Math.random().toFixed()];

            if(aiMode == "horizontal"){
                for (let index = 0; index < shipSize; index++) {
                    tempAiShipSpaces.push(cellToPut)
                    cellToPut++                
                } // cria o range temporário do navio > 34 + 2 > [28,29]]
            } else {
                for (let index = 0; index < shipSize; index++) {
                    tempAiShipSpaces.push(cellToPut)
                    cellToPut = cellToPut + 8               
                } // cria o range temporário do navio > 34 + 2 > [28,36]]
            }


            var aiInTableLines = inTable(tempAiShipSpaces)
            if(aiInTableLines){
                if(!checkerSome(tempAiShipSpaces,aiShips)){  
                    for (let index = 0; index < tempAiShipSpaces.length; index++) {
                        aiShips.push(tempAiShipSpaces[index])
                        document.getElementById(playerTime+tempAiShipSpaces[index]).classList.add("shipped")
                    }
                    var openPositon = false;
                }
            } 
            tempAiShipSpaces.length = 0
        }
        var openPositon = true;
        gameStep = 1;
    }    
}

///////////////////////////
///////////////////////////
/// Game Functions
const aiAvaliableBombs = [];
const playerAvaliableBombs = []; // celulas disponiveis para ataque
for (let index = 0; index < 64; index++) {
    aiAvaliableBombs.push(index);
    playerAvaliableBombs.push(index);
}
const playerRightBombs = [];
const aiRightBombs = []; // ataques bem sucedidos

// player bomb
function bomb(id){
    if(gameStep == 1){
        playerTime = "ai";
        playerCellIndex = playerAvaliableBombs.indexOf(id);
        if( playerCellIndex > -1 ){
            playerAvaliableBombs.splice(playerCellIndex, 1)
            bombCell(playerTime, id);
            if(aiShips.indexOf(id) > -1){
                playerRightBombs.push(id);
                compareWinner();
            }
            aiBomb();
        } else {
            mensagem("Lugar já bombardeado")
        }
    }
}


// ai bombs
function aiBomb(){
    if(gameStep == 1){
        playerTime = "p";
        bombPlace = true;
        while(bombPlace){
            var index = aiAvaliableBombs.length; // tamanho do array para definir o maximo
            if(index > 1){
                var bombPlayerCell = Math.floor(Math.random() * (index - 0)) + 0 + 1; // gera numero random no array
            } else {
                var bombPlayerCell = 0;
            }
            const bombPlayerCellValue = aiAvaliableBombs[bombPlayerCell];
            if(aiAvaliableBombs.indexOf( bombPlayerCellValue ) > -1 ){
                aiAvaliableBombs.splice(bombPlayerCell, 1) // remove do array
                bombCell(playerTime, bombPlayerCellValue); // bombardeia usuario visualmente
                if(playerShips.indexOf(bombPlayerCellValue) > -1){ // verifica se acertou
                    aiRightBombs.push(bombPlayerCellValue);
                    compareWinner();
                }
                bombPlace = false;
            }
        }
    }
}

function bombCell(playerTime, id){
    document.getElementById(playerTime+id).classList.add("bombed")
}

////////////
/// define o vencedor
function compareWinner(){
    // is player winner?
    if(checkerEvery(playerRightBombs, aiShips)){
        mensagem("Jogador venceu")
        console.log("Jogador venceu")
        gameStep = 2;
    } else if(checkerEvery(aiRightBombs, playerShips)){
        mensagem("AI venceu")
        console.log("Ai venceu")
        gameStep = 2;
    } 
}

function playAgain(){
    gameStep = 0;
    playerTime = "p";
    playerShips.length = 0;
    aiShips.length = 0;
    aiAvaliableBombs.length = 0;
    playerAvaliableBombs.length = 0;
    for (let index = 0; index < 64; index++) {
        aiAvaliableBombs.push(index);
        playerAvaliableBombs.push(index);
    }
    playerRightBombs.length = 0;
    aiRightBombs.length = 0;

    var lights = document.querySelectorAll(".bombed, .shipped")
    for (let index = 0; index < lights.length; index++) {
        lights[index].classList.remove("bombed");
        lights[index].classList.remove("shipped");
    }
    shipSize = 1;

    playerShipsPlace.total = 15;
    playerShipsPlace.boats = 8;
    playerShipsPlace.ships = 4;
    playerShipsPlace.subs = 2;
    playerShipsPlace.carrier = 1;

    aiShipsPlace.total = 15;
    aiShipsPlace.boats = 8;
    aiShipsPlace.ships = 4;
    aiShipsPlace.subs = 2;
    aiShipsPlace.carrier = 1;

    
}

