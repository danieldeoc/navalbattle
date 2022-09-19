const root = document.getElementById("root");
let gameStep = 0;

const playerShips = new Set([]);
const aiShip = new Set([]);
let playerTime = "p";
let shipPlacement = 0;
let placebeShips = 15;
let placedShips = 0;
let modePlacement = "horizontal";


////////////////////////
// DRAW THE TABLES AND CELLS
function drawGame(){
    for (let index = 0; index < 64; index++) {
        console.log("e")
        document.getElementById("ai").innerHTML += "<div class='cell' id='ai"+index+"' onClick='bomb("+index+")'></div>";
        document.getElementById("player").innerHTML += "<div class='cell' id='p"+index+"' onClick='place("+index+")' onmouseenter='lightning("+index+")' onmouseleave='lightoff()'>"+index+"</div>";
    }
}
drawGame();

/////////////////////////////
function changeMode(){
    modePlacement == "horizontal" ? modePlacement = "vertical" : modePlacement = "horizontal";
    console.log(modePlacement)
}


////////////////////////
// INICIA O JOGO
document.getElementById("start").addEventListener('click', () => { 
    document.getElementById("gamePanel").innerHTML = "<div id='fase'>Place your ships!</div>";
 } )




    
function bomb(id){
    
}

/////////////////////
// controla o placment dos navios do player
function place(id){
    

    if( gameStep == 0){
        if(placebeShips > 7){
            addAditionalPlace(id, 1)
            document.getElementById("boats").innerHTML = placebeShips - 7;
        } else if( placebeShips > 3){
            addAditionalPlace(id, 2)
            document.getElementById("ships").innerHTML = placebeShips - 3;
        } else if(placebeShips > 1){
            addAditionalPlace(id, 3)
            document.getElementById("submarines").innerHTML = placebeShips - 1;
        } else if(placebeShips > 0){
            addAditionalPlace(id, 4)
            document.getElementById("carriers").innerHTML = placebeShips;
        } else {
            putAiShips();
        }   
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
            console.log(playerShips)   
            id++
        }
        placebeShips--;
        console.log(placebeShips)
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
    if(gameStep == 0){
        const ele = document.getElementById("p"+index)
        ele.classList.add("light");
    }
}
function lightoff(){
    var lights = document.querySelectorAll(".light")
    for (let index = 0; index < lights.length; index++) {
        console.log(lights[index])
        lights[index].classList.remove("light")
    }
    
}
    
    
    
    
  