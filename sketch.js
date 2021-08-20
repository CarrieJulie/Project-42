var score =0;
var gun, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, bulletGroup;
var blueBubbleImg, blueBubbleGroup, redBubbleImg;
var lives, scores;
var bullet;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")

  lives = createElement("h1");
  scores = createElement("h1");
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes;
  scores.html("Score: " + score);
  scores.style('color: red');
  scores.position(150, 25);
  lives.html("Life: " + life);
  lives.style('color: red');
  lives.position(300, 25);

  if(gameState===1)
  {
    gamePlay();
  }

  if (gameState === 2)
  {
    gameOver();
  }
     
}

function shootBullet()
{
  bullet = createSprite(gun.x + 40, gun.y - 30, 10, 10);
  bullet.addImage(bulletImg);
  bullet.scale = 0.2;
  bullet.velocityX = 7;
  bullet.depth = gun.depth - 1;

  bulletGroup.add(bullet);
  bullet.lifetime = 500
}

function createBlueBubble()
{
  var rand = Math.round(random(50, 750));
  var bubble = createSprite(850, rand, 10, 10);
  bubble.addImage(blueBubbleImg);
  bubble.scale = 0.075;
  bubble.velocityX = -5;
  blueBubbleGroup.add(bubble);
  bubble.lifetime = 500;

}

function createRedBubble()
{
  var rand = Math.round(random(75, 725));
  var bubble = createSprite(850, rand, 10, 10);
  bubble.addImage(redBubbleImg);
  bubble.scale = 0.1;
  bubble.velocityX = -5;
  redBubbleGroup.add(bubble);
  bubble.lifetime = 500;
}

function bubbleCollision(bubbleGroup)
{
  if (life > 0)
  {
    score = score + 1;
  }
  bubbleGroup.destroyEach();
  bulletGroup.destroyEach();
  var blast = createSprite(bullet.x + 30, bullet.y, 10, 10);
  blast.addImage(blastImg);
  blast.scale = 0.2;
  blast.lifetime = 20;
}

function reduceLife(bubbleGroup)
{
  if (bubbleGroup.isTouching(backBoard))
  {
    life = life - 1;
    bubbleGroup.destroyEach();
  }
}

function gamePlay()
{
  gun.y=mouseY  
    
    if (keyDown("space"))
    {
      shootBullet();
    }

    if (frameCount % 120 === 0)
    {
      createBlueBubble();
    }
   
    if (frameCount % 150 === 0)
    {
      createRedBubble();
    }

    if (blueBubbleGroup.isTouching(bulletGroup))
    {
      bubbleCollision(blueBubbleGroup);
    }

    if (redBubbleGroup.isTouching(bulletGroup))
    {
      bubbleCollision(redBubbleGroup);
    }
    reduceLife(blueBubbleGroup);
    reduceLife(redBubbleGroup);

    if (life == 0)
    {
      gameState = 2;
    }
    drawSprites();
}

function gameOver()
{
  redBubbleGroup.setVelocityEach(0);
  blueBubbleGroup.setVelocityEach(0);

  swal({
    title: `Game Over`,
    text: "You missed too many Bubbles...",
    text: "Your score is: " + score,
    imageUrl: 
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing!" 
  });

  drawSprites();
}