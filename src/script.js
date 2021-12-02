import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const doorMetallicTexture = textureLoader.load("/textures/door/metalness.jpg");

const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassAmbientOcclusionTexture.repeat.set(8, 8);
grassColorTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;

grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT=THREE.RepeatWrapping

grassNormalTexture.wrapT=THREE.RepeatWrapping
grassRoughnessTexture.wrapT=THREE.RepeatWrapping

grassAmbientOcclusionTexture.wrapT=THREE.RepeatWrapping

/**
 * House
 */

const house = new THREE.Group();
scene.add(house);


const ghostt=new THREE.PointLight("#ff00ff",2,3);
scene.add(ghostt)
const ghost2=new THREE.PointLight("#00ffff",2,3);
scene.add(ghost2)

const ghost3=new THREE.PointLight("#ffff00",2,3);
scene.add(ghost3)
//walls
const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughness: bricksRoughnessTexture,
  })
);
walls.position.y = 2.5 / 2;
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);

house.add(walls);

//roof
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 2, 4),
  new THREE.MeshStandardMaterial({ color: "pink" })
);
roof.position.y = 2.5 + 1;
roof.rotation.y = Math.PI / 4;

house.add(roof);

//door

const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    aoMapIntensity: 0.5,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetallicTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    roughness: 0.5,
    metalness: 0.5,
    normalMap: doorNormalTexture,
    normalScale: { x: 1, y: 1 },
  })
);
// door.geometry.setAttribute("uv2",new THREE.Float32BufferAttribute(door.geometry.attributes.uv))
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

//bush
const bushGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "green" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.2, 0.2, 0.2);
bush2.position.set(1.4, 0.1, 2.2);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.2, 0.2, 0.2);
bush3.position.set(-1.4, 0.1, 2.2);

house.add(bush1, bush2, bush3);

//grave

const graves = new THREE.Group();

scene.add(graves);
const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

// graves.add(new THREE.Mesh(graveGeometry,graveMaterial))

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
grave.castShadow=true
  grave.position.set(x, 0.4, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.1;
  graves.add(grave);
}

//fog
const fog = new THREE.Fog("#262837", 2, 15);
scene.fog = fog;

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    side: THREE.DoubleSide,
    aoMap: grassAmbientOcclusionTexture,
    aoMapIntensity: 0.5,
    roughnessMap: grassRoughnessTexture,
    normalMap: grassNormalTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 0.5);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);
//point
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
scene.add(doorLight);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");
renderer.shadowMap.enabled = true;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;

floor.receiveShadow = true;


/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  ///ghost ani
  const ghostangle=elapsedTime*0.5
  ghostt.position.x=Math.sin(ghostangle)*4
  ghostt.position.z=Math.cos(ghostangle)*4
  ghostt.position.y=Math.sin(ghostangle)*3

  const ghost2angle=-elapsedTime*0.35
  ghost2.position.x=Math.sin(ghost2angle)*4
  ghost2.position.z=Math.cos(ghost2angle)*4
  ghost2.position.y=Math.sin(ghost2angle)*3

  const ghostangle3=elapsedTime*0.15
  ghost3.position.x=Math.sin(ghostangle3)*4
  ghost3.position.z=Math.cos(ghostangle3)*4
  ghost3.position.y=Math.sin(ghostangle3)*3
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
