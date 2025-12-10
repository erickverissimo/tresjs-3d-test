import { ref } from 'vue';

const mobile = ref(false);

function updateIsMobile() {
  mobile.value = window.matchMedia('(max-width: 1279px)').matches;
}

if (typeof window !== 'undefined') {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
}

export { mobile };
