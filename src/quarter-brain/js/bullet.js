var Bullet = Class.create({
	initialize: function(world) {
		var randPos = Math.floor((Math.random()*5));
		var posY = 70+randPos*40;
		this.body = createBox(world, 815, posY, 15, 4, true, 'bullet', 1.0);
		return this.body;
	},
	Destroy: function(world){
		world.DestroyBody(this.body);
		//this.body.Destroy();
	},
	Step: function(timeStep, target, modifier) 
	{	
		var ty = target.GetCenterPosition().y;
		var tx = 495;
		if(this.body.GetCenterPosition().x>456 && this.isMoving) {
			this.body.SetCenterPosition(new b2Vec2(this.body.GetCenterPosition().x-0.75*modifier, this.body.GetCenterPosition().y), 0);
		}
		if(this.body.GetCenterPosition().y==ty && this.body.GetCenterPosition().x > tx-5 && this.body.GetCenterPosition().x <= tx)
			this.isMoving = false;
		return !this.isMoving;
	},
	body: null,
	isMoving: true,
});