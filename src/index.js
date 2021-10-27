import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

import {
    CSS3DRenderer,
    CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer";

import Saturn from "../assets/saturn.jpg";
import SaturnNormal from "../assets/saturnNormal.jpg";
import Earth from "../assets/earth.jpg";
import EarthNormal from "../assets/earthNormal.jpg";

import Landscape from "../assets/landscape.jpg";
import Pyramid from "../assets/pyramid.jpg";
import Space from "../assets/space.jpg";

import AnamorphicText from "../assets/anamorphicText2.obj";
import AnamorphicTextMtl from "../assets/anamorphicText2.mtl";

// TODO: Implement window resize function from Three JS example
// TODO: Clean code
// TODO: Round edges of box
// TODO: QR Code on side of box
// TODO: Prettify

// TODO: Fix galaxy stuff

const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    1,
    1000
);

camera.zoom = 4;
// camera.position.setY(-199);
// camera.position.x = 3.583;
// camera.position.y = 100;
// camera.position.z = 29;
// camera.rotation.x = 0;
// camera.rotation.y = 0;
// camera.rotation.z = 0;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(200);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 1, 16, 100);
// const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true});
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

// scene.add(pointLight);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

function addStar() {
    const geometry = new THREE.SphereGeometry(4, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(2000));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(500).fill().forEach(addStar);

const winterTexture = new THREE.TextureLoader().load(Space);
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
        normalMap: normalSaturn,
    })
);

const earthTexture = new THREE.TextureLoader().load(Earth);
const normalEarth = new THREE.TextureLoader().load(EarthNormal);

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 32),
    new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: normalEarth,
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
}

// document.body.onscroll = moveCamera;
// moveCamera();

let obj;

const renderer2 = new CSS3DRenderer();
renderer2.setSize(window.innerWidth, window.innerHeight);
renderer2.domElement.style.position = "absolute";
renderer2.domElement.style.top = 0;
document.body.appendChild(renderer2.domElement);
const scene2 = new THREE.Scene();

const controls = new OrbitControls(camera, renderer2.domElement);
controls.minPolarAngle = controls.maxPolarAngle / 2;
controls.maxPolarAngle = controls.minPolarAngle;
controls.minAzimuthAngle = 0;
controls.maxAzimuthAngle = Math.PI / 2;
controls.enablePan = false;
controls.maxZoom = 4.5;
controls.minZoom = 3;
controls.reset();

function animate() {
    requestAnimationFrame(animate);

    // console.log(camera.rotation);

    if (camera.zoom < 0.000000001)
    {
      console.log("Wow!");
    }

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    // obj.rotation.x += 0.01;

    earth.rotation.x += 0.02;

    saturn.rotation.x += 0.0001;
    saturn.rotation.y += 0.0003;
    saturn.rotation.z += 0.0002;

    controls.update();

    renderer.render(scene, camera);
    renderer2.render(scene2, camera);
}

let formHTML = `
<form action="https://gmail.us5.list-manage.com/subscribe/post?u=8b8fb485ceda61427cdb2dcc3&amp;id=95daa11532" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
	<h2>Subscribe</h2>
<div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
<div class="mc-field-group">
	<label for="mce-EMAIL">Email Address  <span class="asterisk" style="color: red">*</span>
</label>
	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" autocomplete="off">
</div>
	<div id="mce-responses" class="clear">
		<div class="response" id="mce-error-response" style="display:none"></div>
		<div class="response" id="mce-success-response" style="display:none"></div>
	</div>  
    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
</form>
<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
`;

createBox(
    310,
    70,
    "chocolate",
    new THREE.Vector3(0, -90, 0),
    // new THREE.Euler( 180 * THREE.MathUtils.DEG2RAD,  180 * THREE.MathUtils.DEG2RAD, 180 * THREE.MathUtils.DEG2RAD )
    new THREE.Euler(0, 0, 0)
);

var checkExist = setInterval(function () {
    if (document.getElementById("mc-embedded-subscribe") != null) {
        document
            .getElementById("mc-embedded-subscribe")
            .addEventListener("mouseover", function () {
                controls.enabled = false;
            });
        document
            .getElementById("mc-embedded-subscribe")
            .addEventListener("mouseout", function () {
                controls.enabled = true;
            });
        clearInterval(checkExist);
    }
}, 100); // check every 100ms

function createBox(width, height, cssColor, pos, rot) {
    const element = document.createElement("div");
    element.className = "element";
    element.style.width = width + "px";
    element.style.height = height + "px";
    element.style.opacity = 0.75;
    element.style.background = cssColor;

    element.style.justifyContent = "center";

    const text = document.createElement("div");
    text.id = "mc_embed_signup";
    text.innerHTML = formHTML;

    element.appendChild(text);

    const object = new CSS3DObject(element);
    object.position.copy(pos);
    object.position.z += height / 2;
    object.rotation.copy(rot);
    scene2.add(object);

    const geometry = new THREE.BoxGeometry(width, height, height);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(object.position);
    mesh.position.z -= height / 2;
    mesh.position.x += 0.5;
    mesh.rotation.copy(object.rotation);
    scene.add(mesh);
}

/// END

const mtlLoader = new MTLLoader();

function onLoad(object) {
    scene.add(object);
    obj = object;
    obj.position.y += 0.5;
    obj.scale.x = 1;
    obj.scale.y = 1;
    obj.scale.z = 1;

    obj.rotation.x = 0;
    obj.rotation.y -= 40.1;
    obj.rotation.z = 0;


    animate();
}

mtlLoader.load(AnamorphicTextMtl, function (materials) {
    materials.preload();
    new OBJLoader().setMaterials(materials).load(
        AnamorphicText,
        onLoad,
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function (error) {
            console.log("an error happened");
        }
    );
});
