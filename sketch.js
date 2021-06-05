var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground,groundImage,invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, restart;
var score;
var lifetime;

function preload(){
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  groundImage=loadImage("ground-1.png");
}

function setup() {
  createCanvas(600, 500);
  
   monkey=createSprite(130,500,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.3;
  
  ground = createSprite(400,120,900,10);
  ground.addImage (groundImage);
  ground.scale = 1.9;
  ground.x=ground.width/2;
  
  gameOver= createSprite(300,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.3;
  
  restart = createSprite(300,200);
  restart.addImage(restartImg);
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(300,500,600,10);
   invisibleGround.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  monkey.setCollider("rectangle",0,0,40,700,height);
  
  score = 0;
  lifetime=0;
}

function draw() {
  
  background(255);
  
  if (gameState===PLAY){
  
   lifetime= lifetime + Math.round(getFrameRate()/60);
    
     ground.velocityX=-4;
     
    if(keyDown("space") && monkey.y>300) {
      monkey.velocityY = -25;
    }
    
    monkey.velocityY = monkey.velocityY + 0.95;
    
    if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
    monkey.collide(invisibleGround);   
    
    spawnFood();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
       
        ground.velocityX = 0;
        monkey.velocityY = 0;
        
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
  }
    
  
  if(mousePressedOver(restart)&& gameState===END)
  { 
    reset();
  }  
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50);  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("lifetime"+ lifetime, 200,50);  
}

function reset()
{
  gameState=PLAY;
   
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  
  restart.visible=false;
  gameOver.visible=false;
  
  score=0;

}
    
function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.2;
    
    if (monkey.isTouching(FoodGroup)){
      score=score+1;
    }
    
    FoodGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 100 === 0) {
    obstacle = createSprite(800,400,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.3;
       
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}