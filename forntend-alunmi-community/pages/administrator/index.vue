<template>
  <div class="pa-6">
    <v-card class="pa-8 elevation-2 rounded-xl">
      <!-- table -->
      <v-data-table :headers="headers" :items="admins" sort-by="color">
        <template v-slot:[`item.color`]="{ item }">
          <div class="color-container">
            <div
              class="color-box rounded-pill"
              :style="{ backgroundColor: item.color }"
            ></div>
          </div>
        </template>

        <template v-slot:top>

            <div class="d-flex">
              <v-icon color="#d2232a" class="mr-2">mdi-note-edit</v-icon>
              <h1 style="color: #d2232a" class="overflow-hidden">
                Manage Admin
              </h1>
              <v-spacer></v-spacer>
              <v-btn
                class="pa-5 rounded-pill elevation-0"
                style="color: white"
                color="#14A44D"
                @click="openCreate()"
                ><v-icon color="white">mdi-plus</v-icon>add</v-btn
              >
            </div>
            <!-- line -->
            <v-progress-linear
              color="red darken-2"
              rounded
              value="100"
              class="mb-4"
            ></v-progress-linear>




            <!-- dialog Warningalumnipost -->
            <v-dialog v-model="Warningalumnipost" max-width="500px">
              <v-card class="pa-6 rounded-xl">
                <center>
                  <v-img
                    max-width="150px"
                    :src="require('~/assets/warning.png')"
                    :lazy-src="require('~/assets/warning.png')"
                  />
                  <h2>
                    This email have Alumni's posts. can't be admin!!
                  </h2>
                </center>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    text
                    rounded
                    dark
                    @click="Warningalumnipost = false"
                  >
                    Cancel
                  </v-btn>
                 
                </v-card-actions>
              </v-card>
            </v-dialog>





            <!-- dialog add/edit topic -->
            <v-dialog v-model="dialog" max-width="600px">
              <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="green rounded-pill"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="openCreate()"
                >
                  <v-icon>mdi-plus</v-icon>
                  add
                </v-btn>
              </template> -->
              <v-card class="rounded-xl pa-6">
                <h2 style="color: #d2232a">{{ action }} admin</h2>
                <v-progress-linear
                  color="red darken-2"
                  rounded
                  value="100"
                  class="mb-4"
                ></v-progress-linear>

                <!-- <v-text-field
                  v-model="topic.nameTopic"
                  label="topic"
                  :rules="[rules.required]"
                  outlined
                  rounded
                ></v-text-field> -->

                <v-text-field
                  v-model="admin.email"
                  label="email"
                  :rules="[rules.required]"
                  outlined
                  rounded
                ></v-text-field>


                <v-text-field
                  v-model="admin.name"
                  label="name"
                  :rules="[rules.required]"
                  outlined
                  rounded
                ></v-text-field>

                <v-card-actions class="mt-10">
                  <v-row>
                    <v-col col="12" md="4" sm="4"></v-col>
                    <v-col col="12" md="4" sm="4" class="d-flex"
                      ><v-btn
                        color="red"
                        dark
                        rounded
                        class="mr-2"
                        @click="closeDialog()"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        class="px-6"
                        color="green"
                        dark
                        rounded
                        @click="confirmAction()"
                      >
                        SUBMIT
                      </v-btn>
                    </v-col>
                    <v-col col="12" md="4" sm="4"></v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-dialog>

            



            <!-- dialog delete topic -->
            <v-dialog v-model="deleteModel.dialog" max-width="500px">
              <v-card class="pa-6 rounded-xl">
                <center>
                  <v-img
                    max-width="150px"
                    :src="require('~/assets/warning.png')"
                    :lazy-src="require('~/assets/warning.png')"
                  />
                  <h2>
                    {{ deleteModel.message }}
                  </h2>
                </center>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    text
                    rounded
                    dark
                    @click="closeDialog()"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="red darken-1"
                    rounded
                    dark
                    @click="confirmAction()"
                  >
                    SUBMIT
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>



        </template>

        <template #[`item.actions`]="{ item }">
          <v-icon color="blue darken-3" class="mr-2" @click="openEdit(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="red darken-3" @click="openDelete(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
const API_URL = `${process.env.baseUrl}/admins`
export default {
  middleware:'auth-administrator',
  layout: 'admin',
  data: () => ({

    headers: [
      { text: 'Email',align: 'center', sortable: false, value: 'email'},
      { text: 'Name', align: 'center', value: 'name', sortable: false },
      { text: 'Actions', align: 'center', value: 'actions', sortable: false },
    ],
    dialog: false,
    deleteModel: {
      dialog: false,
      message: '',
    },

    Warningalumnipost : false,
    admins:[],

    admin:{
      email: '',
      name: '',
    },


    rules: {
      required: (v) => !!v || 'Enter data',
    },
    action: 'create',
  }),

  computed: {},

  created() {
    this.fetchData()
  },

    methods: {
    async fetchData() {
      try {
        const response = await this.$axios.$get(API_URL)
        this.admins = response
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    openCreate() {
      this.action = 'create'
      this.dialog = true
      this.$refs.form?.reset()
    },

    openEdit(item) {
      this.action = 'update'
      this.admin = JSON.parse(JSON.stringify(item))
      this.dialog = true
    },
  
    openDelete(item) {
      this.action = 'delete'
      this.deleteModel.message = `Are you sure to delete this admin "${item.name}"`
      this.admin = Object.assign({}, item)
      this.deleteModel.dialog = true
    },

    closeDialog() {
      switch (this.action) {
        case 'create':
          this.dialog = false
          this.admin.email =''
          this.admin.name = ''
          break
        case 'update':
          this.dialog = false
          this.admin.email =''
          this.admin.name = ''
          break
        case 'delete':
          this.deleteModel.dialog = false
          break
      }
    },

    async confirmAction() {
      switch (this.action) {
        case 'create':
          await this.createItem()
          break
        case 'update':
          await this.updateItem(this.admin)
          break
        case 'delete':
          await this.deleteItem(this.admin)
          break
      }
    },

    async createItem() {
      try {
        const createData = {
          email: this.admin.email,
          name: this.admin.name,
        }
         const response = await this.$axios.post(API_URL, createData)
        
         if(response.data==='havepost'){
          this.closeDialog()
          this.Warningalumnipost = true; 

        }else{this.admins.push(response.data)
          this.closeDialog()

        }

        
        // close dialog
      } catch (error) {
        console.log(error)
      }
    },

    async updateItem(item) {
      try {
        const updateData = {
          email: this.admin.email,
          
          name: this.admin.name,
        }
        const response = await this.$axios.put(`${API_URL}/${item._id}`, updateData)


        this.fetchData()
        if(response.data==='havepost'){
          this.closeDialog()
          this.Warningalumnipost = true; 

        }else{this.admins.push(response.data)
          this.closeDialog()

        }
      } catch (error) {
        console.error(error)
      }
    },

    async deleteItem(item) {
      try {
        // delete an post
        await this.$axios.delete(`${API_URL}/${item._id}`)

        // real-time
        const deletedIndex = this.admins.findIndex((d) => d._id === item._id)
        if (deletedIndex !== -1) {
          this.admins.splice(deletedIndex, 1)
        }

        // close dialog
        this.closeDialog()
      } catch (error) {
        console.log(error)
      }
    },

    



  },
}
</script>

<style>
.color-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-box {
  width: 60px;
  height: 30px;
}
</style>