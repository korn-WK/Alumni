<template>
    <div>
      <div
        v-for="(butterfly, index) in butterflies"
        :key="index"
        class="butterfly"
        :style="{
          transform: `translate3D(${butterfly.x}px, ${butterfly.y}px, 0px) rotate3d(1, 0.5, 0, 110deg)`,
        }"
      >
        <div class="left-wing">
          <div class="top"></div>
          <div class="bottom"></div>
        </div>
        <div class="right-wing">
          <div class="top"></div>
          <div class="bottom"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        butterflies: [],
      };
    },
    mounted() {
      this.initializeButterflies();
      this.animateButterflies();
    },
    methods: {
      initializeButterflies() {
        for (let i = 0; i < 20; i++) {
          this.butterflies.push({
            x: Math.floor(Math.random() * window.innerWidth),
            y: Math.floor(Math.random() * window.innerHeight),
            directionX: Math.random() > 0.5,
            directionY: Math.random() > 0.5,
          });
        }
      },
      animateButterflies() {
        const moveButterfly = (butterfly) => {
          const randomnumberX = Math.floor(Math.random() * 11);
          const randomnumberY = Math.floor(Math.random() * 11);
  
          if (randomnumberX > 8) butterfly.directionX = !butterfly.directionX;
          if (randomnumberY > 8) butterfly.directionY = !butterfly.directionY;
  
          butterfly.x += butterfly.directionX ? 1 : -1;
          butterfly.y += butterfly.directionY ? 1 : -1;
        };
  
        const animate = () => {
          this.butterflies.forEach(moveButterfly);
          requestAnimationFrame(animate);
        };
  
        requestAnimationFrame(animate);
      },
    },
  };
  </script>
  
  <style scoped>
  @keyframes flutter-left {
    0% {
      transform: rotate3d(0, 1, 0, 20deg);
    }
    50% {
      transform: rotate3d(0, 1, 0, 70deg);
    }
    100% {
      transform: rotate3d(0, 1, 0, 20deg);
    }
  }
  
  @keyframes flutter-right {
    0% {
      transform: rotate3d(0, 1, 0, -20deg);
    }
    50% {
      transform: rotate3d(0, 1, 0, -70deg);
    }
    100% {
      transform: rotate3d(0, 1, 0, -20deg);
    }
  }
  
  .butterfly {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform-style: preserve-3d;
    transform: rotate3d(1, 0.5, 0, 110deg);
  }
  
  .left-wing,
  .right-wing {
    width: 24px;
    height: 42px;
    position: absolute;
    top: 10px;
  }
  
  .left-wing {
    left: 10px;
    top: 10px;
    transform-origin: 24px 50%;
    transform: rotate3d(0, 1, 0, 20deg);
    animation: flutter-left 0.3s infinite;
  }
  
  .right-wing {
    left: 34px;
    transform: rotate3d(0, 1, 0, -20deg);
    transform-origin: 0px 50%;
    animation: flutter-right 0.3s infinite;
  }
  
  .left-wing .top {
    right: 0;
  }
  
  .top,
  .bottom {
    background: pink;
    opacity: 0.7;
    position: absolute;
  }
  
  .top {
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }
  
  .bottom {
    top: 18px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
  }
  </style>
  