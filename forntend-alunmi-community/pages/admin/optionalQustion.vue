<template>
  <div class="pa-6">
    <!-- Display Questionnaires -->
    <v-card class="pa-8 elevation-2 rounded-xl">
      <div class="d-flex">
      <v-icon color="#d2232a" class="mr-2">mdi-help-box</v-icon>
      <h1 style="color: #d2232a" class="overflow-hidden">Optional Questionnaire</h1>
      <v-spacer></v-spacer>
      <v-btn
        class="pa-5 rounded-pill elevation-0"
        style="color: white"
        color="#14A44D"
        @click="openDialog('add')"
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
    <v-data-table :headers="headers" :items="questionnaires" sort-by="color">
      <template #[`item.typeQuestion`]="{ item }">
        <div class="d-flex justify-center align-self-center">
          {{ getTypeQuestion(item.typeQuestion) }}
        </div>
      </template>
      <template #[`item.choice`]="{ item }">
          <div v-for="(itemChoice, indexChoice) in item.choice" :key="indexChoice">
              {{indexChoice+1}}. {{itemChoice}}
            </div>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon color="blue darken-3" class="mr-2" @click="openDialog('edit', item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red darken-3" @click="openDelete(item._id)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    </v-card>

      <!-- Add/Edit Questionnaire Dialog -->
      <v-dialog v-model="dialog" max-width="600">
      <v-card class="rounded-xl pa-6">
        <h2 style="color: #d2232a">{{ dialogTitle }}</h2>
        <v-progress-linear
          color="red darken-2"
          rounded
          value="100"
          class="mb-4"
        ></v-progress-linear>
        <v-card-text>
          <v-text-field
            v-model="field"
            :rules="[rules.required]"
            label="Questionnaire"
            outlined
            rounded
            hide-details="auto"
          ></v-text-field>
          <div class="mx-3">
            <v-radio-group v-model="selectedOption">
              <v-radio
                v-for="(Option, index) in optionTypes"
                :key="index"
                :rules="[rules.required]"
                :label="Option"
                :value="Option"
              ></v-radio>
            </v-radio-group>
          </div>
          <v-text-field
            v-if="showOptionField"
            v-model="option"
            :rules="[rules.required]"
            label="Add"
            outlined
            rounded
            hide-details="auto"
            @keyup.enter="addOption"
          >
          </v-text-field>
          <div class="d-flex justify-end">
            <v-btn
              v-if="showOptionField"
              color="green"
              class="mt-3 mb-5"
              dark
              rounded
              @click="addOption"
              >Add Option</v-btn
            >
          </div>
          <v-row v-for="(option, index) in options" :key="index">
            <v-col cols="1">{{ index + 1 }}</v-col>
            <!-- เพิ่มส่วนนี้เพื่อแสดงลำดับของตัวเลือก -->
            <v-col cols="9">
              <v-text-field
                v-model="options[index]"
                :rules="[rules.required]"
                label="Option"
                outlined
                rounded
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn icon @click="removeOption(index)">
                <!-- เพิ่มปุ่มลบด้านข้าง -->
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark rounded @click="cancelDialog">Cancel</v-btn>
          <v-btn color="green" dark rounded :disabled="!isFormValid" @click="handleAction">SUBMIT</v-btn>
          <v-spacer></v-spacer>
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
          <v-btn color="red darken-1" text rounded dark @click="closeDialog()">
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            rounded
            dark
            @click="deleteQuestionnaire(item)"
          >
            SUBMIT
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const API_URL = `${process.env.baseUrl}/questionaire/optional`

export default {
  layout: 'admin',
  middleware:'auth-admin',
  data() {
    return {
      headers: [
    { text: 'Questionnaire', align: 'center', value: 'question', sortable: false },
    { text: 'Type', align: 'center', value: 'typeQuestion', sortable: false },
    { text: 'Choice', align: 'center', value: 'choice', sortable: false },
    { text: 'Actions', align: 'center', value: 'actions', sortable: false },
  ],
      dialog: false,
      dialogTitle: '',
      dialogAction: '',
      deleteModel: {
        dialog: false,
        message: '',
      },
      selectedOption: null,
      field: '',
      option: '',
      options: [],
      questionnaires: [],
      editedItemId: null,
      rules: {
      required: (v) => !!v || 'Field is required',
    },

    }
  },

  computed: {
    optionTypes() {
      return ['Radio Button', 'Checkbox', 'Drop-down', 'Textarea']
    },
    showOptionField() {
      return ['Radio Button', 'Checkbox', 'Drop-down'].includes(
        this.selectedOption
      )
    },
    isFormValid() {
        if (this.field && this.selectedOption) {
          if (this.showOptionField) {
            return this.options.length > 0
          }
          return true
        }
        return false
      },
  },
  created() {
    this.fetchQuestionnaires()
  },
  methods: {
    async fetchQuestionnaires() {
      try {
        const response = await this.$axios.$get(`${process.env.baseUrl}/questionaire/optionalall`)
        this.questionnaires = response
      } catch (error) {
        console.error('Error fetching questionnaires:', error)
      }
    },

    openDelete(id) {
      this.deleteModel.message = `Are you sure to delete this questionnaire?`
      this.deleteModel.dialog = true
      this.deleteItemId = id
    },
    closeDialog() {
      this.deleteModel.dialog = false
    },

    async addQuestionnaire() {
      try {
        let entypeQuestion
        switch (this.selectedOption) {
          case 'Textarea':
            entypeQuestion = 1
            break
          case 'Radio Button':
            entypeQuestion = 2
            break
          case 'Checkbox':
            entypeQuestion = 3
            break
          case 'Drop-down':
            entypeQuestion = 4
            break
          default:
            entypeQuestion = 1
        }

        const newQuestionnaire = {
          typeQuestion: entypeQuestion,
          question: this.field,
          choice: this.options, // Send options as an array
        }

        
        await this.$axios.post(`${process.env.baseUrl}/questionaire/optionall`, newQuestionnaire)
        this.dialog = false
        this.fetchQuestionnaires()
        this.clearFields()
      } catch (error) {
        console.error('Error adding questionnaire:', error)
      }
    },

    async deleteQuestionnaire() {
      try {
        await this.$axios.delete(`${API_URL}/${this.deleteItemId}`)
        this.fetchQuestionnaires()
        this.closeDialog()
      } catch (error) {
        console.error('Error deleting questionnaire:', error)
      }
    },
    openDialog(mode, item = null) {
      this.dialogTitle =
        mode === 'add' ? 'Add Questionnaire' : 'Edit Questionnaire'
      this.dialogAction = mode === 'add' ? 'Add' : 'Save'
      this.dialog = true
      if (mode === 'edit') {
        // If in edit mode, populate fields with item data
        this.field = item.question
        this.selectedOption = this.getTypeQuestion(item.typeQuestion)
        this.options = item.choice ? item.choice : []
        this.editedItemId = item._id // store edited item's id
      } else {
        // If in add mode, reset fields and options
        this.clearFields()
      }
    },

    handleAction() {
      if (this.dialogTitle === 'Add Questionnaire') {
        this.addQuestionnaire()
      } else {
        this.saveQuestionnaire()
      }
    },

    async saveQuestionnaire() {
      try {
        let entypeQuestion
        switch (this.selectedOption) {
          case 'Textarea':
            entypeQuestion = 1
            break
          case 'Radio Button':
            entypeQuestion = 2
            break
          case 'Checkbox':
            entypeQuestion = 3
            break
          case 'Drop-down':
            entypeQuestion = 4
            break
          default:
            entypeQuestion = null
        }

        const editedQuestionnaire = {
          question: this.field,
          typeQuestion: entypeQuestion,
          choice: this.options,
        }

        await this.$axios.put(`${API_URL}/${this.editedItemId}`, editedQuestionnaire)
        this.dialog = false
        this.fetchQuestionnaires()
        this.clearFields()
      } catch (error) {
        console.error('Error saving questionnaire:', error)
      }
    },

    clearFields() {
      this.field = ''
      this.selectedOption = null
      this.options = []
    },
    addOption() {
      if (this.option.trim() !== '') {
        this.options.push(this.option.trim()) // เพิ่มตัวเลือกใหม่ลงในอาร์เรย์
        this.option = '' // ล้างค่าตัวเลือกหลังจากเพิ่ม
      }
    },

    removeOption(index) {
      this.options.splice(index, 1) // ลบตัวเลือกโดยใช้ดัชนี
    },
    cancelDialog() {
      this.clearFields()
      this.dialog = false
    },

    getTypeQuestion(type) {
      switch (type) {
        case 1:
          return 'Textarea'
        case 2:
          return 'Radio Button'
        case 3:
          return 'Checkbox'
        case 4:
          return 'Drop-down'
        default:
          return ''
      }
    },
  },
}
</script>

<style>
/* Add your styles here */
</style>
