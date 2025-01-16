<template>
  <main class="bg">
    <!-- Contact Us Section -->
    <v-container class="contact-us text-center py-8">
      <h1 class="about-us-heading" style="color: #E4B341;">CONTACT US</h1>
      <p class="about-us-subtitle" style="color: #999;">We’re here to help</p>

      <v-row justify="center" class="mt-5">
        <!-- Card 1: Call us -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="d-flex align-center justify-center">
              <div class="icon-circle-wrapper">
                <v-img :src="require('~/assets/call.png')" class="icon-circle" />
              </div>
            </v-card-title>
            <v-card-title class="d-flex align-center justify-center" style="font-size: x-large; font-weight: bold;">
              <span class="ml-0">Call us</span>
            </v-card-title>

            <v-card-text class="card-text">
              <p>งานศิษย์เก่าสัมพันธ์ ส่วนพัฒนานักศึกษา อาคารกิจกรรม D1 ห้อง 114</p>
              <p>มหาวิทยาลัยแม่ฟ้าหลวง เลขที่ 333 หมู่ 1 ต.ท่าสุด อ.เมือง จ.เชียงราย 57100</p>
              <p style="font-size: medium; font-weight: bold;">Tel: 053-916377</p>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Card 2: Facebook -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="d-flex align-center justify-center">
              <div class="icon-circle-wrapper">
                <v-img :src="require('~/assets/alumni talk.jpg')" class="icon-circle" />
              </div>
            </v-card-title>
            <v-card-title class="d-flex align-center justify-center" style="font-size: x-large; font-weight: bold;">
              <span class="ml-1">Facebook</span>
            </v-card-title>
            <v-card-text class="card-text">
              <p>งานศิษย์เก่าสัมพันธ์ ส่วนพัฒนานักศึกษา มฟล. </p>
              <a href="https://www.facebook.com/profile.php?id=100082801136789" target="_blank"
                style="font-size: medium; font-weight: bold;">
                Click
              </a>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Card 3: Gmail -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="d-flex align-center justify-center">
              <div class="icon-circle-wrapper">
                <v-img :src="require('~/assets/gmail_icon.png')" class="icon-circle" />
              </div>
            </v-card-title>
            <v-card-title class="d-flex align-center justify-center" style="font-size: x-large; font-weight: bold;">
              <span class="ml-0">Gmail</span>
            </v-card-title>
            <v-card-text class="card-text">
              <p>Alumni Relations MFU</p>
              <p style="font-size: medium; font-weight: bold;">Email: <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=alumni_relations@mfu.ac.th"
                  style="font-size: medium; font-weight: bold;"> alumni_relations@mfu.ac.th</a></p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Relevant Agencies Section -->
    <v-container class="relevant-agencies text-center py-3">
      <h1 class="about-us-heading" style="color: #f5be46;">RELEVANT AGENCIES</h1>
      <br>
      <v-row justify="center" class="mt-5">
        <!-- Card 1: สมาคมศิษย์เก่ามหาวิทยาลัยแม่ฟ้าหลวง -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="d-flex align-center justify-center">
              <div class="icon-circle-wrapper">
                <v-img :src="require('~/assets/MFUALUMNI.png')" class="icon-circle" />
              </div>
            </v-card-title>

            <v-card-title class="d-flex align-center justify-center" style="font-size: x-large; font-weight: bold;">
              <span class="ml-1">สมาคมนักศึกษาเก่ามหาวิทยาลัยแม่ฟ้าหลวง</span>
            </v-card-title>
            <v-card-text class="card-text">
              <p>MFU Alumni</p>
              <a href="https://www.facebook.com/MFUALUMNI333" target="_blank"
                style="font-size: medium; font-weight: bold;">Click</a>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Card 2: ส่วนพัฒนานักศึกษา -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="d-flex align-center justify-center">
              <div class="icon-circle-wrapper">
                <v-img :src="require('~/assets/sdadmfu.png')" class="icon-circle" />
              </div>
            </v-card-title>
            <v-card-title class="d-flex align-center justify-center" style="font-size: x-large; font-weight: bold;">
              <span class="ml-1">ส่วนพัฒนานักศึกษา</span>
            </v-card-title>
            <v-card-text class="card-text">
              <p>ส่วนพัฒนานักศึกษา มฟล. SDAD MFU </p>
              <a href="https://www.facebook.com/sdadmfu" target="_blank"
                style="font-size: medium; font-weight: bold;">Click</a>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Card 3: เครือข่ายศิษย์เก่า มฟล. -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="d-flex align-center justify-center">
              <div class="icon-circle-wrapper">
                <v-img :src="require('~/assets/MFUALUMNI LOGO.png')" class="icon-circle" />
              </div>
            </v-card-title>
            <v-card-title class="d-flex align-center justify-center" style="font-size: x-large; font-weight: bold;">
              <span class="ml-1">เครือข่ายศิษย์เก่า มฟล.</span>
            </v-card-title>
            <v-card-text class="card-text">
              <p>MFU Alumni Legend </p>
              <a href="https://www.facebook.com/profile.php?id=100064808674080" target="_blank"
                style="font-size: medium; font-weight: bold;">Click</a>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  layout: 'alumni',
  middleware: 'alumnicheckadmin',

  components: {},
});
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400;500;600;700;800;900&display=swap');

.about-us-heading {
  font-size: 4.3rem;
  font-family: "Kalnia";
  font-weight: bold;
  color: #E4B341;
}

.about-us-subtitle {
  font-size: 1.3rem;
  font-family: "Kalnia";
  color: #999;
}

/* ฟอนต์ Prompt ทั่วทั้งหน้า */
* {
  font-family: 'Prompt', serif;
}

/* เพิ่มฟอนต์ในส่วนที่ต้องการ */
span {
  font-family: 'Prompt', serif;
}

.v-col {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.v-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 280px;
  border-radius: 24px;
  background-color: #fdfafa;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-card-text {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.card-text {
  font-size: 1rem;
  color: #555;
}

.icon-circle-wrapper {
  width: 70px;
  height: 70px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -2.5rem;
}

.icon-circle {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.link {
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link:hover {
  color: #333;
}

/* Responsive */
@media (max-width: 1200px) {
  .about-us-heading {
    font-size: 3.5rem;
  }
}

@media (max-width: 992px) {
  .about-us-heading {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .about-us-heading {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  .about-us-heading {
    font-size: 2rem;
  }
}
</style>