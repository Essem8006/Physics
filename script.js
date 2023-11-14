//6.4x10^4m = 1px

const earth = document.getElementById('ah');
const moon = document.getElementById('tah');

const canvas = document.getElementById('2d-world');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

function get_force(n) {
	var force_x = 0;
	var force_y = 0;
	var force = 0;
	let rx, ry;
	for(let i=0;i<planets.length;i++) {
		if(i!=n) {
			let rsq = Math.abs((planets[n][0]-planets[i][0])*(planets[n][0]-planets[i][0]) + (planets[n][1]-planets[i][1])*(planets[n][1]-planets[i][1]));
			force = Math.abs(6.67*10^-11*planets[n][2]*planets[i][2]/rsq);
			rx = planets[i][0]-planets[n][0];
			ry = planets[i][1]-planets[n][1];
			if(rx>0) {
				force_x += Math.abs(Math.cos(Math.atan(ry/rx))*force);
				if(Math.atan(ry/rx)>0) {
					force_y += Math.abs(Math.sin(Math.atan(ry/rx))*force);
				}else{
					force_y -= Math.abs(Math.sin(Math.atan(ry/rx))*force);
				}
			}else{
				force_x -= Math.abs(Math.cos(Math.atan(ry/rx))*force);
				if(Math.atan(ry/rx)>0) {
					force_y -= Math.abs(Math.sin(Math.atan(ry/rx))*force);
				}else{
					force_y += Math.abs(Math.sin(Math.atan(ry/rx))*force);
				}
			}
		}
	}
	return [force_x, force_y];
}

planets = [[Math.random()*window.innerWidth, Math.random()*window.innerHeight, 100, 5.97e24],[Math.random()*window.innerWidth, Math.random()*window.innerHeight, 27, 5.97e24/6]];
console.log(planets);

earth.style.top = (planets[0][1]-100)+'px';
earth.style.left = (planets[0][0]-100)+'px';
moon.style.top = (planets[1][1]-27)+'px';
moon.style.left = (planets[1][0]-27)+'px';

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(let i=0;i<planets.length;i++) {
		let force = get_force(i);
		//planets[i][0] += force[0]/planets[i][2];
		//planets[i][1] += force[1]/planets[i][2];
	}
	requestAnimationFrame(animate);
}

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
		if (cursorY-planets[i][1]>0 && cursorX-planets[i][0]>0){
			forcepm[0] += Math.cos(angle)*6.67e-11*mass/(r*r);
			forcepm[1] += Math.sin(angle)*6.67e-11*mass/(r*r);
		} else if (cursorY-planets[i][1]<0 && cursorX-planets[i][0]<0){
			forcepm[0] -= Math.cos(angle)*6.67e-11*mass/(r*r);
			forcepm[1] -= Math.sin(angle)*6.67e-11*mass/(r*r);
		} else if (cursorY-planets[i][1]<0 && cursorX-planets[i][0]>0){
			angle = Math.abs(angle);
			forcepm[0] += Math.cos(angle)*6.67e-11*mass/(r*r);
			forcepm[1] -= Math.sin(angle)*6.67e-11*mass/(r*r);
		} else if (cursorY-planets[i][1]>0 && cursorX-planets[i][0]<0){
			angle = Math.abs(angle);
			forcepm[0] -= Math.cos(angle)*6.67e-11*mass/(r*r);
			forcepm[1] += Math.sin(angle)*6.67e-11*mass/(r*r);
		}

		console.log(angle);
		g += 6.67e-11*mass/(r*r);
	}
	console.log(forcepm);
	
});


const quality = 4;
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
		if (cursorY-planets[i][1]>0 && cursorX-planets[i][0]>0){
			forcepm[0] += Math.cos(angle)*6.67e-11*mass/(r*r);
			forcepm[1] += Math.sin(angle)*6.67e-11*mass/(r*r);
		} else if (cursorY-planets[i][1]<0 && cursorX-planets[i][0]<0){
			forcepm[0] -= Math.cos(angle)*6.67e-11*mass/(r*r);
			forcepm[1] -= Math.sin(angle)*6.67e-11*mass/(r*r);
		} else if (cursorY-planets[i][1]<0 && cursorX-planets[i][0]>0){
			angle = Math.abs(angle);
			forcepm[0] += Math.cos(angle)*6.67e-11*mass/(r*r);
			forcepm[1] -= Math.sin(angle)*6.67e-11*mass/(r*r);
		} else if (cursorY-planets[i][1]>0 && cursorX-planets[i][0]<0){
			angle = Math.abs(angle);
			forcepm[0] -= Math.cos(angle)*6.67e-11*mass/(r*r);
			forcepm[1] += Math.sin(angle)*6.67e-11*mass/(r*r);
		}

		
		
		g += 6.67e-11*mass/(r*r);
	}
	
	g = Math.sqrt(forcepm[0]*forcepm[0] + forcepm[1]*forcepm[1]);
	
	ctx.beginPath();
	let start = 'rgb(';
	let com = ','
	let end = ')';
	let red = (255*g/9.81).toString();
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

//For simulating planets
//animate();