var initId = 0;
var w3_ground = Class.create({
	ground: null,
	width: 0
});
var world1 = createWorld(new b2Vec2(0, 300));
var world2 = createWorld(new b2Vec2(0, 300));
var world3 = createWorld(new b2Vec2(0, 150));
var world4 = createWorld(new b2Vec2((Math.random()*10)-5, 150));
var ctx;
var time = 0;
var lastTime = 0;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;
var keys = [];
var oldkeys = [];
var keyrepeat = 0;
var gameStartTime = 0;
var score = 0;
var coins = 0;
var finalScore = 0;
var finalBonusScore = 0;
var finalTotalScore = 0;
var rankingShowTime = 0;
var bulletHit = false;
var bulletHitTime = 0;
var coinCollectedTime = 0;
/*
0-click to start
1-right or left arrow to start
2-screen 1
3-up or down to move
4-screen 2
5-X to jump
6-screen 3
7-C to rotate
8-screen 4
9-game over fade out
10-game over
11-highscores
*/
var gameState = 0;
var gameOverTime = 0;
var stateBeforeGameOver = 0;
var rank = "";
var mouseX = 0;
var mouseY = 0;

var PI = 3.14159265359;
var BULLET_SPAWN_TIME = 3000;
var COIN_SPAWN_TIME = 5000;

var w1_box;
var w1_ball;
var w1_trigger;

var w2_target;
var w2_trigger;
var w2_bullets = new Array(2);
var w2_currentBullet = 0;
var w2_spawnBullet = 0;

var w3_ball;
var w3_grounds = new Array(4);
var w3_currentGround = 0;
var w3_canJump = false;

var w4_ball;
var w4_catcher;
var w4_spawnCoin = 0;

var img_border;
var img_circle;
var img_background;
var img_msgBackground;
var img_keyLeft;
var img_keyRight;
var img_keyUp;
var img_keyDown;
var img_keyC;
var img_keyX;
var img_rank1;
var img_rank2;
var img_rank3;
var img_rank4;
var img_rank5;
var img_rank6;
var img_openingScreen;
var img_playAgain;
var img_playAgainOver;

var img_t1_plank;
var img_t1_blob;
var img_t2_brick;
var img_t2_target;
var img_t2_bullet;
var img_t2_bulletExp;
var	ani_exp;
var img_t3_boy;
var img_t3_boyWalk;
var ani_boyWalk;
var img_t3_waves;
var img_t3_ground;
var img_t4_coin;
var img_t4_catcher;

var sfx_t1_stick;
var sfx_t1_waterDrop;
var sfx_t2_bulletsHitting;
var sfx_t3_jumping;
var sfx_t3_landing;
var sfx_t4_coin;
var sfx_bgMusic;
var sfx_bgWin;
var stickPlayed = false;
//var waterDropPlayed = false;

function step() {
	if(gameState == 2 && score >= 10) {
		++gameState;
	}
	else if(gameState == 4 && score >= 20) {
		++gameState;
		w2_bullets[w2_currentBullet++] = new Bullet(world2);
		w2_spawnBullet = new Date().getTime()+BULLET_SPAWN_TIME;
	}
	else if(gameState == 6 && score >= 30) {
		++gameState;
	}
	if(gameState == 2 || gameState == 4 || gameState == 6 || gameState == 8) {
		time = new Date().getTime();
		score = Math.floor((time - gameStartTime)/1000);
		
	} else {
		if(lastTime)
			gameStartTime+= (new Date().getTime()) - lastTime;
	}
	lastTime = new Date().getTime();
	
	handleInteractions();
	oldkeys = keys.slice();
	
	var stepping = false;
	var timeStep = 1.0/60;
	var iteration = 10;
	
	
	if(gameState == 2 || gameState == 4 || gameState == 6 || gameState == 8){
		world1.Step(timeStep, iteration);
	}
	
	if(gameState == 4 || gameState == 6 || gameState == 8){
		world2.Step(timeStep, iteration);
		for(var i=0;i<3;++i){
			if(w2_bullets[i]) {
				var modifier = 1.0;
				if(score > 60) {
					modifier = 1.0 + (score-60)/60;
				}
				if(w2_bullets[i].Step(timeStep, w2_target, modifier)) {
					if(!bulletHit)
						sfx_t2_bulletsHitting.play();
					bulletHit = true;
					bulletHitTime = lastTime;
				}
			}
		}
		if(time>=w2_spawnBullet){
			if(w2_bullets[w2_currentBullet]){
				w2_bullets[w2_currentBullet].Destroy(world2);
				delete w2_bullets[w2_currentBullet];
			}
			w2_bullets[w2_currentBullet++] = new Bullet(world2);
			w2_spawnBullet = new Date().getTime()+BULLET_SPAWN_TIME;
			if(w2_currentBullet>2)
				w2_currentBullet=0;
		}
	}
	
	if(gameState == 6 || gameState == 8){
		world3.Step(timeStep, iteration);
		for(var i=0;i<5;++i){
			if(w3_grounds[i])
				w3_grounds[i].ground.SetCenterPosition(
					new b2Vec2(w3_grounds[i].ground.GetCenterPosition().x-1, 
					w3_grounds[i].ground.GetCenterPosition().y), 0);
		}
		if(w3_grounds[w3_currentGround]) {
			if(w3_grounds[w3_currentGround].ground.GetCenterPosition().x + w3_grounds[w3_currentGround].width <= 400) {
				var width = 40+Math.floor((Math.random()*5))*40;
				w3_newGround = createBox(world3, 440+width, 500, width, 10, true, 'w3_ground', 1.0);
				w3_currentGround++;
				if(w3_currentGround>4)
					w3_currentGround=0;
				if(w3_grounds[w3_currentGround]) {
					world3.DestroyBody(w3_grounds[w3_currentGround].ground);
					delete w3_grounds[w3_currentGround];
				}
				w3_grounds[w3_currentGround] = new w3_ground();
				w3_grounds[w3_currentGround].ground = w3_newGround;
				w3_grounds[w3_currentGround].width = width;
			}
		}
		var collision = world3.m_contactList; 
		var canPlayLanding = true;
		if(w3_canJump)
			canPlayLanding = false;
		w3_canJump = false;
		if (collision != null){  
			if ((collision.GetShape1().GetUserData() == 'w3_ground' && collision.GetShape2().GetUserData() == 'w3_ball') || 
				(collision.GetShape1().GetUserData() == 'w3_ball' && collision.GetShape2().GetUserData() == 'w3_ground')){ 
				var playerObj = (collision.GetShape1().GetUserData() == 'w3_ball' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());  
				var groundObj = (collision.GetShape1().GetUserData() == 'w3_ground' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());  
				if (playerObj.y+18 < groundObj.y){  
					if(canPlayLanding)
						sfx_t3_landing.play();
					w3_canJump = true;
				}  
			}  
		}
	}
	
	if(gameState == 8){
		world4.Step(timeStep, iteration);
		if(time>=w4_spawnCoin){
			var rand = Math.floor((Math.random()*4));
			switch(rand) {
				case 0:
				w4_ball.SetCenterPosition(new b2Vec2(600,320), 0);
				world4.m_gravity = new b2Vec2((Math.random()*10)-5, 150);
				break;
				case 1:
				w4_ball.SetCenterPosition(new b2Vec2(600,580), 0);
				world4.m_gravity = new b2Vec2((Math.random()*10)-5, -150);
				break;
				case 2:
				w4_ball.SetCenterPosition(new b2Vec2(420,450), 0);
				world4.m_gravity = new b2Vec2(150, (Math.random()*10)-5);
				break;
				case 3:
				w4_ball.SetCenterPosition(new b2Vec2(780,450), 0);
				world4.m_gravity = new b2Vec2(-150, (Math.random()*10)-5);
				break;
			}
			w4_ball.SetLinearVelocity(new b2Vec2(0, 0));   
			w4_spawnCoin = new Date().getTime()+COIN_SPAWN_TIME;
		}
		var collision = world4.m_contactList; 
		if (collision != null){  
			if ((collision.GetShape1().GetUserData() == 'catcher' && collision.GetShape2().GetUserData() == 'w4_ball') || 
				(collision.GetShape1().GetUserData() == 'w4_ball' && collision.GetShape2().GetUserData() == 'catcher')){ 
				/*var playerObj = (collision.GetShape1().GetUserData() == 'w3_ball' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());  
				var groundObj = (collision.GetShape1().GetUserData() == 'w3_ground' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());  
				if (playerObj.y+19 < groundObj.y){  
					w3_canJump = true;  
				} */
				w4_ball.SetCenterPosition(new b2Vec2(1000,1000), 0);
			}  
			if ((collision.GetShape1().GetUserData() == 'catcherInside' && collision.GetShape2().GetUserData() == 'w4_ball') || 
				(collision.GetShape1().GetUserData() == 'w4_ball' && collision.GetShape2().GetUserData() == 'catcherInside')){ 
				/*var playerObj = (collision.GetShape1().GetUserData() == 'w3_ball' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());  
				var groundObj = (collision.GetShape1().GetUserData() == 'w3_ground' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());  
				if (playerObj.y+19 < groundObj.y){  
					w3_canJump = true;  
				} */
				if(coinCollectedTime + COIN_SPAWN_TIME - 1000 <= lastTime) {
					sfx_t4_coin.play();
					coins+=1;
					coinCollectedTime = lastTime;
				}
			}  
		}
	}
	
	if(gameState == 10 || gameState == 0) {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		var grd = ctx.createLinearGradient(0, 0, 0, 600);
        grd.addColorStop(0, "#ffffff");
        grd.addColorStop(1, "#dddddd");
        ctx.fillStyle = grd;
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	
		//ctx.fillStyle="#FFFFFF";
		//ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	} else {
		ctx.drawImage(img_background, 0, 0);
	}
	
	if(gameState == 0) {
		ctx.drawImage(img_openingScreen, 0, 0);
	}
	
	if(gameState == 2 || gameState == 3 || gameState == 4 || gameState == 5 || gameState == 6 || gameState == 7 || gameState == 8 || gameState == 9){
		//draw screen 1
		ctx.save();
		ctx.beginPath();
		ctx.rect(0, 0, canvasWidth/2, canvasHeight/2);
		ctx.clip();
		//drawWorld(world1, ctx);
		ctx.restore();
		if(w1_box.GetRotation() >= PI/4-0.1 || w1_box.GetRotation() <= -PI/4+0.1){
			if(!stickPlayed) {
				sfx_t1_stick.play();
				stickPlayed = true;
			}
		} else {
			stickPlayed = false;
		}
		
		ctx.translate(w1_box.m_position.x, w1_box.m_position.y);
		ctx.rotate(w1_box.m_rotation);
		ctx.drawImage(img_t1_plank, -130, -10);
		ctx.rotate(-w1_box.m_rotation);
		ctx.translate(-w1_box.m_position.x, -w1_box.m_position.y);
		ctx.translate(w1_ball.m_position.x, w1_ball.m_position.y);
		ctx.rotate(w1_ball.m_rotation);
		ctx.drawImage(img_t1_blob, -10, -10);
		ctx.rotate(-w1_ball.m_rotation);
		ctx.translate(-w1_ball.m_position.x, -w1_ball.m_position.y);
	}
	if(gameState == 4 || gameState == 5 || gameState == 6 || gameState == 7 || gameState == 8 || (gameState == 9 && stateBeforeGameOver > 2)){
		//draw screen 2
		ctx.save();
		ctx.beginPath();
		ctx.rect(400, 0, canvasWidth/2, canvasHeight/2);
		ctx.clip();
		//drawWorld(world2, ctx);
		ctx.restore();
		
		
		ctx.drawImage(img_t2_brick, w2_trigger.m_position.x-10, w2_trigger.m_position.y-100);
		ctx.drawImage(img_t2_brick, w2_trigger.m_position.x-10, w2_trigger.m_position.y-60);
		ctx.drawImage(img_t2_brick, w2_trigger.m_position.x-10, w2_trigger.m_position.y-20);
		ctx.drawImage(img_t2_brick, w2_trigger.m_position.x-10, w2_trigger.m_position.y+20);
		ctx.drawImage(img_t2_brick, w2_trigger.m_position.x-10, w2_trigger.m_position.y+60);
		ctx.drawImage(img_t2_target, w2_target.m_position.x-5, w2_target.m_position.y-20);
		for(var i=0;i<3;++i){
			if(w2_bullets[i]) {
				if(w2_bullets[i].isMoving)
					ctx.drawImage(img_t2_bullet, w2_bullets[i].body.m_position.x-15, w2_bullets[i].body.m_position.y-4);
				else
					ani_exp.Step(ctx, w2_bullets[i].body.m_position.x-15, w2_bullets[i].body.m_position.y-9);
			}
		}
		
	}
	if(gameState == 6 || gameState == 7 || gameState == 8 || (gameState == 9 && stateBeforeGameOver > 4)){
		//draw screen 3
		ctx.save();
		ctx.beginPath();
		ctx.rect(0, 300, canvasWidth/2, canvasHeight/2);
		ctx.clip();
		drawWorld(world3, ctx);
		ctx.restore();
		
		/*for(var i=0;i<5;++i){
			if(w3_grounds[i])
				ctx.drawImage(img_t3_ground, w3_ball.m_position.x-10, w3_ball.m_position.y-49);
		}*/
		//ctx.drawImage(img_t3_boy, w3_ball.m_position.x-10, w3_ball.m_position.y-49);
		ani_boyWalk.Step(ctx, w3_ball.m_position.x-10, w3_ball.m_position.y-49);
		ctx.drawImage(img_t3_waves,	0, 520);
		
	}
	if(gameState == 8 || (gameState == 9 && stateBeforeGameOver > 6)){
		//draw screen 4
		ctx.save();
		ctx.beginPath();
		ctx.rect(400, 300, canvasWidth/2, canvasHeight/2);
		ctx.clip();
		//drawWorld(world4, ctx);
		ctx.restore();
		
		ctx.translate(w4_catcher.bodyLeft.m_position.x, w4_catcher.bodyLeft.m_position.y);
		ctx.rotate(w4_catcher.rotation*PI/2);
		ctx.drawImage(img_t4_catcher, -15, -35);
		ctx.rotate(-w4_catcher.rotation*PI/2);
		ctx.translate(-w4_catcher.bodyLeft.m_position.x, -w4_catcher.bodyLeft.m_position.y);
		ctx.translate(w4_ball.m_position.x, w4_ball.m_position.y);
		ctx.rotate(w4_ball.m_rotation);
		ctx.drawImage(img_t4_coin, -10, -10);
		ctx.rotate(-w4_ball.m_rotation);
		ctx.translate(-w4_ball.m_position.x, -w4_ball.m_position.y);
	}
	if(gameState < 10 && gameState > 0) {
		ctx.drawImage(img_circle, 337, 240);
		
		ctx.fillStyle    = '#000';  
		ctx.font         = '36px fontastique';  
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		ctx.fillText(score, 400, 300);
	}
	
	if(gameState == 9){
		if((((new Date().getTime())-gameOverTime)/1000) >= 0.9) {
			gameState = 10;
			sfx_bgMusic.pause();
			sfx_bgWin.play();
		} else {
			ctx.fillStyle = "rgba(255, 255, 255, "+(((new Date().getTime())-gameOverTime)/1000)+")";
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		}
	}
	
	//draw lines
	/*ctx.moveTo(400,0);
	ctx.lineTo(400,600);
	ctx.moveTo(0,300);
	ctx.lineTo(800,300);
	ctx.stroke();*/
	setTimeout('step()', 10);
	
	ctx.drawImage(img_border, 0, 0);
	
	
	if(gameState == 1 ||gameState == 3 ||gameState == 5 ||gameState == 7){
		ctx.drawImage(img_msgBackground, 0, 0);
	}
	if(gameState == 1){
		ctx.fillStyle    = '#000';  
		ctx.font         = '26px fontastique';  
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		var txt = 'First Challenge\n\nCan you balance an ink blob on a wooden\nplank?\n\n\nUse            or            to control the ink blob.\n\n\n\n\nPress            or            to continue...';
		var lineheight = 22;
		var lines = txt.split('\n');
		for (var i = 0; i<lines.length; i++) {
			if(i==0) {
				ctx.font = 'bold 26px fontastique';
			} else {
				ctx.font = '26px fontastique';
			}
			ctx.fillText(lines[i], 400, 310 + (i*lineheight) - (lineheight*lines.length/2));
		}  
		ctx.drawImage(img_keyLeft, 225, 285);
		ctx.drawImage(img_keyRight, 320, 285);
		ctx.drawImage(img_keyLeft, 285, 395);
		ctx.drawImage(img_keyRight, 380, 395);
	}
	if(gameState == 3){
		ctx.fillStyle    = '#000';  
		ctx.font         = '26px fontastique';  
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		var txt = 'Second Challenge\n\nCan you dodge a bullet?\n\n\nUse            or            to move.\n\nAnd don\'t forget about your ink blob.\n\n\n\nPress            or            to continue...';
		var lineheight = 22;
		var lines = txt.split('\n');
		for (var i = 0; i<lines.length; i++) {
			if(i==0) {
				ctx.font = 'bold 26px fontastique';
			} else {
				ctx.font = '26px fontastique';
			}
			ctx.fillText(lines[i], 400, 310 + (i*lineheight) - (lineheight*lines.length/2));
		}  
		ctx.drawImage(img_keyUp, 295, 260);
		ctx.drawImage(img_keyDown, 390, 260);
		ctx.drawImage(img_keyUp, 285, 395);
		ctx.drawImage(img_keyDown, 380, 395);
	}
	if(gameState == 5){
		ctx.fillStyle    = '#000';  
		ctx.font         = '26px fontastique';  
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		var txt = 'Third Challenge\n\nCan you jump over holes and keep an eye on\nyour ink blob and glass at the same time?\n\n\nUse            to jump.\n\n\n\n\nPress            to continue...';
		var lineheight = 22;
		var lines = txt.split('\n');
		for (var i = 0; i<lines.length; i++) {
			if(i==0) {
				ctx.font = 'bold 26px fontastique';
			} else {
				ctx.font = '26px fontastique';
			}
			ctx.fillText(lines[i], 400, 310 + (i*lineheight) - (lineheight*lines.length/2));
		}  
		ctx.drawImage(img_keyX, 348, 285);
		ctx.drawImage(img_keyX, 332, 395);
	}
	if(gameState == 7){
		ctx.fillStyle    = '#000';  
		ctx.font         = '26px fontastique';  
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		var txt = 'Bonus Challenge\n\nIf you want to score some extra points you\ncan try to capture coins. Don\'t worry though,\nnothing happens when you miss one.\n\n\nUse            to rotate the basket.\n\n\n\nPress            to continue...';
		var lineheight = 22;
		var lines = txt.split('\n');
		for (var i = 0; i<lines.length; i++) {
			if(i==0) {
				ctx.font = 'bold 26px fontastique';
			} else {
				ctx.font = '26px fontastique';
			}
			ctx.fillText(lines[i], 400, 310 + (i*lineheight) - (lineheight*lines.length/2));
		}  
		ctx.drawImage(img_keyC, 283, 305);
		ctx.drawImage(img_keyC, 333, 395);
	}
	if(gameState == 10) {
		if(finalScore < score || finalBonusScore < coins*5 || finalTotalScore < score+coins*5) { 
			if(finalScore < score) {
				++finalScore;
			} else {
				if(finalBonusScore < coins*5) {
					++finalBonusScore;
				} else {
					if(++finalTotalScore == score+coins*5) {
						rankingShowTime = new Date().getTime();
					}
				}
			}
		} else {
			var plusWidth = 0;
			var plusHeight = 0;
			if((new Date().getTime()) <= rankingShowTime+200) {
				plusWidth = 150*(rankingShowTime-(new Date().getTime())+200)*(rankingShowTime-(new Date().getTime())+200)/40000;
				plusHeight = 250*(rankingShowTime-(new Date().getTime())+200)*(rankingShowTime-(new Date().getTime())+200)/40000;
			}
			if(finalTotalScore < 20)
				ctx.drawImage(img_rank1, 335 + plusWidth, 205 + plusHeight, 348 - plusWidth, 286 - plusHeight);
			else if(finalTotalScore >= 20 && finalTotalScore < 50)
				ctx.drawImage(img_rank2, 335 + plusWidth, 205 + plusHeight, 348 - plusWidth, 286 - plusHeight);
			else if(finalTotalScore >= 50 && finalTotalScore < 100)
				ctx.drawImage(img_rank3, 335 + plusWidth, 205 + plusHeight, 348 - plusWidth, 286 - plusHeight);
			else if(finalTotalScore >= 100 && finalTotalScore < 150)
				ctx.drawImage(img_rank4, 335 + plusWidth, 205 + plusHeight, 348 - plusWidth, 286 - plusHeight);
			else if(finalTotalScore >= 150 && finalTotalScore < 200)
				ctx.drawImage(img_rank5, 335 + plusWidth, 205 + plusHeight, 348 - plusWidth, 286 - plusHeight);
			else if(finalTotalScore >= 200)
				ctx.drawImage(img_rank6, 335 + plusWidth, 205 + plusHeight, 348 - plusWidth, 286 - plusHeight);
			if(rank == "") {
				if(finalTotalScore < 20)
					rank = "E";
				else if(finalTotalScore >= 20 && finalTotalScore < 50)
					rank = "D";
				else if(finalTotalScore >= 50 && finalTotalScore < 100)
					rank = "C";
				else if(finalTotalScore >= 100 && finalTotalScore < 150)
					rank = "B";
				else if(finalTotalScore >= 150 && finalTotalScore < 200)
					rank = "A";
				else if(finalTotalScore >= 200)
					rank = "S";
			}
		}
		
		ctx.fillStyle    = '#000';  
		ctx.font         = '50px fontastique';  
		ctx.textAlign = "left";
		ctx.textBaseline = 'bottom';
		ctx.fillText("Score: "+finalScore, 150, 120);
		ctx.fillText("Bonus Score: "+finalBonusScore, 150, 170);
		ctx.fillText("Total Score: "+finalTotalScore, 150, 220);
		ctx.fillText("Ranking: "+rank, 150, 300);
		
		/*if(mouseX > 100 && mouseX < 398 && mouseY > 360 && mouseY < 618)
			ctx.drawImage(img_playAgainOver, 100, 360);
		else
			ctx.drawImage(img_playAgain, 100, 360);*/
	}
	/*if(gameState < 9 && w1_ball.GetCenterPosition().y > 280 && !waterDropPlayed) {
		sfx_t1_waterDrop.play();
		waterDropPlayed = true;
	}*/
	if(gameState < 9) {
		if(w1_ball.GetCenterPosition().y > 350 || w3_ball.GetCenterPosition().y > 650 || (bulletHit && bulletHitTime+200<=lastTime)) {
			stateBeforeGameOver = gameState;
			gameState = 9;
			gameOverTime = new Date().getTime();
		}
	}
}


function handleInteractions(){
	if(gameState == 1){
		if (keys[37] || keys[39]) {
			++gameState;
			sfx_t1_waterDrop.play();
		}
	}
	else if(gameState == 3){
		if (keys[38] || keys[40]) ++gameState;  
	}
	else if(gameState == 5){
		if (keys[88]) ++gameState;  
	}
	else if(gameState == 7){
		if (keys[67]) ++gameState;  
	}
	if (keys[37]){  
		w1_ball.SetAngularVelocity(-4);
    }  
	if (keys[39]){  
        w1_ball.SetAngularVelocity(4);     
    }  
	if (keys[40] && !bulletHit && (!oldkeys[40] || keyrepeat <= time)){  
		if(w2_target.GetCenterPosition().y < 230) {
			w2_target.SetCenterPosition(new b2Vec2(w2_target.GetCenterPosition().x, w2_target.GetCenterPosition().y+40), 0);
			keyrepeat = new Date().getTime()+200;
		}
    }  
	if (keys[38] && !bulletHit && (!oldkeys[38] || keyrepeat <= time)){  
		if(w2_target.GetCenterPosition().y > 70) {
			w2_target.SetCenterPosition(new b2Vec2(w2_target.GetCenterPosition().x, w2_target.GetCenterPosition().y-40), 0);
			keyrepeat = new Date().getTime()+200;
		}
    }   
	if (keys[88] && w3_canJump && !oldkeys[88] ){  
        w3_ball.SetLinearVelocity(new b2Vec2(0, -200)); 
		sfx_t3_jumping.play();	
    }
	if (keys[67] && !oldkeys[67] ){  
        w4_catcher.Rotate(PI);     
    }
}


function initGame(){
	gameStartTime = new Date().getTime();
	//waterDropPlayed = false;
	stickPlayed = false;
	
	img_border = new Image();
    img_border.src = "img/border.png";
	img_background = new Image();
    img_background.src = "img/background.png";
	img_circle = new Image();
    img_circle.src = "img/circle.png";
	img_msgBackground = new Image();
    img_msgBackground.src = "img/msg-background.png";
	img_keyLeft = new Image();
    img_keyLeft.src = "img/key-left-arrow.png";
	img_keyRight = new Image();
    img_keyRight.src = "img/key-right-arrow.png";
	img_keyUp = new Image();
    img_keyUp.src = "img/key-up-arrow.png";
	img_keyDown = new Image();
    img_keyDown.src = "img/key-down-arrow.png";
	img_keyC = new Image();
    img_keyC.src = "img/key-C.png";
	img_keyX = new Image();
    img_keyX.src = "img/key-X.png";
	img_rank1 = new Image();
    img_rank1.src = "img/rank1.png";
	img_rank2 = new Image();
    img_rank2.src = "img/rank2.png";
	img_rank3 = new Image();
    img_rank3.src = "img/rank3.png";
	img_rank4 = new Image();
    img_rank4.src = "img/rank4.png";
	img_rank5 = new Image();
    img_rank5.src = "img/rank5.png";
	img_rank6 = new Image();
    img_rank6.src = "img/rank6.png";
	img_openingScreen = new Image();
	img_openingScreen.src = "img/opening-screen.png";
	img_playAgain = new Image();
	img_playAgain.src = "img/play-again.png";
	img_playAgainOver = new Image();
	img_playAgainOver.src = "img/play-again-over.png";
	img_t1_plank = new Image();
	img_t1_plank.src = "img/t1-plank.png";
	img_t1_blob = new Image();
	img_t1_blob.src = "img/t1-blob.png";
	img_t2_brick = new Image();
	img_t2_brick.src = "img/t2-brick.png";
	img_t2_target = new Image();
	img_t2_target.src = "img/t2-target.png";
	img_t2_bullet = new Image();
	img_t2_bullet.src = "img/t2-bullet.png";
	img_t2_bulletExp = new Image();
	img_t2_bulletExp.src = "img/t2-bullet-exp.png";
	ani_exp = new AnimatedTexture(img_t2_bulletExp, 3, 0.007, 40, 19);
	img_t3_boy = new Image();
	img_t3_boy.src = "img/t3-boy.png";
	img_t3_boyWalk = new Image();
	img_t3_boyWalk.src = "img/t3-boy-walk.png";
	ani_boyWalk = new AnimatedTexture(img_t3_boyWalk, 6, 0.007, 45, 59);
	img_t3_waves = new Image();
	img_t3_waves.src = "img/t3-waves.png";
	img_t3_ground = new Image();
	img_t3_ground.src = "img/t3-platform.png";
	img_t4_coin = new Image();
	img_t4_coin.src = "img/t4-coin.png";
	img_t4_catcher = new Image();
	img_t4_catcher.src = "img/t4-catcher.png";
	
	
	sfx_t1_stick = new Audio("sfx/T1-stick.mp3");
	sfx_t1_waterDrop = new Audio("sfx/T1-water-drop.mp3");
	sfx_t2_bulletsHitting = new Audio("sfx/T2-bullets-hitting.mp3");
	sfx_t3_jumping = new Audio("sfx/T3-jumping.mp3");
	sfx_t3_landing = new Audio("sfx/T3-landing.mp3");
	sfx_t4_coin = new Audio("sfx/T4-coin.mp3");
	sfx_bgMusic = new Audio("sfx/bg-music.mp3");
	sfx_bgMusic.volume = 0.2;
	sfx_bgWin = new Audio("sfx/bg-win.mp3");
	sfx_bgWin.volume = 0.2;
	sfx_bgMusic.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	sfx_bgMusic.play();

	// WORLD 1
	// create box
	w1_box = createBox(world1, 200, 200, 130, 10, false, 'w1_box', 0.1);
	var w1_boxJointDef = new b2RevoluteJointDef();
	w1_boxJointDef.anchorPoint.Set(200, 200);
	w1_boxJointDef.body1 = world1.GetGroundBody();
	w1_boxJointDef.body2 = w1_box;
	w1_boxJointDef.maxMotorTorque = 10.0;
	w1_boxJointDef.motorSpeed = 1.0;
	w1_boxJointDef.lowerAngle = -0.25 * PI; // -45 degrees
	w1_boxJointDef.upperAngle = 0.25 * PI; // 45 degrees
	w1_boxJointDef.enableLimit = true;
	w1_boxJointDef.enableMotor = true;
	var w1_joint = world1.CreateJoint(w1_boxJointDef);
	// create ball
	var w1_ballSd = new b2CircleDef();
	w1_ballSd.density = 1.0;
	w1_ballSd.radius = 10;
	w1_ballSd.restitution = 0.5;
	w1_ballSd.friction = 10.0;
	w1_ballSd.userData = 'w1_water-drop';
	var w1_ballBd = new b2BodyDef();
	w1_ballBd.linearDamping = .03;
	w1_ballBd.allowSleep = false;
	w1_ballBd.AddShape(w1_ballSd);
	w1_ballBd.position.Set(200,190);
	w1_ball = world1.CreateBody(w1_ballBd);
	// END WORLD 1
	
	// WORLD 2
	w2_trigger = createBox(world2, 430, 150, 10, 100, true, 'w2_target', 1.0);
	w2_target = createBox(world2, 470, 150, 10, 20, true, 'w2_target', 1.0);
	// END WORLD 2
	
	// WORLD 3
	var w3_ballSd = new b2CircleDef();
	w3_ballSd.density = 1.0;
	w3_ballSd.radius = 10;
	w3_ballSd.restitution = 0.0;
	w3_ballSd.friction = 10.0;
	w3_ballSd.userData = 'w3_ball';
	var w3_ballBd = new b2BodyDef();
	w3_ballBd.linearDamping = .03;
	w3_ballBd.allowSleep = false;
	w3_ballBd.AddShape(w3_ballSd);
	w3_ballBd.position.Set(120,480);
	w3_ball = world3.CreateBody(w3_ballBd); 
	w3_grounds[w3_currentGround] = new w3_ground();
	w3_grounds[w3_currentGround].ground = createBox(world3, 200, 500, 200, 10, true, 'w3_ground', 1.0);
	w3_grounds[w3_currentGround].width = 200;
	//var w3_stopper = createBox(world3, 70, 470, 10, 50, true, 'w3_stopper', 1.0);
	// END WORLD 3
	
	// WORLD 4
	var w4_ballSd = new b2CircleDef();
	w4_ballSd.density = 1.0;
	w4_ballSd.radius = 10;
	w4_ballSd.restitution = 0.7;
	w4_ballSd.friction = 10.0;
	w4_ballSd.userData = 'w4_ball';
	var w4_ballBd = new b2BodyDef();
	w4_ballBd.linearDamping = .03;
	w4_ballBd.allowSleep = false;
	w4_ballBd.AddShape(w4_ballSd);
	w4_ballBd.position.Set(600,320);
	w4_ball = world4.CreateBody(w4_ballBd); 
	w4_spawnCoin = new Date().getTime()+COIN_SPAWN_TIME;
	w4_catcher = new Catcher(world4);
	// END WORLD 4
}

function handleKeyDown(evt){
	keys[evt.keyCode] = true;
}

function handleKeyUp(evt){
	keys[evt.keyCode] = false;
}

function mouseClick(evt){
    if(gameState == 0)
		++gameState;
	/*if(gameState == 10) {
		if(finalTotalScore == score+coins*5) { 
			if(mouseX > 100 && mouseX < 398 && mouseY > 360 && mouseY < 618)
				resetGame();
		}
	}*/
}

Event.observe(window, 'load', function() {
	ctx = $('game').getContext('2d');
	var canvasElm = $('game');
	canvasWidth = parseInt(canvasElm.width);
	canvasHeight = parseInt(canvasElm.height);
	canvasTop = parseInt(canvasElm.style.top);
	canvasLeft = parseInt(canvasElm.style.left);
	initGame();
	step();
	
	canvasElm.addEventListener.apply(canvasElm, ["mousedown", mouseClick, false]);
	canvasElm.addEventListener("mousemove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
	window.addEventListener('keydown',handleKeyDown,true);
	window.addEventListener('keyup',handleKeyUp,true);
});

function resetGame() {
	gameState = 1;
	score = 0;
	coins = 0;
	time = 0;
	lastTime = 0;
	keyrepeat = 0;
 gameStartTime = 0;
 finalScore = 0;
 finalBonusScore = 0;
 finalTotalScore = 0;
 rankingShowTime = 0;
 bulletHit = false;
 bulletHitTime = 0;
 coinCollectedTime = 0;
 gameOverTime = 0;
 stateBeforeGameOver = 0;
 rank = "";
 w2_currentBullet = 0;
 w2_spawnBullet = 0;
 w3_currentGround = 0;
 w3_canJump = false;
 w4_spawnCoin = 0;
	world1.DestroyBody(w1_box);
	world1.DestroyBody(w1_ball);
	world1.DestroyBody(w1_trigger);
	world1.CleanBodyList();
	
	world2.DestroyBody(w2_target);
	world2.DestroyBody(w2_trigger);
	for(var i=0;i<3;++i){
		if(w2_bullets[i]) {
			w2_bullets[i].Destroy(world2);
			delete w2_bullets[i];
		}
	}
	world2.CleanBodyList();
	
	world3.DestroyBody(w3_ball);
	for(var i=0;i<5;++i){
		if(w3_grounds[i]) {
			world3.DestroyBody(w3_grounds[i].ground);
			delete w3_grounds[i];
		}
	}
	world3.CleanBodyList();
	
	world4.DestroyBody(w4_ball);
	w4_catcher.Destroy(world4);
	world4.CleanBodyList();
	initGame();
}
document.onkeydown=function(){return event.keyCode!=37 && event.keyCode!=38 && event.keyCode!=39 && event.keyCode!=40}
