<template>
  <div v-if="pos === 'down'" :class="'box'+id" class="field">
    <div style="width: 100%; height: 15%; background-color: blue; border: 1px solid black">
    </div>
    <img :src="imageUrl" style="border: 1px solid black; height: 85%" />
    <board-chip v-for="c in chip" :key="c.avatar_url" :imageUrl="image_base_url + c.avatar_url"
                :style="randomPosition()" :color="c.color"></board-chip>

  </div>
  <div v-if="pos === 'left'" :class="'box'+id" class="field">
    <img :src="imageUrl" style="border: 1px solid black; width: 85%" />
    <div style="width: 15%; height: 100%; background-color: darkred; border: 1px solid black; float: right">
    </div>
    <board-chip v-for="c in chip" :key="c.avatar_url" :imageUrl="image_base_url + c.avatar_url"
                :style="randomPosition()" :color="c.color"></board-chip>

  </div>
  <div v-if="pos === 'corner'" :class="'box'+id" class="field">
    <img :src="imageUrl" style="border: 1px solid black" />
    <board-chip v-for="c in chip" :key="c.avatar_url" :imageUrl="image_base_url + c.avatar_url"
                :style="randomPosition()" :color="c.color"></board-chip>
  </div>
  <div v-if="pos === 'up'" :class="'box'+id" class="field">
    <img :src="imageUrl" style="border: 1px solid black; height: 85%" />
    <div style="width: 100%; height: 15%; background-color: deeppink; border: 1px solid black">
    </div>
    <board-chip v-for="c in chip" :key="c.avatar_url" :imageUrl="image_base_url + c.avatar_url"
                :style="randomPosition()" :color="c.color"></board-chip>

  </div>
  <div v-if="pos === 'right'" :class="'box'+id" class="field">
    <img :src="imageUrl" style="border: 1px solid black; width: 85%" />
    <div style="width: 15%; height: 100%; background-color: green; border: 1px solid black; float: left">
    </div>
    <board-chip v-for="c in chip" :key="c.avatar_url" :imageUrl="image_base_url + c.avatar_url"
                :style="randomPosition()" :color="c.color"></board-chip>
  </div>
</template>

<script>


import boardChip from "@/components/board-chip";
export default {
  name: "board-field",
  props: ['id', 'imageUrl', 'chip'],
  components: {
    boardChip,
  },
  data() {
    return {
      image_base_url: "http://localhost:8080",
      pos: null
    }
  },
  methods: {
    randomPosition() {
      return {
        position: "absolute",
        top: Math.random() * 80 + "%",
        left: Math.random() * 80 + "%",
      }
    }
  },
  mounted() {
    console.log(this.chip)
    if (1<this.id && this.id<11) {
      this.pos = "down";
    } else if (11<this.id && this.id<21) {
      this.pos = "left";
    } else if (21<this.id && this.id<31) {
      this.pos = "up";
    } else if (31<this.id) {
      this.pos = "right";
    } else {
      this.pos = "corner";
    }

  }
}


</script>

<style scoped>
.box1 {
  grid-column-start: 11;
  grid-column-end: 12;
  grid-row-start: 11;
  grid-row-end: 12;
}

.box2 {
  grid-column-start: 10;
  grid-column-end: 11;
  grid-row-start: 11;
  grid-row-end: 12;
}
.box3 {
  grid-column-start: 9;
  grid-column-end: 10;
  grid-row-start: 11;
  grid-row-end: 12;
}
.box4 {
  grid-column-start: 8;
  grid-column-end: 9;
  grid-row-start: 11;
  grid-row-end: 12;
}
.box5 {
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 11;
  grid-row-end: 12;
}
.box6 {
  grid-column-start: 6;
  grid-column-end: 7;
  grid-row-start: 11;
  grid-row-end: 12;
}
.box7 {
  grid-column-start: 5;
  grid-column-end: 6;
  grid-row-start: 11;
  grid-row-end: 12;
}
.box8 {
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 11;
  grid-row-end: 12;
}
.box9 {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 11;
  grid-row-end: 12;
}
.box10 {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 11;
  grid-row-end: 12;
}
.box11 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 11;
  grid-row-end: 12;
}
.box12 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 10;
  grid-row-end: 11;
}
.box13 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 9;
  grid-row-end: 10;
}
.box14 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 8;
  grid-row-end: 9;
}
.box15 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 7;
  grid-row-end: 8;
}
.box16 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 6;
  grid-row-end: 7;
}
.box17 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 5;
  grid-row-end: 6;
}
.box18 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 5;
}

.box19 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 3;
  grid-row-end: 4;
}

.box20 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
}

.box21 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
}

.box22 {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

img {
  object-fit: fill;
  width: 100%;
  height: 100%;
}
.field {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>