<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');
@import "~boxicons/css/boxicons.min.css";
body {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: #36D1DC;
  background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);
  background: linear-gradient(to right, #5B86E5, #36D1DC);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 360px) {
    max-width: 100vw;
    min-width: 100vw;
    height: 100vh;
    background: #000918;
  }
}

#app {
  width: 100vw;
  height: 100vh;
  background: #000918;
  overflow: hidden;

  @media screen and (max-width: 360px) {
    max-width: 100vw;
    min-width: 100vw;
    height: 100vh;
  }
}
</style>
