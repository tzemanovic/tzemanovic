var AnimatedTexture = Class.create({
	initialize: function(image, frameCount, framesPerSecond, w, h) {
		this.image = image;
		this.frameCount = frameCount;
		this.timePerFrame = 1.0/framesPerSecond;
		this.frame = 0;
		this.lastTime = new Date().getTime();
		//this.frameWidth = this.image.width/this.frameCount;
		this.frameWidth = w;
		//this.frameHeight = this.image.height;
		this.frameHeight = h;
		return this;
	},
	Destroy: function(world){
	},
	Step: function(ctx, x, y) 
	{	
		this.totalElapsed += (new Date().getTime())-this.lastTime;
		while(this.totalElapsed > this.timePerFrame)
		{
			this.frame++;
			this.frame%=this.frameCount;
			this.totalElapsed-=this.timePerFrame;
		}
		this.lastTime = new Date().getTime();
		ctx.drawImage(this.image, this.frame*this.frameWidth, 0, this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
	},
	image: null,
	frameCount: null,
    totalElapsed: null,
    timePerFrame: null,
	lastTime: 0,
    frame: null,
	frameWidth: null,
	frameHeight: null
});