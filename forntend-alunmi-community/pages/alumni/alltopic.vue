<template>
  <div class="pa-8">
    <v-row>
      <h1 class="mt-5 mb-4">Topic Alumni</h1>

      <!-- Search functionality -->
      <v-text-field
        v-model="searchQuery"
        label="Search Topics"
        class="mt-5 mx-5"
        outlined
        dense
        full-width
        style="max-width: 350px; min-width: 200px; border-radius: 25px"
      >
        <template v-slot:append>
          <v-icon @click="searchQuery = ''" class="cursor-pointer"
            >mdi-magnify</v-icon
          >
        </template>
      </v-text-field>
    </v-row>

    <div class="slider-container card-shadow py-5 px-2">
      <v-btn
        v-for="item in filteredTopics"
        :key="item.id"
        class="rounded-xl card-shadow slider-item pa-5 text-center"
        :style="{ border: '2px solid gold', backgroundColor: '#E4B341' }"
        @click="handleClick(item.nameTopic)"
      >
        <h4 :style="{ color: 'white' }">{{ item.nameTopic }}</h4>
      </v-btn>
    </div>

    <h1 class="mt-5">Alumni</h1>
    <div>
      <v-row>
        <!-- Loop detail card -->
        <v-col
          v-for="item in filteredAlumniPosts.slice().reverse()"
          :key="item.id"
          cols="12"
          md="4"
          sm="6"
          @click="fetchcommentData(dialogAlumniItem._id)"
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
        />

        <v-card-title class="text-truncate">{{ item.title }}</v-card-title>

        <!-- Limit card text lines -->
        <v-card-text class="limited-lines">
          <div v-if="item.detail">
            <span v-html="convertToClickableLinks(item.detail)"></span>
          </div>
        </v-card-text>
        
        <br>
      </v-card>
    </v-col>
  </v-row>
    </div>

    <!-- dialog Alumni -->
    <v-dialog  @click="updateVisitCount(dialogAlumniItem._id)"  v-model="dialogAlumni" content-class="elevation-0" max-width="1140px">
      <v-card class="rounded-xl pa-5" :style="{ backgroundColor: '#F5F5F5' }"  >
      <v-row>
        <!-- Left Column -->
          <v-col cols="12" md="6" class="pa-3"
            :style="{ backgroundColor: '#F5F5F5', borderRadius: '24px', padding: '10px', color: '#3f414e' }">
            <!--Topic-->
            <v-list-item-action>
                <v-card class="pa-2 px-4 rounded-pill" :style="{
                  backgroundColor: dialogAlumniItem.color,
                  color: 'white',
                  'text-shadow': '0 0 2px black',
                }" dark>
                  {{ dialogAlumniItem.topicname }}
                </v-card>
              </v-list-item-action>
            <!-- userinfo -->
            <v-list-item class="grow pa-0" two-line>
              <v-list-item-avatar>
                <v-img :src="dialogAlumniItem.user?.image" alt="User Image"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="size-fornt" style="font-weight: bold;">
                  {{ dialogAlumniItem.user?.name }}
                </v-list-item-title>
                <v-list-item-subtitle style="font-size: 0.8rem; color: #777; margin-top: 2px;">
                  Post on: {{ formatTimestamp(dialogAlumniItem.createdAt) }}
                  </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
              

          <!-- Post Image -->
          <v-carousel
            v-if="dialogAlumniItem.image && dialogAlumniItem.image.length"
            style="width: 400px; height: 500px; margin: 0 auto;"
            class="mt-4"
            hide-delimiter-background
            cycle
          >
            <v-carousel-item
              v-for="(image, index) in dialogAlumniItem.image"
              :key="index"
              :src="image"
              style="object-fit: cover;"
            />
          </v-carousel>
          <v-card-title style="font-size: 1.5rem; font-weight: bold;">
            {{ dialogAlumniItem.title }}
          </v-card-title>
          <v-card-subtitle style="font-size: 0.8rem; color: #777; margin-top: 0px;">
              Visited: {{ dialogAlumniItem.visitedpost }}
            </v-card-subtitle>

          <!-- Post Details -->
          <v-card-text>
                <div v-if="dialogAlumniItem && dialogAlumniItem.detail">
                  <!-- Check if there's a URL in the detail -->
                  <span v-html="convertToClickableLinks(dialogAlumniItem.detail)"></span>
                </div>
              </v-card-text>
            </v-col>

        <!-- Right Column (Chat Section) -->
        <v-col cols="12" md="6">
          <v-card class="pa-3" :style="{ borderRadius: '24px' }">
            <div class="d-flex flex-column" style="height: 100%;">
              <!-- Chat Display -->
              <v-list dense style="min-height: 710px; max-height: 710px; overflow-y: auto; margin-top: 10px;">
                <v-list-item-group v-show="true">
                  <v-list-item v-for="(comment) in comments" :key=" comment._id" class="chat-item-left" style="position: relative;">
                    <v-list-item-content>
                      <v-list-item-title style="font-size: 0.8rem; padding: 2px 6px; text-align: left; max-width: 100%; line-height: 1.2; word-wrap: break-word; word-break: break-word; white-space: normal;">
                        <!-- User Info and Message -->
                        <div class="d-flex align-center" style="margin-bottom: 3px;">
                          <v-avatar size="28" class="mr-2">
                            <v-img :src="comment.userimagecomment" alt="User Avatar"></v-img>
                          </v-avatar>
                          <span class="font-weight-bold" style="font-size: 0.8rem;">
                            {{ comment.usercomment}}
                          </span>
                        </div>

                        <!-- Message Text -->
                        <div style="margin-top: 3px; font-size: 0.85rem; padding: 2px 0; word-wrap: break-word; word-break: break-word;">
                          {{ comment.comment }}
                        </div>

                        <!-- Time of the comment -->
                        <div style="font-size: 0.65rem; color: #777; margin-top: 2px;">
                          {{ formatTimestamp(comment.timestamp) }}
                        </div>

                        <!-- Edit & Delete Icons (positioned at bottom-right) -->
                        <div style="position: absolute; bottom: 5px; right: 5px;">
                          <v-btn icon small style="margin-right: 5px; padding: 2px;" @click="editComment(dialogAlumniItem._id , comment._id )" >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn icon small style="padding: 2px;" @click="deleteComment(dialogAlumniItem._id , comment._id )" >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </div>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <!-- To-Do Input and Submit Button at the bottom -->
              <div style="margin-top: auto;">
                <v-divider></v-divider>
                <v-card-actions class="px-3">
                  <v-text-field v-model="todoText" placeholder="Add a comment..." dense outlined hide-details style="flex: 1;" @keyup.enter="addTodo(dialogAlumniItem._id)"></v-text-field>
                  <v-btn icon color="primary"  @click="addTodo(dialogAlumniItem._id)" >
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>

            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
    <OptionalQuestion v-if="checkOptional" @close="checkOptional = false" />
    <FirstQuestion v-if="firstLogin === 0" />
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import io from 'socket.io-client'
import Swal from 'sweetalert2'
import { useTimerStore } from '~/store/timer'
import FirstQuestion from '~/components/FirstQuestion.vue'
import OptionalQuestion from '~/components/OptionalQuestion.vue'

export default defineComponent({
  layout: 'alumni',

  components: {
    FirstQuestion,
    OptionalQuestion,
  },
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
      dialogAdmin: false,
      dialogAlumni: false,
      users: [],
      id: this.$auth.user._id,
      name: this.$auth.user.name,
      alumniPosts: [],
      adminPosts: [],
      topics: [],
      dialogItem: '',
      dialogAlumniItem: '',
      selectedTopic: '',
      searchQuery: '',
      butterflies: [],
      values: [],
      todoText: '', // สำหรับเก็บข้อความที่พิมพ์
      todos: [],
      comments: [],
      socket: null,
      newComment: {
        userid: this.$auth.user._id,
        text: this.todoText,
        timestamp: new Date().toLocaleString(),
        usercomment: this.$auth.user.name,
        userimagecomment: this.$auth.user.image,
      },
      visitedpost:'',
    }
  },
  computed: {
    firstLogin() {
      return this.$auth.user?.firstLogin
    },
    filteredTopics() {
      return this.searchQuery
        ? this.topics.filter((topic) =>
            topic.nameTopic
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
          )
        : this.topics
    },
    filteredAlumniPosts() {
      if (this.searchQuery) {
        return this.alumniPosts.filter(
          (post) =>
            post.detail
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            post.topic.nameTopic
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        )
      }
      if (!this.selectedTopic) return this.alumniPosts
      return this.alumniPosts.filter(
        (post) => post.topic.nameTopic === this.selectedTopic
      )
    },
  },
  created() {
    this.fetchAlumniData()
    this.fetchTopicData()
    this.fetchAdminData()
  },

  mounted() {
    this.initializeSocket()
  },

  onUnmounted() {
    this.cleanupSocket()
  },

  methods: {

    async created(dialogAlumniItem) {
    try {
      const response = await this.$axios.$get(`${process.env.baseUrl}/visitedpost/${dialogAlumniItem}`);
      if (!response.ok) throw new Error("Failed to fetch visit count");
      this.visitedpost = response.data.totalVisits;
    } catch (error) {
      console.error("Error fetching visit count:", error);
    }
    },
    async updateVisitCount(dialogAlumniItem) {
      try {
        const incrementResponse = await this.$axios.$post(`${process.env.baseUrl}/visitedpost/${dialogAlumniItem}`);
        console.log("Increment Response:", incrementResponse);
        this.visitedpost = incrementResponse.totalVisits;
        const countResponse = await this.$axios.$get(`${process.env.baseUrl}/visitedpost/${dialogAlumniItem}`);
        console.log("Count Response:", countResponse);
        this.visitedpost = countResponse.totalVisits;
      } catch (error) {
        console.error("Error updating visit count:", error);
      }
    },

    formatTimestamp(timestamp) {
      if (!timestamp) return "Unknown date";
      const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
      return new Date(timestamp).toLocaleDateString("en-US", options);
    },

    convertToClickableLinks(text) {
      const urlPattern = /(https?:\/\/[^\s]+)/g
      return text.replace(
        urlPattern,
        '<a href="$&" target="_blank" style="color: #1a73e8; text-decoration: none;">$&</a>'
      )
    },

    initializeSocket() {
      this.socket = io(process.env.SOCKET_URL || 'http://localhost:3000')

      this.socket.on('comment added', (newComment) => {
        if (
          newComment &&
          newComment.dialogAlumniItem === this.dialogAlumniItem
        ) {
          this.comments.push(newComment)
        } else {
          console.error('Invalid comment data received:', newComment)
        }
      })

      this.socket.on('comment updated', (updatedComment) => {
        const index = this.comments.findIndex(
          (c) => c._id === updatedComment._id
        )
        if (index !== -1) {
          this.comments[index] = updatedComment
        } else {
          console.error('Comment to update not found:', updatedComment)
        }
      })

      this.socket.on('comment deleted', (deletedCommentId) => {
        this.comments = this.comments.filter((c) => c._id !== deletedCommentId)
      })
    },

    cleanupSocket() {
      if (this.socket) {
        this.socket.off('comment added')
        this.socket.off('comment updated')
        this.socket.off('comment deleted')
        this.socket.disconnect()
      }
    },

    async fetchAlumniData() {
      try {
        const response = await this.$axios.$get(
          `${process.env.baseUrl}/postAlumnis`
        )
        this.alumniPosts = response
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

    async fetchAdminData() {
      try {
        const response = await this.$axios.$get(
          `${process.env.baseUrl}/postAdmins`
        )
        this.adminPosts = response
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    handleClick(topic) {
      // If the clicked topic is already selected, reset the selected topic to show all posts
      this.selectedTopic = this.selectedTopic === topic ? '' : topic
    },

    showDialog(item) {
      this.dialogItem = { ...item, img: item.img }
      this.dialogAdmin = true
    },
    showAlumniDialog(item) {
      this.dialogAlumniItem = {
        ...item,
        img: item.img,
        color: item.topic.color,
        topicname: item.topic.nameTopic,
      }
      this.dialogAlumni = true // Open the dialog
    },
    async addTodo(dialogAlumniItem) {
      console.log(dialogAlumniItem);
      if (this.todoText.trim() === '') return;

      // ใช้ ISO 8601 format ที่ง่ายและสามารถแปลงเป็นวันที่ได้สะดวก
      const timestamp = new Date().toISOString();

      const newComment = {
        userid: this.$auth.user._id,
        comment: this.todoText,
        timestamp, // ใช้ ISO 8601 timestamp
        usercomment: this.$auth.user.name,
        userimagecomment: this.$auth.user.image,
      };

      try {
        await this.$axios.$post(
          `${process.env.baseUrl}/postAlumnis/comments/${dialogAlumniItem}`,
          newComment
        );
        this.socket.emit('add comment', newComment);
        this.todos.push({
          comment: this.todoText,
          timestamp,
          text: this.todoText,
          _id: newComment.userid,
        });
        this.todoText = '';
        await this.refreshComments(dialogAlumniItem);
      } catch (error) {
        console.error('Error adding comment:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error adding your comment. Please try again later.',
          confirmButtonText: 'OK',
        });
      }
    },
    async refreshComments(dialogAlumniItem) {
      try {
        const updatedComments = await this.$axios.$get(
          `${process.env.baseUrl}/postAlumnis/comments/${dialogAlumniItem}`
        )
        this.comments = updatedComments
      } catch (error) {
        console.error('Error refreshing comments:', error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error refreshing the comments. Please try again later.',
          confirmButtonText: 'OK',
        })
      }
    },

    async fetchcommentData(dialogAlumniItem) {
      try {
        const visitCount = await this.$axios.$post(
          `${process.env.baseUrl}/postAlumnis/visitedpost/${dialogAlumniItem}`
        )
        const response = await this.$axios.$get(
          `${process.env.baseUrl}/postAlumnis/comments/${dialogAlumniItem}`
        )
        
        this.comments = response
        this.visitedpost = visitCount
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    async editComment(dialogAlumniItem, comment) {
      try {
        console.log('Post ID:', dialogAlumniItem)
        console.log('Comment ID:', comment)

        // Find the comment to check ownership
        const targetComment = this.comments.find((c) => c._id === comment)

        if (!targetComment) {
          console.error('Comment not found')
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Comment not found',
            confirmButtonText: 'OKAY',
            confirmButtonColor: '#ddccff',
          })
          return
        }

        // Check if the logged-in user is the owner of the comment
        if (this.$auth.user._id !== targetComment.userid) {
          console.error('You are not authorized to edit this comment')
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'You are not the owner of this comment',
            confirmButtonText: 'OKAY',
            confirmButtonColor: '#ddccff',
          })
          return
        }

        // Prompt user to edit their comment (using a prompt for simplicity)
        const newCommentText = prompt(
          'Edit your comment',
          targetComment.comment
        )

        if (newCommentText === null) {
          // User canceled the edit
          console.log('Edit canceled')
          return
        }

        // Check if the new comment text is different from the old one
        if (newCommentText !== targetComment.comment) {
          // Send PUT request to update the comment
          await this.$axios.$put(
            `${process.env.baseUrl}/postAlumnis/comments/${dialogAlumniItem}/${comment}`,
            { comment: newCommentText } // Send updated comment text to the backend
          )

          // Update local comments list
          const index = this.comments.findIndex((c) => c._id === comment)
          if (index !== -1) {
            this.comments[index].comment = newCommentText // Update the local comment
          }

          console.log('Comment updated successfully')
          alert('Your comment has been updated.')
        } else {
          console.log('No changes made')
          alert('No changes made.')
        }
      } catch (error) {
        console.error('Error editing comment:', error)
        alert('An error occurred while editing your comment.')
      }
    },

    async deleteComment(dialogAlumniItem, comment) {
      try {
        console.log('Post ID:', dialogAlumniItem)
        console.log('Comment ID:', comment)

        // Find the comment to check ownership
        const targetComment = this.comments.find((c) => c._id === comment)

        if (!targetComment) {
          console.error('Comment not found')
          return
        }

        // Check if the logged-in user is the owner of the comment
        if (this.$auth.user._id !== targetComment.userid) {
          console.error('You are not authorized to delete this comment')
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'You are not the owner of this comment',
            confirmButtonText: 'OKAY',
            confirmButtonColor: '#ddccff',
          })
          return
        }

        // Show SweetAlert2 confirmation dialog
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#3085d6', // Confirm button color
          cancelButtonColor: '#d33', // Cancel button color
          reverseButtons: true, // Reverses the button order
          customClass: {
            confirmButton: 'swal-button-white',
            cancelButton: 'swal-button-white',
          },
        })

        if (result.isConfirmed) {
          // Send DELETE request to the backend if confirmed
          await this.$axios.$delete(
            `${process.env.baseUrl}/postAlumnis/comments/${dialogAlumniItem}/${comment}`
          )

          // Update local comments list
          this.comments = this.comments.filter((c) => c._id !== comment)
          console.log('Comment deleted successfully')

          // Show success message
          Swal.fire('Deleted!', 'Your comment has been deleted.', 'success')
        }
      } catch (error) {
        console.error('Error deleting comment:', error)
      }
    },
  },
  CloseAlumnidiralog() {
    this.dialogAlumni = false
    this.dialogAdmin = false
    if (this.ShowDialog === true) {
      this.closeDialog()
      this.checkOptional = true
      this.startTimer()
    }
  },
  // Scroll to the bottom of the list
  scrollToBottom() {
    this.$nextTick(() => {
      const chatList = this.$refs.chatList
      if (chatList) {
        chatList.scrollTop = chatList.scrollHeight
      }
    })
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
  width: 100%;
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