<template>
  <v-app style="background: linear-gradient(180deg, #FFFFFF 30%, #FFE7CC 100%);" dark>
    <!-- Navbar for Mobile -->
    <v-app-bar dense flat color="transparent" class="navmobile"
      v-show="!$vuetify.breakpoint.mdAndUp"
      style="background: linear-gradient(90deg, #A74336 29%, #411A15 100%); height: 70px; align-items: center;">
      <v-container class="d-flex justify-between align-center">
        <div>
          <!-- Hamburger Menu Button -->
          <v-btn icon @click="drawer = !drawer">
            <v-icon class="menu" color="#E4B341" style="font-size: 35px;">mdi-menu</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary right
      style="background: linear-gradient(180deg, #411A15, #A74336);" v-show="!$vuetify.breakpoint.mdAndUp">
      <v-list>
        <v-list-item v-for="(item, index) in filteredMenuItems" :key="index" :to="item.to" link>
          <v-list-item-title class="nav-drawer-item">{{ item.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Logo and Title Section (Mobile) -->
    <v-container class="text-center my-5" v-show="!$vuetify.breakpoint.mdAndUp">
      <v-img :src="require('@/assets/mfulogo.png')" alt="MFU Logo" height="100" width="auto" contain></v-img>
      <h2 class="text-md mt-3">ศิษย์เก่ามหาวิทยาลัยแม่ฟ้าหลวง</h2>
      <h3 class="text-sm">MFU ALUMNI COMMUNITY</h3>
    </v-container>

    <!-- Search Section for Mobile -->
    <v-container class="text-center" v-show="!$vuetify.breakpoint.mdAndUp">
      <v-menu v-model="menuVisibleMobile" close-on-content-click offset-y :max-width="400" :min-width="200">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-bind="attrs" v-on="on" v-model="searchQuery" label="Search" outlined dense full-width
            style="border-radius: 25px; margin: 20px auto; max-width: 350px;" @click="toggleMobileMenu">
            <template v-slot:prepend-inner>
              <v-icon>mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </template>

        <v-list v-if="filteredMenuItems.length" dense>
          <v-list-item v-for="(item, index) in filteredMenuItems" :key="index" @click="navigateTo(item.to)">
            <v-list-item-content>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-else dense>
          <v-list-item disabled>
            <v-list-item-content>
              <v-list-item-title>No results found</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>

    <!-- Main Content (PC) -->
    <v-container class="header-section" fluid v-show="$vuetify.breakpoint.mdAndUp">
      <v-row class="align-center" justify="space-between">
        <!-- Logo and Title Section (PC) -->
        <v-col class="d-flex align-center" cols="12" md="9" style="padding-left: 90px;">
          <div class="header-title d-flex align-center">
            <v-img :src="require('@/assets/mfulogo.png')" alt="MFU Logo" class="mr-5" height="140" width="auto"
              contain></v-img>
            <div>
              <h1 class="text-2xl md:text-3xl">
                ศิษย์เก่ามหาวิทยาลัยแม่ฟ้าหลวง
              </h1>
              <h2 class="text-xl md:text-2xl">MFU ALUMNI COMMUNITY</h2>
            </div>
          </div>
        </v-col>

        <!-- Search Section with Dropdown (PC) -->
        <v-col class="d-flex justify-start align-center" cols="12" md="3">
          <v-menu v-model="menuVisiblePC" close-on-content-click offset-y :max-width="400" :min-width="160">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-bind="attrs" v-model="searchQuery" style="max-width: 350px; min-width: 160px; border-radius: 25px"
              label="Search"  outlined dense full-width v-on="on" 
                 @click="togglePCMenu">
                <template v-slot:prepend-inner>
                  <v-icon>mdi-magnify</v-icon>
                </template>
              </v-text-field>
            </template>

            <v-list v-if="filteredMenuItems.length" dense>
              <v-list-item v-for="(item, index) in filteredMenuItems" :key="index" @click="navigateTo(item.to)">
                <v-list-item-content>
                  <v-list-item-title>{{ item.label }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list v-else dense>
              <v-list-item disabled>
                <v-list-item-content>
                  <v-list-item-title>No results found</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>

    <!-- Navbar for PC -->
    <v-app-bar  v-show="$vuetify.breakpoint.mdAndUp" dense flat   color="transparent" :style="{
      background: 'linear-gradient(90deg, #A74336 29%, #411A15 100%)',
      height: '70px',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70px',
      maxHeight: '70px',
    }" class="navpc">
      <v-container class="d-flex justify-center">
        <!-- Centered Menu Items -->
        <v-btn  v-for="(item, index) in menuItems" :key="index" :to="item.to" text class="nav-btn white--text">
          {{ item.label }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'GeneralLayout',
  data() {
    return {
      drawer: false,
      menuVisibleMobile: false, // แยก state สำหรับ Mobile
      menuVisiblePC: false, // แยก state สำหรับ PC
      searchQuery: '',
      menuItems: [
        { label: 'HOME', to: '/' },
        { label: 'TOPIC', to: '/alltopic/' },
        { label: 'ABOUT', to: '/about/' },
        { label: 'CONTACT', to: '/contact/' },
        { label: 'LOGIN', to: '/login/' },
      ],
    };
  },
  computed: {
    filteredMenuItems() {
      if (!this.searchQuery) {
        return this.menuItems;
      }
      const query = this.searchQuery.toLowerCase();
      return this.menuItems.filter(item =>
        item.label.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
      this.menuVisibleMobile = false;
      this.menuVisiblePC = false;
    },
    toggleMobileMenu() {
      this.menuVisibleMobile = !this.menuVisibleMobile;
      this.menuVisiblePC = false;
    },
    togglePCMenu() {
      this.menuVisiblePC = !this.menuVisiblePC;
      this.menuVisibleMobile = false;
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap');

h1,
h2,
h3 {
  font-family: "Noto Sans Thai", serif;
}

.nav-btn {
  color: #E4B341 !important;
  font-size: 22px;
  font-family: 'Kalnia';
  margin: 0 20px;
  text-transform: none;
}

.nav-drawer-item {
  color: #E4B341;
  font-family: 'Kalnia';
}

.navmobile {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
}

.navpc {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 18px;
  }

  .nav-btn {
    font-size: 14px;
    margin: 0 10px;
  }
}

@media screen and (max-width: 405px) {
  h1,
  h2,
  h3 {
    font-size: 18px;
    line-height: 1.2;
    text-align: center;
  }

  h1 {
    margin-bottom: 0;
  }

  h2 {
    margin-top: 0;
  }

  .v-text-field {
    max-width: 300px !important;
    margin: 10px auto !important;
    font-size: 14px !important;
  }

  .v-text-field input {
    font-size: 14px !important;
  }

  .v-text-field .v-input__control {
    padding: 4px 8px !important;
  }
}
</style>