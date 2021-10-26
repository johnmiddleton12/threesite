import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import Saturn from '../assets/saturn.jpg';
import SaturnNormal from '../assets/saturnNormal.jpg';
import Earth from '../assets/earth.jpg';
import EarthNormal from '../assets/earthNormal.jpg';

import Landscape from '../assets/landscape.jpg';
import Pyramid from '../assets/pyramid.jpg';

import AnamorphicText from '../assets/anamorphicText2.obj';
import AnamorphicTextMtl from '../assets/anamorphicText2.mtl';


const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);

camera.zoom = 79;
camera.position.x = 3.583
camera.position.y = -0.2
camera.position.z = 29

camera.rotation.x = 0
camera.rotation.y = 0.146
camera.rotation.z = 0

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 1, 16, 100);
// const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true});
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);

// scene.add(pointLight, ambientLight);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = controls.maxPolarAngle / 2;
controls.maxPolarAngle = controls.minPolarAngle;
controls.minAzimuthAngle = 0.146;
controls.maxAzimuthAngle = Math.PI / 2 + 0.146;
controls.enablePan = false;
controls.maxZoom = 100;
controls.minZoom = 60;

controls.reset();

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0XFFFFFF });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const winterTexture = new THREE.TextureLoader().load(Landscape);
scene.background = winterTexture;

const pyramidTexture = new THREE.TextureLoader().load(Pyramid);

const pyramid = new THREE.Mesh(
  new THREE.ConeBufferGeometry(5, 9, 4, 2),
  new THREE.MeshBasicMaterial({ map: pyramidTexture })
);

// scene.add(pyramid);

// Saturn
const saturnTexture = new THREE.TextureLoader().load(Saturn);
const normalSaturn = new THREE.TextureLoader().load(SaturnNormal);

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
    normalMap: normalSaturn
  })
);

const earthTexture = new THREE.TextureLoader().load(Earth);
const normalEarth = new THREE.TextureLoader().load(EarthNormal);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalEarth
  })
);

scene.add(saturn, earth);

saturn.position.setZ(-25);
saturn.position.setY(0);
saturn.position.setX(10);

earth.position.setZ(28);
earth.position.setY(-23);
earth.position.setX(8);

torus.position.setZ(-25);
torus.position.setX(10);

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  // console.log(t);
  saturn.rotation.x += 0.05;
  saturn.rotation.y += 0.075;
  saturn.rotation.z += 0.05;


  earth.rotation.x += 0.03;
  earth.rotation.y += 0.05;
  earth.rotation.z += 0.07;

  camera.position.z = t * -0.0159;
  camera.position.x = t * -0.0002;
  camera.position.y = t * 0.01;


};

// document.body.onscroll = moveCamera;
// moveCamera();

let obj;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01

  // obj.rotation.x += 0.01;

  earth.rotation.x += 0.02;

  saturn.rotation.x += 0.0001;
  saturn.rotation.y += 0.0003;
  saturn.rotation.z += 0.0002;

  controls.update();

  renderer.render(scene, camera);
}


const mtlLoader = new MTLLoader();

function onLoad(object) {
  scene.add(object);
  obj = object;
  obj.scale.x = .05;
  obj.scale.y = .05;
  obj.scale.z = .05;

  obj.rotation.x = 0;
  obj.rotation.y -= 40;
  obj.rotation.z = 0;


  animate();
}

mtlLoader.load(AnamorphicTextMtl, function (materials) {
  materials.preload();
  new OBJLoader().setMaterials(materials).load(AnamorphicText, onLoad,
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.log("an error happened");
    }
  );
})
