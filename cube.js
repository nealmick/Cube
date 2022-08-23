let camera, scene, renderer, raycaster, controls;


//canvas
const canvas = document.querySelector('canvas.webgl')
//const gui = new dat.GUI()
const mouse = new THREE.Vector2();
scene = new THREE.Scene();


let faces = 6
let x = 3
let y = 3
let cubeGap = .2
let delay= 1
let shuffleDelay= 5
let solveDelayStep=3
let solveDelay = .15
let moveCount = 0
let history = []
let shuffleCount = 50
let sceneRotationSpeed = 0.2

let loop = true

//create cube
cube = createCube(faces, x ,y)
printCube(cube)



//three
cub3 = init();
//fdsa()


animate(controls);

async function fdsa(){
	while(loop){
		test()
		await sleep(20000)
	}
}

async function test(){
	await sleep(1000)
	for(foo = 100; foo>0;foo--){
		scene.rotation.y += .05
		await sleep(20);
	}
	await sleep(500)
	shuffle()
	await sleep(1000)
	if(!loop){
		return
	}
	for(foo = 100; foo>0;foo--){
		scene.rotation.y += .05
		await sleep(20);
	}
	await sleep(500)

	s()
	for(foo = 150; foo>0;foo--){
		scene.rotation.y += .05
		await sleep(20);
	}

}
function s(){
	console.log('test')
	history = []
	solve()
	let h = history.slice();
	revert()
	history = h.slice();
	forward()
	console.log('done')

}
async function solve(){
	
	firstTop()
	topCorners()
	middleSolve()
	bottomCross()
	bottomCrossMatch()//this 1 is rly bad
	cornerFinalPosition()
	finalSolve()



}

async function testloop(){
	for(counter= 0; counter<100;counter++){
		shuffle('b')
		await sleep(1000)
		test()
		await sleep(1000)

		history=[]
	}
}

async function finalSolve(){
	console.log('almost done')
	counter=0
	while(cube[5][0][2]!='y'||counter<3){
		counter++
		while(cube[5][0][2]!='y'){
			//2 0 -2 -0
			cube = turn2(cube)
			cube = turn0(cube)
			cube = turn2(cube)
			cube = turn2(cube)
			cube = turn2(cube)
			cube = turn0(cube)
			cube = turn0(cube)
			cube = turn0(cube)

		}
		cube = turn5(cube)
	}
	while(cube[1][0][0]!='r'){
		cube = turn5(cube)

	}

}


function cornerFinalPosition(){
	setNum=0

	if(getColors1(0,0,0)>3){
		setNum=1
	}
	if(getColors2(0,0,2)>3){
		setNum=2
	}if(getColors3(2,0,2)>3){
		setNum=3
	}
	if(getColors4(2,0,0)>3){
		setNum=4
	}
	counter=0
	while(getColors1(0,0,0)<3||getColors2(0,0,2)<3||getColors3(2,0,2)<3||getColors4(2,0,0)<3){
		counter++
		if(setNum==1){
			getColors1Solve()
		}
		if(setNum==2){
			getColors2Solve()
		}
		if(setNum==3){
			getColors3Solve()
		}
		if(setNum==4){
			getColors4Solve()
		}
		if(setNum==0){//none in right spot
			r = getRandomInt(4)
			if(r==0){
				getColors1Solve()
			}
			if(r==1){
				getColors2Solve()
			}
			if(r==2){
				getColors3Solve()
			}
			if(r==3){
				getColors4Solve()
			}
			if(getColors1(0,0,0)>3){
				setNum=1
			}
			if(getColors2(0,0,2)>3){
				setNum=2
			}if(getColors3(2,0,2)>3){
				setNum=3
			}
			if(getColors4(2,0,0)>3){
				setNum=4
			}
		}
		if(counter==10){
			break
		}
	}

	console.log("setNumber",setNum,counter)
}
function getColors4Solve(){
	//5 3 -5 -1 5 -3 -5 1
	
	cube=turn5(cube)
	cube=turn2(cube)

	cube=turn5(cube)
	cube=turn5(cube)
	cube=turn5(cube)

	cube=turn4(cube)
	cube=turn4(cube)
	cube=turn4(cube)

	cube=turn5(cube)

	cube=turn2(cube)
	cube=turn2(cube)
	cube=turn2(cube)

	cube=turn5(cube)
	cube=turn5(cube)
	cube=turn5(cube)


	cube=turn4(cube)


}

function getColors3Solve(){
	//5 3 -5 -1 5 -3 -5 1
	
	cube=turn5(cube)
	cube=turn1(cube)

	cube=turn5(cube)
	cube=turn5(cube)
	cube=turn5(cube)

	cube=turn3(cube)
	cube=turn3(cube)
	cube=turn3(cube)

	cube=turn5(cube)

	cube=turn1(cube)
	cube=turn1(cube)
	cube=turn1(cube)

	cube=turn5(cube)
	cube=turn5(cube)
	cube=turn5(cube)


	cube=turn3(cube)


}
function getColors2Solve(){
	//5 3 -5 -1 5 -3 -5 1
	
	cube=turn5(cube)
	cube=turn4(cube)

	cube=turn5(cube)
	cube=turn5(cube)
	cube=turn5(cube)

	cube=turn2(cube)
	cube=turn2(cube)
	cube=turn2(cube)

	cube=turn5(cube)

	cube=turn4(cube)
	cube=turn4(cube)
	cube=turn4(cube)

	cube=turn5(cube)
	cube=turn5(cube)
	cube=turn5(cube)


	cube=turn2(cube)


}
function getColors1Solve(){
	//5 3 -5 -1 5 -3 -5 1
	
	cube=turn5(cube)
	cube=turn3(cube)

	cube=turn5(cube)
	cube=turn5(cube)
	cube=turn5(cube)

	cube=turn1(cube)
	cube=turn1(cube)
	cube=turn1(cube)

	cube=turn5(cube)

	cube=turn3(cube)
	cube=turn3(cube)
	cube=turn3(cube)

	cube=turn5(cube)
	cube=turn5(cube)
	cube=turn5(cube)


	cube=turn1(cube)


}
function getColors4(foo,oof,v){
	hits=0
	for(cf = (faces*2-1);cf>=0;cf--){
		if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='00ffff'){//b
			hits++
		}
		if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='ffa500'){//o
			hits++
		}
	}
	return hits
}
function getColors3(foo,oof,v){
	hits=0
	for(cf = (faces*2-1);cf>=0;cf--){
		if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='00ffff'){//b
			hits++
		}
		if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='ff0000'){//red
			hits++
		}
	}
	return hits
}
function getColors2(foo,oof,v){
	hits=0
	for(cf = (faces*2-1);cf>=0;cf--){
		if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='ff0000'){//red
			hits++
		}
		if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='00ff00'){//greeb
			hits++
		}
	}
	return hits
}
function getColors1(foo,oof,v){
	hits=0
	for(cf = (faces*2-1);cf>=0;cf--){
		if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='00ff00'){//green
			hits++
		}
		if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='ffa500'){//oran
			hits++
		}
	}
	console.log(hits)
	return hits
}


function bottomCrossMatch(){

	while(cube[1][1][0]!='r'||cube[4][1][0]!='g'){
		let cc=0
		ran1 = getRandomInt(4)
		if(ran1==0){
			bcmMove()
		}
		if(ran1==2){
			bcmMove2()
		}
		if(ran1==3){
			bcmMove3()
		}
		if(ran1==4){
			bcmMove4()
		}
		while(cc<=3){
			cc++
			cube = turn5(cube)
			if(cube[1][1][0]=='r'&&cube[4][1][0]=='g'){
				break
			}
		}
		if(cube[1][1][0]=='r'&&cube[4][1][0]=='g'){
			break
		}
	}

	while(cube[1][1][0]!='r'||cube[4][1][0]!='g'||cube[3][1][0]!='o'||cube[2][1][0]!='b'){
		bcmMove()

	}
	
}



function bcmMove4(){
	cube = turn4(cube)
	cube = turn5(cube)
	cube = turn4(cube)
	cube = turn4(cube)
	cube = turn4(cube)
	cube = turn5(cube)
	cube = turn4(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn4(cube)
	cube = turn4(cube)
	cube = turn4(cube)
	cube = turn5(cube)

}
function bcmMove3(){
	cube = turn3(cube)
	cube = turn5(cube)
	cube = turn3(cube)
	cube = turn3(cube)
	cube = turn3(cube)
	cube = turn5(cube)
	cube = turn3(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn3(cube)
	cube = turn3(cube)
	cube = turn3(cube)
	cube = turn5(cube)

}


function bcmMove2(){
	cube = turn2(cube)
	cube = turn5(cube)
	cube = turn2(cube)
	cube = turn2(cube)
	cube = turn2(cube)
	cube = turn5(cube)
	cube = turn2(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn2(cube)
	cube = turn2(cube)
	cube = turn2(cube)
	cube = turn5(cube)

}
function bcmMove(){
	cube = turn1(cube)
	cube = turn5(cube)
	cube = turn1(cube)
	cube = turn1(cube)
	cube = turn1(cube)
	cube = turn5(cube)
	cube = turn1(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn1(cube)
	cube = turn1(cube)
	cube = turn1(cube)
	cube = turn5(cube)

}



function bottomCross(){
	
	counter==0
	
	while(cube[5][0][1]!='y'||cube[5][1][2]!='y'||cube[5][2][1]!='y'||cube[5][1][0]!='y'){
		counter++
		

		if(cube[5][1][2]=='y'&&cube[5][1][0]!='y'){
			cube = turn5(cube)
		}
		else if(cube[5][1][2]=='y'&&cube[5][2][1]!='y'){
			cube = turn5(cube)
			cube = turn5(cube)
		}
		else if(cube[5][1][2]=='y'&&cube[5][0][1]!='y'){
			cube = turn5(cube)
			cube = turn5(cube)
			cube = turn5(cube)
			
		}
		else if(cube[5][0][1]=='y'&&cube[5][1][0]!='y'){
			cube = turn5(cube)
			cube = turn5(cube)
		}else{
			cube = turn5(cube)
		}
		counter++
		cube = turn2(cube)
		cube = turn1(cube)
		cube = turn5(cube)
		cube = turn1(cube)
		cube = turn1(cube)
		cube = turn1(cube)
		cube = turn5(cube)
		cube = turn5(cube)
		cube = turn5(cube)
		cube = turn2(cube)
		cube = turn2(cube)
		cube = turn2(cube)
		console.log(history.length)

		if(counter=15){
			break
		}
	}
	if(cube[5][0][1]!='y'||cube[5][1][2]!='y'||cube[5][2][1]!='y'||cube[5][1][0]!='y'){
		console.log('another111111111111111',history.length)
		bottomCross()
	}


}




function middleSolve(){
	console.log('middle time')
	rb()
	bo()
	og()
	gr()
}
function gr(){
	color1='00FF00'
	color2='FF0000'
	r = getCord3(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found at: ',foo,oof,v)
	if(oof == 1){

		if(foo==0&&v==0){
			greenOrangeOut()
		}
		if(foo==2&&v==0){
			orangeBlueOut()
		}
		if(foo==2&&v==2){
			blueRedOut()
		}
		if(foo==0&&v==2){
			redGreenOut()
		}

	}
	r = getCord3(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found at: ',foo,oof,v)
	if(oof==0){
		counter=0
		while(cube[4][2][1]!='g'||cube[1][0][1]!='r'){
			if(counter==10){
				redGreenOut()
				break
			}
			counter++
			redGreenOut()
			cube = turn5(cube)
			if(cube[4][2][1]=='r'&&cube[1][0][1]=='g'){
				redGreenOut()
				cube = turn5(cube)
				cube = turn5(cube)
				cube = turn5(cube)
				redGreenOut()
				break
				
			}
			counter++
		}	
	}
}

function og(){
	color1='FFA500'
	color2='00FF00'
	r = getCord3(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found at: ',foo,oof,v)
	if(oof == 1){

		if(foo==0&&v==0){
			greenOrangeOut()
		}
		if(foo==2&&v==0){
			orangeBlueOut()
		}
		if(foo==2&&v==2){
			blueRedOut()
		}
		if(foo==0&&v==2){
			redGreenOut()
		}

	}
	r = getCord3(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found at: ',foo,oof,v)
	if(oof==0){
		counter=0
		while(cube[3][2][1]!='o'||cube[4][0][1]!='g'){
			if(counter==10){
				greenOrangeOut()
				break
			}
			counter++
			greenOrangeOut()
			cube = turn5(cube)
			if(cube[3][2][1]=='g'&&cube[4][0][1]=='o'){
				greenOrangeOut()
				cube = turn5(cube)
				cube = turn5(cube)
				cube = turn5(cube)
				greenOrangeOut()
				break
				
			}
			counter++
		}
			
	}
}

function bo(){
	color1='00FFFF'
	color2='FFA500'
	r = getCord3(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found at: ',foo,oof,v)
	if(oof == 1){

		if(foo==0&&v==0){
			greenOrangeOut()
		}
		if(foo==2&&v==0){
			orangeBlueOut()
		}
		if(foo==2&&v==2){
			blueRedOut()
		}
		if(foo==0&&v==2){
			redGreenOut()
		}

	}
	r = getCord3(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found at: ',foo,oof,v)
	if(oof==0){
		counter=0
		while(cube[2][2][1]!='b'||cube[3][0][1]!='o'){
			if(counter==10){
				orangeBlueOut()
				break
			}
			counter++
			orangeBlueOut()
			cube = turn5(cube)
			if(cube[2][2][1]=='o'&&cube[3][0][1]=='b'){
				orangeBlueOut()
				cube = turn5(cube)
				cube = turn5(cube)
				cube = turn5(cube)
				orangeBlueOut()
				break
				
			}
			counter++
		}
			
	}
}


function rb(){
	color1='FF0000'
	color2='00FFFF'
	r = getCord3(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found at: ',foo,oof,v)
	if(oof == 1){

		if(foo==0&&v==0){
			greenOrangeOut()
		}
		if(foo==2&&v==0){
			orangeBlueOut()
		}
		if(foo==2&&v==2){
			blueRedOut()
		}
		if(foo==0&&v==2){
			redGreenOut()
		}

	}
	r = getCord3(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found at: ',foo,oof,v)
	if(oof==0){
		counter=0
		while(cube[1][2][1]!='r'||cube[2][0][1]!='b'){
			if(counter==10){
				blueRedOut()
				break
			}
			counter++
			blueRedOut()
			cube = turn5(cube)
			if(cube[1][2][1]=='b'&&cube[2][0][1]=='r'){
				blueRedOut()
				cube = turn5(cube)
				cube = turn5(cube)
				cube = turn5(cube)
				blueRedOut()
				break
				
			}
			counter++
		}
			
	}
}

function blueRedOut(){
	cube = turn1(cube)
	cube = turn5(cube)
	cube = turn1(cube)
	cube = turn1(cube)
	cube = turn1(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn2(cube)
	cube = turn2(cube)
	cube = turn2(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn2(cube)
}

function redGreenOut(){
	cube = turn4(cube)
	cube = turn5(cube)
	cube = turn4(cube)
	cube = turn4(cube)
	cube = turn4(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn1(cube)
	cube = turn1(cube)
	cube = turn1(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn1(cube)
}
function greenOrangeOut(){
	cube = turn3(cube)
	cube = turn5(cube)
	cube = turn3(cube)
	cube = turn3(cube)
	cube = turn3(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn4(cube)
	cube = turn4(cube)
	cube = turn4(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn4(cube)
}
function orangeBlueOut(){
	cube = turn2(cube)
	cube = turn5(cube)
	cube = turn2(cube)
	cube = turn2(cube)
	cube = turn2(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn3(cube)
	cube = turn3(cube)
	cube = turn3(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn5(cube)
	cube = turn3(cube)
}

function isYellow(foo,oof,v){

	for(cf = (faces*2-1);cf>=0;cf--){
		if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='FFFF00'){//is yellow
			return true
		}
	return false
		
}
}


function topCorners(){

	//red
	color1='FF0000'
	color2='00FFFF'
	r = getCord2(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found corner at: ',foo,oof,v)
	offTop2(foo,oof,v)
	backtop2(color1,color2)

	//blue
	color1='00FFFF'//blue
	color2='FFA500'//orange
	r = getCord2(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found corner at: ',foo,oof,v)
	offTop2(foo,oof,v)
	backtop2(color1,color2)
	//orange
	color1='FFA500'//orange
	color2='00FF00'//green
	r = getCord2(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found corner at: ',foo,oof,v)
	offTop2(foo,oof,v)
	backtop2(color1,color2)
	

	//orange
	color1='00FF00'//green
	color2='FF0000'//red
	r = getCord2(color1,color2)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log('found corner at: ',foo,oof,v)
	offTop2(foo,oof,v)
	backtop2(color1,color2)

}

function backtop2(color1,color2){
		r = getCord2(color1,color2)
		foo = r[0]
		oof = r[1]
		v = r[2]
		//red
		if (color1=='FF0000'&&color2=='00FFFF'){
			counter=0
			while(foo != 2||v!=2||counter<5){
				counter++
				cube = turn5(cube)
				r = getCord2(color1,color2)
				foo = r[0]
				oof = r[1]
				v = r[2]
			}
			insertCorner1()

		}
		//blue
		if (color1=='00FFFF'&&color2=='FFA500'){
			counter=0
			while(foo != 2||v!=0||counter<5){
				counter++
				cube = turn5(cube)
				r = getCord2(color1,color2)
				foo = r[0]
				oof = r[1]
				v = r[2]
			}
			insertCorner2()
		}
		//orange
		if (color1=='FFA500'&&color2=='00FF00'){
			counter=0
			while(foo != 0||v!=0||counter<5){
				counter++
				cube = turn5(cube)
				r = getCord2(color1,color2)
				foo = r[0]
				oof = r[1]
				v = r[2]
			}
			insertCorner3()
		}
		//green
		if (color1=='00FF00'&&color2=='FF0000'){
			counter=0
			while(foo != 0||v!=2||counter<5){
				counter++
				cube = turn5(cube)
				r = getCord2(color1,color2)
				foo = r[0]
				oof = r[1]
				v = r[2]
			}
			insertCorner4()
		}

	}
function insertCorner4(){
	count=0
	while(count<10){
		count++
		cube = turn4(cube)
		cube = turn5(cube)
		cube = turn4(cube)
		cube = turn4(cube)
		cube = turn4(cube)
		cube = turn5(cube)
		cube = turn5(cube)
		cube = turn5(cube)
		if(cube[4][2][2]=='g'&&cube[1][0][2]=='r'){
			break;
		}
	}
}
function insertCorner3(){
	count=0
	while(count<10){
		count++
		cube = turn3(cube)
		cube = turn5(cube)
		cube = turn3(cube)
		cube = turn3(cube)
		cube = turn3(cube)
		cube = turn5(cube)
		cube = turn5(cube)
		cube = turn5(cube)
		if(cube[3][2][2]=='o'&&cube[4][0][2]=='g'){
			break;
		}
	}
}
function insertCorner2(){
	count=0
	while(count<10){
		count++
		cube = turn2(cube)
		cube = turn5(cube)
		cube = turn2(cube)
		cube = turn2(cube)
		cube = turn2(cube)
		cube = turn5(cube)
		cube = turn5(cube)
		cube = turn5(cube)
		if(cube[2][2][2]=='b'&&cube[3][0][2]=='o'){
			break;
		}
	}
}
function insertCorner1(){
	count=0
	while(count<10){
		count++
		cube = turn1(cube)
		cube = turn5(cube)
		cube = turn1(cube)
		cube = turn1(cube)
		cube = turn1(cube)
		cube = turn5(cube)
		cube = turn5(cube)
		cube = turn5(cube)
		if(cube[1][2][2]=='r'&&cube[2][0][2]=='b'){
			break;
		}
	}
}
function offTop2(foo,oof,v){
	console.log('offtop2')
	if(oof==2){
		if(foo==0&&v==0){
			cube=turn4(cube)
			cube=turn4(cube)
			cube=turn4(cube)
			cube=turn5(cube)
			cube=turn4(cube)
		}
		if(foo==0&&v==2){
			cube=turn1(cube)
			cube=turn1(cube)
			cube=turn1(cube)
			cube=turn5(cube)
			cube=turn1(cube)
		}
		if(foo==2&&v==2){
			cube=turn2(cube)
			cube=turn2(cube)
			cube=turn2(cube)
			cube=turn5(cube)
			cube=turn2(cube)
		}
		if(foo==2&&v==0){
			cube=turn3(cube)
			cube=turn3(cube)
			cube=turn3(cube)
			cube=turn5(cube)
			cube=turn3(cube)
		}
	}
}
async function firstTop(){
	
	topCross('FF0000')//red
	topCross('00FFFF')//blue
	topCross('FFA500')//orange
	topCross('00FF00')//green
}
function topCross(color){

	r = getCord(color)
	foo = r[0]
	oof = r[1]
	v = r[2]
	console.log(foo,oof,v)

	if(oof==2){
		offTop(foo,oof,v)
		r = getCord(color)
		foo = r[0]
		oof = r[1]
		v = r[2]
	}
	if(oof==1){
		offMiddle(foo,oof,v)
		r = getCord(color)
		foo = r[0]
		oof = r[1]
		v = r[2]
	}
	if(oof==0){
		while(cub3[foo][oof][v].geometry.faces[6].color.getHexString()!='ffffff'){
			//correct bottom
			correctBottom()
			r = getCord(color)
			foo = r[0]
			oof = r[1]
			v = r[2]
		}
		backTop(foo,oof,v,color)
		r = getCord(color)
		foo = r[0]
		oof = r[1]
		v = r[2]

	}

}

function correctBottom(){
	cube=turn2(cube)
	cube=turn1(cube)
	cube=turn5(cube)
	cube=turn5(cube)
	cube=turn5(cube)
	cube=turn1(cube)
	cube=turn1(cube)
	cube=turn1(cube)
	cube=turn2(cube)
	cube=turn2(cube)
	cube=turn2(cube)
	cube=turn5(cube)
	cube=turn5(cube)
}
//backtop
function backTop(foo,oof,v,color){
	if (color=='FF0000'){//red
		casdf = 0
		console.log('asdf',casdf)
		while(casdf <=5){
			console.log(cube[1][1][0])

			casdf++
			if(cube[1][1][0]=='r'&&cube[5][0][1]=='w'){
				asdfdsa=123
			}else{
				cube=turn5(cube)
			}
		}
		cube=turn1(cube)
		cube=turn1(cube)

	}
	if (color=='00FFFF'){//red
		casdf = 0
		while(casdf <=5){

			casdf++
			if(cube[2][1][0]=='b'&&cube[5][1][2]=='w'){
			}else{
				cube=turn5(cube)
			}
		}
		cube=turn2(cube)
		cube=turn2(cube)

	}
	if (color=='FFA500'){//orange
		casdf = 0
		while(casdf <=5){
			console.log(cube[1][1][0])

			casdf++
			if(cube[3][1][0]=='o'&&cube[5][2][1]=='w'){
				console.log('got it ')
			}else{
				cube=turn5(cube)
			}
		}
		cube=turn3(cube)
		cube=turn3(cube)
	}
	if (color=='00FF00'){//green
		casdf = 0
		while(casdf <=5){

			casdf++
			if(cube[4][1][0]=='g'&&cube[5][1][0]=='w'){
			}else{
				cube=turn5(cube)
			}
		}
		cube=turn4(cube)
		cube=turn4(cube)
	}
}

function offMiddle( foo,oof,v){


	
	if(foo==0 && v == 0){
		if(cub3[foo][oof][v].geometry.faces[10].color.getHexString()=='ffffff'){
			cube = turn4(cube)
			cube = turn4(cube)
			cube = turn4(cube) 
			cube = turn5(cube)
			cube = turn4(cube) 
		}else{
			cube = turn3(cube)
			cube = turn5(cube)
			cube = turn3(cube)
			cube = turn3(cube)
			cube = turn3(cube)
		}

	}

	if(foo==0 && v == 2){
		if(cub3[foo][oof][v].geometry.faces[2].color.getHexString()=='ffffff'){
			cube = turn1(cube)
			cube = turn1(cube)
			cube = turn1(cube)
			cube = turn5(cube)
			cube = turn1(cube)
		}else{
			cube = turn4(cube)
			cube = turn5(cube)
			cube = turn4(cube)
			cube = turn4(cube)
			cube = turn4(cube)
		}
		}
	
	if(foo==2 && v == 2){
		if(cub3[foo][oof][v].geometry.faces[8].color.getHexString()=='ffffff'){
			cube = turn2(cube)
			cube = turn2(cube)
			cube = turn2(cube) 
			cube = turn5(cube)
			cube = turn2(cube) 

		}else{
			cube = turn1(cube)
			cube = turn5(cube)
			cube = turn1(cube)
			cube = turn1(cube)
			cube = turn1(cube)
		}
		}
	if(foo==2 && v == 0){
		if(cub3[foo][oof][v].geometry.faces[0].color.getHexString()=='ffffff'){
			cube = turn3(cube)
			cube = turn3(cube)
			cube = turn3(cube) 
			cube = turn5(cube)
			cube = turn3(cube)

		}else{
			cube = turn2(cube)
			cube = turn5(cube)
			cube = turn2(cube)
			cube = turn2(cube)
			cube = turn2(cube)
		}
		}


}


function offTop(foo,oof,v){
	if (foo==1 && v == 0){
		if(cub3[foo][oof][v].geometry.faces[4].color.getHexString()=='ffffff'){
			cube = turn3(cube)
		}
		cube = turn3(cube)


	}
	if (foo==2 && v == 1){
		if(cub3[foo][oof][v].geometry.faces[4].color.getHexString()=='ffffff'){
			cube = turn2(cube)

		}
		cube = turn2(cube)
	}
	if (foo==1 && v == 2){
		if(cub3[foo][oof][v].geometry.faces[4].color.getHexString()=='ffffff'){
			cube = turn1(cube)

		}
		cube = turn1(cube)
	}
	if (foo==0 && v == 1){
		if(cub3[foo][oof][v].geometry.faces[4].color.getHexString()=='ffffff'){
			cube = turn4(cube)

		}
		cube = turn4(cube)

	}

}


function getCord(color){

	let hits = 0
	grey = 0
	for(foo = x-1;foo>=0;foo--){
		for(oof = x-1;oof>=0;oof--){
			for(v = x-1;v>=0;v--){
				for(cf = (faces*2-1);cf>=0;cf--){
						if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='ffffff'){//w
							hits++
						}

						if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='383838'){//grey
							grey++
						}
						if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()==color.toLowerCase()){//b
							hits++
						}
					}
					if(grey==8 && hits==4){
						return [foo,oof,v]
						
					}
					grey = 0
					hits = 0

			}
		}
	}
}

function getCord2(color1,color2){

	let hits = 0
	grey = 0
	for(foo = x-1;foo>=0;foo--){
		for(oof = x-1;oof>=0;oof--){
			for(v = x-1;v>=0;v--){
				for(cf = (faces*2-1);cf>=0;cf--){
						if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='ffffff'){//w
							hits++
						}

						if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='383838'){//grey
							grey++
						}
						if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()==color1.toLowerCase()){//b
							hits++
						}
						if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()==color2.toLowerCase()){//b
							hits++
						}
					}
					if(grey==6 && hits==6){
						return [foo,oof,v]
						
					}
					grey = 0
					hits = 0

			}
		}
	}
}


function getCord3(color1,color2){

	let hits = 0
	grey = 0
	for(foo = x-1;foo>=0;foo--){
		for(oof = x-1;oof>=0;oof--){
			for(v = x-1;v>=0;v--){
				for(cf = (faces*2-1);cf>=0;cf--){
						if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()=='383838'){//grey
							grey++
						}
						if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()==color1.toLowerCase()){//b
							hits++
						}
						if(cub3[foo][oof][v].geometry.faces[cf].color.getHexString()==color2.toLowerCase()){//b
							hits++
						}
					}
					if(grey==8 && hits==4){
						return [foo,oof,v]
						
					}
					grey = 0
					hits = 0

			}
		}
	}
}



function bigger(){
	stopLoop()
	reset()
	console.log('bigger')
	x= x+1
	y= y+1
	cube = createCube(faces, x ,y)
	printCube(cube)
	console.log('reset')
	history = []
	scene = new THREE.Scene();
	cub3 = createCub3()
	updateCub3(cube)

	return cube
}
function smaller(){
	stopLoop()
	reset()

	console.log('bigger')
	x= x-1
	y= y-1
	cube = createCube(faces, x ,y)
	printCube(cube)
	console.log('reset')
	history = []
	scene = new THREE.Scene();
	cub3 = createCub3()
	updateCub3(cube)

	return cube
}


async function reset(){
	loop=false
	//await sleep(300)ifreset messes up add bit of delay
	cube = createCube(faces, x ,y)
	printCube(cube)
	console.log('reset')
	updateCub3(cube)
	history = []



	

}

function stopLoop(){
	loop=false
}
function start(){
	loopy()
}
async function loopy(){
	loop=true
	while(loop){


		if(!loop){
			break
		}
		shuffle('b')
		if(!loop){
			break
		}
		await sleep(shuffleCount*shuffleDelay);
		await sleep(1000);
		if(!loop){
			break
		}
		for(foo = 45; foo>0;foo--){
				scene.rotation.y -= 360/45
				await sleep(20);
		}
		test()
		await sleep(500);

		if(!loop){
			break
		}
		await sleep(shuffleCount*delay);
		await sleep(2000);
		if(!loop){
			break
		}
		for(foo = 45; foo>0;foo--){
			scene.rotation.y += 360/45
			await sleep(30);
		}
		await sleep(1000)

	}
	loop = true
}
function back(){ 

	let hLen = history.length 
	hLen--

	if(history[hLen]==0){

		cube=turn0(cube)
		cube=turn0(cube)
		cube=turn0(cube)
	}
	if(history[hLen]==1){
		cube=turn1(cube)
		cube=turn1(cube)
		cube=turn1(cube)
	}
	if(history[hLen]==2){
		cube=turn2(cube)
		cube=turn2(cube)
		cube=turn2(cube)
	}
	if(history[hLen]==3){
		cube=turn3(cube)
		cube=turn3(cube)
		cube=turn3(cube)
	}
	if(history[hLen]==4){
		cube=turn4(cube)
		cube=turn4(cube)
		cube=turn4(cube)
	}
	if(history[hLen]==5){
		cube=turn5(cube)
		cube=turn5(cube)
		cube=turn5(cube)
	}

	if(history[hLen].length>1){
		if(history[hLen].charAt(0)=='x'){
			input = history[hLen].substring(1)
			cube = turnX(cube,input)
			cube = turnX(cube,input)
			cube = turnX(cube,input)
		}
		if(history[hLen].charAt(0)=='y'){
			input = history[hLen].substring(1)
			cube = turnY(cube,input)
			cube = turnY(cube,input)
			cube = turnY(cube,input)
		}
	}

	
	history.pop()
	history.pop()
	history.pop()
	history.pop()
}
async function forward(){ 

	let hLen = history.length 
	cc =0
	while (hLen>cc){ 
		await sleep(100*solveDelay)
		if(history[cc]==0){

			cube=turn0(cube)
		}
		if(history[cc]==1){
			cube=turn1(cube)
		}
		if(history[cc]==2){
			cube=turn2(cube)
		}
		if(history[cc]==3){
			cube=turn3(cube)
		}
		if(history[cc]==4){
			cube=turn4(cube)
		}
		if(history[cc]==5){
			cube=turn5(cube)
		}

		cc++
		
	}

}

async function revert(){ 

	let hLen = history.length 
	loop = true
	while (hLen>0){ 
		hLen--

		if(history[hLen]==0){

			cube=turn0(cube)
			cube=turn0(cube)
			cube=turn0(cube)
		}
		if(history[hLen]==1){
			cube=turn1(cube)
			cube=turn1(cube)
			cube=turn1(cube)
		}
		if(history[hLen]==2){
			cube=turn2(cube)
			cube=turn2(cube)
			cube=turn2(cube)
		}
		if(history[hLen]==3){
			cube=turn3(cube)
			cube=turn3(cube)
			cube=turn3(cube)
		}
		if(history[hLen]==4){
			cube=turn4(cube)
			cube=turn4(cube)
			cube=turn4(cube)
		}
		if(history[hLen]==5){
			cube=turn5(cube)
			cube=turn5(cube)
			cube=turn5(cube)
		}

		if(history[hLen].length>1){
		if(history[hLen].charAt(0)=='x'){
			input = history[hLen].substring(1)
			cube = turnX(cube,input)
			cube = turnX(cube,input)
			cube = turnX(cube,input)
		}
		if(history[hLen].charAt(0)=='y'){
			input = history[hLen].substring(1)
			cube = turnY(cube,input)
			cube = turnY(cube,input)
			cube = turnY(cube,input)
		}
	}
		if(!loop){
			break
		}
	}
	history = [] 
}




function init() {
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
	camera.position.z = x*1.5;
	camera.position.y = x*1.5;
	camera.position.x = x*1.5;
	raycaster = new THREE.Raycaster();
	//create 3d cube
	cub3 = createCub3()
	//inital cube update for colors
	updateCub3(cube)


	/*
	const cubeRotation = gui.addFolder('cubeRotation')
	cubeRotation.add(cub3[0][0][0].rotation,'x').min(-3).max(3).step(0.01)
	cubeRotation.add(cub3[0][0][0].rotation,'y').min(-3).max(3).step(0.01)
	cubeRotation.add(cub3[0][0][0].rotation,'z').min(-3).max(3).step(0.01)
	const cameraRotation = gui.addFolder('cameraRotation')
	cameraRotation.add(camera.rotation,'x').min(-1).max(1).step(0.01)
	cameraRotation.add(camera.rotation,'y').min(-1).max(1).step(0.01)
	cameraRotation.add(camera.rotation,'z').min(-1).max(1).step(0.01)
	const cameraPosition = gui.addFolder('cameraPosition')
	cameraPosition.add(camera.position,'x').min(-1).max(1).step(0.01)
	cameraPosition.add(camera.position,'y').min(-1).max(1).step(0.01)
	cameraPosition.add(camera.position,'z').min(-1).max(1).step(0.01)
	*/

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha:true
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	//document.addEventListener('click', onClick, false);
	controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
	}
	
	controls.enableDamping = true
	controls.dampingFactor = .1
	controls.panSpeed = 0
	controls.autoRotate = true;
	controls.autoRotateSpeed =10
	controls.update ()

	controls.target = new THREE.Vector3(0, 0, 0);
	
	//cub3[][][]
	window.addEventListener('resize', onWindowResize, false);
	return cub3
	}





function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}



function createCub3(){
	let cub3 = []
	a1=Math.round(x/-2 )   //added to replace stage center
	for(xx=0;xx<x;xx++){
		cub3.push([])
		a2=Math.round(x/-2 ) 

		for(yy=0;yy<x;yy++){
			cub3[xx].push([])
			a3=Math.round(x/-2 ) 

			for(zz=0;zz<x;zz++){
				cub3[xx][yy].push([])
				const geometry = new THREE.BoxGeometry();


				if(x%2==0){
					geometry.translate(a1+.5+cubeGap/2+a1*cubeGap,a2+.5+cubeGap/2+a2*cubeGap,a3+.5+cubeGap/2+a3*cubeGap)
				
				}else{
					geometry.translate(a1+a1*cubeGap,a2+a2*cubeGap,a3+a3*cubeGap)

				}
				const material = new THREE.MeshBasicMaterial( { vertexColors: true } );
				//all colors are created grey now and later updated with updatecub3 function
					geometry.faces[4].color.set(0x383838)//face 0 white 
					geometry.faces[5].color.set(0x383838)

					geometry.faces[8].color.set(0x383838)//face 1 red 
					geometry.faces[9].color.set(0x383838)

					geometry.faces[0].color.set(0x383838)//face 2 blue 
					geometry.faces[1].color.set(0x383838)


					geometry.faces[10].color.set(0x383838)//face 3 orange
					geometry.faces[11].color.set(0x383838)

					geometry.faces[2].color.set(0x383838) //face 4 green 
					geometry.faces[3].color.set(0x383838)

					geometry.faces[6].color.set(0x383838)//face 5 yellow 
					geometry.faces[7].color.set(0x383838)

				cub3[xx][yy][zz] = new THREE.Mesh(geometry, material);
				scene.add(cub3[xx][yy][zz]);

				a3++
			}
			a2++
		}
		a1++

	}
	return cub3
}

//raytracer might use for input

function onClick(event) {

	event.preventDefault();

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	const intersects = raycaster.intersectObjects( scene.children );
	if ( intersects.length > 0 ) {
	
		const intersection = intersects[0];

		const faceIndex = intersection.faceIndex;
		const object = intersection.object;
		console.log(intersects[0])
		
		object.geometry.faces[ faceIndex ].color.set(  0xff0000 );
		object.geometry.faces[ faceIndex+1 ].color.set(  0xff0000 );
		object.geometry.colorsNeedUpdate = true;

	}

}

function animate() {
	requestAnimationFrame(animate);

	scene.rotation.y += sceneRotationSpeed*.01;
	renderer.render(scene, camera);
}





//rubiks cube solver!----------------------------------------
//turn x vertical
//turn y horizontal

function turnX(cube,input){
	console.log('turning X----------------',input)
	let cloneCube = structuredClone(cube)

	let counter = 0
	console.log(input)
	for(oof=x-1;oof>=0;oof--){
		console.log(oof)
		cube[0][input][oof]=cloneCube[2][input][oof]
		cube[4][x-1-input][oof]=cloneCube[0][input][counter]
		cube[5][input][counter]=cloneCube[4][x-1-input][oof]
		cube[2][input][oof]=cloneCube[5][input][oof]
		counter++


		

	}
	history.push('x'+input)
	updateCub3(cube)
	printCube(cube)
	return cube

}

function turnY(cube,input){
	console.log('turning Y----------------',input)
	let cloneCube = structuredClone(cube)
	let counter = 0
	for(oof=x-1;oof>=0;oof--){
		cube[2][oof][input]=cloneCube[1][oof][input]
		cube[3][oof][input]=cloneCube[2][oof][input]
		cube[4][oof][input]=cloneCube[3][oof][input]
		cube[1][oof][input]=cloneCube[4][oof][input]
		counter++


		

	}
	history.push('y'+input)
	updateCub3(cube)
	printCube(cube)
	return cube

}

//turn face 5
function turn5(cube){

	console.log('turning 5----------------')
	let f = cube.length
	let x = cube[0].length
	let y = cube[0][0].length
	let cloneCube = structuredClone(cube)
	//rotate face of side
	for(l=0;l<x;l++){
		let foo = 0
		for(oof=x-1; oof>=0;oof--){
			cube[5][l][foo] = cloneCube[5][oof][l]

			foo++ 
			}
		}
	//rotate sides
	//side  2-1 3-2 4-3 1-4		
	let c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[2][c][0] = cloneCube[1][c][0]
		c++
	}
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[3][c][0] = cloneCube[2][c][0]
		c++
	}
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[4][c][0] = cloneCube[3][c][0]
		c++
	}
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[1][c][0] = cloneCube[4][c][0]
		c++
	}
	history.push(5)

	updateCub3(cube)
	printCube(cube)
	return cube
}


//turn face 4
function turn4(cube){
	console.log('turning 4----------------')
	let f = cube.length
	let x = cube[0].length
	let y = cube[0][0].length
	let cloneCube = structuredClone(cube)
	//rotate face of side
	for(l=0;l<x;l++){
		let foo = 0
		for(oof=x-1; oof>=0;oof--){
			cube[4][l][foo] = cloneCube[4][oof][l]

			foo++ 
			}
		}
	//rotate sides
	//side  0-3 1-0 5-1 3-5		
	let c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[0][foo][x-1] = cloneCube[3][x-1][c]
		c++
	}
	
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[1][0][foo] = cloneCube[0][foo][x-1]
		c++
	}
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[5][c][0] = cloneCube[1][0][foo]
		c++
	}
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[3][x-1][c] = cloneCube[5][c][0]
		c++
	}

	history.push(4)

	updateCub3(cube)

	printCube(cube)
	return cube
}


//turn face 3
function turn3(cube){
	console.log('turning 3----------------')
	let f = cube.length
	let x = cube[0].length
	let y = cube[0][0].length
	let cloneCube = structuredClone(cube)
	//rotate face of side
	for(l=0;l<x;l++){
		let foo = 0
		for(oof=x-1; oof>=0;oof--){
			cube[3][l][foo] = cloneCube[3][oof][l]

			foo++ 
			}
		}
	//rotate sides
	//side  0-2 4-0 5-4 2-5
	let c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[0][x-1][c] = cloneCube[2][x-1][c]
		c++
	}
	
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[4][0][foo] = cloneCube[0][x-1][c]
		c++
	}
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[5][x-1][c] = cloneCube[4][0][foo]
		c++
	}
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[2][x-1][c] = cloneCube[5][x-1][c]
		c++
	}
	
	history.push(3)

	updateCub3(cube)
	printCube(cube)
	return cube
}

//turn face 2
function turn2(cube){
	console.log('turning 2----------------')
	let f = cube.length
	let x = cube[0].length
	let y = cube[0][0].length
	let cloneCube = structuredClone(cube)
	//rotate face of side
	for(l=0;l<x;l++){
		let foo = 0
		for(oof=x-1; oof>=0;oof--){
			cube[2][l][foo] = cloneCube[2][oof][l]

			foo++ 
			}
		}
	//rotate sides
	//side  0-1 3-0 5-3 1-5
	let c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[0][c][0] = cloneCube[1][x-1][c]
		c++
	}
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[3][0][foo] = cloneCube[0][c][0]
		c++
	}
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[5][foo][x-1] = cloneCube[3][0][foo]
		c++
	}
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[1][x-1][c] = cloneCube[5][foo][x-1]
		c++
	}
	history.push(2)
	updateCub3(cube)
	printCube(cube)
	return cube
}

//1
function turn1(cube){
	console.log('turning 1----------------')
	let f = cube.length
	let x = cube[0].length
	let y = cube[0][0].length
	let cloneCube = structuredClone(cube)
	for(l=0;l<x;l++){
		let foo = 0
		for(oof=x-1; oof>=0;oof--){
			cube[1][l][foo] = cloneCube[1][oof][l]

			foo++ 
			}
		}
	//5 4 0 2  
	//4-5 0-4 2-0 5-2
	//side  0-4 2-0 5-2 4-5
	let c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[4][x-1][c] = cloneCube[5][0][foo]
		c++
	}

	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[0][0][foo] = cloneCube[4][x-1][c]
		c++
	}

	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[2][0][foo] = cloneCube[0][0][foo]
		c++
	}
	c = 0
	for(foo = x-1; foo>=0;foo--){
		cube[5][0][foo] = cloneCube[2][0][foo]
		c++
	}

	history.push(1)
	updateCub3(cube)
	printCube(cube)
	return cube
}


//turn face 0 once clockwise
function turn0(cube){

	console.log('turning 0----------------')
	let f = cube.length
	let x = cube[0].length
	let y = cube[0][0].length
	let cloneCube = structuredClone(cube)
	for(l=0;l<x;l++){
		let foo = 0
		for(oof=x-1; oof>=0;oof--){
			cube[0][l][foo] = cloneCube[0][oof][l]

			foo++ 
			}
		}

	//side  1-2 2-3 3-4 4 -1
	for(foo = 0; foo<x; foo++){
		cube[1][foo][x-1] = cloneCube[2][foo][x-1]
	}
	for(foo = 0; foo<x; foo++){
		cube[2][foo][x-1] = cloneCube[3][foo][x-1]
	}
	for(foo = 0; foo<x; foo++){
		cube[3][foo][x-1] = cloneCube[4][foo][x-1]
	}
	for(foo = 0; foo<x; foo++){
		cube[4][foo][x-1] = cloneCube[1][foo][x-1]
	}
	printCube(cube)
	updateCub3(cube)
	history.push(0)
	return cube

}


function printCube(cube){

	let f = cube.length
	let x = cube[0].length
	let y = cube[0][0].length
	let space = ''
	let bigStr = ''
	//make spacing
	for(c=0;c<x;c++){
		space+=' '
	}

	//face 0
	for(foo=x-1;foo>=0;foo--){
		bigStr+=space
		for(oof=0;oof<y;oof++)
			bigStr+=cube[0][oof][foo]
		bigStr+='\n'
	}

	//face 1-4
	for(foo=x-1;foo>=0;foo--){//210
		for(oof=1;oof<=4;oof++){
			for(asdf=0; asdf<=x-1;asdf++){
				bigStr+=cube[oof][asdf][foo]
			}
		}
		bigStr+='\n'
	}

	//face 5
	for(foo=x-1;foo>=0;foo--){
		bigStr+=space
		for(oof=0;oof<y;oof++)
			bigStr+=cube[5][oof][foo]
		bigStr+='\n'
	}
	console.log(bigStr)
	document.getElementById("cube").innerText = bigStr
}


function createCube(faces, x,y){

	stat = ('x: '+x+'  y: '+y)
	console.log(stat)
	document.getElementById("cubeStat").innerText = stat


	let cube = [];
	for(i=0;i<faces;i++){
		cube.push([])
		for(foo=0;foo<x;foo++){
			cube[i].push([])
			for(oof=0;oof<y;oof++){
				cube[i][foo].push([])
				if (i == 0){
					cube[i][foo][oof]='w'
				}
				if (i == 1){
					cube[i][foo][oof]='r'
				}
				if (i == 2){
					cube[i][foo][oof]='b'
				}
				if (i == 3){
					cube[i][foo][oof]='o'
				}
				if (i == 4){
					cube[i][foo][oof]='g'
				}
				if (i == 5){
					cube[i][foo][oof]='y'
				}

			}
		}
	}
	return cube
}


	
//updates 3d cube color from array

function updateCub3(cube){

	//face0
	foo=x-1
	for(v2 = 0;v2<x;v2++){
		oof=x-1
		for(v1 = 0;v1<x;v1++){

		if (cube[0][v1][v2] == 'w'){
			cub3[foo][x-1][oof].geometry.colorsNeedUpdate = true;
			cub3[foo][x-1][oof].geometry.faces[4].color.set(0xFFFFFF)
			cub3[foo][x-1][oof].geometry.faces[5].color.set(0xFFFFFF)
		}
		if (cube[0][v1][v2] == 'r'){
			cub3[foo][x-1][oof].geometry.colorsNeedUpdate = true;
			cub3[foo][x-1][oof].geometry.faces[4].color.set(0xFF0000)
			cub3[foo][x-1][oof].geometry.faces[5].color.set(0xFF0000)
		}
		if (cube[0][v1][v2] == 'b'){
			cub3[foo][x-1][oof].geometry.colorsNeedUpdate = true;
			cub3[foo][x-1][oof].geometry.faces[4].color.set(0x00FFFF)
			cub3[foo][x-1][oof].geometry.faces[5].color.set(0x00FFFF)
		}
		if (cube[0][v1][v2] == 'o'){
			cub3[foo][x-1][oof].geometry.colorsNeedUpdate = true;
			cub3[foo][x-1][oof].geometry.faces[4].color.set(0xFFA500)
			cub3[foo][x-1][oof].geometry.faces[5].color.set(0xFFA500)
		}
		if (cube[0][v1][v2] == 'g'){
			cub3[foo][x-1][oof].geometry.colorsNeedUpdate = true;
			cub3[foo][x-1][oof].geometry.faces[4].color.set(0x00FF00)
			cub3[foo][x-1][oof].geometry.faces[5].color.set(0x00FF00)
		}
		if (cube[0][v1][v2] == 'y'){
			cub3[foo][x-1][oof].geometry.colorsNeedUpdate = true;
			cub3[foo][x-1][oof].geometry.faces[4].color.set(0xFFFF00)
			cub3[foo][x-1][oof].geometry.faces[5].color.set(0xFFFF00)
		}
		oof--
		}
	foo--
	}
//side 1
	for(oof = 0; oof<x;oof++){
		for(foo= 0; foo<x;foo++){
			if (cube[1][foo][oof] == "w"){
				cub3[foo][oof][x-1].geometry.colorsNeedUpdate = true;
				cub3[foo][oof][x-1].geometry.faces[8].color.set(0xFFFFFF)
				cub3[foo][oof][x-1].geometry.faces[9].color.set(0xFFFFFF)
			
			}
			if (cube[1][foo][oof] == "r"){
				cub3[foo][oof][x-1].geometry.colorsNeedUpdate = true;
				cub3[foo][oof][x-1].geometry.faces[8].color.set(0xFF0000)
				cub3[foo][oof][x-1].geometry.faces[9].color.set(0xFF0000)
			
			}
			if (cube[1][foo][oof] == "b"){
				cub3[foo][oof][x-1].geometry.colorsNeedUpdate = true;
				cub3[foo][oof][x-1].geometry.faces[8].color.set(0x00FFFF)
				cub3[foo][oof][x-1].geometry.faces[9].color.set(0x00FFFF)
			
			}
			if (cube[1][foo][oof] == "o"){
				cub3[foo][oof][x-1].geometry.colorsNeedUpdate = true;
				cub3[foo][oof][x-1].geometry.faces[8].color.set(0xFFA500)
				cub3[foo][oof][x-1].geometry.faces[9].color.set(0xFFA500)
			
			}
			if (cube[1][foo][oof] == "g"){
				cub3[foo][oof][x-1].geometry.colorsNeedUpdate = true;
				cub3[foo][oof][x-1].geometry.faces[8].color.set(0x00FF00)
				cub3[foo][oof][x-1].geometry.faces[9].color.set(0x00FF00)
			
			}
			if (cube[1][foo][oof] == "y"){
				cub3[foo][oof][x-1].geometry.colorsNeedUpdate = true;
				cub3[foo][oof][x-1].geometry.faces[8].color.set(0xFFFF00)
				cub3[foo][oof][x-1].geometry.faces[9].color.set(0xFFFF00)
			
			}
		}
	}

//side2
	for(oof = 0; oof<x;oof++){
		v2=x-1
		for(foo= 0; foo<x;foo++){
			if (cube[2][foo][oof] == "w"){
				cub3[x-1][oof][v2].geometry.colorsNeedUpdate = true;
				cub3[x-1][oof][v2].geometry.faces[0].color.set(0xFFFFFF)
				cub3[x-1][oof][v2].geometry.faces[1].color.set(0xFFFFFF)
			
			}
			if (cube[2][foo][oof] == "r"){
				cub3[x-1][oof][v2].geometry.colorsNeedUpdate = true;
				cub3[x-1][oof][v2].geometry.faces[0].color.set(0xFF0000)
				cub3[x-1][oof][v2].geometry.faces[1].color.set(0xFF0000)
			
			}
			if (cube[2][foo][oof] == "b"){
				cub3[x-1][oof][v2].geometry.colorsNeedUpdate = true;
				cub3[x-1][oof][v2].geometry.faces[0].color.set(0x00FFFF)
				cub3[x-1][oof][v2].geometry.faces[1].color.set(0x00FFFF)
			
			}
			if (cube[2][foo][oof] == "o"){
				cub3[x-1][oof][v2].geometry.colorsNeedUpdate = true;
				cub3[x-1][oof][v2].geometry.faces[0].color.set(0xFFA500)
				cub3[x-1][oof][v2].geometry.faces[1].color.set(0xFFA500)
			
			}
			if (cube[2][foo][oof] == "g"){
				cub3[x-1][oof][v2].geometry.colorsNeedUpdate = true;
				cub3[x-1][oof][v2].geometry.faces[0].color.set(0x00FF00)
				cub3[x-1][oof][v2].geometry.faces[1].color.set(0x00FF00)
			
			}
			if (cube[2][foo][oof] == "y"){

				cub3[x-1][oof][v2].geometry.colorsNeedUpdate = true;
				cub3[x-1][oof][v2].geometry.faces[0].color.set(0xFFFF00)
				cub3[x-1][oof][v2].geometry.faces[1].color.set(0xFFFF00)
			
			}
		v2--
		}
	}

//side 3
	for(oof = 0; oof<x;oof++){
		v2=x-1
		for(foo= 0; foo<x;foo++){
			if (cube[3][foo][oof] == "w"){
				cub3[v2][oof][0].geometry.colorsNeedUpdate = true;
				cub3[v2][oof][0].geometry.faces[10].color.set(0xFFFFFF)
				cub3[v2][oof][0].geometry.faces[11].color.set(0xFFFFFF)
			
			}
			if (cube[3][foo][oof] == "r"){
				cub3[v2][oof][0].geometry.colorsNeedUpdate = true;
				cub3[v2][oof][0].geometry.faces[10].color.set(0xFF0000)
				cub3[v2][oof][0].geometry.faces[11].color.set(0xFF0000)
			
			}
			if (cube[3][foo][oof] == "b"){
				cub3[v2][oof][0].geometry.colorsNeedUpdate = true;
				cub3[v2][oof][0].geometry.faces[10].color.set(0x00FFFF)
				cub3[v2][oof][0].geometry.faces[11].color.set(0x00FFFF)
			
			}
			if (cube[3][foo][oof] == "o"){
				cub3[v2][oof][0].geometry.colorsNeedUpdate = true;
				cub3[v2][oof][0].geometry.faces[10].color.set(0xFFA500)
				cub3[v2][oof][0].geometry.faces[11].color.set(0xFFA500)
			
			}
			if (cube[3][foo][oof] == "g"){
				cub3[v2][oof][0].geometry.colorsNeedUpdate = true;
				cub3[v2][oof][0].geometry.faces[10].color.set(0x00FF00)
				cub3[v2][oof][0].geometry.faces[11].color.set(0x00FF00)
			
			}
			if (cube[3][foo][oof] == "y"){
				cub3[v2][oof][0].geometry.colorsNeedUpdate = true;
				cub3[v2][oof][0].geometry.faces[10].color.set(0xFFFF00)
				cub3[v2][oof][0].geometry.faces[11].color.set(0xFFFF00)
			
			}
			v2--
		}

	}
	//side 4
	for(oof = 0; oof<x;oof++){
		v2=x-1
		for(foo= 0; foo<x;foo++){
			if (cube[4][foo][oof] == "w"){
				cub3[0][oof][foo].geometry.colorsNeedUpdate = true;
				cub3[0][oof][foo].geometry.faces[2].color.set(0xFFFFFF)
				cub3[0][oof][foo].geometry.faces[3].color.set(0xFFFFFF)
			
			}
			if (cube[4][foo][oof] == "r"){
				cub3[0][oof][foo].geometry.colorsNeedUpdate = true;
				cub3[0][oof][foo].geometry.faces[2].color.set(0xFF0000)
				cub3[0][oof][foo].geometry.faces[3].color.set(0xFF0000)
			
			}
			if (cube[4][foo][oof] == "b"){
				cub3[0][oof][foo].geometry.colorsNeedUpdate = true;
				cub3[0][oof][foo].geometry.faces[2].color.set(0x00FFFF)
				cub3[0][oof][foo].geometry.faces[3].color.set(0x00FFFF)
			
			}
			if (cube[4][foo][oof] == "o"){
				cub3[0][oof][foo].geometry.colorsNeedUpdate = true;
				cub3[0][oof][foo].geometry.faces[2].color.set(0xFFA500)
				cub3[0][oof][foo].geometry.faces[3].color.set(0xFFA500)
			
			}
			if (cube[4][foo][oof] == "g"){
				cub3[0][oof][foo].geometry.colorsNeedUpdate = true;
				cub3[0][oof][foo].geometry.faces[2].color.set(0x00FF00)
				cub3[0][oof][foo].geometry.faces[3].color.set(0x00FF00)
			
			}
			if (cube[4][foo][oof] == "y"){
				cub3[0][oof][foo].geometry.colorsNeedUpdate = true;
				cub3[0][oof][foo].geometry.faces[2].color.set(0xFFFF00)
				cub3[0][oof][foo].geometry.faces[3].color.set(0xFFFF00)
			
			}
			v2--
		}

	}
//side 5
	for(oof = 0; oof<x;oof++){
		v2=x-1
		for(foo= 0; foo<x;foo++){
			if (cube[5][foo][oof] == "w"){
				cub3[oof][0][v2].geometry.colorsNeedUpdate = true;
				cub3[oof][0][v2].geometry.faces[6].color.set(0xFFFFFF)
				cub3[oof][0][v2].geometry.faces[7].color.set(0xFFFFFF)
			
			}
			if (cube[5][foo][oof] == "r"){
				cub3[oof][0][v2].geometry.colorsNeedUpdate = true;
				cub3[oof][0][v2].geometry.faces[6].color.set(0xFF0000)
				cub3[oof][0][v2].geometry.faces[7].color.set(0xFF0000)
			
			}
			if (cube[5][foo][oof] == "b"){
				cub3[oof][0][v2].geometry.colorsNeedUpdate = true;
				cub3[oof][0][v2].geometry.faces[6].color.set(0x00FFFF)
				cub3[oof][0][v2].geometry.faces[7].color.set(0x00FFFF)
			
			}
			if (cube[5][foo][oof] == "o"){
				cub3[oof][0][v2].geometry.colorsNeedUpdate = true;
				cub3[oof][0][v2].geometry.faces[6].color.set(0xFFA500)
				cub3[oof][0][v2].geometry.faces[7].color.set(0xFFA500)
			
			}
			if (cube[5][foo][oof] == "g"){
				cub3[oof][0][v2].geometry.colorsNeedUpdate = true;
				cub3[oof][0][v2].geometry.faces[6].color.set(0x00FF00)
				cub3[oof][0][v2].geometry.faces[7].color.set(0x00FF00)
			
			}
			if (cube[5][foo][oof] == "y"){
				cub3[oof][0][v2].geometry.colorsNeedUpdate = true;
				cub3[oof][0][v2].geometry.faces[6].color.set(0xFFFF00)
				cub3[oof][0][v2].geometry.faces[7].color.set(0xFFFF00)
			
			}
			v2--
		}

	}

	}




//keybinds:
//0-6
//qwerty0123456
document.onkeydown = function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
    if(key===48||key===54){
        cube = turn0(cube)
    }
    if(key===49){
        cube = turn1(cube)
    }

    if(key===50){
        cube = turn2(cube)
    }
    if(key===51){
        cube = turn3(cube)
    }
    if(key===52){
        cube = turn4(cube)
    }
    if(key===53){
        cube = turn5(cube)
    }
    if(key===81){
        cube = turn1(cube)
        cube = turn1(cube)
        cube = turn1(cube)
    }
    if(key===87){
        cube = turn2(cube)
        cube = turn2(cube)
        cube = turn2(cube)
    }
    if(key===69){
        cube = turn3(cube)
        cube = turn3(cube)
        cube = turn3(cube)
    }
    if(key===82){
        cube = turn4(cube)
        cube = turn4(cube)
        cube = turn4(cube)
    }
    if(key===84){
        cube = turn5(cube)
        cube = turn5(cube)
        cube = turn5(cube)
    }
	if(key===89){
        cube = turn0(cube)
        cube = turn0(cube)
        cube = turn0(cube)
    }
}


async function shuffle(var1){
	console.log('shuffle')
	for(randomMoveCounter = 0; randomMoveCounter<shuffleCount;randomMoveCounter++){
		possible = 6+x-2+x-2
		if(x==3){
			possible= 6
		}
		let randomMove = getRandomInt(possible)
		if(randomMove == 0){
			cube = turn0(cube)
		}
		if(randomMove == 1){
			cube = turn1(cube)
		}
		if(randomMove == 2){
			cube = turn2(cube)
		}		
		if(randomMove == 3){
			cube = turn3(cube)
		}		
		if(randomMove == 4){
			cube = turn4(cube)
		}		
		if(randomMove == 5){
			cube = turn5(cube)
		}
		if(x != 3){
			if(randomMove>6){
				randomMove = getRandomInt(2)+1
				if(randomMove==1){
					randomMove = getRandomInt(x-3)+1
					cube = turnX(cube, randomMove)
				}
				if(randomMove==2){
					randomMove = getRandomInt(x-3)+1
					cube = turnY(cube, randomMove)

				}

			}
		}
		//if(randomMove-6/2)
		if(!loop && var1 =='b'){
			break
		}
		await sleep(shuffleDelay);
	}
	}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
//test

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

