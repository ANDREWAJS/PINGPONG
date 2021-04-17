var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var ball = createSprite(200,200,10,10);
var playerpaddle=createSprite(200,350,70,10);
var computerpaddle=createSprite(200,50,70,10);
var goal1=createSprite(200,28,100,20);
var goal2=createSprite(200,372,100,20);
var playerscore = 0;
var computerscore=0;


var gamestate ='serve';

ball.shapeColor='red';
playerpaddle.shapeColor='lightblue';
computerpaddle.shapeColor='lightblue';
goal1.shapeColor='yellow';
goal2.shapeColor='yellow';


function draw() {
  background("darkgreen");
  
    text(computerscore,198,180);
    text(playerscore,198,230);
    
    
    if(ball.isTouching(goal1)|| ball.isTouching(goal2)){
      
      if(ball.isTouching(goal1)){
        playerscore=playerscore+1;
      }
      
      if(ball.isTouching(goal2)){
        computerscore=computerscore+1;
      }
      reset();
      gamestate='serve';
      
    }
    
      if(computerscore===5||playerscore===5){
    gamestate='over';
    fill("white");
    text('GAME OVER!',170,120);
    fill("white")
    text('Press R To Restart',150,80);
    
  }
    
  if (gamestate === 'serve'){
    fill('yellow');
    text('PRESS SPACE TO STRIKE',130,122);
    
    

    text(computerscore,198,180);
    text(playerscore,198,230);
    
    if (keyDown("space")&& gamestate === 'serve'){
  serve();
  gamestate='play' ;
}  
  }
  
createEdgeSprites();


noFill();
strokeWeight(4);
stroke("white");
  ellipse(200, 200, 100, 100);
  
  strokeWeight(4);
  stroke('white');
  line(399,200,0,200);
  
strokeWeight(4);
stroke("white");
noFill();
rect(115, 0, 178, 100);

  
strokeWeight(4);
stroke("white");
noFill();
rect(115, 320, 178, 100);

if (keyDown("left")){
  playerpaddle.x=playerpaddle.x-10;
}
if (keyDown("right")){
  playerpaddle.x=playerpaddle.x+10;
}
if (keyDown("up")){
  if (playerpaddle.y<25){
    playerpaddle.y=playerpaddle.y-10;
  }
}
if (keyDown("down")){
  if(playerpaddle.y<125){
    playerpaddle.y=playerpaddle.y+10;
  }
}



   ball.bounceOff(edges);
   playerpaddle.bounceOff(edges);
   computerpaddle.bounceOff(edges);
   ball.bounceOff(playerpaddle);
   ball.bounceOff(computerpaddle);
   ball.bounceOff(goal1);
   ball.bounceOff(goal2);
   
   drawSprites(); 
   
     if(keyDown('r')&& gamestate==='over'){
    gamestate='serve';
    computerscore=0;
    playerscore=0;
  }
   
   computerpaddle.x=ball.x;
   
}

function serve(){
  ball.velocityX=-4;
  ball.velocityY=-5;
}
function reset(){
  ball.x=200;
  ball.y=200;
  ball.velocityX=0;
  ball.velocityY=0;
}




// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
