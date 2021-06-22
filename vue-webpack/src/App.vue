<!--  -->
<template>
  <div class='test'>
    {{message}}
    <button @click="handle">button</button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      message: '这是一个message'
    };
  },
  methods: {
    handle(){
      this.message += this.message
    }
  }
}
</script>
<style>
.test {
  color: red;
}
</style>