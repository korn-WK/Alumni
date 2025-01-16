<template ref="loginLayout">
    <v-app dark>
      <Nuxt />
    </v-app>
  </template>
  <script>
  export default {
    name: 'LoginLayout',
  }
  </script>
  <style scoped>
  .v-application {
    background-image: url("~assets/MFU_back.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  </style>
  