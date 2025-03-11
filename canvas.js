let canvas;
let red;
let green;
let blue;
let isMouseDown = false;
function setup() {
	canvas = document.getElementById("canvas");
	red = 128;
	green = 128;
	blue = 128;
	canvas.setAttribute("onmousemove", "mousemove(event)");
	canvas.setAttribute("onmousedown", "mousedown(event)");
	canvas.setAttribute("onmouseup", "mouseup(event)");
	canvas.setAttribute("onmouseleave", "mouseup(event)");
	//update();
	//getTable calls update
	getTable();
	loop();
}
//"God I wish there was an easier way to do this"
function update() {
	let grd;
	let ctx
	//set up the first one by getting context
	//and clearing it, and setting to addative mixing
	ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, 768, 288);
	ctx.globalCompositeOperation = "lighter";
	ctx.lineWidth = 3;

	//first square
	//red
	ctx.fillStyle = "rgb(" + red + ",0,0)";
	ctx.fillRect(0, 0, 256, 256);
	//green
	grd = ctx.createLinearGradient(0, 0, 255, 0);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#00ff00");
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 256, 256);
	//blue
	grd = ctx.createLinearGradient(0, 0, 0, 255);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#0000ff");
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 256, 256);

	//second square
	//green
	ctx.fillStyle = "rgb(0," + green + ",0)";
	ctx.fillRect(256, 0, 256, 256);
	//blue
	grd = ctx.createLinearGradient(256, 0, 511, 0);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#0000ff");
	ctx.fillStyle = grd;
	ctx.fillRect(256, 0, 256, 256);
	//red
	grd = ctx.createLinearGradient(0, 0, 0, 255);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#ff0000");
	ctx.fillStyle = grd;
	ctx.fillRect(256, 0, 256, 256);

	//third square
	//blue
	ctx.fillStyle = "rgb(0,0," + blue + ")";
	ctx.fillRect(512, 0, 256, 256);
	//red
	grd = ctx.createLinearGradient(512, 0, 767, 0);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#ff0000");
	ctx.fillStyle = grd;
	ctx.fillRect(512, 0, 256, 256);
	//green
	grd = ctx.createLinearGradient(0, 0, 0, 255);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#00ff00");
	ctx.fillStyle = grd;
	ctx.fillRect(512, 0, 256, 256);

	ctx.globalCompositeOperation = "source-over";
	//draw red green blue sliders
	grd = ctx.createLinearGradient(0, 0, 255, 0);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#ff0000");
	ctx.fillStyle = grd;
	ctx.fillRect(0, 256, 256, 32);

	grd = ctx.createLinearGradient(256, 0, 511, 0);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#00ff00");
	ctx.fillStyle = grd;
	ctx.fillRect(256, 256, 256, 32);

	grd = ctx.createLinearGradient(512, 0, 767, 0);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#0000ff");
	ctx.fillStyle = grd;
	ctx.fillRect(512, 256, 256, 32);

	//draw the color bar at the bottom
	ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
	let hex=ctx.fillStyle;
	ctx.fillRect(0, 288, 768, 32);

	//draw the circles for the below slider things

	ctx.strokeStyle = "rgb(255,255,255)";
	ctx.beginPath();
	ctx.arc(red, 272, 4, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(256 + green, 272, 4, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(512 + blue, 272, 4, 0, 2 * Math.PI);
	ctx.stroke();

	//draw the circles

	if ((red + green + blue) / 3 > 128) {
		ctx.strokeStyle = "rgb(0,0,0)";
	} else {
		ctx.strokeStyle = "rgb(255,255,255)";
	}

	ctx.beginPath();
	ctx.arc(green, blue, 4, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(256 + blue, red, 4, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(512 + red, green, 4, 0, 2 * Math.PI);
	ctx.stroke();

	//draw text
	if ((red + green + blue) / 3 > 128) {
		ctx.fillStyle = "rgb(0,0,0)";
	} else {
		ctx.fillStyle = "rgb(255,255,255)";
	}
	//ctx.font = "28px serif";
	ctx.font = "28px roboto";
	ctx.fillText("rgb(" + red + "," + green + "," + blue + ")", 2, 312);
	ctx.fillText(" "+hex, 258, 312);

}
function mousemove(event) {
	if (isMouseDown) {
		handleInput(event);
	}
}
function mousedown(event) {
	isMouseDown = true;
	mousemove(event);
}
function mouseup(event) {
	isMouseDown = false;
}
function handleInput(event) {
	let x = event.offsetX;
	let y = event.offsetY;
	if (y >= 0 && y <= 255) {
		//not red box
		if (x >= 0 && x <= 255) {
			green = x;
			blue = y;
		}
		//not green box
		if (x >= 256 && x <= 511) {
			blue = x - 256;
			red = y;
		}
		//not blue box
		if (x >= 512 && x <= 767) {
			red = x - 512;
			green = y;
		}
	}
	if (y >= 256 && y<=288) {
		//red slider
		if (x >= 0 && x <= 255) {
			red = x;
		}
		//green slider
		if (x >= 256 && x <= 511) {
			green = x - 256;
		}
		//blue slider
		if (x >= 512 && x <= 767) {
			blue = x - 512;
		}
	}
	update();
	updateTable();
}
function updateTable(){
	request=new XMLHttpRequest();
	url="updateTable.php?id=0&red="+red+"&green="+green+"+&blue="+blue+"&alpha=255";
	request.open("GET", url);
	request.send();
}
function getTable(){
	request=new XMLHttpRequest();
	url="getTable.php";
	request.open("GET", url);
	//redundant with JSON.parse being used
	//request.responseType = "json";
	request.send();
	let responseData;

	request.onload = () => {
		if (request.readyState == 4 && request.status == 200) {
			responseData = request.response;
			data = JSON.parse(responseData);
			red = data.red;
			green = data.green;
			blue = data.blue;
			// setColor(data.red,data.green,data.blue);
			update();
		} else {
			console.log(`Error: ${request.status}`);
		}
	}
}
function setColor(r, g, b){
	red = r;
	green = g;
	blue = b;
}
function loop(){
	getTable();
	console.log("loop");
	setTimeout(loop, "100");
}

