// creating variables
var bananaImage;
var obstacleImage;
var scene , backgroundImg;
var score; 
var PLAY = 1;
var END = 0;
var touchCount = 0;
var player , player_running, player_scale, player_end;
var gameState = PLAY;
var gameOver, restart, gameOverImg, restartImg;
var invisibleGround ;

function preload(){
  
// loading images for variables
  backgroundImg = loadImage("jungle pic 3.jpg");
  
  player_running = loadAnimation("Monkey_01.png",          "Monkey_02.png" , "Monkey_03.png" , "Monkey_04.png",      "Monkey_05.png" , "Monkey_06.png" , "Monkey_07.png",    "Monkey_08.png" , "Monkey_09.png" , "Monkey_10.png");
  
  player_end = loadImage("Monkey_01_end.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  gameOverImg = loadImage("gameover.jpg");
  restartImg = loadImage("restart.jpg");
}


function setup() {
  createCanvas(400, 400);
  
// creating scene sprite 
  scene = createSprite(200,200,400,400);
  scene.addAnimation( "background",backgroundImg );
  scene.x = scene.width / 2;
  scene.velocityX = -2;
  
// creating player sprite   
  player = createSprite(100, 250, 10, 10);
  player.setCollider("circle",30,0,180);
  player.addAnimation("running" , player_running );
  player.addAnimation("collided", player_end);
  player.scale = 0.15;
  
// creating invisibleGround sprite     
  invisibleGround = createSprite(200,250,400,5);
  invisibleGround.visible = false;
  
// creating new group  
  foodGroup  = new Group();
  obstaclesGroup = new Group();
  
// creating score  
  score = 0;
  
// creating gameover and restart sprite  
  gameOver = createSprite(200, 200);
  restart = createSprite(200, 260);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;
  restart.addImage(restartImg);
  restart.scale = 0.2;
}


function draw() {
 background(220);
  if(gameState === PLAY){
    
// setting the gameOver ,restart invisible 
    gameOver.visible = false;
    restart.visible = false;
    
// on the press pf space the player jumps    
    if(keyDown("space") && player.y >= 200){
      player.velocityY = -15;
    }
    
// setting the gravity    
    player.velocityY = player.velocityY + 0.8;

// resetting the scene    
    if (scene.x < 100){
      scene.x = scene.width/2;
    }

// calling the food ,spawnObstacles functions
    food();
    spawnObstacles();
    
// adding the score    
    if(foodGroup.isTouching(player)){
      score = score+ 2;
      foodGroup.destroyEach();
      
// increasing the measure in different score      
      switch(score){
        case 10 : player.scale = player.scale + 0.03;
          break;
        case 20 : player.scale = player.scale + 0.03;
          break;
        case 30 : player.scale = player.scale + 0.03;
          break;
        case 40 : player.scale = player.scale + 0.03;
          break;
        case 50 : player.scale = player.scale + 0.03;
          break;
        default : break;
      }
    }
  
// the functions while obstacle is touching the player    
    if(obstaclesGroup.isTouching(player)){
      player.scale = 0.15;
      score = score - 1;
      player.velocityY = -13;
      touchCount++;
      if(touchCount >= 2){
        gameState = END;
      }
    }
  }
    
  if(gameState === END){
    
 //setting the gameOver ,restart visible 
    gameOver.visible = true;
    restart.visible = true;
    
 // setting the velocity as 0    
    player.velocityY = 0;
    scene.velocityX = 0;
    scene.velocityY = 0;
    player.changeAnimation("collided", player_end);
    obstaclesGroup.velocityX = 0;
    foodGroup.velocityX = 0;

 // calling the reset function       
    if(mousePressedOver(restart)) {
      reset();
    }
    
  }
 
 // monkey.collides the invisibleGround
    player.collide(invisibleGround);

  drawSprites();
 
 // scoreboard  
  stroke("black");
  textSize(20);
  fill("black");
  text("score : " + score , 290 ,50 );
}

// creating function for reset
function reset(){
  gameState = PLAY;
  score = 0;
  touchCount = 0;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  scene.velocityX = -2;
  player.changeAnimation("running",player_running);
  
}

// creating function for food
function food(){
  if(frameCount%80 === 0){
    
 //creating the obstacle     
    var banana  = createSprite(400,400,20,20);
    banana.addAnimation("banana.png",bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(70, 55));
    banana.velocityX = -5;

    banana.depth = player.depth;
    
 // setting the lifetime    
    banana.lifetime = 90;

  //add banana to the bananaGroup
    foodGroup.add(banana);

  }
}

// creating function for spawnobstacles
function spawnObstacles(){
  if(World.frameCount%300 === 0){
    
  // creating the obstacle
    var obstacle = createSprite(400,430,10,40);
    obstacle.setCollider("circle",0,0,100);
    obstacle.addAnimation("stone.png", obstacleImage);
    obstacle.scale = random(0.1,0.3);
    obstacle.y = Math.round(random(250,251));
    obstacle.velocityX = - 4;
    
    
  //assign lifetime to the obstacle           
    obstacle.lifetime = 150;
   
 //  adding the depth for player   
    obstacle.depth = player.depth;
    player.depth = player.depth + 1;
    
  //add obstacle to the Obstaclesgroup
    obstaclesGroup.add(obstacle);
    
  }
}
  