<template>
  <v-container>
    <div class="d-flex justify-end">
        <v-icon size="30" color="#3f414e" class="end" @click="okClicked()">mdi-close</v-icon>
    </div>
    <v-list-item class="grow pa-0" two-line>
      <v-list-item-avatar>
        <v-img
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="size-fornt" style="color: #d2232a">
          1234567890
        </v-list-item-title>
        <v-list-item-subtitle class="size-fornt" style="color: #3f414e">
          Anonymous
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-card class="pa-2 px-4 rounded-pill" color="red" dark> Topic </v-card>
      </v-list-item-action>
    </v-list-item>
    <v-img
      :src="require('~/assets/img-topic.jpg')"
      :lazy-src="require('~/assets/img-topic.jpg')"
    />
    <v-card-title>Head Topic</v-card-title>
    <v-card-text
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem fugit
      officia veniam culpa necessitatibus pariatur, at impedit harum quas,
      corrupti, aliquid quis. Cupiditate iure delectus assumenda neque nam alias
      culpa.</v-card-text
    >
  </v-container>
</template>

<script>
export default {
  methods: {
    okClicked() {
      this.$emit('okClicked', true);
    },
  },
};
</script>

<style></style>
