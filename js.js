const root = document.getElementById("root"); // root
let gameStep = 0; // etapa do jogo
const playerShips = new Set([]); // navios do Player
const aiShip = new Set([]); // navios do AI
let playerTime = "p";   // controla a vez do jogador
let shipPlacement = 0;  // posicao da disposicao
let placebeShips = 15; // numero de navios colocaveis
let placedShips = 0; // numero de navios colocados
let modePlacement = "horizontal"; // controla o modo de inserção de navios horizontal/vertical
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
    modePlacement == "horizontal" ? modePlacement = "vertical" : modePlacement = "horizontal";
    document.getElementById("pos").textContent = modePlacement;
}

////////////////////////
// INICIA O JOGO
document.getElementById("start").addEventListener('click', () => { 
    document.getElementById("gamePanel").innerHTML = "<div id='fase'>Place your ships!</div>";
} )

////////////////////////////////////////////////
// controla a quantidade de placementes de navios e espaço ocupado
let num = 1;
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
 function lineBreakCheck(id, numPlace, origin){
    if(modePlacement == "horizontal"){
        var ocupiedSpace = (id + numPlace) - 1;
        for (let index = 0; index < 8; index++) {
            lineBreak = endLines[index];
            if(id <= lineBreak){    
                if(ocupiedSpace > lineBreak){
                    console.log(origin)
                    ocupiedResult(origin);
                }
            }
        }
    } else {
        var ocupiedSpaceH = (id + numPlace + 8) - 1;
        for (let index = 0; index < 8; index++) {
            lineBreakH = endLinesH[index];
            if(id <= lineBreakH){    
                if(ocupiedSpaceH > lineBreakH){
                    console.log(origin)
                    ocupiedResult(origin);
                }
            }
        }
    }
    if(origin == "click"){
        occupiedPlace(id, numPlace);
    }
}

function ocupiedResult(origin){
    //mensagem("linha ultrapassada");
    if(origin == "click"){
        lineBreakStatus = true;
    } else if(origin == "mouse"){
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
    if(modePlacement == "horizontal"){
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
    if( gameStep == 0){
        lineBreakCheck(id, num, "click");
       
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
                addAditionalPlace(id, num);
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

//////////////////////////////////////////////////
// cotrola a adicao e posicao dos lugares
function addAditionalPlace(id, numPlace){
    // adiciona o navio ao tabuleiro
    if(modePlacement == "horizontal"){
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
        num++
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

////////////////////
// lights ship place
function lightning(lIndex){
    if(gameStep == 0 && placebeShips > 0){
        const ele = document.getElementById(playerTime+lIndex);
        ele.classList.add("light");
        lineBreakCheck(lIndex, num, "mouse")
        if( !lineBreakStatusLight ){
            if(modePlacement == "horizontal"){
                for (let bIndex = 0; bIndex < num; bIndex++) {
                    if(lIndex > 63){
                        lIndex = 63
                    }
                    document.getElementById(playerTime+lIndex).classList.add("light");
                    lIndex++;
                }
            } else {
                var hCol = lIndex;
                for (let bIndex = 0; bIndex < num; bIndex++) {
                    if(hCol > 63){
                        hCol = 63
                    }
                    document.getElementById(playerTime+hCol).classList.add("light");
                    hCol = hCol + 8;
                }
            }   
        }
        lineBreakStatusLight = false;
    }
}
function lightoff(){
    var lights = document.querySelectorAll(".light")
    for (let index = 0; index < lights.length; index++) {
        lights[index].classList.remove("light")
    }
    
}
    
function bomb(id){
    
}

    
    
    
  