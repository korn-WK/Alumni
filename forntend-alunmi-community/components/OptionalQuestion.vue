<template>
   
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
                        Optional questionnaire
                      </h1>
                      <v-spacer></v-spacer>
  
                      <v-icon
                        size="30"
                        color="#3f414e"
                        class="end"
                        @click="close()"
                        >mdi-close</v-icon
                      >
                    </div>
                    <v-progress-linear
                      color="red darken-2"
                      rounded
                      value="100"
                      class="mb-4"
                    ></v-progress-linear>
                    <div v-for="(item, i) in items" :key="i">
                      <v-card-title
                        > {{ item.question }}</v-card-title
                      >
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
                        ><v-btn
                          class="mt-5"
                          dark
                          rounded
                          block
                          color="#d2232a"
                          @click="Submit()"
                          >confirm</v-btn
                        ></v-col
                      >
                      <v-col col="12" md="3" sm="3"></v-col>
                    </v-row>
                  </v-card>
                </v-card>
              </v-dialog>
  
  </template>
  
  <script>
  export default {
    name: 'DefaultLayout',
    data() {
      return {
        answers: [],
        dialogQuestion: false,
        items: [],
      }
    },
  
    mounted() {
      this.fetchOptionalData()
    

      
    },
  
    methods: {
      
  
      async fetchOptionalData() {
        const newuser = {'user': this.$auth.user._id}
        try {
          let items = await this.$axios.$post(`${process.env.baseUrl}/questionaire/optional`,newuser)
          if(items){
            
          items = [items[0]];
          console.log('item', items)
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
                return Object.assign(item, { value: undefined }) // ตั้งค่าเป็น '' หรือค่าว่างเพื่อให้มีค่าเริ่มต้น
            }

          })

          console.log('item', items)
          this.dialogQuestion = true
          
        }else {
          this.close()
          
        }

        } catch (error) {
          console.error(error)
          return 1;
        }
      },
     
  
       async Submit() {
        try {
          // สร้างข้อมูลคำตอบจากข้อมูลที่ผู้ใช้กรอกหรือเลือก
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
  
          console.log(data)
          // ส่งข้อมูลไปยังเซิร์ฟเวอร์ผ่าน Axios
         await this.$axios.$put(
            `${process.env.baseUrl}/answerQuestion/optional/`,
            data
           )
          
          // เมื่อส่งข้อมูลเสร็จสิ้น ปิด dialog ของคำถาม
          this.dialogQuestion = false
          
  
          // บันทึกข้อมูลที่ถูกส่งไปยังเซิร์ฟเวอร์ในคอนโซล
          console.log('Submitted answers:', data)
          this.close()
          this.status = 1
        } catch (error) {
          console.error('Error submitting answers:', error)
        }
      },

      close() {
        this.dialogQuestion = false;
      this.$emit('close');
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
  .body {
    background-color: #f8f8fd;
  }
  </style>
  