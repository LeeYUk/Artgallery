import { cm1,cm2 } from './common';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

import { KeyController } from './KeyController';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { AlwaysStencilFunc } from 'three';

var music_cnt = 0; // 최초 클릭시 한번만 실행되게 하기위함
// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true
});
//화면 사이즈 맞추기
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
// Scene
cm1.scene.background = new THREE.Color(cm2.backgroundColor);
// Camera
  const camera = new THREE.PerspectiveCamera(
		100,//카메라 위치
		window.innerWidth / window.innerHeight,
		0.1,
		100
 );
 camera.position.x = 5;
 camera.position.y = 1.5;
 camera.position.z = -2;
cm1.scene.add(camera);
// Light
const ambientLight = new THREE.AmbientLight(cm2.lightColor, 0.8); // 빛 생성 / 위치 조정
cm1.scene.add(ambientLight);
const spotLightDistance = 50;
const spotLight1 = new THREE.SpotLight(cm2.lightColor, 1); // 빛 생성 / 위치 조정
spotLight1.castShadow = true;
spotLight1.shadow.mapSize.width = 2048;
spotLight1.shadow.mapSize.height = 2048;
spotLight1.position.set(-spotLightDistance, spotLightDistance, spotLightDistance);
cm1.scene.add(spotLight1);
//////////
var start_cnt = 0; // esc하고 시작할 때 바로 서브사이트 들어가지는거 방지
/////////
// Controls
const controls = new PointerLockControls(camera, renderer.domElement);
controls.domElement.addEventListener('click', () => { //클릭 했을 때 화면을 고정
	controls.lock();
});
controls.addEventListener('lock', () => {
	if(music_cnt == 0){ //노래중단하고 화면 클릭했을 때 노래 다시나오는거 방지
		document.getElementById('myAudio').play();
	}
	music_cnt = 1;
	start_cnt = 1;
	console.log('lock!');
});
controls.addEventListener('unlock', () => {
	start_cnt = 0;
	console.log('unlock!');
});

//키보드 컨트롤
const keyController = new KeyController();

function walk() {
	if (keyController.keys['KeyW'] || keyController.keys['ArrowUp']) {
		 controls.moveForward(0.025);
		 if(camera.position.x > 11){
			controls.moveForward(-0.05);
		 }
		 if(camera.position.x < 0.8){
			controls.moveForward(-0.05);
		 }
		 if(camera.position.z > -0.3){
			controls.moveForward(-0.05);
		 }
		 if(camera.position.z < - 15){
			controls.moveForward(-0.05);
		 }
	}
	if (keyController.keys['KeyS'] || keyController.keys['ArrowDown']) {
		 controls.moveForward(-0.025);
	}
	if (keyController.keys['KeyA'] || keyController.keys['ArrowLeft']) {
		 controls.moveRight(-0.025);
	}
		if (keyController.keys['KeyD'] || keyController.keys['ArrowRight']) {
		 controls.moveRight(0.025);
	}
}

///////////모델링////////////
const loader = new GLTFLoader();
///////
loader.load('/models/Art Gallery5.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(0, 1.5, 0);
	mesh.name = `house1`;
});


loader.load('/models/ani.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(12.1, 1.4, -5.5);
	mesh.name = `ani`;
	mesh.rotation.y = -1.48;
	mesh.rotation.z = 0;
	console.log(mesh.name);
});

loader.load('/models/mp3.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(12.1, 1.4, -2.5);
	mesh.name = `fireplace`;
	mesh.rotation.y = -1.48;
	mesh.rotation.z = 0;
});

loader.load('/models/par.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(12.1, 1.4, -9.5);
	mesh.name = `fireplace`;
	mesh.rotation.y = -1.48;
	mesh.rotation.z = 0;
});


loader.load('/models/photoframe4.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(-0.172, 1.3, -6);
	mesh.name = `fireplace`;
	mesh.rotation.y = 1.68;
	mesh.rotation.z = 0;
});
loader.load('/models/ent.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(-0.172, 1.3, -9);
	mesh.name = `par`;
	mesh.rotation.y = 1.68;
	mesh.rotation.z = 0;
});

loader.load('/models/airplane.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(-0.172, 1.3, -12);
	mesh.name = `fireplace`;
	mesh.rotation.y = 1.68;
	mesh.rotation.z = 0;
});

loader.load('/models/hera.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(9, 3.3, -2);
	mesh.name = `fireplace`;
	mesh.rotation.y = -0.5
});

loader.load('/models/zzz1.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(1, 0.3, -1);
	mesh.name = `fireplace`;
	mesh.rotation.y = 0;
	mesh.rotation.z = 0;
});

loader.load('/models/Moai1.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(10, 0, -8.2);
	mesh.name = `fireplace`;
	mesh.rotation.y = -1.68;
	mesh.rotation.z = 0;
});
loader.load('/models/drag3.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(5, 0, -14.5);
	mesh.name = `fireplace`;
	mesh.rotation.y = 0;
	mesh.rotation.z = 0;
});

loader.load('/models/table.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(1, 0.9, -2.6);
	mesh.name = `fireplace`;
	mesh.rotation.y = 0;
	mesh.rotation.z = -1.2;
});

loader.load('/models/abc.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(2, 0, -4);
	mesh.name = `fireplace`;
	mesh.rotation.y = 0;
	mesh.rotation.z = 0;
});


loader.load('/models/fireplace.glb', function(glb){
	cm1.scene.add(glb.scene);
	const mesh = glb.scene.children[0];
	mesh.castShadow = true;
	mesh.position.set(1.8, 1.3, -15.5);
	mesh.name = `fireplace`;
});
///////////////////////////////// 


// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// 클릭했을 때 사이트 연결
function checkIntersects(){
		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObjects(cm1.scene.children);
		
		if(start_cnt == 1){ //
			for(const item of intersects){
				console.log(item.object.name);
				if(item.object.name == 'ani'){
					window.open('https://ldh0809.github.io/Sub_Anime/');
				}
				else if(item.object.name == 'air'){
					window.open('https://ldh0809.github.io/Sub_air/');
				}
				else if(item.object.name == 'mp3'){
					window.open('https://ldh0809.github.io/Sub_Music/');
				}
				else if(item.object.name == '큐브'){
					window.open('https://ldh0809.github.io/Sub_Swiper/');
				}
				else if(item.object.name == 'ent'){
					window.open('https://ldh0809.github.io/Sub_Ent/');
				}
				else if(item.object.name == 'par'){
					window.open('https://ldh0809.github.io/Sub_Pira/');
				}
				break;
			}
		}
}

// 그리기
const clock = new THREE.Clock();
function draw() {
	const delta = clock.getDelta();
	if(cm1.mixer) cm1.mixer.update(delta);
	walk();
	renderer.render(cm1.scene, camera);
	renderer.setAnimationLoop(draw);
}

function setSize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(cm1.scene, camera);
}

// 이벤트
window.addEventListener('resize', setSize);
//클릭 이벤트 화면 좌표 중앙 0,0
canvas.addEventListener('click', e=>{
	// mouse.x = e.clientX / canvas.clientWidth * 2 -1;
	// mouse.y = -(e.clientX / canvas.clientWidth * 2 -1);
	mouse.x = 0
	mouse.y = 0
	
	checkIntersects();
});
draw();
