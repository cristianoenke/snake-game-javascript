let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let snakeupsection = []; //This will map the direction of previous section to help the draw
let snakedownsection = []; //This will map the direction of next section to help the draw


var tile_sheet = new Image();
tile_sheet.src = "img/snake-graphics.png"
var sprite_size = 64;

snake[0] = {
    x:8*box,
    y:8*box}

let direction = "right";
let food = {
    x: Math.floor(Math.random()*15+1)*box,
    y: Math.floor(Math.random()*15+1)*box
}

function CreateBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16*box,16*box);
}

function CreateSnake(){
    for (i=0; i < snake.length; i++){
       // context.fillStyle = "green";
       // context.fillRect(snake[i].x, snake[i].y, box, box); 
        
        if(i==0 && direction == "up")
            context.drawImage(tile_sheet, 3*64, 0*64, 64,64,snake[i].x,snake[i].y,box,box);
        if(i==0 && direction =="down")
            context.drawImage(tile_sheet, 4*64, 1*64, 64,64,snake[i].x,snake[i].y,box,box);
        if(i==0 && direction =="left")
            context.drawImage(tile_sheet, 3*64, 1*64, 64,64,snake[i].x,snake[i].y,box,box);
        if(i==0 && direction =="right")
            context.drawImage(tile_sheet, 4*64, 0*64, 64,64,snake[i].x,snake[i].y,box,box);    
    
        if(i != 0 && i != snake.length-1){
            if (snake[i-1].x == snake[i].x && snake[i+1].x == snake[i].x){ //going up or down
                context.drawImage(tile_sheet, 2*64, 1*64, 64, 64,snake[i].x,snake[i].y,box,box)
            }
            if (snake[i-1].y == snake[i].y &&snake[i+1].y == snake[i].y){ //going left or right
                context.drawImage(tile_sheet, 1*64, 0*64, 64, 64,snake[i].x,snake[i].y,box,box)
            }
                // clock or anticlock movement:
            if (snake[i-1].x > snake[i].x && snake[i-1].y == snake[i].y && snake[i+1].x == snake[i].x && snake[i+1].y > snake[i].y){
                context.drawImage(tile_sheet, 0*64, 0*64, 64, 64,snake[i].x,snake[i].y,box,box)
            }
            if (snake[i-1].x == snake[i].x && snake[i-1].y > snake[i].y && snake[i+1].x > snake[i].x && snake[i+1].y == snake[i].y){
                context.drawImage(tile_sheet, 0*64, 0*64, 64, 64,snake[i].x,snake[i].y,box,box)
            }
            
            if (snake[i-1].x < snake[i].x && snake[i-1].y == snake[i].y && snake[i+1].x == snake[i].x && snake[i+1].y > snake[i].y){
                context.drawImage(tile_sheet, 2*64, 0*64, 64, 64,snake[i].x,snake[i].y,box,box)
            }
            if (snake[i-1].x == snake[i].x && snake[i-1].y > snake[i].y && snake[i+1].x < snake[i].x && snake[i+1].y == snake[i].y){
                context.drawImage(tile_sheet, 2*64, 0*64, 64, 64,snake[i].x,snake[i].y,box,box)
            }

            if (snake[i-1].x < snake[i].x && snake[i-1].y == snake[i].y && snake[i+1].x == snake[i].x && snake[i+1].y < snake[i].y){
                context.drawImage(tile_sheet, 2*64, 2*64, 64, 64,snake[i].x,snake[i].y,box,box)
            }
            if (snake[i-1].x == snake[i].x && snake[i-1].y < snake[i].y && snake[i+1].x < snake[i].x && snake[i+1].y == snake[i].y){
                context.drawImage(tile_sheet, 2*64, 2*64, 64, 64,snake[i].x,snake[i].y,box,box)
            }

            if (snake[i-1].x == snake[i].x && snake[i-1].y < snake[i].y && snake[i+1].x > snake[i].x && snake[i+1].y == snake[i].y){
                context.drawImage(tile_sheet, 0*64, 1*64, 64, 64,snake[i].x,snake[i].y,box,box)
            }
            if (snake[i-1].x > snake[i].x && snake[i-1].y == snake[i].y && snake[i+1].x == snake[i].x && snake[i+1].y < snake[i].y){
                context.drawImage(tile_sheet, 0*64, 1*64, 64, 64,snake[i].x,snake[i].y,box,box)
            }

        }
        // tail:
        if(snake.length !=1 && i==snake.length-1 && snake[i-1].x == snake[i].x && snake[i-1].y < snake[i].y ) //going up
            context.drawImage(tile_sheet, 3*64, 2*64, 64, 64,snake[i].x,snake[i].y,box,box);  
        if(snake.length !=1 && i==snake.length-1 && snake[i-1].x == snake[i].x && snake[i-1].y > snake[i].y ) //going down
            context.drawImage(tile_sheet, 4*64, 3*64, 64, 64,snake[i].x,snake[i].y,box,box); 
        if(snake.length !=1 && i==snake.length-1 && snake[i-1].x < snake[i].x && snake[i-1].y == snake[i].y ) //going rigth
            context.drawImage(tile_sheet, 3*64, 3*64, 64, 64,snake[i].x,snake[i].y,box,box); 
        if(snake.length !=1 && i==snake.length-1 && snake[i-1].x > snake[i].x && snake[i-1].y == snake[i].y ) //going left
            context.drawImage(tile_sheet, 4*64, 2*64, 64, 64,snake[i].x,snake[i].y,box,box); 
      
    }

}

function drawFood(){
    //context.fillStyle = "red";
    //context.fillRect(food.x,food.y,box,box)
    context.drawImage(tile_sheet, 0,3*64, 64,64,food.x,food.y,box,box);
}

document.addEventListener("keydown", update);
function update(event){
    if(event.keyCode==37 && direction != "right") direction = "left";
    if(event.keyCode==38 && direction != "down") direction = "up";
    if(event.keyCode==39 && direction != "left") direction = "right";
    if(event.keyCode==40 && direction != "up") direction = "down";
}

function InitGame(){
    if(snake[0].x > 16*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0*box && direction == "left") snake[0].x = 16*box;
    if(snake[0].y > 16*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0*box && direction == "up") snake[0].y = 16*box;

    for(i=1; i < snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y== snake[i].y){
            clearInterval(game);
            alert("Game Over")
        }
    }

    CreateBG();
    CreateSnake();
    drawFood();
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction=="right") snakeX +=box;
    if(direction=="left") snakeX -=box;
    if(direction=="up") snakeY -=box;
    if(direction=="down") snakeY +=box;

 //   if(direction=="right") snakeupsection +=1;
  //  if(direction=="left") snakeupsection +=1;
   // if(direction=="up") snakeupsection +=1;
  //  if(direction=="down") snakeupsection +=1;

    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{food.x = Math.floor(Math.random()*15+1)*box;
        food.y = Math.floor(Math.random()*15+1)*box;

    }
    

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);

}

let game = setInterval(InitGame,100);