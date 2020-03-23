function init(){

	canvas=document.getElementById("mycanvas");
	w=canvas.width=512;
	h=canvas.height=512;
	pen=canvas.getContext('2d');

	gameover=false;
	score=0;
	
	blocksize=42;

	function getRandomFood(){
		var foodx=Math.round(Math.random()*(w-blocksize)/blocksize);
		var foody=Math.round(Math.random()*(h-blocksize)/blocksize);
		food={
			x:foodx,
			y:foody,
			color:"red"
		};
		return food;
	}

	food=getRandomFood();
	food_imageobject=new Image();
	food_imageobject.src="assets/apple.png";

	trophy_imageobject=new Image();
	trophy_imageobject.src="assets/award.png";

	snakecell=new Image();
	snakecell.src="assets/1.png";

	snake={
		length:1,
		color:"royalblue",
		cells:[],
		direction:"right",
		createsnake: function(){
			console.log("creating snake");
			for(let i=this.length;i>=0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawsnake:function(){
			for(let i=0;i<this.length;i++){
				pen.fillStyle= "blue";
				//pen.fillRect(this.cells[i].x*blocksize,this.cells[i].y*blocksize,blocksize-1,blocksize-1);
				pen.drawImage(snakecell,this.cells[i].x*blocksize,this.cells[i].y*blocksize,blocksize-1,blocksize-1);
			}
		},
		updatesnake:function(){
			console.log("updating snake");

			var X=this.cells[0].x;
			var Y=this.cells[0].y;

			//check if food is eaten by snake
			if(X==food.x && Y==food.y){
				console.log("food eaten");
				this.length=this.length+1;
				score++;
				food=getRandomFood();
			}
			else{
				this.cells.pop();
			}
			
			if(this.direction=="right"){
				X=X+1;
			}
			else if(this.direction=="left"){
				X=X-1;
			}
			else if(this.direction=="up"){
				Y=Y-1;
			}
			else{
				Y=Y+1;
			}

			this.cells.unshift({x:X,y:Y});
			console.log(this.cells);

			//check that snake doesn't touch the boundries
			var last_x=Math.round(w/blocksize);
			var last_y=Math.round(h/blocksize);
			if(this.cells[0].x<0 || this.cells[0].y<0 ||this.cells[0].x>last_x-1||this.cells[0].y>last_y-1){
				gameover=true;
			}
		}
	};
	snake.createsnake();

	function keypressed(e){
		console.log("key pressed is",e.key);
		if(e.key=="ArrowRight"){
			snake.direction="right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction="left";
		}
		else if(e.key=="ArrowUp"){
			snake.direction="up";
		}
		else{
			snake.direction="down";
		}
		console.log(snake.direction);
	}

	document.addEventListener('keydown',keypressed);

	snakeimg=new Image();
	snakeimg.src="assets/snake.png";
}

function draw(){
	pen.clearRect(0,0,w,h);
	
	snake.drawsnake();

	pen.fillStyle=food.color;
	pen.drawImage(food_imageobject,food.x*blocksize,food.y*blocksize,blocksize-1,blocksize-1);
	
	pen.drawImage(trophy_imageobject,3,3,40,40);
	
	pen.fillStyle="blue";
	pen.font="20px Roboto";
	pen.fillText(score,45,45);

	pen.drawImage(snakeimg,700,0,50,50);

}

function update(){
	snake.updatesnake();
}

function gameloop(){
	if(gameover){
		clearInterval(f);
		alert("Game Over");
	}
	draw();
	update();
}

init();
let f=setInterval(gameloop,115);
