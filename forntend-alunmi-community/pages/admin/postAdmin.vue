<template>
  <div class="pa-6">
    <v-card class="pa-8 elevation-2 rounded-xl">
      <div style="width: 100%">
        <div class="d-flex">
          <v-icon color="#d2232a" class="mr-2">mdi-note-edit</v-icon>
          <h1 style="color: #d2232a" class="overflow-hidden">Manage Post</h1>
          <v-spacer></v-spacer>
          <v-btn
            class="pa-5 rounded-pill elevation-0"
            style="color: white"
            color="#14A44D"
            @click="openCreate()"
          >
            <v-icon color="white">mdi-plus</v-icon>add
          </v-btn>
        </div>
        <v-progress-linear
          color="red darken-2"
          rounded
          value="100"
          class="mb-4"
        ></v-progress-linear>
      </div>

      <!-- Loop detail cards -->
      <v-row dense>
        <v-col
          v-for="item in items.slice().reverse()"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
        >
        <v-card
          class="card-fixed-size rounded-xl pa-4"
          @click="showAlumniDialog(item)"
        >
          <v-list-item class="grow pa-0" two-line>
            <v-list-item-avatar>
              <v-img :src="item.user.image"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle
                class="size-fornt"
                style="color: #3f414e"
              >
                {{ item.user.name }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-card
                class="pa-2 px-4 rounded-pill truncate-topic"
                :style="{
                  backgroundColor: item.topic.color,
                  color: 'white',
                  'text-shadow': '0 0 2px black',
                }"
              >
                {{ item.topic.nameTopic }}
              </v-card>
              </v-list-item-action>
            </v-list-item>

        <!-- Conditional rendering for image -->
        <v-img
          class="card-alumni"
          :src="item.image && item.image[0] ? item.image[0] : require('~/assets/NoImage.png')"
          @click="openPostDetail(item)"
        />

        <v-card-title class="text-truncate">{{ item.title }}</v-card-title>

        <!-- Limit card text lines -->
        <v-card-text class="limited-lines">
          <div v-if="item.detail">
            <span v-html="convertToClickableLinks(item.detail)"></span>
          </div>
        </v-card-text>
        
        <br>
        <!-- Actions -->
        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="#F2B109"
            class="pa-4 px-6 mr-4 rounded-pill"
            style="color: white"
            @click.stop="openEdit(item)"
          >
            <v-icon color="white">mdi-pencil</v-icon>EDIT
          </v-btn>
          <v-btn
            color="#E51837"
            class="pa-4 rounded-pill"
            style="color: white"
            @click.stop="openDelete(item)"
          >
            <v-icon color="white">mdi-delete</v-icon>DELETE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
    </v-card>

    <!-- Grid for dialogs -->
    <v-row dense justify="center">
      <!-- Dialog Delete -->
      <v-col cols="12" sm="6" md="4">
        <v-dialog v-model="deleteModel.dialog" max-width="500px">
          <v-card class="pa-6 rounded-xl">
            <center>
              <v-img
                max-width="150px"
                :src="require('~/assets/warning.png')"
                :lazy-src="require('~/assets/warning.png')"
              />
              <h2>{{ deleteModel.message }}</h2>
            </center>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text rounded dark @click="CloseDialog()">
                Cancel
              </v-btn>
              <v-btn color="red darken-1" rounded dark @click="confirmAction()">
                SUBMIT
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <!-- Dialog Add/Edit Post -->
      <v-col cols="12" sm="6" md="4">
        <v-dialog v-model="dialogModel.dialog" max-width="600px">
          <v-card class="rounded-xl pa-6">
            <h2 style="color: #d2232a">{{ dialogModel.message }}</h2>
            <v-progress-linear
              color="red darken-2"
              rounded
              value="100"
              class="mb-4"
            ></v-progress-linear>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="item.title"
                label="Title"
                outlined
                rounded
              ></v-text-field>
              <v-autocomplete
                v-model="item.topic"
                :items="topics"
                :item-text="`nameTopic`"
                item-value="_id"
                return-object
                outlined
                rounded
                label="Select Topic"
                placeholder="Input Topic"
              ></v-autocomplete>
              <v-container>
                <!-- Loop through selected images -->
                <div 
                  v-for="(image, index) in item.image" 
                  :key="index" 
                  class="d-flex justify-center align-center mb-3"
                >
                  <!-- Input File -->
                  <v-file-input
                    v-model="item.image[index]"
                    accept="image/png, image/jpeg, image/bmp"
                    label="Image"
                    prepend-icon="mdi-image"
                    color="#d2232a"
                    outlined
                    rounded
                    chips
                    show-size
                    counter
                  ></v-file-input>

                  <!-- Delete Button -->
                  <v-btn
                    icon
                    color="red"
                    class="ml-2"
                    @click="removeImage(index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>

                <!-- Add a new image input -->
                <v-btn @click="addImageInput" color="primary" outlined>Add another image</v-btn>
              </v-container>
              <p
                class="d-flex justify-end ma-0 my-2"
                style="color:#BC9945;font-size: 12px;"
              >
                <v-icon size="18" color="#BC9945" class="mr-1">mdi-alert-outline</v-icon>
                Suggest Image shouldn't more than 1024x768 px
              </p>
              <v-textarea
                v-model="item.detail"
                label="Content"
                color="#d2232a"
                hide-details="auto"
                outlined
                rounded
              ></v-textarea>
              <v-card-actions class="mt-10">
                <v-btn color="red" dark rounded class="mr-2" @click="CloseDialog()">
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
              </v-card-actions>
              <v-alert v-if="showAlert" type="error" dense>{{ alertMessage }}</v-alert>
            </v-form>
          </v-card>
        </v-dialog>
      </v-col>

      <!-- Dialog Detail -->
      <v-col cols="12" sm="6" md="4">
        <v-dialog v-model="detailDialog" max-width="500px">
      <v-card class="rounded-xl pa-6" style="position: relative;">
        <v-card-text>
          <v-carousel 
            cycle 
            height="500" 
            hide-delimiter-background 
            controls  
            cycle-items-per-group="1"
          >
            <v-carousel-item 
              v-for="(img, index) in selectedPost.image" 
              :key="index"
              :src="img"
              style="display: flex; align-items: center; justify-content: center;"
              width="400px"
              height="500px"
            ></v-carousel-item>
          </v-carousel>
        </v-card-text>
        <v-card-actions class="mt-10" style="position: absolute; top: 10px; right: 10px;">
          <v-icon size="30" @click="closeDetailDialog()">mdi-close</v-icon>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useTimerStore } from '~/store/timer'

const API_URL = `${process.env.baseUrl}/postAlumnis`

export default defineComponent({
  layout: 'admin',
  setup() {
    const timerStore = useTimerStore()
    timerStore.startTimer()

    return {
      ShowDialog: computed(() => timerStore.showDialog),
      startTimer: timerStore.startTimer,
      stopTimer: timerStore.stopTimer,
      closeDialog: timerStore.closeDialog,
    }
  },

  data() {
    return {
      checkOptional: false,
      detailDialog: false,
      selectedPost: {},
      id: this.$auth.user._id,
      items: [],
      topics: [],
      item: {
        title: '',
        detail: '',
        topic: null,
        image: [],
      },
      dialogModel: { dialog: false, message: '' },
      deleteModel: {
        dialog: false,
        message: '',
      },
      action: 'create',
      valid: true,
      showAlert: false,
      alertMessage: '',
    }
  },
  computed: {
    firstLogin() {
      return this.$auth.user?.firstLogin
    },
  },

  created() {
    this.fetchData()
    this.fetchTopicData()
  },

  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.$get(API_URL + '/' + this.id)
        this.items = response
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchTopicData() {
      try {
        const response = await this.$axios.$get(`${process.env.baseUrl}/topics`)
        this.topics = response
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    openCreate() {
      this.action = 'create'
      this.dialogModel.message = `Add post`
      this.dialogModel.dialog = true
      this.$refs.form?.reset()
    },
    async openEdit(item) {
      this.action = 'update';
      this.dialogModel.message = `Edit post ${item.user.name}`;
      this.item = JSON.parse(JSON.stringify(item));

      if (this.item.image) {
        for (let i = 0; i < this.item.image.length; i++) {
          const imageUrl = this.item.image[i];
          const extension = imageUrl.split('.').pop().split('?')[0]; // Extract extension from URL
          this.item.image[i] = await this.urlToFile(imageUrl, `image_${i}.${extension}`);
        }
      }

      this.dialogModel.dialog = true;
    },

    async urlToFile(url, filename) {
      const response = await fetch(url);
      const blob = await response.blob();
      const extension = blob.type.split('/')[1]; // Get extension from MIME type if needed
      return new File([blob], filename || `file.${extension}`, { type: blob.type });
    },
    openDelete(item) {
      this.action = 'delete'
      this.deleteModel.message = `Are you sure to delete this post "${item.user.name}"`
      this.item = Object.assign({}, item)
      this.deleteModel.dialog = true
    },
    CloseDialog() {
      switch (this.action) {
        case 'create':
          this.dialogModel.dialog = false
          this.$refs.form?.reset()
          if (this.ShowDialog === true) {
            this.closeDialog()
            this.checkOptional = true
            this.startTimer()
          }
          break
        case 'update':
          this.dialogModel.dialog = false
          if (this.ShowDialog === true) {
            this.closeDialog()
            this.checkOptional = true
            this.startTimer()
          }
          break
        case 'delete':
          this.deleteModel.dialog = false
          if (this.ShowDialog === true) {
            this.closeDialog()
            this.checkOptional = true
            this.startTimer()
          }
          break
      }
      this.showAlert = false // Reset showAlert state when dialog is closed
    },

    async confirmAction() {
      if (!this.item.title || !this.item.detail) {
        this.showAlert = true
        this.alertMessage = 'Please fill in either the title and detail field.'
        return
      } else if (this.action === 'delete') {
        await this.deleteItem(this.item)
        return
      }

      switch (this.action) {
        case 'create':
          await this.createItem()
          break
        case 'update':
          await this.updateItem(this.item)
          break
      }
    },

    addImageInput() {
      // Add an empty image slot when the button is clicked
      this.item.image.push(null);
    },

    removeImage(index) {
      this.item.image.splice(index, 1);
    },

    // Handle image upload for each file input
    async handleImageUpload(index) {
    const file = this.item.image[index];
    if (file) {
      try {
        const resizedImage = await this.autoResizeImage(file, 400, 500);
        this.item.image[index] = resizedImage; // Replace the original image with the resized image
      } catch (error) {
        // Show error if resizing fails
        this.alertMessage = 'Failed to process the image. Please try again.';
        this.showAlert = true;

        // Remove the invalid image from the array
        this.item.image.splice(index, 1);
      }
    }
  },

   autoResizeImage(file, width, height) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        // Draw the image covering the entire canvas
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile); // Return the resized image
          } else {
            reject(new Error('Failed to create resized image'));
          }
        }, file.type);
      };

      img.onerror = () => {
        reject(new Error('Invalid image file'));
      };
    });
  },

  async createItem() {
    this.isLoading = true;
    try {
      const formData = new FormData();
      formData.append('user', this.id);
      formData.append('title', this.item.title);
      formData.append('detail', this.item.detail);
      formData.append('topic', this.item.topic._id);

      for (const file of this.item.image) {
        const resizedImage = await this.autoResizeImage(file, 400, 500);
        formData.append('image', resizedImage);
      }

      await this.$axios.post(API_URL, formData);
      this.fetchData();
      this.showAlert = false;
      this.CloseDialog();
    } catch (error) {
      console.error(error);
      this.alertMessage = 'Some images are not allowed size. Please upload again.';
      this.showAlert = true;
    } finally {
      window.location.reload(false);
    }
  },

  async updateItem(item) {
    this.isLoading = true;
    try {
      const formData = new FormData();
      formData.append('title', this.item.title);
      formData.append('detail', this.item.detail);
      formData.append('topic', this.item.topic._id);

      for (const image of this.item.image) {
        const resizedImage = await this.autoResizeImage(image, 400, 500);
        formData.append('image', resizedImage);
      }

      await this.$axios.put(`${API_URL}/${item._id}`, formData);
      this.fetchData();
      this.showAlert = false;
      this.CloseDialog();
    } catch (error) {
      console.error(error);
      this.alertMessage = error.message;
      this.showAlert = true;
    } finally {
      window.location.reload(true);
    }
  },
    // Delete an item
    async deleteItem(item) {
      try {
        await this.$axios.delete(`${API_URL}/${item._id}`);
        const deletedIndex = this.items.findIndex((d) => d._id === item._id);
        if (deletedIndex !== -1) {
          this.items.splice(deletedIndex, 1); // Remove item from list
        }
        this.showAlert = false;
        this.CloseDialog();
      } catch (error) {
        console.error(error);
      }
      window.location.reload(true)
    },

    openPostDetail(post) {
      this.selectedPost = post
      this.detailDialog = true
    },
    closeDetailDialog() {
      this.detailDialog = false
    },
    showAlumniDialog(item) {
      this.dialogAlumniItem = {
        ...item,
        img: item.img,
        color: item.topic.color,
        topicname: item.topic.nameTopic,
      }
      this.dialogAlumni = true
    },

    // เมื่อเปิด dialogAdmin
    showDialog(item) {
      this.dialogItem = { ...item, img: item.img }
      this.dialogAdmin = true
    },
    convertToClickableLinks(text) {
      const urlPattern = /(https?:\/\/[^\s]+)/g // Regex for matching URLs
      return text.replace(
        urlPattern,
        '<a href="$&" target="_blank" style="color: #1a73e8; text-decoration: none;">$&</a>'
      )
    },
  },
})
</script>

<style>
.truncate-topic {
  max-width: 10rem; /* กำหนดความกว้างสูงสุดของ topic */
  white-space: nowrap; /* ทำให้ข้อความอยู่ในบรรทัดเดียว */
  overflow: hidden; /* ซ่อนข้อความที่เกินจากพื้นที่ */
  text-overflow: ellipsis; /* แสดง "..." สำหรับข้อความที่เกิน */
}
.card-fixed-size {
  height: 33rem; /* กำหนดความสูงคงที่ของการ์ด */
  flex-direction: column;
  justify-content: space-between;
}

.card-alumni {
  height: 12rem; /* ความสูงของรูปภาพ */
  object-fit: cover; /* จัดรูปภาพให้พอดีกับพื้นที่ */
}

.limited-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* จำกัดจำนวนบรรทัด */
  -webkit-box-orient: vertical;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
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
  height: 15px;
  width: 15px;
  border-radius: 100%;
  border-style: solid;
  border-color: #ebece9;
}

.v-carousel__controls__item.v-btn.v-btn--icon.v-btn--active {
  background-color: #bc9945;
}

.v-carousel__controls__item.v-btn.v-btn--icon:hover {
  background-color: #ebece9;
}

.carousel-image {
  object-fit: cover;
  width: 100%;
  height: 450px;
}

.card-alumni {
  object-fit: cover;
  width: 30rem;
  height: 15rem;
}
.limited-lines {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.limited-lines2 {
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.responsive-title {
  font-size: 4rem;
  color: white;
  text-shadow: 0 0 2px black;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
}

.responsive-btn {
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 48px;
  padding-right: 48px;
}

@media (max-width: 1200px) {
  .responsive-title {
    font-size: 3rem;
  }
  .responsive-btn {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 992px) {
  .responsive-title {
    font-size: 2.5rem;
  }
  .responsive-btn {
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 32px;
    padding-right: 32px;
  }
}

@media (max-width: 768px) {
  .responsive-title {
    font-size: 2rem;
  }
  .responsive-btn {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (max-width: 576px) {
  .responsive-title {
    font-size: 1.5rem;
  }
  .responsive-btn {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-right: 16px;
  }
}

</style>