<template>
    <div class="relative flex min-h-screen justify-center " >
      <Transition name="slide-fade" >
      <div v-if="toggleLoginForm" class="w-full p-8">
        <div class="w-20 mx-auto mt-6">
          <img src="./../../assets/logo.svg" class="w-full" >
        </div>
        <div class="text-center" >
          <div class="my-2 font-moul text-yellow-500">ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
          <div class="my-2 text-4xl font-tacteing" >3</div>
          <div class="my-2 font-moul hidden">{{ store.state.company.name }}</div>
          <div class="my-2 font-moul hidden">នាយកដ្ឋានរដ្ឋបាល និងធនធានមនុស្ស</div>
        </div>
        <div class="w-full mx-auto my-2 leading-6 text-center font-moul ">{{ store.state.system.name }}</div>
        <div class="mx-auto mt-8 w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/5 xl:w-1/4 2xl:w-1/5" >
          <div class="w-full mx-auto my-8 text-left hidden">ចូលប្រព័ន្ធ</div>
          <n-space vertical>
            <n-input round 
              placeholder="អ៊ីមែល"
              v-model:value="credentials.email"
              clearable
              @keyup.enter="funcLogin"
              class="text-xs"
            >
              <template #prefix>
                <n-icon size="12" class='text-gray-600 ' >
                  <component :is="AlternateEmailOutlined" />
                </n-icon>
              </template>
            </n-input>
            <n-input round 
              placeholder="ពាក្យសំងាត់"
              v-model:value="credentials.password"
              type="password"
              clearable
              @keyup.enter="funcLogin"
              class="text-xs"
            >
              <template #prefix>
                <n-icon size="12" class='text-gray-600 ' >
                  <component :is="Key20Regular" />
                </n-icon>
              </template>
            </n-input>
          </n-space>
        </div>
        <div class="w-full my-8">
          <n-button type="success" class="w-24 m-2 " :loading="loading" @click="funcLogin"  >
            ចូល
            <template #icon>
              <n-icon size="16" >
                <login />
              </n-icon>
            </template>
          </n-button>
          <!-- <n-button type="default" class="m-2" @click="$router.push('/tvsony43')"  >
            កាលវិភាគប្រជុំ
            <template #icon>
              <svg class="text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M2.742 3.459A2 2 0 0 1 4.668 2h6.668a2 2 0 0 1 1.926 1.459l1.66 5.898A2.08 2.08 0 0 1 12.917 12H7.002v-1h5.916a1.08 1.08 0 0 0 1.04-1.372l-1.66-5.899A1 1 0 0 0 11.337 3H4.668a1 1 0 0 0-.963.73L3.348 5H2.5c-.066 0-.13.003-.194.007l.435-1.548zM6.952 14h4.551a.5.5 0 1 0 0-1h-4.5v.5c0 .171-.018.338-.05.5zM3.501 9.5a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5zM1 7.5A1.5 1.5 0 0 1 2.5 6h2.001a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 1 13.5v-6zM2.5 7a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h2.001a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-2z" fill="currentColor"></path></g></svg>
            </template>
          </n-button> -->
        </div>
      </div>
    </Transition>
    <div class="fixed bottom-0 mx-auto w-full">
      <FooterComponent />
    </div>

  </div>
</template>
<script>
import { getUser } from './../../plugins/authentication'
import { getMaxUploadFilesize, setMaxUploadFilesize } from './../../plugins/file'
import { getRoutes } from './../../plugins/route'
import FooterComponent from './../../components/footer/copy-right.vue'
import { Key20Regular } from "@vicons/fluent";
import { AlternateEmailOutlined , PersonOutlined, VpnKeyOutlined, EmailOutlined } from '@vicons/material'
import { Login, DocumentPdf } from '@vicons/carbon'
import { ref, reactive , onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useNotification , useMessage } from 'naive-ui'

export default {
  name: 'LoginTemplate' ,
  components: {
    Login ,
    DocumentPdf ,
    FooterComponent,
    PersonOutlined ,
    VpnKeyOutlined ,
    EmailOutlined 
  },
  setup(){
    /**
     * Components to use
     */
    const store = useStore()
    const router = useRouter()
    const notify = useNotification()
    const message = useMessage()
    const toggleLoginForm = ref(false)

    if( getUser() !== undefined && getUser() !== null ){
      router.push('/search')  
    }
    
    /**
     * Data
     */
    const credentials = reactive({
        email: '' ,
        password: '' ,
      })
    const loading = ref( false )
    /**
     * Login function
     */
    function funcLogin(){
      if( credentials.email == "" || credentials.email == null ){
        message.warning("សូមបញ្ចូលអ៊ីមែលរបស់អ្នក រួចព្យាយាមម្ដងទៀត បាទ។")
        return false
      }
      if( credentials.password == "" || credentials.password == null ){
        message.warning("សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក រួចព្យាយាមម្ដងទៀត បាទ។")
        return false
      }
      loading.value = true
      store.dispatch('auth/login',{
        email: credentials.email ,
        password: credentials.password
      }).then( res => {
        if( res.data.ok ){
          /**
           * Store the authenticated user into the store
           */
          store.commit('auth/setAuthentication',{
            user: res.data.record ,
            token: res.data.token ,
          })

          setMaxUploadFilesize( parseFloat( res.data.upload_max_filesize.replace( 'M' , '' ) ) )

          let routes = router.getRoutes()
          for(let i in routes ){
            router.hasRoute( routes[i].name ) ? router.removeRoute( routes[i].name ) : false
          }
          routes = getRoutes()
          for(let i in routes ){
            router.addRoute( routes[i] )
          }

          message.success("សូមស្វាគមន៍ !")
          router.push('/')
          // if( res.data.user.role == 1 ){
          //   this.$router.push('/dashboard')
          // }else{
          //   this.$router.push('/receive')
          // }
        }else{
          message.error( res.data.message )
        }
        loading.value = false
      }).catch( err => {
        loading.value = false
        if( err.response !== null ){
          console.log( err )
          let messageText = err.response.status + ": " + err.response.statusText + "."
          if( err.response.data !== null ){
            for(var key in err.response.data.errors ){
              messageText += err.response.data.errors[key]
            }  
          }
          message.error( err.response.data.message + " ( " + messageText + " ) " )
        }else{
          console.log( err.response )
        }
      });
    }

    onMounted( () => {
      setTimeout( function(){
        toggleLoginForm.value = true
      } , 200 )
    })
    /**
     * End login function
     */
    return {
      /**
       * data
       */
      credentials ,
      loading, 
      store ,
      toggleLoginForm ,
      /**
       * Functions
       */
      funcLogin ,
      /**
       * Components
       */
      Key20Regular ,
      AlternateEmailOutlined
    }
  },
  mounted(){
    // console.log( this.credentials )
  }
}
</script>
<style scoped >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.8rem;
}
/**
Transition
*/

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
