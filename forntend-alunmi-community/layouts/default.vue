<template>
  <v-app>
    <!-- Navbar for Mobile -->
    <v-app-bar dense flat color="transparent"
      style="background: linear-gradient(90deg, #A74336 29%, #411A15 100%); height: 70px; align-items: center;"
      v-show="!$vuetify.breakpoint.mdAndUp">
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
      <h2 class="font-weight-bold text-md mt-3">ศิษย์เก่ามหาวิทยาลัยแม่ฟ้าหลวง</h2>
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
              <h1 class="text-2xl md:text-3xl font-weight-bold">
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
              <v-text-field v-bind="attrs" v-on="on" v-model="searchQuery" label="Search" outlined dense full-width
                style="max-width: 350px; min-width: 160px; border-radius: 25px" @click="togglePCMenu">
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
    <v-app-bar dense flat color="transparent" v-show="$vuetify.breakpoint.mdAndUp" :style="{
      background: 'linear-gradient(90deg, #A74336 29%, #411A15 100%)',
      height: '70px',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }">
      <v-container class="d-flex justify-center">
        <!-- Centered Menu Items -->
        <v-btn text class="nav-btn white--text" v-for="(item, index) in menuItems" :key="index" :to="item.to">
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
        { label: 'ABOUT US', to: '/about/' },
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
.navbar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* Navigation button styles */
.nav-btn {
  color: #E4B341 !important;
  font-size: 22px;
  font-family: 'Kalnia';
  margin: 0 20px;
  text-transform: none;
}

.nav-drawer-item {
  color: #E4B341;
}

.v-app-bar {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .v-app-bar {
    position: sticky;
    top: 0;
    height: 60px;
    width: 100%;
  }

  .nav-btn {
    font-size: 14px;
    margin: 0 10px;
  }
}

@media screen and (min-width: 768px) {
  .v-app-bar .v-container {
    justify-content: center;
  }
}
</style>