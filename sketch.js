let snows = [[], [], []];
class mySnow {
	constructor(x, y, r, amplitude, changeY, alpha) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.changeX = noise(frameCount * 0.1);
		this.amplitude = amplitude;
		this.changeY = changeY;
		this.alpha = alpha;
		this.mycase = ceil(random(2));
	}

	update() {
		this.x += map(this.changeX, 0, 1, -this.amplitude, this.amplitude);
		this.y += this.changeY;
		if (this.y >= height - 400) {
			this.y = 0;
			this.x = random(width);
		}
	}

	draw() {
		switch (this.mycase) {
			case 1:
				noStroke();
				fill(255, this.alpha);
				circle(this.x, this.y, this.r);
				break;
			case 2:
				stroke(255, this.alpha);
				strokeWeight(this.r / 4);
				noFill();
				beginShape()
				line(this.x - this.r, this.y, this.x + this.r, this.y);
				line(this.x, this.y - this.r, this.x, this.y + this.r);
				endShape()
				break;
		}
	}
}

// ----------------------------------------------
let color1, color2, color3;
let peopleStyle_3, peopleStyle_5, peopleStyle_4 = 1;
let mainHue = 0, randomColor;
let colors = "5aa9e6-7fc8f8-ffe45e-ffe97d-fc9ab7-ff80a6";
colors = colors.split("-").map(x => "#" + x);

let umbrella3_posX, umbrella3_posY;
let umbrella5_posX, umbrella5_posY;
let umbrella4_posX, umbrella4_posY;

let stars = [];
let moonX, moonY;
let moonPos;
let bgRectHeight;
let mountainNoise = 0.001;

async function setup() {
	createCanvas(864, 1080);
	pixelDensity(1);
	colorMode(HSB, 360, 100, 100, 255);

	let colorList = [0, 206, 342, 50];
	mainHue = random(colorList);
	randomColor = myColor();
	
	// 使用random色系
	// color1 = myColor();
	// color2 = myColor();
	// color3 = myColor();
	// 使用紅黃藍
	color1 = random(colors);
	color2 = random(colors);
	color3 = random(colors);

	peopleStyle_3 = ceil(random(2));
	peopleStyle_5 = ceil(random(2));
	peopleStyle_4 = ceil(random(2));

	umbrella3_posX = random(380, 450);
	umbrella3_posY = random(580, 700);
	umbrella4_posX = random(580, 700);
	umbrella4_posY = random(580, 700);
	umbrella5_posX = random(120, 250);
	umbrella5_posY = random(580, 700);

    // 星星
    for(let i=0; i<100; i++){
        stars.push({
            x: random(width),
            y: random(height/2),
            size: random(1, 3),
            blink: random(100)
        });
    }

	// 月亮 width * 0.8, height * 0.18(原本)
	moonX = random(width * 0.2, width * 0.8);
	moonY = random(height * 0.16, height * 0.2);
	moonPos = random(-PI*1/8, -PI*7/8);

	// 山
	mountainNoise = random(0.001, 0.003);
	
	// 背景
	bgRectHeight = random(9.8, 10.4);
}

function draw() {
	background(255);
	// 背景
	bgRectHeight = map(sin(frameCount/40), 0,1, 9.8, 10.4);
	myBackground(color(227, 41, 45), color(223, 54, 5), bgRectHeight)
    
	// 星星
	myStars()

	// 月亮
	push()
	// myMoon(moonX, moonY);
	myMoon(moonPos);
	pop()

	// 山
	myMountain(mountainNoise);

	// 雪
	for (let i = 0; i < 3; i++) {
		if (snows[i].length < 200) {
			let alpha = lerp(200, 255, i / 3)
			let snow = new mySnow(random(width), 50, random(i, i * 3), i, random(1, i * 1.5), alpha)
			snows[i].push(snow);
		}
		for (let snow of snows[i]) {
			snow.update();
			snow.draw();
		}
	}

	// 傘、人
	blendMode(MULTIPLY);
	let changeX=0, changeY=0;
	// 3片 
	let str1 = "M0,0s-238-66-419,102,131,51,204,127,14-196,216-229Z";
	let str2 = "M0,0s-183,5-216,229,235,33,296,76,15-155-8-305Z";
	let str3 = "M0,0s57,78,82,305,111-27,167-19-78-235-247-286Z";
	push();
	changeX = 50*sin(frameCount/30);
	changeY = 50*sin(frameCount/30);
	translate(umbrella3_posX + changeX, umbrella3_posY + changeY);
	rotate(-0.2);
	scale(0.32);
	umbrella_3(str1, str2, str3, color1);
	pop();
	
	// 4片
	let str9 = "M0,0s-100-5-180,220,50-20,109,1-12-124,72-219Z"
	let str10 = "M0,0s-80,75-72,220,100-25,119-13-3-165-68-180Z"
	let str11 = "M0,0s34,20,45,206,90-60,153-40-70-150-240-120Z"
	let str12 = "M0,0s80-5,195,165,35-50,90-50-100-150-311-12Z"
	push();
	changeX = 10*sin(frameCount/10);
	changeY = 10*cos(frameCount/10);
	translate(umbrella4_posX + changeX, umbrella4_posY + changeY);
	rotate(0.4);
	scale(0.32);
	umbrella_4(str9, str10, str11, str12, color3);
	pop();

	// 5片
	let str4 = "M0,0s-104,15-161,222,52-15,90-2-5-124,72-219Z"
	let str5 = "M0,0s-78,75-72,220,106-30,120-13,0-164-68-186Z"
	let str6 = "M0,0s35,12,45,206,57-43,131-52-70-145-229-109Z"
	let str7 = "M0,0s68-13,178,156,15-30,60-35-70-140-310-7Z"
	let str8 = "M0,0s135-30,235,120,10-28,80-30-110-140-30-55Z"
	push();
	changeX = 15*cos(frameCount/25);
	changeY = 15*cos(frameCount/25);
	translate(umbrella5_posX + changeX, umbrella5_posY + changeY);
	rotate(0.4);
	scale(0.32);
	umbrella_5(str4, str5, str6, str7, str8, color2);
	pop();

	// 框
	blendMode(BLEND);
	myFrame();
}

// ----------------------------------------------
function myBackground(color1, color2, rectHeight = 10) {
	for (let y = 0; y < height; y+=10) {
		let ratio = y/height;
		let c = lerpColor(color1, color2, ratio);
		fill(c);
		noStroke();
		rect(0, y, width, rectHeight);
	}
}

// ----------------------------------------------
function myStars() {
    noStroke();
    for(let star of stars) {
        let alpha = map(sin(frameCount * 0.15 + star.blink), -1, 1, 50, 255);
        fill(60, 20, 100, alpha);
        circle(star.x, star.y, star.size);
    }
}

// ----------------------------------------------
function mySVG(str, ratio_1 = 0.02, ratio_2 = 0.05, ratio_3 = 0.05, is_last = false) {
	str = str.replace(/[M]/g, '');
	str = str.replace(/[Z]/g, '');
	str = str.replace(/[-]/g, ',-');
	str = str.replace(/[s]/g, ',');
	str = str.replace(/,+/g, ',');
	str = str.split(",");
	str = str.map(x => parseInt(x, 10));

	beginShape();
	let a = str[0],
		b = str[1];
	noStroke();
	vertex(a, b);
	bezierVertex(a, b, a + str[2], b + str[3], a + str[4], b + str[5]);
	bezierVertex(a + str[4], b + str[5], a + str[4] + str[6], b + str[5] + str[7], a + str[4] + str[8], b + str[5] + str[9]);
	bezierVertex(a + str[4] + str[8], b + str[5] + str[9], a + str[4] + str[8] + str[10], b + str[5] + str[9] + str[11], a, b);
	endShape(CLOSE);
}

// --------------------------------
// // function myMoon(posX=width * 0.8, posY=height * 0.18) {
// function myMoon(posX=width * 0.2, posY= -height * 0.18) {
// 	push()
// 	translate(width/2, height/2);
//     noStroke();
//     for (let i = 1; i <= 3; i++) {
//         fill(54, 10, 100, 10);
//         circle(posX, posY, 80 + i * 80 + sin(millis()/300));
//     }
//     fill(50, 10, 100, 240);
//     circle(posX, posY, 80);
// 	rotate(sin(frameCount/50)*0.05)
// 	pop()
// }
function myMoon(pos) {
    push();
    translate(width/2, height/2);
    noStroke();

    let radius = height * 0.3;      // 圓半徑（軌道大小）
    let arcAngle = PI*2;           // 擺動範圍（越大越左右移動）
    let speed = -millis() * 0.00002;   // 速度
    let angle = speed* arcAngle;

	let x = cos(pos + angle) * radius;
	let y = sin(pos + angle) * radius;

    for (let i = 1; i <= 3; i++) {
        fill(54, 10, 100, 10);
        circle(x, y, 80 + i * 80 + sin(millis()/300));
    }
    fill(50, 10, 100, 240);
    circle(x, y, 80);

    pop();
}


// ----------------------------------------------
function umbrella_3(str1, str2, str3, color1) {
	stroke(20);
	strokeWeight(8);
	strokeCap(SQUARE);
	line(-84, 254, -180, 550);

	strokeWeight(12);
	strokeCap(ROUND);
	noFill();
	arc(-200, 530, 50, 50, PI / 12, PI * 1.2);

	fill(color1);
	mySVG(str1, 0.02, 0.05, 0.05, false)
	mySVG(str2, 0.03, 0.04, 0.05, false)
	mySVG(str3, 0.03, 0.06, 0.04, true)

	fill(20);
	noStroke();
	push();
	rotate(0.3);
	ellipse(0, 0, 40, 25);
	people(3, 22, peopleStyle_3, 15);
	pop();
}

function umbrella_4(str1, str2, str3, str4, color2) {
	stroke(20);
	strokeWeight(8);
	strokeCap(SQUARE);
	line(55, 200, 85, 350);
	
	strokeWeight(12);
	push();
	translate(81, 350);
	rotate(-0.2);
	rect(0, 0, 10, 5, 0.5);
	pop();
	
	fill(color2);
	mySVG(str1, 0.04, 0.15, 0.05, false)
	mySVG(str2, 0.05, 0.1, 0.05, false)
	mySVG(str3, 0.05, 0.08, 0.05, false)
	mySVG(str4, 0.05, 0.1, 0.08, true)
	
	fill(20);
	noStroke();
	ellipse(0, 0, 25, 20);
	
	push()
	rotate(-0.3)
	people(2, 22, peopleStyle_4, 10);
	pop()
}

function umbrella_5(str1, str2, str3, str4, str5, color3) {
	stroke(20);
	strokeWeight(8);
	strokeCap(SQUARE);
	line(80, 185, 160, 395);

	strokeWeight(12);
	fill(20);
	push();
	translate(148, 375);
	rotate(-0.35);
	rect(0, 0, 10, 20, 2);
	pop();

	fill(color3);
	mySVG(str1, 0.03, 0.15, 0.05, false)
	mySVG(str2, 0.05, 0.1, 0.05, false)
	mySVG(str3, 0.05, 0.08, 0.05, false)
	mySVG(str4, 0.05, 0.15, 0.05, false)
	mySVG(str5, 0.06, 0.2, 0.05, true)

	fill(20);
	noStroke();
	ellipse(0, 0, 20, 20);

	push()
	rotate(-0.3)
	people(6, 20, peopleStyle_5, 12);
	pop()
}

// ----------------------------------------------
function people(posX, posY, peopleStyle, peopleScale = 15) {
	blendMode(BLEND);
	noStroke();
	fill(20);
	scale(peopleScale);
	let circlePosition = 2.8 + (sin(frameCount/10)+1)*0.4;
	if (peopleStyle == 1) {
		circle(posX + circlePosition, posY - 3, 6);
		let r = random(19, 20);
		quad(posX + 1, posY, posX + 5, posY, posX + random(8,9), posY + r, posX - random(1,2), posY + r);
		rect(posX + 1, posY + 19 - 2, 2, 14, 5);
		rect(posX + 4, posY + 19 - 2, 2, 14, 5);
		let t = random(0, 1);
		quad(posX, posY + 0.2, posX + 1, posY + 0.2, posX + 1.5, posY + 8 + t, posX - 4, posY + 12 + t);
		quad(posX + 5, posY + 0.2, posX + 5 + 0.8, posY + 0.2, posX + 5 + 5.5, posY + 12, posX + 5, posY + 8);
		push()
		rotate(sin(frameCount/20)*0.1)
		mySki(posX, posY + 32);
		pop()
	} else if(peopleStyle == 2) {
		circle(posX + circlePosition, posY - 3, 6);
		let r = random(14, 14.2);
		rect(posX + 0.5, posY, 7, r, 10);
		rect(posX + 1, posY + 12, 2, 14);
		rect(posX + 4, posY + 12, 2, 14);
		strokeWeight(1.5);
		let t = random(11, 12);
		quad(posX + 1.5, posY + 1, posX + 3, posY + 2.5, posX - 2.5, posY + 1 + t, posX - 4, posY - 0.5 + t);
		quad(posX + 6.5, posY + 1, posX + 5, posY + 2.5, posX + 9, posY + 1 + t, posX + 11.5, posY + 0.5 + t);
		push()
		rotate(cos(frameCount/20)*0.1)
		mySki(posX, posY + 28);
		pop()
	}
}

// ----------------------------------------------
function mySki(posX, posY) {
	push();
	fill(20);
	noStroke();
	let skiLenBack = 12;  // 滑雪板後端長度
	let skiLenFront = 15; // 滑雪板前端平坦處長度
	let skiThick = 3;   // 滑雪板厚度
	beginShape();
	// 後端下緣
	vertex(posX - skiLenBack, posY);
	// 前端下緣轉折處
	vertex(posX + skiLenFront, posY);
	// 翹起的尖端
	bezierVertex(posX + skiLenFront + 5, posY, posX + skiLenFront + 15, posY - 10, posX + skiLenFront + 10, posY - 8);
	// 尖端厚度
	vertex(posX + skiLenFront + 10.5, posY - 8); 
	// 翹起的上緣(往回畫)
	bezierVertex(posX + skiLenFront + 5, posY - 5, posX + skiLenFront + 2, posY - skiThick, posX + skiLenFront, posY - skiThick);
	// 後端上緣
	vertex(posX - skiLenBack, posY - skiThick);
	endShape(CLOSE);
	pop();
}

// ----------------------------------------------
function myMountain(mountainNoise = 0.001) {
	blendMode(BLEND);
	
	for (let i = 800; i > 0; i -=10) {
		let t = frameCount * 0.01; // 控制速度
		for (let x = 0; x < width; x += 2) {
			noStroke();
			fill(mainHue, i/25, 100);
			rect(x, height - height * noise(0.2*i, mountainNoise*x+t) * sin(i/4), 2, 400, 20);
		}
	}
}

// ----------------------------------------------
function myFrame() {
	noFill();
	stroke(mainHue, 40, 95);
	drawingContext.shadowOffsetX = 0;
	drawingContext.shadowOffsetY = 0;

	drawingContext.shadowColor = color(20);
	drawingContext.shadowBlur = 20;
	strokeWeight(50);
	let padding = 40;
	rect(padding, padding, width - padding * 2, height/2-padding);
	rect(padding, height/2, width - padding * 2, height/2-padding);
	// rect(40, 40, 720, 460);
	// rect(40, 500, 720, 460);
	
	drawingContext.shadowBlur = 20;
	strokeWeight(80);
	rect(0, 0, width, height);

	// 積雪
	drawingContext.shadowColor = color(255);
	drawingContext.shadowBlur = 0;
	fill(92);
	noStroke();
	beginShape()
	vertex(width - 65, height/2-25);
	vertex(65, height/2-25);
	for (let x = 65; x <= width - 60; x+=5) {
			let y = (height/2-40) - 45 * noise(x/20)+sin(frameCount/15)*10;
			vertex(x, y);
	}
	endShape(CLOSE);
	
	beginShape()
	vertex(width - 65, height-65);
	vertex(65, height-65);
	for (let x = 65; x <= width - 60; x+=5) {
			let y = (height-75) - 40 * noise(x/200)+sin(frameCount/20)*10;
			vertex(x, y);
	}
	endShape(CLOSE);	
}

// -----------------------------------------------
function myColor() {
	let colorHue = (mainHue + random(-30, 30)) % 360;
	let colorSat = random(40, 80);
	let colorBri = random(80, 90);
	if (random() < 0.05) {
		colorHue = (colorHue + 180) % 360;
	}
	return color(colorHue, colorSat, colorBri);
}

// ----------------------------------------------
function keyPressed(){
	if(key == " ")
		saveCanvas("Through_the_Window", "png");
}

// ----------------------------------------------
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}