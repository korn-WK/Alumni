<template>
    <v-container>
        <!-- About Us Section -->
        <v-row justify="center" class="text-center py-6">
            <v-col cols="12">
                <h1 class="about-us-title">ABOUT US</h1>
                <p class="about-us-subtitle">MFU Alumni Community</p>
            </v-col>
        </v-row>

        <!-- Row 1 -->
        <v-row class="py-6 align-center">
            <v-col cols="12" md="6">
                <p class="about-us-text">
                    ด้วยงานศิษย์เก่าสัมพันธ์ถือเป็นภารกิจหนึ่งที่สำคัญที่สถาบันอุดมศึกษาต้องจัดขึ้นตามกรอบแนวทางการดำเนินการตามมาตรฐานกิจการนักศึกษาของกระทรวงการอุดมศึกษา
                    วิทยาศาสตร์ วิจัยและนวัตกรรม เพื่อสร้างความสัมพันธ์ระหว่างศิษย์เก่า ศิษย์ปัจจุบัน
                    และสถาบันนักศึกษาเกิดความภูมิใจในสถาบัน
                    และเกิดแรงบันดาลใจที่จะสนับสนุนภารกิจสถาบันเมื่อตนสำเร็จการศึกษาซึ่งการจะทำให้ภารกิจบรรลุเป้าหมายได้นั้น
                    มหาวิทยาลัยควรจัดให้ศิษย์เก่าได้มีโอกาสพบกับนักศึกษาและมหาวิทยาลัยในโอกาสต่างๆ เช่น
                    การเข้ามามีส่วนร่วมในกิจกรรมของมหาวิทยาลัย รวมถึงการจัดกิจกรรมให้ศิษย์เก่ามีโอกาสพบปะกันด้วย
                </p>
            </v-col>
            <v-col cols="12" md="6">
                <v-img :src="require('~/assets/image 32.png')" alt="About Us" class="image-style" />
            </v-col>
        </v-row>

        <!-- Row 2 -->
        <v-row class="py-6 align-center">
            <v-col cols="12">
                <p class="about-us-text">
                    งานศิษย์เก่าสัมพันธ์ ส่วนพัฒนานักศึกษา ได้เล็งเห็นความสำคัญในการสร้างความสัมพันธ์ระหว่างศิษย์เก่า
                    ศิษย์ปัจจุบัน และสถาบัน ผ่านการจัดกิจกรรมให้ศิษย์เก่าได้มีโอกาสพบปะกันในรูปแบบออนไลน์
                    จึงได้จัดทำเว็บไซต์ MFU Alumni Community
                    เพื่อเป็นสื่อกลางในการพบปะพูดคุยแลกเปลี่ยนประสบการณ์และประชาสัมพันธ์ข่าวสารของศิษย์เก่ามหาวิทยาลัยแม่ฟ้าหลวง
                    ตลอดจนได้รับทราบข่าวสารต่างๆจากทางมหาวิทยาลัย
                </p>
            </v-col>
        </v-row>

        <!-- Row 3 -->
        <v-row class="py-6 align-center">
            <v-col cols="12" md="6">
                <v-img :src="require('~/assets/image 33.png')" alt="About Us" class="image-style" />
            </v-col>
            <v-col cols="12" md="6">
                <p class="about-us-text" style="font-family: 'Kalnia'">
                    Since alumni relations are an important mission that higher education institutions must organize
                    according to the guidelines for student affairs standards of the Ministry of Higher Education,
                    Science, Research and Innovation, to create relationships between alumni, current students and the
                    institution, students will be proud of the institution and inspired to support the institution's
                    mission when they graduate. In order to achieve this mission, universities should provide alumni
                    with the opportunity to meet students and the university on various occasions, such as participating
                    in university activities, including organizing activities for alumni to meet each other.
                </p>
            </v-col>
        </v-row>

        <!-- Row 4 -->
        <v-row class="py-6">
            <v-col cols="12">
                <p class="about-us-text" style="font-family: 'Kalnia'">
                    The Alumni Relations Section, Student Development Division, recognizes the importance of building
                    relationships between alumni, current students, and the institution through organizing activities
                    for alumni to have the opportunity to meet online. Therefore, the MFU Alumni Community website has
                    been created as a medium for alumni to meet, exchange experiences, and publicize news of Mae Fah
                    Luang University alumni, as well as receive news from the university.
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
    layout: "general",
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Squada+One&display=swap');

/* Container Styles */
.v-container {
    max-width: 1200px;
    margin: auto;
    background-color: #f7f7f7 ;
    padding: 3rem 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Title and Subtitle */
.about-us-title {
    font-size: 5rem;
    font-family: "Kalnia";
    font-weight: bold;
    color: #E4B341;
    margin-bottom: 0.5rem;
}

.about-us-subtitle {
    font-size: 1.4rem;
    font-family: "Kalnia";
    color: #999;
}

/* Text Content */
.about-us-text {
    font-family: "Prompt", sans-serif;
    font-size: 1.4rem;
    line-height: 1.7;
    color: #666;
    padding: 0 1rem;
}

/* Images */
.image-style {
    max-width: 80%;
    height: auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transition: transform 0.3s ease-in-out;
}

.image-style:hover {
    transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 992px) {
    .about-us-title {
        font-size: 3.5rem;
    }

    .about-us-subtitle {
        font-size: 1.2rem;
    }

    .about-us-text {
        font-size: 1.1rem;
    }

    .image-style {
        max-width: 100%;
    }
}

@media (max-width: 768px) {
    .about-us-title {
        font-size: 2.5rem;
    }

    .about-us-subtitle {
        font-size: 1.1rem;
    }

    .about-us-text {
        font-size: 1rem;
    }

    .v-container {
        padding: 2rem 1rem;
    }
}
</style>