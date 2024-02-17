<template>
  <div class="relative w-full min-h-screen bg-gray-50 bg-center bg-cover bg-background" oncontextmenu="return false; " >
    <!-- Top menu -->
    <div class="absolute p-4 top-16 right-0 bottom-0 left-0 ">
      <router-view v-slot="{ Component , route}">
        <component :is="Component" />
      </router-view>
    </div>
    <!-- <SidebarLeft /> -->
    <!-- <Dock />  -->
    <Topmenu />
    <div class="w-full leading-9 font-moul -mt-12 mb-4 text-left pl-16" v-html="model.title" ></div>
  </div>
</template>

<script>
import { ref , reactive } from 'vue'
import Topmenu from './../../components/menu/topmenu-floattop.vue'
// import Dock from './dock.vue'
// import SidebarLeft from './../../components/sidebars/sidebar-left.vue'
export default {
    setup() {
      const model = reactive({
        name: 'DashboardWidgets' ,
        title: 'សង្ខេបព័ត៌មាន'
      })
      return {
        model
      };
    },
    name: "DashboardPage", 
    data() {
        return {};
    },
    computed: {},
    mounted() {
    },
    methods: {},
    components: { 
      Topmenu  // ,
      // SidebarLeft ,
      // Dock
    }
}
</script>