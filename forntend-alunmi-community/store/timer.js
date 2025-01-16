// store/timer.js
import { defineStore } from 'pinia';

export const useTimerStore = defineStore('timer', {
  state: () => ({
    isLoggedIn: true,
    timer: null,
    timeLeft: 20, // เวลาในวินาทีที่ต้องการนับ
    showDialog: false,
    isRunning: false, // เพิ่มตัวแปรนี้เพื่อเช็คสถานะของตัวจับเวลา
    
  }),
  getters: {
    minutes: (state) => Math.floor(state.timeLeft / 60),
    seconds: (state) => (state.timeLeft % 60 < 10 ? '0' + (state.timeLeft % 60) : state.timeLeft % 60),
  },
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    startTimer() {
      
      if (this.isRunning) {
        return; // ถ้าตัวจับเวลากำลังทำงานอยู่ ให้หยุดการทำงาน
      }
      this.isRunning = true; // ตั้งค่าสถานะว่า timer กำลังทำงาน
      this.timeLeft = 90; // ตั้งเวลาใหม่
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.showDialog = true;
          clearInterval(this.timer);
          this.isRunning = false; // ตั้งค่าสถานะว่า timer หยุดทำงาน
        }
      }, 1000);
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
        this.isRunning = false; // ตั้งค่าสถานะว่า timer หยุดทำงาน
      }
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
});
