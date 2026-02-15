const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// lights
const light = new THREE.PointLight(0xffffff,1);
light.position.set(10,10,10);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// teddy material
const mat = new THREE.MeshPhongMaterial({color:0xc68642});

// body
const body = new THREE.Mesh(new THREE.SphereGeometry(1.5,32,32), mat);
scene.add(body);

// head
const head = new THREE.Mesh(new THREE.SphereGeometry(1.2,32,32), mat);
head.position.y = 2;
scene.add(head);

// ears
const ear1 = new THREE.Mesh(new THREE.SphereGeometry(0.4,32,32), mat);
ear1.position.set(-0.8,3,0);
scene.add(ear1);

const ear2 = ear1.clone();
ear2.position.x = 0.8;
scene.add(ear2);

// arms
const arm1 = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), mat);
arm1.position.set(-2,0.5,0);
scene.add(arm1);

const arm2 = arm1.clone();
arm2.position.x = 2;
scene.add(arm2);

// eyes
const eyeMat = new THREE.MeshBasicMaterial({color:0x000000});
const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.1,16,16), eyeMat);
eye1.position.set(-0.4,2,1);
scene.add(eye1);

const eye2 = eye1.clone();
eye2.position.x = 0.4;
scene.add(eye2);

// floating hearts
const hearts = [];
for(let i=0;i<30;i++){
  const geo = new THREE.TorusGeometry(0.2,0.07,16,100);
  const matH = new THREE.MeshBasicMaterial({color:0xff1493});
  const h = new THREE.Mesh(geo,matH);
  h.position.set((Math.random()-0.5)*10, Math.random()*6-3, (Math.random()-0.5)*5);
  scene.add(h);
  hearts.push(h);
}

// dance animation
let t = 0;
function animate(){
 requestAnimationFrame(animate);
 t += 0.05;

 // dancing
 body.position.x = Math.sin(t)*0.5;
 head.position.x = Math.sin(t)*0.5;
 arm1.rotation.z = Math.sin(t)*1.5;
 arm2.rotation.z = -Math.sin(t)*1.5;
 body.rotation.y += 0.05;

 // hearts float
 hearts.forEach(h=>{
   h.rotation.x += 0.05;
   h.position.y += 0.01;
   if(h.position.y>5) h.position.y=-5;
 });

 renderer.render(scene,camera);
}
animate();

// resize
window.addEventListener('resize', ()=>{
 renderer.setSize(window.innerWidth,window.innerHeight);
 camera.aspect = window.innerWidth/window.innerHeight;
 camera.updateProjectionMatrix();
});

// love letter popup
function openLetter(){
 document.getElementById("letter").classList.add("show");
}
