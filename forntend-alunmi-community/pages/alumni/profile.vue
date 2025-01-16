<template>
  <div class="pa-6">
    <v-card class="rounded-xl pa-12">
      <div class="d-flex">
        <v-icon color="#d2232a" class="mr-2">mdi-account</v-icon>
        <h1 style="color: #d2232a" class="overflow-hidden">Profile</h1>
      </div>
      <!-- line -->
      <v-progress-linear
        color="red darken-2"
        rounded
        value="100"
        class="mb-4"
      ></v-progress-linear>
      <v-row class="mt-6">
        <v-col col="12" md="5" class="d-flex justify-center">

          <v-img :src="image" max-width="20rem" max-hight="20rem" class="rounded-circle"></v-img>
          
         

        </v-col>
        <v-col col="12" md="7">
          <!-- Edit Profile Form -->
          
          <v-form @submit.prevent="updateProfile">
            <v-text-field
              v-model="editedEmail"
              label="Email(Read Only)"
              rounded
              outlined
              readonly
            ></v-text-field>
            <v-file-input
          v-model="images"
          style="color: white"
          accept="image/png, image/jpeg, image/bmp"
          label="Image"
          prepend-icon="mdi-image"
          color="#d2232a"
          chips
          show-size
          counter
          outlined
          rounded
        ></v-file-input>

            <v-text-field
              v-model="editedName"
              label="Name"
              rounded
              outlined
            ></v-text-field>
            <v-btn type="submit" class="px-4" color="#D2232A" outlined large rounded>Save</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card>

    <FirstQuestion v-if="firstLogin===0"  />

  </div>
</template>

<script>
import FirstQuestion from '~/components/FirstQuestion.vue';


export default {
  layout: 'alumni',
  middleware: 'alumnicheckadmin',


  components: {
     FirstQuestion,
     },

  data() {
    return {


      images : null,
      editedName: '',
      editedEmail: '',
    }
  },
  computed: {
    firstLogin() {
      return this.$auth.user?.firstLogin
    },
    image() {
      return this.$auth.user?.image
    },
  },
  created(){

    this.editedName = this.$auth.user?.name
    this.editedEmail = this.$auth.user.email
    
  },methods: {
    async updateProfile() {
      const formData = new FormData()
         formData.append('name', this.editedName)
         if (this.images instanceof File) {
             formData.append('image', this.images)
           }

           const user = await this.$axios.put(`${process.env.baseUrl}/users/${this.$auth.user._id}`, formData)
           await this.$auth.setUser(user)
           window.location.reload(true)
    }
  }
}
</script>