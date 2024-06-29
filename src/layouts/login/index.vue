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
          <div class="my-2 font-moul hidden">នាយកដ្ឋានឯកសារអេឡិចត្រូនិចនិងព័ត៌មានវិទ្យា</div>
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
          <!-- <n-button type="default" class="w-24 m-2" @click="$router.push('/search')"  >
            ស្វែងរក
            <template #icon>
              <n-icon size="16" class='text-red-500 ' >
                <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.166h.333a1.167 1.167 0 0 0 0-2.334H6.5zm.833 1.334H7V12h.333a.167.167 0 0 1 0 .334zM12 11.499a.5.5 0 0 1 .5-.499h.999a.5.5 0 0 1 0 1h-.5v.335h.5a.5.5 0 1 1 0 1h-.5l.001.164a.5.5 0 0 1-1 .002L12 12.834L12 11.499zM9.498 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5H10a1.5 1.5 0 0 0 0-3h-.502zm.5 2v-1H10a.5.5 0 0 1 0 1h-.002zM4 4a2 2 0 0 1 2-2h4.585a1.5 1.5 0 0 1 1.061.44l3.914 3.914a1.5 1.5 0 0 1 .44 1.06v1.668a1.5 1.5 0 0 1 .998 1.414v4.003A1.5 1.5 0 0 1 16 15.913V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.087A1.5 1.5 0 0 1 3 14.5v-4.003A1.5 1.5 0 0 1 4 9.082V4zm11 4h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v4.996h10V8zM5 15.999A1 1 0 0 0 6 17h8a1 1 0 0 0 1-1.001H5zm6-12.792V6.5a.5.5 0 0 0 .5.5h3.293L11 3.207zM4.5 9.996a.5.5 0 0 0-.5.5v4.003a.5.5 0 0 0 .5.5h10.997a.5.5 0 0 0 .5-.5v-4.003a.5.5 0 0 0-.5-.5H4.501z" fill="currentColor"></path></g></svg>
              </n-icon>
            </template>
          </n-button> -->
          <n-button type="success" class="w-24 m-2 " :loading="loading" @click="funcLogin"  >
            ចូល
            <template #icon>
              <n-icon size="16" >
                <login />
              </n-icon>
            </template>
          </n-button>
        </div>
        <!-- <div class="w-full mt-8 flex justify-center text-xs">
          <router-link to="/register" class="mr-1 p-2 " >
            <n-icon size="18" class='text-blue-500 pt-1' ><PersonOutlined /></n-icon>ចូលជាសមាជិក
          </router-link>
          <router-link to="/password/forgot" class="ml-1 p-2 "  >
            <n-icon size="18" class='text-blue-500 mr-1 pt-1' ><VpnKeyOutlined /></n-icon>ភ្លេចពាក្យសម្ងាត់ ?
          </router-link>
        </div>
        <div class="w-full mt-8 hidden text-xs">
          ចូលប្រើប្រាស់តាមរយះ គណនី
          <div class="g-signin2 w-20 h-20" data-onsuccess="onSignIn"></div>
        </div>
        <div class="w-full mt-8 hidden">
          <div class="mx-auto underline mb-4 text-xs" >ទំនាក់ទំនងមកយើងខ្ញុំ</div>
          <a class="w-50 mx-2 text-xs" target="_blank_" href="https://t.me/edmsocm"  >
            <n-icon size="22" class=' pt-1 mr-2 ' >
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="text-blue-500" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38z" fill="currentColor"></path></svg>
            </n-icon>តេលេក្រាម
          </a>
          <a class="w-50 mx-2 text-xs"  href="mailto:edmsocm@gmail.com" >
            <n-icon size="22" class='text-blue-500 pt-1 mr-2 ' ><EmailOutlined /></n-icon>អ៊ីមែល
          </a>
        </div> -->
      </div>
    </Transition>
    <div class="fixed bottom-0 mx-auto w-full">
      <FooterComponent />
    </div>
    <FrameCorner4Component />
  </div>
</template>
<script>
import { getUser } from './../../plugins/authentication'
import { getMaxUploadFilesize, setMaxUploadFilesize } from './../../plugins/file'
import { getRoutes } from './../../plugins/route'
import FooterComponent from './../../components/footer/copy-right.vue'
import FrameCorner4Component from './../../components/widgets/frame/corner4.vue'
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
    EmailOutlined ,
    FrameCorner4Component
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
      AlternateEmailOutlined ,
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
