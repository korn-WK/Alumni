<template>
  <v-app style="background: linear-gradient(180deg, #FFFFFF 30%, #FFE7CC 100%);" dark>
    <v-app-bar fixed app class="px-4" color="transparent"
      style="background: linear-gradient(90deg, #A74336 29%, #411A15 100%); height: 64px;">

      <!-- Hamburger Menu (เฉพาะมือถือ) -->
      <v-app-bar-nav-icon v-if="!$vuetify.breakpoint.mdAndUp" @click="drawer = !drawer" class="d-lg-none">
        <v-icon color="#E4B341" style="font-size: 35px !important;">mdi-menu</v-icon>
      </v-app-bar-nav-icon>

      <!-- Logo (Desktop only) -->
      <router-link to="/alumni/">
        <v-img v-if="$vuetify.breakpoint.mdAndUp" :src="require('~/assets/mfulogo.png')" :lazy-src="require('~/assets/mfulogo.png')" height="70" width="70"
          contain class="logo-image"></v-img>
      </router-link>

      <!-- Desktop Navbar (ยังคงเหมือนเดิมสำหรับ PC) -->
      <v-btn v-if="$vuetify.breakpoint.mdAndUp" to="/" large text plain class="navbar">HOME</v-btn>
      <v-btn v-if="$vuetify.breakpoint.mdAndUp" to="/alumni/alltopic/" large text plain class="navbar">TOPIC</v-btn>
      <v-btn v-if="$vuetify.breakpoint.mdAndUp" to="/alumni/about/" large text plain class="navbar">ABOUT</v-btn>
      <v-btn v-if="$vuetify.breakpoint.mdAndUp" to="/alumni/contact/" large text plain class="navbar">CONTACT</v-btn>

      <v-spacer></v-spacer>

      <!-- Profile Menu -->
      <v-menu v-model="menu" :close-on-content-click="false" max-width="250" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on" style="display: flex; align-items: center;">
            <v-list-item-avatar color="grey darken-3">
              <img v-if="image != null" class="elevation-6" :src="image" />
            </v-list-item-avatar>
            <v-icon style="color: #E4B341; margin-left: 5px;">mdi-chevron-down</v-icon>
          </div>
        </template>

        <v-card class="elevation-1 rounded pa-2" max-width="250">
          <v-list>
            <v-list-item>
              <v-list-item-avatar color="grey darken-3">
                <img v-if="image != null" class="elevation-6" :src="image" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title style="color: #E4B341">{{ name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <div class="pa-2">
            <center>
              <v-btn class="d-flex justify-center pa-6" rounded text to="/alumni/profile/">
                <v-icon color="#BC9945">mdi-account</v-icon>
                <v-card-text style="color: #bc9945">Profile</v-card-text>
              </v-btn>
              <v-btn class="d-flex justify-center pa-6" rounded text to="/alumni/post/">
                <v-icon color="#BC9945">mdi-text-box</v-icon>
                <v-card-text style="color: #bc9945">Post</v-card-text>
              </v-btn>
            </center>
          </div>
          <v-card-actions class="d-flex justify-center">
            <v-btn class="px-6" color="#D2232A" rounded outlined @click="dialog = true">LOGOUT</v-btn>
          </v-card-actions>
        </v-card>

        <!-- dialog logout -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="pa-6 rounded-xl">
            <center>
              <v-img max-width="150px" :src="require('~/assets/warning.png')"
                :lazy-src="require('~/assets/warning.png')" />
              <h2>Do you confirm that you will leave the website?</h2>
            </center>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text rounded dark @click="dialog = false">Cancel</v-btn>
              <v-btn color="red darken-1" rounded dark @click="logout()">Logout</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-menu>
    </v-app-bar>

    <!-- Drawer for Mobile View -->
    <v-navigation-drawer v-model="drawer" app temporary v-if="!$vuetify.breakpoint.mdAndUp"
      style="background: linear-gradient(180deg, #411A15, #A74336); font-family: 'Kalnia';">
      <v-list>
        <v-list-item to="/" @click="drawer = false">
          <v-list-item-title style="color: #E4B341;">HOME</v-list-item-title>
        </v-list-item>
        <v-list-item to="/alumni/alltopic/" @click="drawer = false">
          <v-list-item-title style="color: #E4B341;">TOPIC</v-list-item-title>
        </v-list-item>
        <v-list-item to="/alumni/about/" @click="drawer = false">
          <v-list-item-title style="color: #E4B341;">ABOUT</v-list-item-title>
        </v-list-item>
        <v-list-item to="/alumni/contact/" @click="drawer = false">
          <v-list-item-title style="color: #E4B341;">CONTACT</v-list-item-title>
        </v-list-item>
        <v-list-item to="/alumni/profile/" @click="drawer = false">
          <v-list-item-title style="color: #E4B341;">PROFILE</v-list-item-title>
        </v-list-item>
        <v-list-item to="/alumni/post/" @click="drawer = false">
          <v-list-item-title style="color: #E4B341;">POST</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title style="color: #E4B341;">LOGOUT</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AlumniLayout',
  data() {
    return {
      menu: false,
      drawer: false,
      dialog: false,
    }
  },
  computed: {
    name() {
      return this.$auth.user?.name || 'Anonymous'
    },
    email() {
      return this.$auth.user.email || 'Anonymous'
    },
    studentId() {
      return this.$auth.user?.studentId || 'Anonymous'
    },
    image() {
      return this.$auth.user?.image || ''
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>


.logo-image {
  display: block;
  max-width: 15rem;
}

.navbar {
  font-size: 18px;
  color: #E4B341;
  font-family: 'Kalnia';
}

@media screen and (max-width: 768px) {
  .v-app-bar-nav-icon {
    position: absolute;
    left: 0;
    color: #E4B341 !important;
  }

  .logo-image {
    display: none;
  }

  .navbar {
    display: none;
  }
}

.v-navigation-drawer .v-list-item-title {
  color: #E4B341 !important;
}
</style>