<template>
  <div class="pa-6">
    <v-card class="pa-4 elevation-2 rounded-xl">
      <!-- table -->
      <v-data-table :headers="headers" :items="topic" sort-by="color">
        <template #[`item.downloadbtn`]="{}">
          <div
            class="rounded-pill"
            :style="{ backgroundColor: red, width: '60px', height: '30px' }"
          ></div>
        </template>

        <template v-slot:top>
          <div class="d-flex">
            <v-icon color="#d2232a" class="mr-2">mdi-note-edit</v-icon>
            <h1 style="color: #d2232a" class="overflow-hidden">
              Download Report
            </h1>
          </div>
          <v-progress-linear
            color="red darken-2"
            rounded
            value="100"
            class="mb-4"
          ></v-progress-linear>

          <v-spacer></v-spacer>
        
          <v-dialog v-model="dialogsure" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to Download this Question?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogsure = false">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="suredownload">
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn
            @click="downloadCSV(item.questionnaire)"
            size="x-small"
            variant="elevated"
            color="success"
            >Download</v-btn
          >
        </template>

        <template #no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: 'auth-administrator',
  layout: 'admin',
  data: () => ({
    dialog: false,
    dialogsure: false,
    headers: [
      {
        text: 'Questionnaire',
        align: 'center',
        sortable: false,
        value: 'questionnaire',
      },
      { text: 'Actions', align: 'center', value: 'actions', sortable: false },
    ],
  }),
  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.topic = [
        {
          questionnaire: 'First Questionnaire',
        },
        {
          questionnaire: 'Optional Questionnaire',
        },
        // Your other data
      ]
    },


    async downloadCSV(type) {
      try {
        let url =
          type === 'First Questionnaire'
            ? `${process.env.baseUrl}/answerQuestion/firstlogin/`
            : `${process.env.baseUrl}/answerQuestion/optional/`

        const response = await this.$axios.$get(url)
        
        

        url =
        type === 'First Questionnaire'
            ? `${process.env.baseUrl}/questionaire/firstlogin/`
            : `${process.env.baseUrl}/questionaire/optionalall/`
            
        const responseheaders = await this.$axios.$get(url)
        
        const csvData =  await this.convertToCSV(response,responseheaders);

        this.downloadCSVS(csvData);
      } catch (error) {
        console.error('Error downloading CSV:', error)
      }
    },


     convertToCSV(data,headers) {
    // Define headers
    headers = ['Name', ...headers.map(header => header.question)];
    // Convert data to CSV format

    const csv = [
        headers.join(','),
        ...data.map(item =>
            [
                `"${item.user}"`, // Name
                
                ...headers.slice(1).map(header => {
    const valueObj = item.values.find(val => val.question === header);
    if (valueObj) {
        return Array.isArray(valueObj.value)
            ? `"${valueObj.value.join(',')}"`
            : `"${valueObj.value}"`;
    } else {
        return '""'; // or any default value you want to use
}}
                )
            ].join(',')
        )
    ].join('\n');
      
    return csv;
},

  downloadCSVS(csv) {
    const filename = 'data.csv';
    const blob = new Blob(["\uFEFF"+csv], {type: 'text/csv; charset=utf-8' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
},



    suredownload() {
      this.dialogsure = false
    },
  },
}
</script>

<style>
.colorf {
  background: #ffffff;
  height: auto;
  border-radius: 10px;
  margin: 30px;
}

.textfill {
  padding: 30px;
  margin: 20px;
}

.selectc {
  border-radius: 20px;
}

.text-left strong {
  font-size: 18px;
}
</style>