<template>
  <div ref="container" class="three-container"></div>
  <div class="controls">
    <button @click="zoomOut">Zoom Out</button>
    <button @click="zoomIn">Zoom In</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const container = ref(null);

let scene, camera, renderer, controls, animationId;

onMounted(() => {
  // ----- Cena -----
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff); // fundo branco

  // ----- Câmera -----
  camera = new THREE.PerspectiveCamera(
    60,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(1, 1, 2);

  // ----- Renderizador -----
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  // ----- Luz -----
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // ----- OrbitControls -----
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;

  // ----- Carregar FBX -----
  const loader = new FBXLoader();
  loader.load('/models/teste 4.fbx', (fbx) => {
    let i = 0;
    scene.add(fbx);

    fbx.traverse((obj) => {
      console.log(i);

      if (i === 30) {
        return;
      }

      const alvo = fbx.getObjectByName(obj.name);

      if (!alvo) {
        console.warn('Objeto não encontrado no FBX');
        return;
      }

      // Criar esfera vermelha
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      );
      sphere.position.set(0, 0.1, 0);
      alvo.add(sphere);

      i = i + 1;
    });
  });

  animate();
});

function animate() {
  animationId = requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Zoom programático
function zoomOut() {
  camera.position.z += 0.5;
}
function zoomIn() {
  camera.position.z -= 0.5;
}

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  renderer.dispose();
});
</script>

<style>
.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.controls {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 10px;
}

button {
  padding: 5px 10px;
  background: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
