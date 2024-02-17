<template >
  <!-- Total Meetings -->
  <div class="flex flex-wrap justify-center pb-4" >
    <div class="flex border-b border-gray-200 pb-2 w-full mb-4" >
      <svg class="hidden flex-none w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M9.472 4a4.25 4.25 0 0 0-4.095 3.113L4.436 10.5L4.5 10.5h2.01l.793-2.852A2.25 2.25 0 0 1 9.472 6H22.53a2.25 2.25 0 0 1 2.168 1.648l3.219 11.588a2.18 2.18 0 0 1-2.1 2.764H14.5v2h11.317c2.764 0 4.767-2.635 4.027-5.299L26.626 7.113A4.25 4.25 0 0 0 22.531 4H9.471zM14.5 26H24a1 1 0 1 1 0 2H14.47c.02-.164.03-.33.03-.5V26zM4.5 14a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-6zm-2.5.5A2.5 2.5 0 0 1 4.5 12h6a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 2 27.5v-13zM7.5 20a2 2 0 1 0 0-4a2 2 0 0 0 0 4z" fill="currentColor"></path></g></svg>
      <div class="flex-grow font-moul text-xs leading-7 text-left ml-1 ">សរុបកិច្ចប្រជុំតាមប្រភេទ</div>
      <div class="font-bold flex-none w-20 text-right leading-6 text-blue-600 " v-html="total" ></div>
    </div>
    <div v-for="(meeting,index) in meetings" :key="index" @click="$router.push('/meetings')" 
      class="'flex flex-wrap justify-center border border-gray-200 hover:border-blue-400 duration-300 m-4 p-8 rounded cursor-pointer font-bold" 
    >
      <div class="w-full text-center mb-4 " >{{ meeting.type.name }}</div>
      <div class="w-full text-center text-blue-500 " >{{  meeting.total }}</div>
    </div>
  </div>
  <!-- End Total Meetings -->
</template>
<script >
import { useNotification } from 'naive-ui'
import { ref, reactive, computed, onMounted } from 'vue'
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
    const statusCodes = [0,1,2,4,8,16] ;
    const statuses = reactive([
      {
        label: 'ថ្មី' ,
        value : 0 ,
        color: ' text-blue-600 ' 
      } ,
      {
        label: 'កំពុងប្រជុំ' ,
        value : 1 ,
        color: ' text-green-600' 
      } ,
      {
        label: 'នៅបន្ត' ,
        value : 2 ,
        color: ' text-pink-600' 
      } ,
      {
        label: 'ប្ដូរ' ,
        value : 4 ,
        color: ' text-brown-600' 
      } ,
      {
        label: 'ពន្យាពេល' ,
        value : 8 ,
        color: ' text-yellow-600' 
      } ,
      {
        label: 'ចប់' ,
        value : 16 ,
        color: ' text-red-600' 
      }
    ])
    
    const response = ref(null)
    const total = computed(() => {
        return response.value !== null ? (
          response.value.reduce( ( accumulator , meeting ) => {
            return accumulator + meeting.total
          } , 0 )
        ) : 0 
    })
    const meetings = computed(() => {
        return response.value !== null ? response.value : 0 
    })
    function getRecords(){
      store.dispatch('meeting/totalByType').then( res => {
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
              content: "មានបញ្ហាពេលអានព័ត៌មានកិច្ចប្រជុំ។" ,
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
      /**
       * Variables
       */
      /**
       * Computed
       */
      total ,
      meetings ,
      /**
       * Functions
       */
    }
  }
}

</script >