<template>
  <v-app style="background-color: #f8f8fd">
    <v-navigation-drawer
      v-if="drawer"
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <v-img
        :src="require('~/assets/MFU_Alumni_logo.png')"
        :lazy-src="require('~/assets/MFU_Alumni_logo.png')"
        class="logo-image mb-10"
      ></v-img>
      <v-list nav dense>
        <div v-for="(item, i) in items" :key="i">
          <v-list-item
            v-if="item.subMenu?.length === 0"
            :to="item.to"
            class="mb-2"
            :class="{ 'first-item': i === 0 }"
            router
            exact
            color="#CD2027"
            style="background-color: #faf4f4; color: #ae1f24"
          >
            <v-list-item-action>
              <v-icon color="#AE1F24">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-wrap">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            v-else
            no-action
            to="#"
            color="#CD2027"
            class="mb-2"
            style="background-color: #faf4f4"
          >
            <template #activator>
              <v-list-item-icon>
                <v-icon color="#ae1f24">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-wrap"
                ><span style="color: #ae1f24">{{
                  item.title
                }}</span></v-list-item-title
              >
            </template>
            <v-list-item
              v-for="(list, l) in item.subMenu"
              :key="l"
              link
              :to="list.subTo"
            >
              <v-list-item-title class="text-wrap">{{
                list.subTitle
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>

      <template v-slot:append>
        <div class="pa-4 d-flex justify-center">
          <v-btn
            class="px-6"
            color="#D2232A"
            rounded
            outlined
            @click="dialog = true"
          >
            Logout
          </v-btn>
        </div>
      </template>
      <!-- dialog logout -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="pa-6 rounded-xl">
          <center>
            <v-img
              max-width="150px"
              :src="require('~/assets/warning.png')"
              :lazy-src="require('~/assets/warning.png')"
            />
            <h2>Do you confirm that you will leave the website?</h2>
          </center>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              rounded
              dark
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn color="red darken-1" rounded dark @click="logout()">
              Logout
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-navigation-drawer>
    <!-- nav bar -->
    <v-app-bar app elevation="1">
      <v-app-bar-nav-icon
        class="mx-1"
        color="#CD2027"
        @click.stop="drawer = !drawer"
      />
      <v-img
        v-if="drawer == false"
        :src="require('~/assets/MFU_Alumni_logo.png')"
        :lazy-src="require('~/assets/MFU_Alumni_logo.png')"
        class="logo-image"
      ></v-img>
      <v-spacer></v-spacer>
      <div>
        <v-list-item class="grow pa-0" two-line>
          <v-list-item-avatar size="40">
           
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="size-fornt" style="color: #3f414e">{{
              name
            }}</v-list-item-title>
            <v-list-item-subtitle class="size-fornt" style="color: #d2232a"
              >admin</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <!-- <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'AdminLayout',
  data() {
    return {
      drawer: true,
      miniVariant: false,
      dialog: false,
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          to: '/admin/',
          subMenu: [],
        },
        {
          title: 'Post',
          icon: 'mdi-text-box',
          to: '/',
          subMenu: [
            {
              subTitle: 'Admin',
              subTo: '/admin/postAdmin/',
            },
            {
              subTitle: 'Alumni',
              subTo: '/admin/postAlumni/',
            },
          ],
        },
        {
          title: 'Topic',
          icon: 'mdi-chat-plus',
          to: '/admin/topic/',
          subMenu: [],
        },
        {
          title: 'Questionnaire',
          icon: 'mdi-help-circle',
          to: '/',
          subMenu: [
            {
              subTitle: 'First Questionnaire',
              subTo: '/admin/firstLoginQustion/',
            },
            {
              subTitle: 'Optional Questionnaire',
              subTo: '/admin/optionalQustion/',
            },
          ],
        },
      ],
      right: null,
    }
  },
  computed: {

    name() {
      if(this.$auth.user?.role===2){
      return 'Administrator' || 'Anonymous'
      }else{
        return this.$auth.user?.name || 'Anonymous'
      }
      
    },
    image() {
      return this.$auth.user?.image || ''
    },
  },
  mounted() {

    const check = this.$auth.user.role; // Replace this with the actual logic to get the value of x
    if (check === 2) {
      this.items.push(
        {
            title: 'User manage',
            icon: 'mdi-account-edit',
            to: '/administrator/',
            subMenu: [],
          },
          {
            title: 'Report',
            icon: 'mdi-file-question',
            to: '/administrator/report/',
            subMenu: [],
          },
      );
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
  max-width: 15rem; /* Default size for all viewports */
}
@media screen and (max-width: 768px) {
  .logo-image {
    max-width: 12rem; /* Small screens (sm) */
  }
  .size-fornt {
    font-size: 0rem;
  }
}
</style>