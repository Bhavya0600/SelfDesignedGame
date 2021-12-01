var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var pipeTopPosition;
var pipeTop, pipeTopImg, pipeTopGroup;
var pipeBottom, pipeBottomImg, pipeBottomGroup;
var TextFont;
var restart, restartImg;
var gameState = "serve"
var Score = 2


function preload() {
  bgImg = loadImage("assets/bg.png")
  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
  pipeTopImg = loadImage("assets/TopPipe.png");
  pipeBottomImg = loadImage("assets/Pipe.png");
  restartImg = loadImage("assets/Restart.png");
  TextFont = loadFont("assets/Vollkorn-Bold.ttf");
}

function setup() {  
  createCanvas(900, 660);

  //background image
  bg = createSprite(165, 485, 1, 1);
  bg.addImage(bgImg);
  bg.scale = 1.5
  bg.x = bg.width / 2

  //creating top and bottom grounds
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;



  //creating balloon     
  balloon = createSprite(100, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.2;
  balloon.debug = true;

  pipeTopGroup = new Group();
  pipeBottomGroup = new Group();


  restart = createSprite(400, 330);
  restart.addImage(restartImg);
  restart.scale = 0.7;
  restart.visible = false;


}

function draw() {

  background("black");
  drawSprites();


  if (gameState == "serve") {
    balloon.x = 100;
    balloon.y = 200;
    fill("black");
    textFont(TextFont);
    textSize(35);
    text("PRESS SPACE TO START THE GAME ", 150, 330);
    if (keyDown("space")) {
      gameState = "play";
    }

  }
  else if (gameState == "play") {

    bg.velocityX = -(2 + Score/100);



    if (bg.x < 0) {
      bg.x = bg.width / 2
    }

    //making the hot air balloon jump
    if (keyDown("space")) {
      balloon.velocityY = -10;

    }

    //adding gravity
    balloon.velocityY = balloon.velocityY + 1.5;

    //creating pipes    
    spawnPipe();

    if (balloon.isTouching(pipeBottomGroup) || balloon.isTouching(pipeTopGroup) || balloon.y > 660) {
      gameState = "end";

    }


  }
  else {
    fill("black");
    textFont(TextFont);
    textSize(35);
    text("Try Again!!", 300, 290);
    noFill();

    restart.visible = true;


    bg.velocityX = 0;
    pipeTopGroup.setVelocityEach(0);
    pipeBottomGroup.setVelocityEach(0);
    pipeTopGroup.destroyEach();
    pipeBottomGroup.destroyEach();

    if (mousePressedOver(restart)) {
      reset();
    }

  }



  
  fill("black");
    textFont(TextFont);
    textSize(20);
  text("Score : " + Score, 800, 20);

}

function spawnPipe() {
  if (frameCount % 100 == 0) {
    // console.log(frameCount);
    pipeTop = createSprite(900, 50, 30, 100);
    pipeTop.addImage(pipeTopImg);
    pipeTop.scale = 0.7
    pipeTop.velocityX = -(2 + Score/100);
    pipeTop.lifetime = 500;
    pipeTopGroup.add(pipeTop);
    pipeTop.debug = true;
    pipeTop.setCollider("rectangle", 0, 0, 100, 460)

    pipeBottom = createSprite(900, 560, 30, 200);
    pipeBottom.addImage(pipeBottomImg);
    pipeBottom.scale = 0.8
    pipeBottom.velocityX = -(2 + Score/100);
    pipeBottom.lifetime = 500;
    pipeBottomGroup.add(pipeBottom);
    pipeBottom.debug = true;
    pipeBottom.setCollider("rectangle", 0, 0, 100, 460)


    pipeBottom.y = Math.round(random(600, 800))
    pipeTop.y = Math.round(random(60, 100))

    balloon.depth = pipeTop.depth
    balloon.depth = balloon.depth + 1

    // console.log(balloon.x);
    // console.log(pipeTop.x);

    console.log(pipeTopGroup.length);  

  for(var i = 0;i < pipeTopGroup.length;i++){

    pipeTopPosition = pipeTopGroup.get(i);
    
    if (!balloon.isTouching(pipeTopGroup) && pipeTopPosition.x < 450){
      Score = Score + 1;


    }
  }

   
  }
}

function reset() {
  gameState = "serve";
  Score = 0;
  restart.visible = false;
}