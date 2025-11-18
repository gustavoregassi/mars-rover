import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


let scene, camera, renderer;
let terrain, rover, marsBase;
let directionalLight, hemisphereLight;
let mixer;
let clock = new THREE.Clock();

// Movimento
let roverVelocity = 0.05;
let normalVelocity = 0.05;
let turboVelocity = 0.15;
let turbo = false;

let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

// Câmera
let cameraOffset = new THREE.Vector3(0, 5, -10);
let currentCameraPosition = new THREE.Vector3();
let currentLookAt = new THREE.Vector3();

// Poeira
let dustParticles = [];
let dustGroup;
let dustClock = new THREE.Clock();
let gerarPoeira = false;


function criarPoeira() {
    dustGroup = new THREE.Group();
    scene.add(dustGroup);

    const dustGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const dustMaterial = new THREE.MeshStandardMaterial({
        color: 0x9c6d46,
        transparent: true,
        opacity: 0.8
    });

 
    for (let i = 0; i < 30; i++) {
        const p = new THREE.Mesh(dustGeometry, dustMaterial.clone());
        p.visible = false;
        dustGroup.add(p);
        dustParticles.push({
            mesh: p,
            life: 0
        });
    }
}



function updatePoeira() {
    if (!rover || !dustGroup) return;

    const delta = dustClock.getDelta();

    if (gerarPoeira) {
        const particle = dustParticles.find(p => p.life <= 0);
        if (particle) {
            particle.mesh.visible = true;
            particle.life = 1.0;

            const behind = new THREE.Vector3(0, 0.5, 1);
            behind.applyQuaternion(rover.quaternion);

            particle.mesh.position.copy(rover.position.clone().add(behind));
        }
    }

    dustParticles.forEach(p => {
        if (p.life > 0) {
            p.life -= delta * 1.5;

            p.mesh.position.y += delta * 0.5;
            p.mesh.scale.addScalar(delta * 1.5);
            p.mesh.material.opacity = p.life;

            if (p.life <= 0) {
                p.mesh.visible = false;
                p.mesh.scale.set(1, 1, 1);
            }
        }
    });
}


function init() {
    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 10, -15);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    document.body.appendChild(renderer.domElement);

    setupLighting();
    loadModels();
    criarCéu();

    criarPoeira();  

    setupKeyboardControls();

    window.addEventListener('resize', onWindowResize, false);

    animate();
}



//  ILUMINAÇÃO
function setupLighting() {
    hemisphereLight = new THREE.HemisphereLight(0xffc87f, 0x5c4033, 0.6);
    scene.add(hemisphereLight);

    directionalLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    directionalLight.position.set(50, 100, 30);
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;

    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);
}



// CÉU 
function criarCéu() {
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
        color: 0xc9692e,
        side: THREE.BackSide
    });

    const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
    camera.add(skyMesh);
}


function loadModels() {
    const loader = new GLTFLoader();

    loader.load(
        './modelos/nasa_curiosity_clean.glb',
        (gltf) => {
            rover = gltf.scene;
            rover.position.set(0, 0.8, 0);

            rover.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(rover);

            if (gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(rover);
                const action = mixer.clipAction(gltf.animations[0]);
                action.time = 5.25;
                action.paused = true;
                action.play();
            }
        }
    );

    loader.load(
        './modelos/mars_base.glb',
        (gltf) => {
            marsBase = gltf.scene;
            marsBase.position.set(30, 0, 0);
            marsBase.scale.set(2, 2, 2);

            marsBase.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(marsBase);
        }
    );

    createExtraObjects();
}


function createExtraObjects() {
    const rockGeometry = new THREE.DodecahedronGeometry(1);
    const rockMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b4513,
        roughness: 0.9
    });

    for (let i = 0; i < 10; i++) {
        const rock = new THREE.Mesh(rockGeometry, rockMaterial);
        rock.position.set(Math.random() * 80 - 40, 0.5, Math.random() * 80 - 40);
        rock.scale.set(
            Math.random() * 2 + 0.5,
            Math.random() * 2 + 0.5,
            Math.random() * 2 + 0.5
        );
        rock.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        rock.castShadow = true;
        rock.receiveShadow = true;
        scene.add(rock);
    }
}



//  TECLADO 
function setupKeyboardControls() {
    document.addEventListener('keydown', (event) => {
        switch (event.key.toLowerCase()) {

            case 'w':
            case 'arrowup':
                moveForward = true;
                break;

            case 's':
            case 'arrowdown':
                moveBackward = true;
                break;

            case 'a':
            case 'arrowleft':
                moveLeft = true;
                break;

            case 'd':
            case 'arrowright':
                moveRight = true;
                break;

            // TURBO
            case 'shift':
                turbo = true;
                roverVelocity = turboVelocity;
                gerarPoeira = true;
                break;
        }
    });

    document.addEventListener('keyup', (event) => {
        switch (event.key.toLowerCase()) {

            case 'w':
            case 'arrowup':
                moveForward = false;
                break;

            case 's':
            case 'arrowdown':
                moveBackward = false;
                break;

            case 'a':
            case 'arrowleft':
                moveLeft = false;
                break;

            case 'd':
            case 'arrowright':
                moveRight = false;
                break;

            
            case 'shift':
                turbo = false;
                roverVelocity = normalVelocity;
                gerarPoeira = false;
                break;
        }
    });
}



//  MOVIMENTO 
function updateRoverPosition() {
    if (!rover) return;

    const direction = new THREE.Vector3();

    if (moveForward) direction.z += 1;
    if (moveBackward) direction.z -= 1;

    if (moveLeft) rover.rotation.y += 0.03;
    if (moveRight) rover.rotation.y -= 0.03;

    if (direction.length() > 0) {
        direction.normalize();
        direction.applyQuaternion(rover.quaternion);
        rover.position.add(direction.multiplyScalar(roverVelocity));
    }

    rover.position.x = Math.max(-90, Math.min(90, rover.position.x));
    rover.position.z = Math.max(-90, Math.min(90, rover.position.z));
}



//  CÂMERA 
function updateThirdPersonCamera() {
    if (!rover) return;

    const idealOffset = cameraOffset.clone();
    idealOffset.applyQuaternion(rover.quaternion);
    const idealPosition = rover.position.clone().add(idealOffset);

    const lookAtOffset = new THREE.Vector3(0, 2, 5);
    lookAtOffset.applyQuaternion(rover.quaternion);
    const idealLookAt = rover.position.clone().add(lookAtOffset);

    const lerpFactor = 0.05;
    currentCameraPosition.lerp(idealPosition, lerpFactor);
    currentLookAt.lerp(idealLookAt, lerpFactor);

    camera.position.copy(currentCameraPosition);
    camera.lookAt(currentLookAt);
}



//  LOOP 
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    updateRoverPosition();
    updateThirdPersonCamera();
    updatePoeira();

    renderer.render(scene, camera);
}




function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


init();
