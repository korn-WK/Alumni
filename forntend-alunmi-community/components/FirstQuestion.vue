<template>
    <div class="pa-8">
     
      <!-- dialog question -->
      <v-dialog
        v-model="dialogQuestion"
        content-class="elevation-0"
        persistent
        max-width="600px"
      >
        <v-card class="rounded-xl">
          <v-card class="pa-6">
            <div class="d-flex">
              <v-icon color="#d2232a" size="2rem" class="mr-2"
                >mdi-list-box-outline</v-icon
              >
              <h1 style="color: #d2232a" class="overflow-hidden">
                First login questionnaire
              </h1>
            </div>
            <v-progress-linear
              color="red darken-2"
              rounded
              value="100"
              class="mb-4"
            ></v-progress-linear>
            <div v-for="(item, i) in items" :key="i">
              <v-card-title>{{ i + 1 }}. {{ item.question }}</v-card-title>
              <v-textarea
                v-if="item.typeQuestion === 1"
                v-model="item.value"
                label="answer"
                auto-grow
                outlined
                rounded
                rows="1"
                row-height="10"
                class="mx-6"
              ></v-textarea>
              <v-radio-group
                v-if="item.typeQuestion === 2"
                v-model="item.value"
                class="pa-0 mx-6"
              >
                <v-radio
                  v-for="(choice, index) in item.choice"
                  :key="index"
                  :label="choice"
                  :value="choice"
                  color="#BC9945"
                ></v-radio>
              </v-radio-group>
              <div v-if="item.typeQuestion === 3">
                <v-checkbox
                  v-for="(choice, index) in item.choice"
                  :key="index"
                  v-model="item.value[index]"
                  :label="choice"
                  color="#BC9945"
                  class="pa-0 mx-6"
                  hide-details="auto"
                ></v-checkbox>
              </div>
              <div v-if="item.typeQuestion === 4">
                <v-select
                  v-model="item.value"
                  :items="item.choice"
                  label="Outlined style"
                  class="mx-6"
                  color="#BC9945"
                  outlined
                  rounded
                  hide-details="auto"
                ></v-select>
              </div>
            </div>
            <v-row>
              <v-col col="12" md="3" sm="3"></v-col>
              <v-col col="12" md="6" sm="6"
                ><v-btn dark rounded block color="#d2232a" @click="Submit()"
                  >confirm</v-btn
                ></v-col
              >
              <v-col col="12" md="3" sm="3"></v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-dialog>
    </div>

  </template>
  
  <script>
 
  export default {
    
    data() {
      return {
       
        dialogQuestion: false,
        questionnaires: [],
        values: [],
        items: [],

      }
    },
    
    mounted() {
      this.dialogQuestion = true;
      this.fetchfFirstLoginData()
      
    },

    methods: {
      
    
  
      async fetchfFirstLoginData() {
        try {
          const items = await this.$axios.$get(
            `${process.env.baseUrl}/questionaire/firstlogin`
          )
          console.log(items)
          
          // eslint-disable-next-line array-callback-return
          this.items = items.map((item) => {
            switch (item.typeQuestion) {
              // text
              case 1:
                return Object.assign(item, { value: '' })
              // radio button
              case 2:
                return Object.assign(item, { value: undefined })
              // checkbox
              case 3:
                return Object.assign(item, { value: [] })
              // drop-down
              case 4:
                return Object.assign(item, { value: undefined })
            }
          })
        } catch (error) {
          console.error(error)
        }
      },






      async Submit() {
        try {
          const answersData = this.items.map((item) => {
            if (item.typeQuestion === 3) {
              const selectedChoices = item.choice.filter((choice, index) => {
                return item.value[index] // เช็คค่าของ value[index] ว่าเป็น true หรือ false
              })
              return {
                question: item._id,
                value: selectedChoices, // เฉพาะคำตอบที่เลือกเท่านั้น
              }
            } else {
              // สร้างข้อมูลคำตอบสำหรับชนิดคำถามอื่นๆ
              return {
                question: item._id,
                value: item.value,
              }
            }
          })
  
          const data = {
            user: this.$auth.user._id,
            // eslint-disable-next-line object-shorthand
            values: answersData,
          }
          const userUpdate = {
            firstLogin: 1,
          }
          
          await this.$axios.$post(
            `${process.env.baseUrl}/answerQuestion/firstlogin/`,
            data
          )
          await this.$axios.$put(
            `${process.env.baseUrl}/users/${this.$auth.user._id}`,
            userUpdate
          )
          window.location.reload(true)
          this.dialogQuestion = false
        } catch (error) {}
      },
      

    },
  }
  
  
  
  </script>
  
  <style>
  .slider-container {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
  .slider-item {
    flex: 0 0 auto;
    margin-right: 10px;
    scroll-snap-align: start;
    text-decoration: none !important;
    color: inherit !important;
  }
  .image-opacity {
    filter: opacity(0.7);
  }
  .v-carousel__controls__item.v-btn.v-btn--icon {
    height: 15px; /* Height you want */
    width: 15px; /* Width you want */
    border-radius: 100%; /* Remove default border radius */
    border-style: solid;
    border-color: #ebece9;
  }
  
  .v-carousel__controls__item.v-btn.v-btn--icon.v-btn--active {
    background-color: #bc9945; /* Colour for active one */
  }
  
  .v-carousel__controls__item.v-btn.v-btn--icon:hover {
    background-color: #ebece9; /* You might also want to customise the hover effect */
  }
  
  .carousel-image {
    object-fit: cover; /* จัดการขนาดรูปภาพให้เท่ากัน */
    width: 100%; /* กำหนดความกว้างของรูปภาพให้เต็มตามคอนเทนเนอร์ของ carousel */
    height: 450px; /* กำหนดความสูงของ carousel */
  }
  
  .card-alumni {
    object-fit: cover;
    width: 30rem;
    height: 15rem;
  }
  </style>
  