var player,enemygroup,gamestate="play",invisble,track,score=0,bulletgroup,bulletcount=50,blasti;

function preload(){
  playerimage= loadImage("car2.png");
  enemyimage=loadImage("car4.png" )
  tracki=loadImage("track.png")
blasti=loadImage("blast.png")
}
function setup(){
  //to make the canvas
  createCanvas(1200,400);
  //to make the player
  bulletgroup=new Group();
  enemygroup=new Group()
  track=createSprite(400,200);
  track.addImage("track",tracki)
  player=createSprite(400,200,50,50);
  player.shapeColor="lime"
  player.addImage("car2",playerimage)
   
enemygroup.lifetime=7
invisible=createSprite(400,390,1000,5)
invisible.shapeColor="red"
invisible.visible=false
track.scale=1.5;

}

function draw() {
  background(0);  
  run();
  if(player.x>800){
    player.x=0;

  }
  
  textSize(20)
    fill("lime");
text("Bullets:"+bulletcount,1060,300)
  
  if(player.x<0){
    player.x=800;
  }

  track.velocityY=10
  if(track.y>400){
    track.y=track.height/2
  }
  if (enemygroup.isTouching(invisible)) {
    score = score +1;
  }
  if(bulletgroup.isTouching(enemygroup)){
    enemygroup.destroyEach();
    score=score+20;
  }
  
  textSize(30);
  fill("lime")
 text("Score:"+score,1060,50)
// player.debug=true
bullet();
blast();
  drawSprites();
createenemy()
if(player.collide(enemygroup)){
  
  gamestate="end"
}
if(gamestate==="end"){
  invisible.destroy();
  textSize(30);
  fill("lime")
  text("you loose",400,200)
  bulletgroup.destroyEach();
  enemygroup.setVelocityYEach(0);
  track.velocityY=0
  enemygroup.destroyEach();
  player.destroy();
}

//pause();
}
track.velocityY=10
//making the player run
function run(){
  if(gamestate==="play"){
  if(keyDown("right")){
     player.x=player.x+15;
    }
    if(keyDown("left")){
      player.x=player.x-15;
    }
  }
   
  }
  //creating enemy
  function createenemy(){
    if(frameCount%20===0){
      var enemy=createSprite(random(0,800),50,50)
      enemy.velocityY=5;
      enemy.shapeColor="red"
      enemy.addImage("car3",enemyimage)
      enemygroup.add(enemy)
    }
  }
  function bullet(){
  if(keyWentDown("s")&&bulletcount>0&&gamestate==="play"){
    var bullet=createSprite(player.x,player.y,5,15);
    bullet.velocityY=-10;
    bullet.shapeColor="red"
    bulletcount=bulletcount-1;
    bulletgroup.add(bullet);

  }
  
    

  }
  function blast(){
   if(gamestate==="end"){
     var blasty=createSprite(player.x,player.y,10,10);
     blasty.addImage("blast",blasti);
     blasty.scale=0.5
   
   }
  }



