<template>
  <div class="pa-6">
    <v-card class="pa-6 elevation-2 rounded-xl">
      <!-- table -->
      <v-data-table :headers="headers" :items="topics" sort-by="color">
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
            <h1 style="color: #d2232a" class="overflow-hidden">Manage Topic</h1>
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
              <h2 style="color: #d2232a">{{ action }} topic</h2>
              <v-progress-linear
                color="red darken-2"
                rounded
                value="100"
                class="mb-4"
              ></v-progress-linear>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="topic.nameTopic"
                  label="Topic"
                  :rules="[rules.required]"
                  outlined
                  rounded
                ></v-text-field>
                <v-row>
                  <v-col class="d-flex justify-center">
                    <v-color-picker
                      v-model="topic.color"
                      show-swatches
                      max-width="100%"
                    ></v-color-picker>
                  </v-col>
                </v-row>
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
              </v-form>
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

          <!-- dialog no delete -->
          <v-dialog v-model="dialogNoDelete" max-width="500px">
            <v-card class="pa-6 rounded-xl">
              <center>
                <v-img
                  max-width="150px"
                  :src="require('~/assets/warning.png')"
                  :lazy-src="require('~/assets/warning.png')"
                />
                <h2>
                  Cannot be deleted because there are alumni posts using this
                  topic.
                </h2>
              </center>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green" rounded dark @click="closeDialogDelete()">
                  SUBMIT
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card> </v-dialog
          ><v-dialog></v-dialog>
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
const API_URL = `${process.env.baseUrl}/topics`
export default {
  layout: 'admin',
  middleware: 'auth-admin',
  data: () => ({
    headers: [
      {
        text: 'Topic',
        align: 'center',
        sortable: true,
        value: 'nameTopic',
      },
      { text: 'Color', align: 'center', value: 'color', sortable: false },
      { text: 'Actions', align: 'center', value: 'actions', sortable: false },
    ],
    dialog: false,
    deleteModel: {
      dialog: false,
      message: '',
    },
    dialogNoDelete: false,
    topics: [],
    itemTopic: [],
    topic: {
      nameTopic: '',
      color: '',
    },
    rules: {
      required: (v) => !!v || 'Field is required',
    },
    action: 'create',
    valid: true,
  }),

  computed: {},

  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.$get(API_URL)
        this.topics = response
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
      this.topic = JSON.parse(JSON.stringify(item))
      this.dialog = true
    },
    openDelete(item) {
      this.action = 'delete'
      this.deleteModel.message = `Are you sure to delete this topic "${item.nameTopic}"`
      this.topic = Object.assign({}, item)
      this.deleteModel.dialog = true
    },

    closeDialog() {
      switch (this.action) {
        case 'create':
          this.dialog = false
          this.$refs.form?.reset()
          break
        case 'update':
          this.dialog = false
          this.$refs.form?.reset()
          break
        case 'delete':
          this.deleteModel.dialog = false
          break
      }
    },
    closeDialogDelete() {
      this.deleteModel.dialog = false
      this.dialogNoDelete = false
    },
    async confirmAction() {
      switch (this.action) {
        case 'create':
          await this.createItem()
          break
        case 'update':
          await this.updateItem(this.topic)
          break
        case 'delete':
          await this.deleteItem(this.topic)
          break
      }
    },

    async createItem() {
      try {
        const createData = {
          nameTopic: this.topic.nameTopic,
          color: this.topic.color,
        }
        const response = await this.$axios.post(API_URL, createData)
        this.topics.push(response.data)

        // close dialog
        this.closeDialog()
      } catch (error) {
        console.log(error)
      }
    },

    async updateItem(item) {
      try {
        const updateData = {
          nameTopic: item.nameTopic,
          color: item.color,
        }
        await this.$axios.put(`${API_URL}/${item._id}`, updateData)

        this.fetchData()
        // const updatedIndex = this.topics.findIndex((d) => d._id === item._id)
        // if (updatedIndex !== -1) {
        //   this.topics[updatedIndex] = {
        //     ...this.topics[updatedIndex],
        //     nameTopic: item.nameTopic,
        //     color: item.color,
        //   }
        // }

        this.closeDialog()
      } catch (error) {
        console.error(error)
      }
    },

    async deleteItem(item) {
      try {
        const itemTopic = await this.$axios.get(
          `${process.env.baseUrl}/postAlumnis/topic/${item._id}`
        )

        if (itemTopic.data && itemTopic.data.length > 0) {
          // If there are related posts, do not delete the topic
          this.dialogNoDelete = true
        } else {
          // If there are no related posts, delete the topic
          await this.$axios.delete(`${API_URL}/${item._id}`)

          // Remove the deleted topic from the topics array in real-time
          const deletedIndex = this.topics.findIndex((d) => d._id === item._id)
          if (deletedIndex !== -1) {
            this.topics.splice(deletedIndex, 1)
          }
        }

        // Close the dialog regardless of the outcome
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