<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
<template>
  <div class="Home-bg">
    <!-- Homepage -->
    <v-img :src="require('~/assets/bg.png')" class="background-image" width="100%" height="700px">
      <div>
        <div v-for="(butterfly, index) in butterflies" :key="index" class="butterfly" :style="{
          transform: `translate3D(${butterfly.x}px, ${butterfly.y}px, 0px) rotate3d(1, 0.5, 0, 110deg)`,
        }">
          <div class="left-wing">
            <div class="top"></div>
            <div class="bottom"></div>
          </div>
          <div class="right-wing">
            <div class="top"></div>
            <div class="bottom"></div>
          </div>
        </div>
      </div>
      <v-row align="center" justify="center" class="fill-height text-center">
        <v-col cols="12">
          <div class="overlay-text bgtext">
            <h1 class="gradient-text">MFU ALUMNI</h1>
            <p class="gradient-text">COMMUNITY</p>
          </div>
        </v-col>
      </v-row>
    </v-img>

    

    <!--community images-->
    <v-container fluid>
      <v-row justify="center" align="center" style="height: 30vh;">
        <v-col cols="auto">
          <img src="@/assets/Community.png" alt="Community" class="community-img" />
        </v-col>
      </v-row>
    </v-container>
    
    <v-container class="moving-images-container">
      <div class="moving-images" @click="fetchcommentData(dialogAlumniItem._id)">
        <!-- Loop through alumni posts and limit to 12 items -->
        <div 
          v-for="item in filteredAlumniPosts.slice(0, 12).reverse()" 
          :key="item.id" 
          class="image-wrapper"
          @click="showAlumniDialog(item)"
        >
          <!-- Check if image[0] is missing or invalid -->
          <v-img 
            v-if="!item.image || !item.image[0]" 
            :src="require('~/assets/NoImage.png')" 
            :lazy-src="require('~/assets/NoImage.png')" 
            class="moving-image" 
            height="400" 
            width="500" 
            cover
          ></v-img>
          
          <!-- Otherwise, show the actual image -->
          <v-img 
            v-else 
            :src="item.image[0]" 
            :lazy-src="item.image[0]" 
            class="moving-image" 
            height="500" 
            width="400" 
            cover
          ></v-img>

          <div class="image-overlay">{{ item.title }}</div>
        </div>
      </div>
    </v-container>


    <br>
    <br>
    <br>
    <br>

    <v-container fluid>
      <div class="see-more-container">
        <div class="line"></div>
        <router-link to="/alumni/alltopic/">
          <button class="see-more-button">See More</button>
        </router-link>
        <div class="line"></div>
      </div>
    </v-container>


    <br>
    <br>
    <br>
    <br>

    <!-- footer -->
    <v-footer class="footer">
      <v-row style="color: #f5be46;" justify="center" no-gutters>
        <!-- Facebook Icon -->
        <v-col cols="auto">
          <a href="https://www.facebook.com/profile.php?id=100082801136789" rel="noopener noreferrer">
            <v-icon large color="#f5be46">mdi-facebook</v-icon>
          </a>
        </v-col>
        <!-- Instagram Icon -->
        <v-col cols="auto">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alumni_relations@mfu.ac.th" target="_blank" rel="noopener noreferrer">
          <v-icon large color="#f5be46">mdi-gmail</v-icon>
        </a>
        </v-col>
        <!-- Footer Text -->
        <v-col class="py-1 text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>MFU ALUMNI</strong>
        </v-col>
      </v-row>
    </v-footer>

      <!-- dialog Alumni -->
      <v-dialog max-width="1140px" @click="updateVisitCount(dialogAlumniItem._id)"  v-model="dialogAlumni" content-class="elevation-0" >
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
  </div>
 
</template> 

<script>
import { defineComponent ,computed } from '@nuxtjs/composition-api';
import io from 'socket.io-client';
  import Swal from 'sweetalert2';
  import { useTimerStore } from '~/store/timer';


export default defineComponent({
  

    layout: 'alumni',
    middleware: 'alumnicheckadmin',
    setup() {
      const timerStore = useTimerStore();
      timerStore.startTimer();
      
      return {
        ShowDialog: computed(() => timerStore.showDialog),
        startTimer: timerStore.startTimer,
        stopTimer: timerStore.stopTimer,
        closeDialog: timerStore.closeDialog,
      
      };
    },
  data() {
    return {
     checkOptional : false,
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
      butterflies: [],
      todoText: '', // สำหรับเก็บข้อความที่พิมพ์
      todos: [],
      comments:[],
      socket: null,
      newComment:{
        userid : this.$auth.user._id,
        text: this.todoText,
        timestamp: new Date().toLocaleString(),
        usercomment: this.$auth.user.name,
        userimagecomment: this.$auth.user.image,    
      },
      visitedpost:this.visitedpost,
    }
  },

  computed: {
    firstLogin() {
      return this.$auth.user?.firstLogin
    },
    filteredAlumniPosts() {
      
      if (!this.selectedTopic) return this.alumniPosts // Return all posts if no topic is selected
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
    this.initializeSocket();
  },

  onUnmounted() {
    this.cleanupSocket();
  },


  methods: {
    formatTimestamp(timestamp) {
      if (!timestamp) return "Unknown date";
      const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
      return new Date(timestamp).toLocaleDateString("en-US", options);
    },

    convertToClickableLinks(text) {
      const urlPattern = /(https?:\/\/[^\s]+)/g; // Regex for matching URLs
      return text.replace(urlPattern, '<a href="$&" target="_blank" style="color: #1a73e8; text-decoration: none;">$&</a>');
    },
    
    initializeSocket() {
      this.socket = io(process.env.SOCKET_URL);

      this.socket.on('comment added', (newComment) => {
        if (newComment && newComment.dialogAlumniItem === this.dialogAlumniItem) {
          this.comments.push(newComment);
        } else {
          console.error('Invalid comment data received:', newComment);
        }
      });

      this.socket.on('comment updated', (updatedComment) => {
        const index = this.comments.findIndex((c) => c._id === updatedComment._id);
        if (index !== -1) {
          this.comments[index] = updatedComment;
        } else {
          console.error('Comment to update not found:', updatedComment);
        }
      });

      this.socket.on('comment deleted', (deletedCommentId) => {
        this.comments = this.comments.filter((c) => c._id !== deletedCommentId);
      });
    },

    cleanupSocket() {
      if (this.socket) {
        this.socket.off('comment added');
        this.socket.off('comment updated');
        this.socket.off('comment deleted');
        this.socket.disconnect();
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
        const updatedComments = await this.$axios.$get(`${process.env.baseUrl}/postAlumnis/comments/${dialogAlumniItem}`);
        this.comments = updatedComments;

      } catch (error) {
        console.error('Error refreshing comments:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error refreshing the comments. Please try again later.',
          confirmButtonText: 'OK'
        });
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
        console.log('Post ID:', dialogAlumniItem);
        console.log('Comment ID:', comment);

        // Find the comment to check ownership
        const targetComment = this.comments.find((c) => c._id === comment);

        if (!targetComment) {
          console.error('Comment not found');
          Swal.fire({
              icon: 'error',
              title: 'ERROR',
              text: 'Comment not found',
              confirmButtonText: 'OKAY',
              confirmButtonColor: '#ddccff',
            });
            return;
        }

        // Check if the logged-in user is the owner of the comment
        if (this.$auth.user._id !== targetComment.userid) {
          console.error('You are not authorized to edit this comment');
          Swal.fire({
              icon: 'error',
              title: 'ERROR',
              text: 'You are not the owner of this comment',
              confirmButtonText: 'OKAY',
              confirmButtonColor: '#ddccff',
            });
            return;
        }

        // Prompt user to edit their comment (using a prompt for simplicity)
        const newCommentText = prompt('Edit your comment', targetComment.comment);

        if (newCommentText === null) {
          // User canceled the edit
          console.log('Edit canceled');
          return;
        }

        // Check if the new comment text is different from the old one
        if (newCommentText !== targetComment.comment) {
          // Send PUT request to update the comment
          await this.$axios.$put(
            `${process.env.baseUrl}/postAlumnis/comments/${dialogAlumniItem}/${comment}`,
            { comment: newCommentText } // Send updated comment text to the backend
          );

          // Update local comments list
          const index = this.comments.findIndex((c) => c._id === comment);
          if (index !== -1) {
            this.comments[index].comment = newCommentText; // Update the local comment
          }

          console.log('Comment updated successfully');
          alert('Your comment has been updated.');
        } else {
          console.log('No changes made');
          alert('No changes made.');
        }
      } catch (error) {
        console.error('Error editing comment:', error);
        alert('An error occurred while editing your comment.');
      }
    },




    async deleteComment(dialogAlumniItem, comment) {
        try {
          console.log('Post ID:', dialogAlumniItem);
          console.log('Comment ID:', comment);

          // Find the comment to check ownership
          const targetComment = this.comments.find((c) => c._id === comment);
          
          if (!targetComment) {
            console.error('Comment not found');
            return;
          }

          // Check if the logged-in user is the owner of the comment
          if (this.$auth.user._id !== targetComment.userid) {
            console.error('You are not authorized to delete this comment');
            Swal.fire({
              icon: 'error',
              title: 'ERROR',
              text: 'You are not the owner of this comment',
              confirmButtonText: 'OKAY',
              confirmButtonColor: '#ddccff',
            });
            return;
          }

          // Show SweetAlert2 confirmation dialog
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
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
          });

          if (result.isConfirmed) {
            // Send DELETE request to the backend if confirmed
            await this.$axios.$delete(
              `${process.env.baseUrl}/postAlumnis/comments/${dialogAlumniItem}/${comment}`
            );

            // Update local comments list
            this.comments = this.comments.filter((c) => c._id !== comment);
            console.log('Comment deleted successfully');
            
            // Show success message
            Swal.fire(
              'Deleted!',
              'Your comment has been deleted.',
              'success'
            );
          }
        } catch (error) {
          console.error('Error deleting comment:', error);
        }
      }
  },
     CloseAlumnidiralog(){
      this.dialogAlumni = false;
      this.dialogAdmin = false;
      if(this.ShowDialog === true){
        this.closeDialog();
        this.checkOptional = true;
        this.startTimer();
        
      }
    },
    // Scroll to the bottom of the list
    scrollToBottom() {
      this.$nextTick(() => {
        const chatList = this.$refs.chatList;
        if (chatList) {
          chatList.scrollTop = chatList.scrollHeight;
        }
      });
    },

    initializeButterflies() {  // อย่ายุ่ง
      const butterflyCount = 30; // จำนวนผีเสื้อ
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const getRandomColor = () => {
        const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33A1', '#33FFF5', '#FFF533'];
        return colors[Math.floor(Math.random() * colors.length)];
      };

      // สร้างข้อมูลผีเสื้อ
      for (let i = 0; i < butterflyCount; i++) {
        this.butterflies.push({
          x: Math.random() * screenWidth,
          y: Math.random() * screenHeight,
          speedX: (Math.random() - 0.5) * 2, // ความเร็วแกน X
          speedY: (Math.random() - 0.5) * 2, // ความเร็วแกน Y
          directionX: Math.random() > 0.5,
          directionY: Math.random() > 0.5,
          color: getRandomColor(),
          angle: Math.random() * 360, // มุมเริ่มต้น
        });
      }
    },

    animateButterflies() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // ฟังก์ชันย่อยสำหรับการอัปเดตตำแหน่งและพฤติกรรมของผีเสื้อ
      const moveButterfly = (butterfly) => {
        // อัปเดตตำแหน่งผีเสื้อ
        butterfly.x += butterfly.speedX;
        butterfly.y += butterfly.speedY;

        // ตรวจสอบและเปลี่ยนทิศทางเมื่อชนขอบจอ
        if (butterfly.x < 0 || butterfly.x > screenWidth) {
          butterfly.speedX *= -1; // กลับทิศทางในแนวนอน
          butterfly.x = Math.max(0, Math.min(screenWidth, butterfly.x)); // แก้ไขตำแหน่งให้อยู่ในขอบ
        }
        if (butterfly.y < 0 || butterfly.y > screenHeight) {
          butterfly.speedY *= -1; // กลับทิศทางในแนวตั้ง
          butterfly.y = Math.max(0, Math.min(screenHeight, butterfly.y)); // แก้ไขตำแหน่งให้อยู่ในขอบ
        }

        // สุ่มเปลี่ยนสี
        if (Math.random() > 0.97) {
          const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33A1', '#33FFF5', '#FFF533'];
          butterfly.color = colors[Math.floor(Math.random() * colors.length)];
        }

        // หมุนปีก
        butterfly.angle += 2;
        if (butterfly.angle >= 360) {
          butterfly.angle -= 360; // วนรอบองศา
        }
      };

      // ฟังก์ชันสำหรับการเริ่มอนิเมชัน
      const animate = () => {
        this.butterflies.forEach(moveButterfly);
        requestAnimationFrame(animate);
      };

      // เรียกใช้ฟังก์ชันอนิเมชัน
      requestAnimationFrame(animate);
    },

    

   
  },
)

</script>

<style scoped>
.swal-textarea {
  resize: vertical;
  /* Allow resizing vertically */
  font-size: 14px;
  /* Adjust font size */
  padding: 10px;
  /* Add padding inside the textarea */
  line-height: 1.5;
  /* Increase line height for better readability */
}

/* Home */
.Home-bg {
  background: linear-gradient(180deg, #ffffff 30%, #ffe7cc 100%);
}

.chat-item-left {
  display: flex;
  justify-content: flex-start;
  /* จัดตำแหน่งข้อความให้ซ้าย */
  margin-bottom: 10px;
  background-color: #ffffff;
  /* สีพื้นหลังของข้อความ */
  padding: 10px;
  border-radius: 20px;
  word-wrap: break-word;
  /* ให้ข้อความยาวพอดีกับพื้นที่ */
}


.admin-message {
  background-color: #D1E7DD;
  /* สีเทาของข้อความผู้ดูแล */
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: left;
}

/* Gradient text */
.gradient-text {
  font-size: 10rem;
  font-family: 'Kalnia';
  background: linear-gradient(to right, #f5be46, #961313);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
  text-align: center;
}

/* Responsive */
@media (max-width: 1200px) {
  .gradient-text {
    font-size: 6rem;
  }

  .moving-images-container {
    gap: 30px;
    /* ลดระยะห่างระหว่างกล่อง */
  }

  .image-wrapper {
    width: 350px;
    /* ปรับขนาดกล่อง */
    height: 450px;
    /* ปรับขนาดความสูงของกล่อง */
    margin-right: 60px;
    /* ลดระยะห่างระหว่างกล่อง */
  }

  .image-overlay {
    font-size: 22px;
    /* ลดขนาดตัวอักษร */
  }

  .community-img {
    max-width: 80%;
  }

  .see-more-container {
    gap: 40px;
    /* ลดระยะห่างระหว่างปุ่มและเส้น */
  }

  .see-more-button {
    font-size: 28px;
    width: 280px;
    height: 72px;
  }
}

@media (max-width: 992px) {
  .gradient-text {
    font-size: 4rem;
  }

  .moving-images-container {
    gap: 20px;
  }

  .image-wrapper {
    width: 300px;
    height: 400px;
    margin-right: 40px;
  }

  .image-overlay {
    font-size: 20px;
  }

  .community-img {
    max-width: 70%;
  }

  .see-more-container {
    gap: 30px;
  }

  .see-more-button {
    font-size: 24px;
    width: 250px;
    height: 65px;
  }
}

@media (max-width: 768px) {
  .gradient-text {
    font-size: 3rem;
  }

  .moving-images-container {
    gap: 20px;
  }

  .image-wrapper {
    width: 200px;
    height: 300px;
    margin-bottom: 20px;
  }

  .image-overlay {
    font-size: 18px;
  }

  .community-img {
    max-width: 60%;
  }

  .see-more-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .see-more-button {
    font-size: 20px;
    width: 220px;
    height: 60px;
  }

  .line {
    width: 100%;
    height: 2px;
  }
}

@media (max-width: 576px) {
  .gradient-text {
    font-size: 2.5rem;
  }

  .moving-images-container {
    gap: 10px;
  }

  .image-wrapper {
    width: 150px;
    height: 250px;
  }

  .image-overlay {
    font-size: 16px;
  }

  .community-img {
    max-width: 50%;
  }

  .see-more-button {
    font-size: 18px;
    width: 200px;
    height: 55px;
  }
}

/* Moving images container */
.moving-images-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 40px;
}

/* Moving images */
.moving-images {
  display: flex;
  flex-wrap: nowrap;
  animation: moveLeft 30s linear infinite;
  /* Adjust based on the number of images and margin */
}

.moving-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Hover effect for images */
.image-wrapper {
  position: relative;
  width: 400px;
  height: 500px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
  background-color: #f5f5f5;
  margin-right: 80px;
  /* ระยะห่างระหว่างกล่อง */
}

.image-wrapper:hover {
  transform: scale(1.05) translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

/* Image overlay */
.image-overlay {
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center; /* จัดข้อความให้อยู่กลาง */
  white-space: normal; /* อนุญาตให้ข้อความขึ้นบรรทัดใหม่ */
  word-wrap: break-word; /* ตัดคำหากยาวเกินไป */
  overflow: hidden; /* ซ่อนข้อความเกินกรอบ */
  transition: bottom 0.3s ease-in-out;
  padding: 10px; /* เพิ่มพื้นที่ระหว่างข้อความกับขอบ */
  box-sizing: border-box; /* ทำให้ padding ไม่เกินกรอบ */
}

.image-wrapper:hover .image-overlay {
  bottom: 0;
}

/* Keyframes for animation */
@keyframes moveLeft {
  0% {
    transform: translateX(22%);
  }

  100% {
    transform: translateX(-25%);
  }
}

/* footer */
.v-footer {
  background: linear-gradient(90deg, #A74336 29%, #411A15 100%);
  color: #f5be46;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  /* เพิ่มแรเงาให้ข้อความ */
}

/* Butterfly Animation */
@keyframes flutter-left {
  0% {
    transform: rotate3d(0, 1, 0, 20deg);
  }

  50% {
    transform: rotate3d(0, 1, 0, 70deg);
  }

  100% {
    transform: rotate3d(0, 1, 0, 20deg);
  }
}

@keyframes flutter-right {
  0% {
    transform: rotate3d(0, 1, 0, -20deg);
  }

  50% {
    transform: rotate3d(0, 1, 0, -70deg);
  }

  100% {
    transform: rotate3d(0, 1, 0, -20deg);
  }
}

.butterfly {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform-style: preserve-3d;
  transform: rotate3d(1, 0.5, 0, 110deg);
}

.left-wing,
.right-wing {
  width: 24px;
  height: 42px;
  position: absolute;
  top: 10px;
}

.left-wing {
  left: 10px;
  top: 10px;
  transform-origin: 24px 50%;
  transform: rotate3d(0, 1, 0, 20deg);
  animation: flutter-left 0.3s infinite;
}

.right-wing {
  left: 34px;
  transform: rotate3d(0, 1, 0, -20deg);
  transform-origin: 0px 50%;
  animation: flutter-right 0.3s infinite;
}

.left-wing .top {
  right: 0;
}

.top,
.bottom {
  background: linear-gradient(240deg, #ff1e00 29%, #fffb00 100%);
  opacity: 0.7;
  position: absolute;
}

.top {
  width: 20px;
  height: 20px;
  border-radius: 10px;
}

.bottom {
  top: 18px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
}
/* community */
.community-img {
  max-width: 100%;
  height: auto;
}

/* Seemore */
.see-more-container {
  display: flex;
  align-items: center;
  gap: 60px;
  margin-top: 20px;
}

.line {
  flex: 1;
  height: 2px;
  background-color: #E4B341;
}

.see-more-button {
  padding: 5px 15px;
  border: 2px solid #E4B341;
  color: #B6A47A;
  text-transform: uppercase;
  font-size: 32px;
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
  width: 310px;
  height: 82px;
  font-family: 'Lateef';
}

.see-more-button:hover {
  background-color: #E4B341;
  color: #fff;
}
</style>