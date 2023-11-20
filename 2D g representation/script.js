//6.4x10^4m = 1px


const earth = document.getElementById('earth');
const moon = document.getElementById('moon');

const canvas = document.getElementById('2d-world');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");



planets = [[0.4*window.innerWidth, 0.3*window.innerHeight, 100, 5.97e24],[0.7*window.innerWidth, 0.6*window.innerHeight, 27, 7.35e22]];
console.log(planets);

earth.style.top = (planets[0][1]-100)+'px';
earth.style.left = (planets[0][0]-100)+'px';
moon.style.top = (planets[1][1]-27)+'px';
moon.style.left = (planets[1][0]-27)+'px';



//For tracers on click
addEventListener("mousedown", (event) => {
	let cursorX = event.clientX;
    let cursorY = event.clientY;
	let r = 6.4e4 * Math.sqrt((cursorX-planets[0][0])*(cursorX-planets[0][0]) + (cursorY-planets[0][1])*(cursorY-planets[0][1]));
	let mass = 5.97e24;
	
	var forcepm = [0,0];
	var g = 0;
	for(let i=0;i<planets.length;i++) {
		let mass = planets[i][3]
		let r = 6.4e4 * Math.sqrt((cursorX-planets[i][0])*(cursorX-planets[i][0]) + (cursorY-planets[i][1])*(cursorY-planets[i][1]));
		var angle = Math.atan((cursorY-planets[i][1])/(cursorX-planets[i][0]));
		if (cursorX-planets[i][0]<0){
			angle = -angle
		}
		
		forcepm[1] += Math.sin(angle)*6.67e-11*mass/(r*r);
		
		if (cursorX-planets[i][0]>0){
			forcepm[0] += Math.cos(angle)*6.67e-11*mass/(r*r);
		} else{
			forcepm[0] -= Math.cos(angle)*6.67e-11*mass/(r*r);
		}
	}
});


const quality = 0.4;
var the_x = 0;
var the_y = 0;
function trace(the_x, the_y){
    let cursorX = the_x;
    let cursorY = the_y;
	
	var forcepm = [0,0];
	var g = 0;
	for(let i=0;i<planets.length;i++) {
		let mass = planets[i][3]
		let r = 6.4e4 * Math.sqrt((cursorX-planets[i][0])*(cursorX-planets[i][0]) + (cursorY-planets[i][1])*(cursorY-planets[i][1]));
		var angle = Math.atan((cursorY-planets[i][1])/(cursorX-planets[i][0]));
		if (cursorX-planets[i][0]<0){
			angle = -angle
		}
		
		forcepm[1] += Math.sin(angle)*6.67e-11*mass/(r*r);
		
		if (cursorX-planets[i][0]>0){
			forcepm[0] += Math.cos(angle)*6.67e-11*mass/(r*r);
		} else{
			forcepm[0] -= Math.cos(angle)*6.67e-11*mass/(r*r);
		}
	}
	
	g = Math.sqrt(forcepm[0]*forcepm[0] + forcepm[1]*forcepm[1]);
	
	ctx.beginPath();
	let start = 'rgb(';
	let com = ','
	let end = ')';
	let red = (255*Math.pow(g/9.81, 1/4)).toString();
	let green = (0).toString();
	let blue = (0).toString();
	ctx.fillStyle = start.concat(red).concat(com).concat(green).concat(com).concat(blue).concat(end);

	ctx.rect(cursorX-quality/2, cursorY-quality/2, quality, quality);
	ctx.fill();
}

function run_x() {
	while(the_x<window.innerWidth){
		trace(the_x,the_y);
		the_x += quality;
	}
}
while(the_y<window.innerHeight){
	run_x();
	the_y += quality;
	the_x = 0
}
