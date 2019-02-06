var pieces, radius, fft, analyzer, mapMouseX, mapMouseY, audio, toggleBtn, uploadBtn, uploadedAudio, uploadAnim;
var colorPalette = ["#000", "red", "red", "yellow"];


function preload(){
	audio = loadSound("/audio/hopscotch.mp3");
}

function setup(){

	// CANVAS CREATION
	var canvasContainer = document.getElementById('canvas');
	var width = canvasContainer.offsetWidth;
	var height = canvasContainer.offsetHeight;
	var canvas = createCanvas(width, height);
	canvas.parent('canvas');

	//AUDIO PLAYBACK
	audio.setVolume(1);
	audio.play();
	analyzer = new p5.Amplitude();
	fft = new p5.FFT();
}

// DRAWING

function draw(){

	background(colorPalette[0]);
	
	translate(width / 2, height / 2);

	level = analyzer.getLevel();
	fft.analyze();

	var bass = fft.getEnergy(100, 150);
	var treble = fft.getEnergy(150, 250);
	var mid = fft.getEnergy("mid");

	var mapMid = map(mid, 0, 255, -100, 200);
	// var scaleMid = map(mid, 0, 255, 1, 1.5);

	var mapTreble = map(treble, 0, 255, 200, 350);
	// var scaleTreble = map(treble, 0, 255, 0, 1);

	var mapbass = map(bass, 0, 255, 50, 200);
	// var scalebass = map(bass, 0, 255, 0.05, 1.2);

	mapMouseX = map(mouseX, 0, width, 1, 50);
	mapMouseXbass = map(mouseX, 0, width, 1, 5);
	mapMouseY = map(mouseY, 0, height, 2, 6);

	// mapMouseX = map(mouseX, 0, width, 1, 50);
	// mapMouseXbass = map(mouseX, 0, width, 1, 5);
	// mapMouseY = map(mouseY, 0, height, 2, 6);


	pieces = 20;
	radius = 100;

	for (i = 0; i < pieces; i += 0.1) {

		rotate(TWO_PI / (pieces / 2));

		noFill();

		/*----------  BASS  ----------*/
		push();
		stroke(colorPalette[1]);
		rotate(frameCount * 0.002);
		strokeWeight(0.5);
		polygon(mapbass + i, mapbass - i, mapMouseXbass * i, 3);
		pop();


		/*----------  MID  ----------*/
		push();
		stroke(colorPalette[2]);
		strokeWeight(0.2);
		polygon(mapMid + i / 2, mapMid - i * 2, mapMouseX * i, 7);
		pop();


		/*----------  TREBLE  ----------*/
		push();
		stroke(colorPalette[3]);
		strokeWeight(0.6);
		scale(mouseX * 0.0005);
		rotate((mouseX * 0.002));
		polygon(mapTreble + i / 2, mapTreble - i / 2, mapMouseY * i / 2, 3);
		pop();

	}

}

function windowResized() {
	resizeCanvas(windowWidth, height);
}

function polygon(x, y, radius, npoints) {
	var angle = TWO_PI / npoints;
	beginShape();
	for (var a = 0; a < TWO_PI; a += angle) {
		var sx = x + cos(a) * radius;
		var sy = y + sin(a) * radius;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}