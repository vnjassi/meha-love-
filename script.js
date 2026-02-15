const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// light
const light = new THREE.PointLight(0xffffff,1);
light.position.set(10,10,10);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

// teddy color
const material = new THREE.MeshPhongMaterial({color:0xc68642});

// head
const head = new THREE.Mesh(new THREE.SphereGeometry(1.2,32,32), material);
head.position.y = 1.5;
scene.add(head);

// ears
const ear1 = new THREE.Mesh(new THREE.SphereGeometry(0.4,32,32), material);
ear1.position.set(-0.8,2.5,0);
scene.add(ear1);

const ear2 = ear1.clone();
ear2.position.x = 0.8;
scene.add(ear2);

// body
const body = new THREE.Mesh(new THREE.SphereGeometry(1.5,32,32), material);
body.position.y = -0.5;
scene.add(body);

// eyes
const eyeMat = new THREE.MeshBasicMaterial({color:0x000000});
const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.1,16,16), eyeMat);
eye1.position.set(-0.4,1.6,1);
scene.add(eye1);

const eye2 = eye1.clone();
eye2.position.x = 0.4;
scene.add(eye2);

// heart for love
const heartGeo = new THREE.TorusGeometry(0.3,0.12,16,100);
const heartMat = new THREE.MeshBasicMaterial({color:0xff1493});
const heart = new THREE.Mesh(heartGeo, heartMat);
heart.position.set(0,-0.5,1.5);
scene.add(heart);

// floating particles
const particlesGeometry = new THREE.BufferGeometry();
const count = 400;
const pos = new Float32Array(count*3);

for(let i=0;i<count*3;i++){
  pos[i]=(Math.random()-0.5)*20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(pos,3));
const particlesMaterial = new THREE.PointsMaterial({size:0.05,color:0xffffff});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// animation
function animate(){
  requestAnimationFrame(animate);

  head.rotation.y += 0.01;
  body.rotation.y += 0.01;
  heart.rotation.x += 0.05;

  particles.rotation.y += 0.0008;

  renderer.render(scene,camera);
}
animate();

// resize
window.addEventListener('resize', ()=>{
 renderer.setSize(window.innerWidth,window.innerHeight);
 camera.aspect = window.innerWidth/window.innerHeight;
 camera.updateProjectionMatrix();
});

// love button
function love(){
 document.getElementById("msg").innerHTML =
 "Neha 💖 I love you forever 🧸✨";
}
