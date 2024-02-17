<template >
  <!-- Total Meetings -->
  <div @click="$router.push('/meetings')" class="bg-gray-100 rounded border border-gray-200 hover:border-blue-400 duration-300 p-8 m-8 cursor-pointer ">
      <svg class="flex-none mx-auto w-14 h-14 mb-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M9.472 4a4.25 4.25 0 0 0-4.095 3.113L4.436 10.5L4.5 10.5h2.01l.793-2.852A2.25 2.25 0 0 1 9.472 6H22.53a2.25 2.25 0 0 1 2.168 1.648l3.219 11.588a2.18 2.18 0 0 1-2.1 2.764H14.5v2h11.317c2.764 0 4.767-2.635 4.027-5.299L26.626 7.113A4.25 4.25 0 0 0 22.531 4H9.471zM14.5 26H24a1 1 0 1 1 0 2H14.47c.02-.164.03-.33.03-.5V26zM4.5 14a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-6zm-2.5.5A2.5 2.5 0 0 1 4.5 12h6a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 2 27.5v-13zM7.5 20a2 2 0 1 0 0-4a2 2 0 0 0 0 4z" fill="currentColor"></path></g></svg>
      <div class="m-auto mb-2 ">កិច្ចប្រជុំ</div>
      <div class="m-auto font-bold text-blue-600 " v-html="total" ></div>
  </div>
  <!-- End Total Meetings -->
</template>
<script >
import { useNotification } from 'naive-ui'
import { ref , computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { authLogout } from './../../../../../plugins/authentication'


export default {
  name: 'TotalAccount',
  components: {
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const notify = useNotification()

    /**
     * Account
     */
    const response = ref(null)
    const total = computed(() => {
        return response.value !== null ? response.value.total : 0 
    })
    function getRecords(){
      store.dispatch('meeting/total').then( res => {
          if( res.data.ok ){
            response.value = res.data.result
          }else{
            response.value = null
          }
      }).catch( err => {
        switch( err.response.status ) {
          case 401 :
            authLogout()
            router.push('/login')
            break;
          default: 
            notify.error({
              title: "អានព័ត៌មានកិច្ចប្រជុំ" ,
              content: "មានបញ្ហាពេលអានកិច្ចប្រជុំ។" ,
              duration: 3000 ,
              background: true
            })
            break;
          }
      })
    }
    
    onMounted( () => {
      getRecords()
    })

    return {
      total
    }
  }
}

</script >