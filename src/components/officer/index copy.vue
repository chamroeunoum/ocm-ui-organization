<template>
  <div class="relative bg-gray-50 w-full min-h-screen" >
    <div class="top-14 right-0 bottom-0 left-0 absolute p-4 ">
      <router-view v-slot="{ Component , route}">
        <Transition name="slide-fade" >
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
    <Dock />
    <Topmenu />
    <BottomMenuFloat />
  </div>
</template>
<script >
import Topmenu from './../menu/topmenu.vue'
import Dock from '../widgets/Dock.vue'
export default {
    components: { 
      Topmenu ,
      Dock
    },
    setup() {
      return {}
    },
    name: "PeoplePage", 
    data() {
        return {};
    },
    computed: {},
    mounted() {
    },
    methods: {}
}
</script>
<style scoped>
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
