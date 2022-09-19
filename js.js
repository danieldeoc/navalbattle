const root = document.getElementById("root");
let gameStep = 0;
const playerShips = new Set([]);
const aiShip = new Set([]);
let playerTime = "p";
let shipPlacement = 0;
let placebeShips = 15;
let placedShips = 0;
let modePlacement = "horizontal";
var num = 1;

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
}


////////////////////////
// INICIA O JOGO
document.getElementById("start").addEventListener('click', () => { 
    document.getElementById("gamePanel").innerHTML = "<div id='fase'>Place your ships!</div>";
 } )

 ////////////////////////////////////////////////
 // controla a quantidade de placementes de navios
 var totalShips = 15
 var boats = 8;
 var ships = 4;
 var sub = 2;
 var carrier = 1;
 function totalPlacementShips(){
    var totalShips = boats + ships + sub + carrier;
    return totalShips;
 }

/////////////////////
// controla o placment dos navios do player
function place(id){
    if( gameStep == 0){
        if(boats > 0){
            boats--;
            document.getElementById("boats").textContent = boats;
        } else if(ships > 0){
            ships--;
            num = 2;
            document.getElementById("ships").textContent = ships;
        } else if(sub > 0){
            sub--;
            num = 3;
            document.getElementById("submarines").textContent = sub;
        } else if(carrier > 0){
            carrier--;
            num = 4;
            document.getElementById("carriers").textContent = carrier;
        }
        addAditionalPlace(id, num);
        totalShips = totalPlacementShips();
    }
}

function putAiShips(){
//    randomId = Math.floor(Math.random() * 10);
}

//////////////////////////////////////////////////
// cotrola a adicao e posicao dos lugares
function addAditionalPlace(id, num){
    // valida se o navio esta na mesma linha, caso horizontal
    const endLines = [7,15,23,31,39,47,55,63];
    var ocupiedSpace = (id + num) - 1;
    for (let index = 0; index < 8; index++) {
        lineBreak = endLines[index];
        if(id <= lineBreak){
            if(ocupiedSpace > lineBreak){
                 mensagem("linha ultrapassada");
                 return;
            }
        }
    }

    // valida se o lugar esta vazio na horizontal
    let provId = id;
    var empty = true
    for (let index = 0; index < num; index++) {
        if(playerShips.has(provId)){
            var empty = false;
        }
        provId++
    }
    if(!empty){
        mensagem("lugar ocupado");
    } else {
        for (let index = 0; index < num; index++) {
            document.getElementById(playerTime+id).classList.add("shipped")
            playerShips.add(id);
            id++
        }
        placebeShips--;
    }
}

///////////////////
// marca a posicao como Ocupada
function checkExistence(id, num){
    for (let index = 0; index < num; index++) {
        id++        
        document.getElementById("p"+id).classList.add("shipped");
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
    }, 3000)
}

////////////////////
// lights ship place
function lightning(index){
    if(gameStep == 0 && totalShips > 0){
        
        const ele = document.getElementById("p"+index)
        ele.classList.add("light");
        console.log(num)
        if(boats === 0){
            var num = 2;
        }
        if(boats == 1){
            for (let bIndex = 0; bIndex < num; bIndex++) {
                document.getElementById("p"+index).classList.add("light");
                index++;
            }
        }
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

    
    
    
  