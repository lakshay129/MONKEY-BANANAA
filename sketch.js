
var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime,ground,invisibleg;
var gO,gOi,monkeyc,restart,restarti;


function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gOi=loadImage("gameOver[1].png");
  monkeyc=loadImage("monkey.png");
  restarti=loadImage("restart[1].png");
  
}



function setup() {
  createCanvas(600,300);
  
  monkey=createSprite(40,255,50,50);
  monkey.addAnimation("run",monkey_running);
  monkey.addImage("collided",monkeyc);
  monkey.scale=0.1;
 
  
  ground=createSprite(200,300,1500,10);
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  survivalTime=0;
  
  gO=createSprite(300,60,10,10);
  gO.addImage("gameover",gOi);
  gO.scale=1;
 
  restart=createSprite(300,170,30,30);
  restart.addImage("restart",restarti);
 
  
 

}


function draw() {
      background("white");
  
  //text score
      text("SURVIVAL TIME="+survivalTime,480,40);
 
 //monkey collide with invisible ground
      monkey.collide(ground);
  
  if(gameState===PLAY){
      gO.visible=false;
      restart.visible=false;
      monkey.changeAnimation("run",monkey_running);
  
  //seprate functions
     food();
     obstacle1();
    
   //ground velocity
     ground.velocityX=-3;
  
  //reset ground after its half width
   if(ground.x < 0){
      ground.x = ground.width/2;
     }
  
   if(monkey.isTouching(foodGroup)){
     foodGroup.destroyEach();
     survivalTime=survivalTime+2;
     }
    
  //make monkey jump
   if(keyDown("space") && monkey.y>=100) {
     monkey.velocityY = -12;
    }
  //monkey gravity
     monkey.velocityY = monkey.velocityY + 0.8;
    
      
   if(obstacleGroup.isTouching(monkey)){
     gameState=END;
   }
 }
  
  //GAMESTATE=END
  else if(gameState===END){
     monkey.changeImage("collided",monkeyc);
    
     restart.visible=true;
     gO.visible=true;
    
     ground.velocityX=0;
    
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
     obstacleGroup.destroyEach();
     foodGroup.destroyEach();
    
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
   
    if(mousePressedOver(restart)) {
     reset();
   }
  }     
     drawSprites();
}



function reset(){
  gameState=PLAY;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();

  survivalTime=0;
 
}
  

function food(){
 if(frameCount%130===0){
    banana=createSprite(550,270,30,30);
    banana.addImage("rest",bananaImage);
    banana.scale=0.07;
    banana.y=Math.round(random(150,280));
    banana.lifetime=80;
    foodGroup.add(banana);
    banana.velocityX=-(7+survivalTime/2);
  }
}
function obstacle1(){
  if(frameCount%110===0){
    obstacle=createSprite(550,270,30,30);
    obstacle.addImage("collide",obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-(8+survivalTime/2);
    obstacle.lifetime=80;
    obstacleGroup.add(obstacle);
  }
}
    





