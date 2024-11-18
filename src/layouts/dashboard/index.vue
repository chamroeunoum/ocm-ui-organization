<template>
  <div class="relative w-full bg-gray-50 bg-center bg-cover bg-background" oncontextmenu="return false; " >
    <!-- Top menu -->
    <router-view v-slot="{ Component , route}">
      <component :is="Component" />
    </router-view>
    <!-- <SidebarLeft /> -->
    <!-- <Dock />  -->
    <BottomMenuFloatItems />
  </div>
</template>

<script>
import { ref , reactive } from 'vue'
import BottomMenuFloatItems from '@components/menu/bottommenu-float-items.vue'
// import Dock from './dock.vue'
// import SidebarLeft from './../../components/sidebars/sidebar-left.vue'
export default {
  components: { 
    BottomMenuFloatItems  // ,
    // SidebarLeft ,
    // Dock
  },
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
  methods: {}
}
</script>