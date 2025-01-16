<template>
  <div class="pa-6">
    <v-card class="pa-8 elevation-2 rounded-xl">
      <div class="d-flex">
        <v-icon color="#d2232a" class="mr-2">mdi-view-dashboard</v-icon>
        <h1 style="color: #d2232a" class="overflow-hidden">Dashbord</h1>
      </div>
      <!-- line -->
      <v-progress-linear
        color="red darken-2"
        rounded
        value="100"
        class="mb-4"
      ></v-progress-linear>
      <v-row>


        <v-col cols="12" md="3" class="d-flex justify-center align-self-center">
          <v-progress-circular
            :rotate="360"
            :size="250"
            :width="30"
            :value="100"
            color="teal"
          >
            <div class="d-flex flex-column align-center">
              <h3>{{ todayPostCount }}</h3>
              <span class="text-caption"> Post(Today) </span>
            </div>
          </v-progress-circular>
        </v-col>




        <v-col cols="12" md="3" class="d-flex justify-center align-self-center">
          <v-progress-circular
            :rotate="360"
            :size="250"
            :width="30"
            :value="100"
            color="teal"
          >
            <div class="d-flex flex-column align-center">
              <h3>{{ allPostCount }}</h3>
              <span class="text-caption"> Total Post(All Post) </span>
            </div>
          </v-progress-circular>
        </v-col>

        <v-col cols="12" md="3" class="d-flex justify-center align-self-center">
          <v-progress-circular
            :rotate="360"
            :size="250"
            :width="30"
            :value="(firstLoginAnswerCount / usersCount) * 100"
            color="teal"
          >
            <div class="d-flex flex-column align-center">
              <h3>{{ usersCount }}</h3>
              <span class="text-caption"> logged in users </span>
            </div>
          </v-progress-circular>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="rounded-xl">
            <v-card-title> Answer FirstLogin </v-card-title>
            <v-card-text class="d-flex flex-row align-center">
              <v-icon left> mdi-file-document-check </v-icon>
              <div class="mr-auto">{{ firstLoginAnswerCount }}</div>
              <v-chip color="teal" dark>
                {{ ((firstLoginAnswerCount / usersCount) * 100).toFixed(2) }} %
              </v-chip>
            </v-card-text>
          </v-card>

          <v-card class="rounded-xl mt-5">
            <v-card-title> Questions FirstLogin </v-card-title>
            <v-card-text class="d-flex flex-row align-center">
              <v-icon left> mdi-file-question-outline </v-icon>
              <div class="mr-auto">{{ firstLoginCount }}</div>
            </v-card-text>
          </v-card>

          <v-card class="rounded-xl mt-5">
            <v-card-title> Questions Optional </v-card-title>
            <v-card-text class="d-flex flex-row align-center">
              <v-icon left> mdi-file-question-outline </v-icon>
              <div class="mr-auto">{{ optionalCount }}</div>
            </v-card-text>
          </v-card>

        </v-col>

      </v-row>
      <v-card class="rounded-xl pa-6 mt-5">
        <v-data-table :headers="headers" :items="items" sort-by="color">
          <template v-slot:top>
            <div class="d-flex">
              <v-icon color="#d2232a" class="mr-2">mdi-account</v-icon>
              <h1 style="color: #d2232a" class="overflow-hidden">user</h1>
            </div>
            <!-- line -->
            <v-progress-linear
              color="red darken-2"
              rounded
              value="100"
              class="mb-4"
            ></v-progress-linear>
          </template>
          <template #[`item.firstLogin`]="{ item }">
            <v-chip
              v-if="item.firstLogin == 0"
              class="font-weight-bold"
              color="#ffb758"
              dark
            >
              warning
            </v-chip>
            <v-chip
              v-if="item.firstLogin == 1"
              class="font-weight-bold"
              color="#56c596"
              dark
            >
              success
            </v-chip>
          </template>
          
        </v-data-table>
      </v-card>
    </v-card>
  </div>
</template>

<script>
const API_URL = `${process.env.baseUrl}/users`
export default {
  layout: 'admin',
  middleware: 'auth-admin',
  data: () => ({
    value: 100,
    items: [],
    itemsFirstLogin: [],
    itemsOptional: [],
    todaypostCount:0,
    allpostCount:0,
    headers: [
      { text: 'Email', align: 'center', value: 'email', sortable: false },
      { text: 'Name', align: 'center', value: 'name', sortable: false },
      {
        text: 'FirstLogin',
        align: 'center',
        value: 'firstLogin',
        sortable: false,
      },
    ],
  }),
  computed: {
    allPostCount() {
      return this.allpostCount
    },
    todayPostCount() {
      return this.todaypostCount
    },
    usersCount() {
      return this.items.length
    },
    firstLoginCount() {
      return this.itemsFirstLogin.length
    },
    optionalCount() {
      return this.itemsOptional.length
    },
    firstLoginAnswerCount() {
      return this.items.filter((user) => user.firstLogin === 1).length
    },
  },
  created() {
    this.fetchDataUser()
    this.fetchDataFirstLogin()
    this.fetchDataOptional()
    this.fetchPost()
  },

  methods: {
    
    async fetchPost() {
      try {
      const allpost = await this.$axios.$get(`${process.env.baseUrl}/postAlumnis/`)
      this.allpostCount = allpost.length
      const todaypost = await this.$axios.$get(`${process.env.baseUrl}/postAlumnis/admin/getpost`)
      this.todaypostCount = todaypost.length
    } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    async fetchDataUser() {
      try {
        const response = await this.$axios.$get(API_URL)
        this.items = response.filter((item) => {
          return item.role === 0
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchDataFirstLogin() {
      try {
        const response = await this.$axios.$get(
          `${process.env.baseUrl}/questionaire/firstlogin`
        )
        this.itemsFirstLogin = response
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchDataOptional() {
      try {
        const response = await this.$axios.$get(
          `${process.env.baseUrl}/questionaire/optionalall`
        )
        
        this.itemsOptional = response
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
}
</script>

<style></style>