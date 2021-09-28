<template>
  <div id="app">
    <transition name="slide" mode="out-in" appear>
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');
@import "~boxicons/css/boxicons.min.css";

html {
  background: #0f0c29;
  background: -webkit-linear-gradient(to bottom, #2c2848, #0f0c29);
  background: linear-gradient(to bottom, #322d4f, #0f0c29);

  @media screen and (min-width: 500px){
    height: 100%;
  }
}

body {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 360px) {
    max-width: 100vw;
    min-width: 100vw;
  }
}

#app {
  width: 100%;

  @media screen and (max-width: 360px) {
    max-width: 100vw;
    min-width: 100vw;
  }
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: rgba(42, 33, 87, 0.56);
}

::-webkit-scrollbar-thumb {
  background: #232323;
}

::-webkit-scrollbar-thumb:hover {
  background: #2a2157;
}


.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave {
  opacity: 0;
}


.slide-enter {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.5s ease-in-out;
}

.slide-leave {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
