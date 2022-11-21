import { World, Material} from 'cannon-es';
import { SphereGeometry } from 'three';
import { MeshPhongMaterial } from 'three';
import { Scene, BoxGeometry } from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export const cm1 = {
  scene: new Scene(),
  gltfLoader: new GLTFLoader(),
  mixer: undefined,

  //cannon
  world: new World(),
  defaultMaterial: new Material('default'),
  glassMaterial: new Material('glass'),
  playerMaterial: new Material('player')
};
// 3D 모델링 모듈 색상
export const cm2 = {
  backgroundColor: '#b8dff8',
  lightColor: '#999999',
  floorColor: '#111',
  pillarColor: '#071d28',
  barColor: '#441c1d',
  wallColor: 'white',
  scuttleColor: 'white'
};
// 모델링 크기
export const geo = {
  floor: new BoxGeometry(25, 1, 25),
  pillar: new BoxGeometry(5, 10, 5),
  bar: new BoxGeometry(0.1, 0.3, 1.2 * 21),
  sideLight: new SphereGeometry(0.1, 6, 6),
  glass: new BoxGeometry(1.2, 0.05, 1.2),
  wall: new BoxGeometry(0.1, 2.5, 25),
  scuttle: new BoxGeometry(25, 1, 25),
};

const textureLoader = new THREE.TextureLoader();
// const textureImage = textureLoader.load('./texture/Wall_Stone_020_basecolor.jpg');
const textureImage = textureLoader.load( // 벽
  './texture/Wall_Stone_020_ambientOcclusion.jpg',
  );
const textureImage2 = textureLoader.load( // 바닥
  './texture/Marble 5_BaseColor.jpg',
);
const scuttletexture = textureLoader.load( // 천장
  './texture/Ceiling_Drop_Tiles_001_ambientOcclusion.jpg',
);

export const mat = {
  floor: new MeshPhongMaterial({map: textureImage2}),
  pillar: new MeshPhongMaterial({color: cm2.pillarColor}),
  bar: new MeshPhongMaterial({color: cm2.barColor}),
  sideLight: new MeshPhongMaterial({color: cm2.lightColor}),
  glass1: new MeshPhongMaterial({color: cm2.glassColor, transparent: true, opacity: 0.1}),
  glass2: new MeshPhongMaterial({color: cm2.glassColor, transparent: true, opacity: 0.3}),
  wall: new MeshPhongMaterial({ color: cm2.wallColor}),
  scuttle: new MeshPhongMaterial({map: scuttletexture})
};