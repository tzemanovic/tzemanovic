var Catcher = Class.create({
	initialize: function(world) {
		this.bodyLeft = createBox(world, 570, 450, 5, 35, true, 'catcher', 1.0);
		this.bodyRight = createBox(world, 630, 450, 5, 35, true, 'catcher', 1.0);
		this.bodyMiddle = createBox(world, 600, 483, 25, 2, true, 'catcher', 1.0);
		this.bodyMiddleInside = createBox(world, 600, 478, 25, 2, true, 'catcherInside', 1.0);
		return this;
	},
	Destroy: function(world){
		world.DestroyBody(this.bodyLeft);
		world.DestroyBody(this.bodyRight);
		world.DestroyBody(this.bodyMiddle);
		world.DestroyBody(this.bodyMiddleInside);
	},
	Step: function(timeStep) 
	{	
		//if(this.body.GetCenterPosition().x>456)
		//	this.body.SetCenterPosition(new b2Vec2(this.body.GetCenterPosition().x-1, this.body.GetCenterPosition().y), 0);
	},
	Rotate: function(pi) 
	{	
		this.rotation++;
		if(this.rotation > 3) this.rotation = 0;
		switch(this.rotation) {
			case 0:
			this.bodyLeft.SetCenterPosition(new b2Vec2(570,450), 0);
			this.bodyRight.SetCenterPosition(new b2Vec2(630,450), 0);
			this.bodyMiddle.SetCenterPosition(new b2Vec2(600,483), 0);
			this.bodyMiddleInside.SetCenterPosition(new b2Vec2(600,478), 0);
			break;
			case 1:
			this.bodyLeft.SetCenterPosition(new b2Vec2(600,420), pi/2);
			this.bodyRight.SetCenterPosition(new b2Vec2(600,480), pi/2);
			this.bodyMiddle.SetCenterPosition(new b2Vec2(567,450), pi/2);
			this.bodyMiddleInside.SetCenterPosition(new b2Vec2(572,450), pi/2);
			break;
			case 2:
			this.bodyRight.SetCenterPosition(new b2Vec2(570,450), 0);
			this.bodyLeft.SetCenterPosition(new b2Vec2(630,450), 0);
			this.bodyMiddle.SetCenterPosition(new b2Vec2(600,417), 0);
			this.bodyMiddleInside.SetCenterPosition(new b2Vec2(600,422), 0);
			break;
			case 3:
			this.bodyRight.SetCenterPosition(new b2Vec2(600,420), pi/2);
			this.bodyLeft.SetCenterPosition(new b2Vec2(600,480), pi/2);
			this.bodyMiddle.SetCenterPosition(new b2Vec2(633,450), pi/2);
			this.bodyMiddleInside.SetCenterPosition(new b2Vec2(628,450), pi/2);
			break;
		}
	},
	bodyLeft: null,
	bodyRight: null,
	bodyMiddle: null,
	bodyMiddleInside: null,
	rotation: 0
});