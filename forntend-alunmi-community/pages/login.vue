<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="3" class="text-center">
        <v-card class="pa-12 rounded-xl" style="opacity: 0.9">
          <h1>Sign In</h1>
          <v-form v-model="form" class="mt-4" @submit.prevent="onSubmit">
            <!-- <v-text-field
              v-model="email"
              :rules="[required]"
              label="Email"
              class="pa-0"
              outlined
              rounded
              dense
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="[required]"
              label="Password"
              placeholder="Enter your password"
              outlined
              rounded
              dense
            ></v-text-field> -->

            <v-card-actions class="d-flex justify-center flex-column mx-12">
              <v-btn
                class="mb-2"
                @click="login"
                color="#FF3D00"
                block
                rounded
                outlined
              >
                <v-icon class="mr-1">mdi-google-plus</v-icon>Google
              </v-btn>

              <v-btn
                class="mb-2"
                to="/"
                color="#FF3D00"
                block
                rounded
                outlined
              >
                cancel
              </v-btn>
              <!-- <v-btn
                :disabled="!form"
                :loading="loading"
                color="#BC9945"
                type="submit"
                block
                rounded
                outlined
              >
                Sign In
              </v-btn> -->
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>   
  </v-container>
</template>

<script>
export default {
  layout: 'login',
  middleware: 'check-login',
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
    showFooter: true,
  }),
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('google');
      } catch (error) {
        console.error('OAuth2 login error:', error);
      }
    },
    required(v) {
      return !!v || 'Field is required';
    },
  },
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>