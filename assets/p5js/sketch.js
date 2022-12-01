let exploded;
let borderTop; 
let borderBottom;  
let borderLeft;    
let borderRight;
let borders =new Array();
let explosion;
let rocket;
let rockets=new Array();
let rocketNo = 10;
let cityNo = 4;
let score = 0;
let aim;
let aimed = new Array();
let click = {
    x:new Array(),
    y:new Array(),
}
let attack;
let TTS = 1;
let ATTS = 2;
let base;
let game = 1;
let gameState = 0;
let city = new Array();
let cities = new Array();
let attackers = new Array();
let startButton;
let leaderB;
let creditsB;
let rumbleCount=0
let bg={
    x:0,
    y:0,
}
let crossHair;
let crossHairPos = new Array();
let sp;
let attackerExpl = new Array();
let attackerCityExpl = new Array();
let blownCityNo = [0,0,0,0];
let rank = new Array();
let highScore = new Array();
let name1 = new Array();
let BlownUpEnemies = 0;
let level = 0;
let attractionMin = 1;
let attractionMax = 5;
let airDrop;
let airDrops = new Array();
const cWidth = 1500;
const cHeight = 850;
let anyKeyTimer = 2;
let burst = 0;

function preload(){
    //------------------------FONT-------------------------------
    gameFont = loadFont('../../assets/p5js/assets/font/gameFont.ttf')
    //-----------JSON FILE----------------------------------------
    leaderboardData = loadJSON('../../assets/p5js/LeaderBoard.JSON');
    //------------------------------------------------------------
    //------------------------------------------------------------
    credits = loadStrings('../../assets/p5js/Credits.txt');
    //------------------------------------------------------------
    //-----------------EXPLOSION ANIMATION -----------------------
    explosionAnim = loadAnimation('../../assets/p5js/assets/explosions/expl1.png','../../assets/p5js/assets/explosions/expl2.png','../../assets/p5js/assets/explosions/expl3.png','../../assets/p5js/assets/explosions/expl4.png','../../assets/p5js/assets/explosions/expl5.png','../../assets/p5js/assets/explosions/expl6.png','../../assets/p5js/assets/explosions/expl7.png','../../assets/p5js/assets/explosions/expl8.png','../../assets/p5js/assets/explosions/expl9.png','../../assets/p5js/assets/explosions/expl10.png')
    //--------------------VIDEO----------------------------------
    video = createVideo(['../../assets/p5js/assets/Video/video1.mp4']);
    //------------------------------------------------------------
    //---------------SOUNDS---------------------------------------
    explSound = loadSound('../../assets/p5js/assets/Sounds/explosionSound.wav');
    laserSound = loadSound('../../assets/p5js/assets/Sounds/laser.wav');
    enemySound = loadSound('../../assets/p5js/assets/sounds/launch.wav');
    error = loadSound('../../assets/p5js/assets/Sounds/error.mp3');
    NextLevelSound = loadSound('../../assets/p5js/assets/Sounds/NextLevel.wav');
    // introMusic = loadSound('../../assets/p5js/assets/Sounds/throughSpace.mp3');
    airDropSound = loadSound('../../assets/p5js/assets/Sounds/airdrop.wav');
    //------------------------------------------------------------
    //---------------IMAGES---------------------------------------
    rocketImg = loadImage('../../assets/p5js/assets/rockets/rockets.png'); 
    scoreTitle = loadImage('../../assets/p5js/assets/Text/score.png');
    airDropImg = loadImage('../../assets/p5js/assets/SpaceShip.png');
    cityImg = loadImage('../../assets/p5js/assets/City.png');
    crossHairImg1 = loadImage('../../assets/p5js/assets/crosshair/crosshair1.png'); 
    crossHairImg2 = loadImage('../../assets/p5js/assets/crosshair/crosshair.png'); 
    attackImage = loadImage('../../assets/p5js/assets/rockets/attack.png'); 
    backgroundImage = loadImage('../../assets/p5js/assets/background.png');
    plane = loadImage('../../assets/p5js/assets/SpaceShip.png');
    title = loadImage('../../assets/p5js/assets/Text/title.png');
    blownCity = loadImage ('../../assets/p5js/assets/explodedCity.png');
    creditTitle = loadImage('../../assets/p5js/assets/Text/credits.png');
    leaderboardTitle = loadImage('../../assets/p5js/assets/Text/leaderboard.png');
    missile = loadImage('../../assets/p5js/assets/rockets/spr_missile.png');
    //smokeImg = loadAnimation('assets/smoke/smoke1.png','assets/smoke/smoke2.png','assets/smoke/smoke3.png','assets/smoke/smoke4.png','assets/smoke/smoke5.png','assets/smoke/smoke6.png','assets/smoke/smoke7.png','assets/smoke/smoke8.png','assets/smoke/smoke9.png','assets/smoke/smoke10.png','assets/smoke/smoke11.png','assets/smoke/smoke12.png','assets/smoke/smoke13.png','assets/smoke/smoke14.png','assets/smoke/smoke15.png','assets/smoke/smoke16.png')
    smokeImg = loadImage('../../assets/p5js/assets/rockets/smoke.png');
    //------------------------------------------------------------
}

//------ City Sprites in setup-------
function protect(){
    let y=height-20;
    for (let i =0;i<4;i++){
        city = createSprite(400*i+150,y);
        city.setCollider('rectangle',0,0,100,100);
        city.changeImage('city');
        blownCity.resize(100,20);
        city.addImage('city',cityImg);
        city.addImage('cityBlown',blownCity);
        cities.add(city);
    }
}


// -------------------  City Collision -------------------------
function cityCollision(){
   
    if (attackers.overlap(cities)==true){
        for (let i = 0; i < cities.length;i++){
            if (attackers.overlap(cities[i])==true){
                cities[i].changeImage('cityBlown');
                blownCityNo[i] = 1;
                rumbleCount=1;
            }
        }
        for (let i =0; i<attackers.length;i++){
            if (attackers[i].overlap(cities)==true){
                explSound.play();
                explosion3 = createSprite(attackers[i].position.x,attackers[i].position.y);
                attackers[i].remove();
                attackers.splice(i,1)
                explosion3.addAnimation('explod',explosionAnim.clone());
                explosion3.animation.frameDelay=3;
                attackerCityExpl.push(explosion3);
            }
        }
    }
    for (let i=0; i<attackerCityExpl.length;i++){//remove explosion on last frame
        if (attackerCityExpl[i].animation.getFrame()==9){
            attackerCityExpl[i].remove()
            attackerCityExpl.splice(i,1)
        }
    }
}
// ------------ Falling enemy rockets sprites ---------------------------
function enemy(){
    if (TTS < 0){
        attack = createSprite((random(0,width)),0)
        smokeImg.resize(100,10)
        attack.addImage(smokeImg)
        attack.setCollider('rectangle',0,0,40,10)
        attack.attractionPoint(random(attractionMin,attractionMax),random(50,1450),height)
        attack.rotateToDirection=true
        TTS += random(1,2)
        attackers.push(attack)
        BlownUpEnemies +=1
        
    }
    for(let i=0;i<attackers.length;i++){
        if (attackers[i].position.y > height){
            attackers[i].remove()
            attackers.splice(i,1)
        }
        for(let i=0;i<attackers.length;i++){
            if (attackers[i].collide(exploded)==true){
                explSound.play()
                explosion2 = createSprite(attackers[i].position.x,attackers[i].position.y)
                attackers[i].remove()
                attackers.splice(i,1)
                explosion2.addAnimation('explod',explosionAnim.clone())
                explosion.animation.frameDelay=3
                attackerExpl.push(explosion2)
                score+=10
                rumbleCount=1
            }
        }
        for (let j=0; j<attackerExpl.length;j++){//remove explosion on last frame
            if (attackerExpl[j].animation.getFrame()==9){
                attackerExpl[j].remove()
                attackerExpl.splice(j,1)
            }
        }
    }
}

//----------------Bonus plane for extra bullets -----------------------
function airDropPlane (){
    if (ATTS < 0){
        airDrop = createSprite(-50,random(150,500))
        airDrop.addImage(airDropImg)
        airDropImg.resize(50,20)
        airDrop.attractionPoint(random(attractionMin,attractionMax),width+50,airDrop.position.y)
        airDrop.rotateToDirection=true
        ATTS += random(10,20)
        airDrops.push(airDrop)
    }
    for(let i=0;i<airDrops.length;i++){
        if (airDrops[i].position.x > width+100){
            airDrops[i].remove()
            airDrops.splice(i,1)
        }
        for(let i=0;i<airDrops.length;i++){
            if (airDrops[i].collide(exploded)==true){
                explSound.play()
                explosion2 = createSprite(airDrops[i].position.x,airDrops[i].position.y)
                airDrops[i].remove()
                airDrops.splice(i,1)
                explosion2.addAnimation('explod',explosionAnim.clone())
                explosion.animation.frameDelay=3
                attackerExpl.push(explosion2)
                score+=10
                rumbleCount=1
                rocketNo+=10
                airDropSound.play()
            }
        }
        for (let j=0; j<attackerExpl.length;j++){//remove explosion on last frame
            if (attackerExpl[j].animation.getFrame()==9){
                attackerExpl[j].remove()
                attackerExpl.splice(j,1)
            }
        }
    }
}
// ------ crosshair sprite --------------------------
function crossHairSprite(x,y){
    crossHair = createSprite(x,y)
    crossHair.addImage(crossHairImg2)
    crossHairImg2.resize(30,30) // resize aim image
    sp=8
    crossHair.friction = 0.5
    crossHairPos.push(crossHair)
}



//-----------------canon------------
function cannon(){
    fill(255)
    ellipse(width/2,height,100,100)
    fill(0)
    textAlign(CENTER)
    textSize(24)
    if (rocketNo == 0){
    fill('red')
    }
    else{ fill('green')}
    text(rocketNo,width/2,height-20)
}
//--------------------------------------


// Controls settings-----------------------------------------------------------
function controls(){
    if (keyDown("w")){
        crossHairPos[0].addSpeed(sp,270)
    }
    if (keyDown("d")){
        crossHairPos[0].addSpeed(sp,0)
    }
    if (keyDown("s")){
        crossHairPos[0].addSpeed(sp,90)
    }
    
    if (keyDown("a")){
        crossHairPos[0].addSpeed(sp,180)
    }
    if (keyDown(16)){
        crossHairPos[0].limitSpeed(20)
    }
    else {crossHairPos[0].limitSpeed(10)}
    if (keyWentDown(66)===true && burst ==0) {
        burst = 1
    }
    else if (keyWentDown(66)===true && burst ==1){
        burst = 0
    }
}
//-----------------------------------------------------------------------------


//--------Explosion animation + Sprites-----Rocket sprites------crosshair target sprites----
function explode (){

    //---------------Normal Fire ------------------------------------------
    if (keyWentDown(32)===true && burst == 0 && rocketNo > 0){
        aim=createSprite(crossHair.position.x,crossHair.position.y) // create aim sprite
        aim.addImage(crossHairImg1) // add Image to aim
        crossHairImg1.resize(20,20) // resize aim image
        aim.rotation=45
        aim.setCollider('rectangle')
        aimed.push(aim) //push var
        rocket=createSprite(width/2,height)
        rocket.addImage(rocketImg)
        rocket.attractionPoint(20,aim.position.x,aim.position.y)
        rocketImg.resize(15,5)
        rocket.rotateToDirection=true
        rocket.setCollider('circle')
        laserSound.play()
        rockets.push(rocket)
        rocketNo--
    }

    //--------------Burst Fire ----------------------------------------------

    if (keyIsDown(32)===true  && rocketNo > 0&&frameCount%5==0 && burst == 1){
        aim=createSprite(crossHair.position.x,crossHair.position.y) // create aim sprite
        aim.addImage(crossHairImg1) // add Image to aim
        crossHairImg1.resize(20,20) // resize aim image
        aim.rotation=45
        aim.setCollider('rectangle')
        aimed.push(aim) //push var
        rocket=createSprite(width/2,height)
        rocket.addImage(rocketImg)
        rocket.attractionPoint(20,aim.position.x,aim.position.y)
        rocketImg.resize(15,5)
        rocket.rotateToDirection=true
        rocket.setCollider('circle')
        laserSound.play()
        rockets.push(rocket)
        rocketNo--
    }
    //-----------no ammo sound----------------------
    else if(keyWentDown(32)===true && rocketNo == 0){
        error.play()
    }
    for(let i=0;i<aimed.length;i++){
        if (rockets[i].collide(aimed[i])==true){
            explSound.play()
            explosion = createSprite(aimed[i].position.x,aimed[i].position.y)
            explosion.addAnimation('explod',explosionAnim.clone())
            //explosion.life=1000
            explosion.animation.frameDelay=8
            explosion.setCollider('circle',0,0,50)
            exploded.push(explosion)
            rockets[i].remove()
            rockets.splice(i,1)
            aimed[i].remove()
            aimed.splice(i,1)
        }
    }
    for (let i=0; i<exploded.length;i++){//remove explosion on last frame
        if (exploded[i].animation.getFrame()==9){
            exploded[i].remove()
            exploded.splice(i,1)
        }
    }
}

// Button Functions ---------------------------------------------------------
function Start(){
    gameState = 2
    leaderB.hide()
    creditsB.hide()
    startButton.hide()
    // introMusic.stop()
}
function leaderBoardPage(){
    gameState = 3
    leaderB.hide()
    creditsB.hide()
    startButton.hide()
}
function creditsPage(){
    gameState = 4               
    leaderB.hide()
    creditsB.hide()
    startButton.hide()
}
function gameOverPage(){
    clear()
    burst = 0
    TTS = 1
    ATTS = 20
    
    for (let i = 0; i < cities.length;i++){
        cities[i].changeImage('city')
    }
    for (let i = 0; i < attackers.length;i++){    
        attackers[i].remove()
        attackers.splice(i,1)
    }
    for (let i = 0; i < exploded.length;i++){ 
        exploded[i].remove()
        exploded.splice(i,1)
    }
    for (let i = 0; i < aimed.length;i++){ 
        aimed[i].remove()
        aimed.splice(i,1)
    }
    for (let i = 0; i < rockets.length;i++){ 
        rockets[i].remove()
        rockets.splice(i,1)
    }
    for (let i = 0; i < attackerExpl.length;i++){
        attackerExpl[i].remove()
        attackerExpl.splice(i,1)
    }
    if (frameCount % 60 == 0){
        anyKeyTimer --
    }
    if (keyIsPressed==true&&anyKeyTimer<0){
        clear()
        gameState = 1
    }
}

// back button in credits screen -----------------------
function back(){
    gameState = 1               
    backButton.hide()
    loop()
    clear()
}

// ------------- If Exit key pressed remove sprites and restart the game--------------
function keyPressed(){
    if (keyCode === 27){
        TTS = 1
        gameState = 1
        blownCityNo = [0,0,0,0]
        for (let i = 0; i < cities.length;i++){
            cities[i].changeImage('city')
        }
        for (let i = 0; i < attackers.length;i++){    
            attackers[i].remove()
            attackers.splice(i,1)
        }
        for (let i = 0; i < exploded.length;i++){ 
            exploded[i].remove()
            exploded.splice(i,1)
        }
        for (let i = 0; i < aimed.length;i++){ 
            aimed[i].remove()
            aimed.splice(i,1)
        }
        for (let i = 0; i < rockets.length;i++){ 
            rockets[i].remove()
            rockets.splice(i,1)
        }
        for (let i = 0; i < attackerExpl.length;i++){
            attackerExpl[i].remove()
            attackerExpl.splice(i,1)
        }
        for (let i = 0; i < airDrops.length;i++){
            airDrops[i].remove()
            airDrops.splice(i,1)
        }
    }                   
}

function crossHairBorder(){
    borderTop = createSprite(width/2,10,cWidth,50)
    borderBottom = createSprite(width/2,height-10,width+10,50)
    borderLeft = createSprite(10,height/2,50,height+10)
    borderRight = createSprite(width-10,height/2,50,height+10)
    borderTop.visible = false
    borderBottom.visible = false
    borderLeft.visible = false
    borderRight.visible = false
    borderTop.setDefaultCollider()
    borderBottom.setDefaultCollider()
    borderLeft.setDefaultCollider()
    borderRight.setDefaultCollider()
    borders = new Group() 
    borders.push(borderTop)
    borders.push(borderBottom)
    borders.push(borderLeft)
    borders.push(borderRight)
}
//------------------------------------------------------------------------------


function setup(){
    
    cnv = createCanvas(windowWidth-50, windowWidth * 0.56);
    console.log(cnv.elt.height)
    console.log(height)
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height - 50);
    // if(windowWidth < 550) {
    //     x = 10;
    // } else {
    //     y = 100;
    // }

  possi = cnv.position(x, 0);
  console.log(possi)
    // createCanvas(1500,850)

    
    crossHairBorder()
    
    

    //-----button creation-------------------
    startButton = createButton('Start Game')
    leaderB = createButton ('Leaderboard')
    creditsB = createButton ('Credits')
    backButton = createButton('back')
    startButton.hide()
    leaderB.hide()
    creditsB.hide()
    backButton.hide()

    // arrays of sprites----------------
    exploded = new Group();
    cities = new Group();
    attackers = new Group();
    attackerCityExpl = new Group()
    crossHairSprite(width/2,height/2)
    imageMode(CENTER)
    backgroundImage.resize(width,height)
    protect()
}

let a = createA('http://p5js.org/', 'this is a link');
a.position(0, 0);
function draw(){
    //---border for crosshair-------------------------------
    crossHair.collide(borders)

    //-----Menu Page-------------------------------------------------------------------------
    if (gameState === 1) {
        anyKeyTimer = 2
        blownCityNo = [0,0,0,0]
        rocketNo = 10;
        score = 0;
        BlownUpEnemies = 0;
        level = 0;
        attractionMin=1
        attractionMax=5
        imageMode(CORNER)
        image(backgroundImage,bg.x,bg.y)
        imageMode(CENTER)
        image(title,width/2,height/4+100)
        fill(255)
        textSize(10)
        textFont(gameFont)
        text("Controls: Up = W   Down = S    Left = A   Right = D   (HOLD) Shift = Speed Up CrossHair   Fire = SpaceBar     Main Menu = Esc     Rapid Fire = B", 20,height-50)

    // -------------menu page button setup -------------------
        startbut = startButton.style('font-size','20px')
        startButton.style('font-family','lores-9-wide-bold-alt-oaklan')
        startButton.size(500,50)
        startButton.position( cnv.elt.width/2 - startbut.elt.width/2, height/2+50)
        startButton.style('color','red')
        startButton.style('border', '2px solid #f44336')
        startButton.style('background', 'darkblue')
        startButton.mouseClicked(Start)
        leaderbut = leaderB.style('font-size','20px')
        leaderB.style('font-family','lores-9-wide-bold-alt-oaklan')
        leaderB.style('border', '2px solid #f44336')
        leaderB.style('background', 'darkblue')
        leaderB.position(cnv.elt.width/2 - leaderbut.elt.width/2,height/2+150)
        leaderB.size(500,50)
        leaderB.style('color','red')
        leaderB.mouseClicked(leaderBoardPage)
        credbut = creditsB.style('font-size','20px')
        creditsB.style('color','red')
        creditsB.style('font-family','lores-9-wide-bold-alt-oaklan')
        creditsB.style('border', '2px solid #f44336')
        creditsB.style('background', 'darkblue')
        creditsB.position(cnv.elt.width/2 - credbut.elt.width/2,height/2+250)
        creditsB.size(500,50)
        creditsB.mouseClicked(creditsPage)
        // introMusic.play()
        // introMusic.playMode("untilDone");
        startButton.show()
        leaderB.show()
        creditsB.show()
    }

    //-----LeaderBoard Page-------------------------------------------------------------------------
    if (gameState ==3){
        for (let i=0;i<10;i++){
            imageMode(CORNER)
            image(backgroundImage,bg.x,bg.y)
            imageMode(CENTER)
            image(leaderboardTitle,width/2,100)
            // ------- reading JSON leaderboard file
            rank.push(leaderboardData.leaderboard[i].Rank)
            highScore.push(leaderboardData.leaderboard[i].Score)
            name1.push(leaderboardData.leaderboard[i].Name)
            fill("red")
            textSize(24)
            textAlign(CENTER)
            textFont(gameFont)
            text("RANK"+"   "+"HIGH SCORE"+"    "+"NAME",width/2,200)
        }
        // ---- Printing leaderboard ---------------------------------------------------------------------------------
        for (let i = 0; i<rank.length;i++){
            if (i<rank.length){ 
                textAlign(CENTER)
                textFont(gameFont)
                text(rank[i]+"      "+highScore[i]+"        "+name1[i],width/2,50*i+250)
            }
        }
        noLoop() // ----- Don't keep printing the leaderboard page --------
        backButton.show()
        backbut1 = backButton.style('font-size','20px')
        backButton.style('font-family','lores-9-wide-bold-alt-oaklan')
        backButton.position(cnv.elt.width/2 - backbut1.elt.width/2,height-50)
        backButton.size(500,50)
        backButton.mouseClicked(back)
    }

    //--------Credits Page----------------------------------------------------------------------
    if (gameState == 4){
        imageMode(CORNER)
        image(backgroundImage,bg.x,bg.y)
        imageMode(CENTER)
        image(creditTitle,width/2,100)
        for (let i=0; i<credits.length;i++){
            textSize(12)
            fill(255)
            fill("red")
            textAlign(CENTER)
            textFont(gameFont)
            text(credits[i],width/2,80*i+200)
        }
        backButton.show()
        backbut2 = backButton.style('font-size','20px')
        backButton.style('font-family','lores-9-wide-bold-alt-oaklan')
        backButton.position(cnv.elt.width/2 - backbut2.elt.width/2,height-50)
        backButton.size(500,50)
        backButton.mouseClicked(back)
    }


    //-------Splash Page-----------------------------------------------------------------------
    if (gameState === 0){
        background("Darkblue")
        imageMode(CENTER)
        let Pas = "Press Any Key"
        image(video,width/2,height/2,width,height)
        fill("red")
        textSize(20)
        textAlign(CENTER)
        textFont(gameFont)
        text("By Taylor Edgerton",width/2,height-300)
        text(Pas,width/2,height-100)
        image(title,width/2,height/2)
        video.volume(0)
        video.hide()
        video.loop()
        if(keyIsPressed === true){
        clear()
        gameState = 1
        }    
    }


    //----------Game Play--------------------------------------------------------------------
    if (gameState === 2){
        background("Darkblue")
        imageMode(CORNER)
        backgroundImage.resize(width,height)
        image(backgroundImage,bg.x,bg.y)
        // ---------- Screen shake initiated by explosions where rumbleCount+1 -------------------
        if (frameCount % 60 == 0){
            rumbleCount --
        }
        if (rumbleCount > 0){
            translate(randomGaussian(-5,5),randomGaussian(-5,5));
        }
        // ----------------------------------------------------------------------------------
        fill('red')
        textFont(gameFont)
        textSize(24)
        text("SCORE:  "+score,200,50)
        text("LEVEL:  "+level,width-400,50)
        if (frameCount % 60==0){
            TTS --
            ATTS--
        }
        if (BlownUpEnemies == 10){
            TTS=TTS/2
            level += 1
            score+= 500
            attractionMin+=2
            attractionMax+=2
            rocketNo += 10
            BlownUpEnemies = 0
            NextLevelSound.play()
        }   
        airDropPlane ()
        cannon()
        controls()
        explode()
        enemy()
        cityCollision()
        drawSprites()
        if (blownCityNo[0] ==1 && blownCityNo[1] ==1 && blownCityNo[2] ==1 && blownCityNo[3] ==1){
            gameState = 5
        } 
    }
    // ------------Game Over Page------------------------------------------------------
    if (gameState ==5){
        gameOverPage()
        imageMode(CORNER)
        image(backgroundImage,bg.x,bg.y)
        imageMode(CENTER)
        image(scoreTitle,width/2,100) 
        fill('red')
        textSize(32)
        textAlign(CENTER)
        text(score,width/2,height/2)
        text("Press Any Key",width/2,height-50)
    }
}
