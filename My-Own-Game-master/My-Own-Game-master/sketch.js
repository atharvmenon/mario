var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided;

var bg;

var ground, groung_img;

var brick, brick_img;

var coin, coin_img;

var gameOver, gameOver_img;

var restart, restart_img;

var mushroom, mushroom_img;

var plant, plant_img;

var turtle, turtle_img;

var dino, dino_img;

var invisibleGround;

var obstaclesGroup;

var coinGroup;

var brickGroup;


function preload(){
  mario_running=loadAnimation("images/mario00.png","images/mario01.png","images/mario02.png","images/mario03.png");
  mario_collided=loadAnimation("images/collided.png");
  bg=loadImage("images/bg.png");
  ground_img=loadImage("images/ground2.png");
  brick_img=loadImage("images/brick.png");
  coin_img=loadImage("images/coin.png");
  gameOver_img=loadImage("images/gameOver.png");
  restart_img=loadImage("images/restart.png");
  mushroom_img=loadImage("images/mushroom.png");
  plant_img=loadAnimation("images/obstacle1.png","images/obstacle2.png","images/obstacle3.png","images/obstacle4.png");
  turtle_img=loadImage("images/turtle.png");
  dino_img=loadImage("images/turtle2.png");
}

function setup() {
  createCanvas(1300,500);
  ground=createSprite(650,460,1300,40);
  ground.addImage(ground_img);
  ground.velocityX=-2;
  ground.x=ground.width/2;
  ground.scale=1.5;

  invisibleGround= createSprite(650,410,1300,10);
  invisibleGround.visible=false;

  

  mario= createSprite(75,410,50,50);
  mario.addAnimation("mario",mario_running);
  mario.addAnimation("marioColiided",mario_collided);
  mario.scale=1.5;

  gameOver = createSprite(750,250);
  gameOver.addImage(gameOver_img);
  gameOver.visible=false;

  restart = createSprite(750,300);
  restart.addImage(restart_img);
  restart.visible=false;


  obstaclesGroup=new Group();
  coinGroup=new Group();
  brickGroup= new Group();

}

function draw() {
  background(bg); 
  
  if(gameState===PLAY){
    if(ground.x<400){
      ground.x=ground.width/2;
    }
  
    if(keyDown("space")){
      mario.velocityY=-10;
    }
    
    mario.velocityY=mario.velocityY+0.5;
  
    mario.collide(invisibleGround);
  
    if(brickGroup.isTouching(mario)){
      mario.velocityY=0;
      coinGroup[0].destroy();
    }

     if(obstaclesGroup.isTouching(mario)){
       gameState=END;
     }
  

      spawnObstacles();
      spawnBricks();


  }

    if(gameState === END){
      mario.changeAnimation("marioColiided",mario_collided);
      ground.velocityX=0;
      mario.velocityY=0;
      gameOver.visible=true;
      restart.visible=true;
    }

    
  


  

  drawSprites();
}




function spawnBricks() {
  if(frameCount % 180 === 0) {
     brick = createSprite(1300,random(100,300),10,40);  
    
    brick.addImage(brick_img);
    brick.velocityX=-2;
                
    brick.scale = 1.5;
    brick.lifetime = 1000;

    brickGroup.add(brick)

    coin = createSprite(brick.x,brick.y-40);
    coin.addImage(coin_img);
    coin.velocityX=-2;

    coin.scale=0.15;
    coin.lifetime=1000;

    coinGroup.add(coin);
    
   
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(1300,380,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -2;
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(mushroom_img);
              obstacle.scale = 0.25;
              break;
      case 2: obstacle.addAnimation("plant",plant_img);
              obstacle.scale = 1;
              break;
      case 3: obstacle.addImage(turtle_img);
              obstacle.scale = 0.25;
              break;
      case 4: obstacle.addImage(dino_img);
             obstacle.scale = 0.25;
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 1300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


