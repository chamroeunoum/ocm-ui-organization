<template>
  <div class="w-full relative flex flex-wrap" >
    <div class="w-full" >
      <div class="font-pvh flex w-full h-16 p-2 mb-4 border-b border-gray-300" >
    <div class="flex-none w-12 h-12">
      <router-link to="/dashboard">
        <img src="./../../../assets/logo.png" class="w-full rounded-full p-1 bg-gray-100" alt="SCT Logo" title="SCT Logo" />
      </router-link>
    </div>
    <div class="flex-grow h-12 text-xl leading-10 text-left pl-4 pt-1 ">{{ systemName }}</div>
    <div class="flex-none ">
      <div @click="welcome" class="flex flex-wrap text-center rounded w-60 p-1 border border-gray-300 cursor-pointer hover:text-blue-400 hover:border-blue-400 duration-300" >
        <svg class="text-red-500 w-8 h-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.166h.333a1.167 1.167 0 0 0 0-2.334H6.5zm.833 1.334H7V12h.333a.167.167 0 0 1 0 .334zM12 11.499a.5.5 0 0 1 .5-.499h.999a.5.5 0 0 1 0 1h-.5v.335h.5a.5.5 0 1 1 0 1h-.5l.001.164a.5.5 0 0 1-1 .002L12 12.834L12 11.499zM9.498 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5H10a1.5 1.5 0 0 0 0-3h-.502zm.5 2v-1H10a.5.5 0 0 1 0 1h-.002zM4 4a2 2 0 0 1 2-2h4.585a1.5 1.5 0 0 1 1.061.44l3.914 3.914a1.5 1.5 0 0 1 .44 1.06v1.668a1.5 1.5 0 0 1 .998 1.414v4.003A1.5 1.5 0 0 1 16 15.913V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.087A1.5 1.5 0 0 1 3 14.5v-4.003A1.5 1.5 0 0 1 4 9.082V4zm11 4h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v4.996h10V8zM5 15.999A1 1 0 0 0 6 17h8a1 1 0 0 0 1-1.001H5zm6-12.792V6.5a.5.5 0 0 0 .5.5h3.293L11 3.207zM4.5 9.996a.5.5 0 0 0-.5.5v4.003a.5.5 0 0 0 .5.5h10.997a.5.5 0 0 0 .5-.5v-4.003a.5.5 0 0 0-.5-.5H4.501z" fill="currentColor"></path></g></svg>
        <div class="leading-9 ml-2" >ស្វែងរកឯកសារជាច្រើនទៀត</div>
      </div>
    </div>
  </div>
      <!-- <div class="w-full grid grid-cols-1 text-md p-4 font-bold text-left border-b border-gray-200 " >
        <div class="w-full"  >
          <div @click="welcome" class="flex flex-wrap text-center rounded w-60 p-2 border border-gray-300 cursor-pointer hover:text-blue-400 hover:border-blue-400 duration-300" >
            <svg class="text-red-500 w-8 h-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.166h.333a1.167 1.167 0 0 0 0-2.334H6.5zm.833 1.334H7V12h.333a.167.167 0 0 1 0 .334zM12 11.499a.5.5 0 0 1 .5-.499h.999a.5.5 0 0 1 0 1h-.5v.335h.5a.5.5 0 1 1 0 1h-.5l.001.164a.5.5 0 0 1-1 .002L12 12.834L12 11.499zM9.498 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5H10a1.5 1.5 0 0 0 0-3h-.502zm.5 2v-1H10a.5.5 0 0 1 0 1h-.002zM4 4a2 2 0 0 1 2-2h4.585a1.5 1.5 0 0 1 1.061.44l3.914 3.914a1.5 1.5 0 0 1 .44 1.06v1.668a1.5 1.5 0 0 1 .998 1.414v4.003A1.5 1.5 0 0 1 16 15.913V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.087A1.5 1.5 0 0 1 3 14.5v-4.003A1.5 1.5 0 0 1 4 9.082V4zm11 4h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v4.996h10V8zM5 15.999A1 1 0 0 0 6 17h8a1 1 0 0 0 1-1.001H5zm6-12.792V6.5a.5.5 0 0 0 .5.5h3.293L11 3.207zM4.5 9.996a.5.5 0 0 0-.5.5v4.003a.5.5 0 0 0 .5.5h10.997a.5.5 0 0 0 .5-.5v-4.003a.5.5 0 0 0-.5-.5H4.501z" fill="currentColor"></path></g></svg>
            <div class="leading-9 ml-2" >ស្វែងរកឯកសារជាច្រើនទៀត</div>
          </div>
        </div>
      </div> -->
      <vue-pdf-embed :source="pdf.url" class="w-full" />
    </div>
    <div class="flex flex-wrap bottom-0 mx-auto w-full fixed z-40">
      <FooterComponent />
    </div>
  </div>
</template>

<script >
import { reactive , computed , ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useDialog, useNotification, useMessage } from 'naive-ui'
import VuePdfEmbed from 'vue-pdf-embed'
import FooterComponent from './../../footer/copy-right.vue'
export default {
  name: 'GlobalShare' ,
  components: {
    VuePdfEmbed ,
    FooterComponent
  },
  setup(){
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const notify = useNotification()

    const systemName = computed( () => {
      return store.state.system.name != "" ? store.state.system.name : 'ប្រព័ន្ធបណ្ដុំឯកសារ'
    })
    
    const pdf = reactive({
      viewer: false ,
      filename: '' ,
      url: ''
    })
    function pdfPreview(serial){
      if( serial ){
        store.dispatch('search_regulator/pdf',{
          serial : serial
        })
          .then( res => {
            pdf.filename = res.data.filename
            pdf.url = res.data.pdf
            pdf.viewer = true
            // notify.success({
            //   title: "បង្ហាញឯកសារយោង" ,
            //   content: res.data.message ,
            //   duration: 3000
            // })
          }).catch( err => {
            notify.error({
              title: "បង្ហាញឯកសារយោង" ,
              content: err.response.data.message ,
              duration: 3000
            })
          })
      }else{
        notify.info({
          title: 'ឯកសារយោង' ,
          description: "មិនមានឯកសារយោងសម្រាប់បង្ហាញ" ,
          duration: 3000
        })  
      }
    }

    function welcome(){
      window.location.href = window.origin+'/#/welcome'
    }

    pdfPreview( route.params.serial )


    return {
      pdf ,
      welcome ,
      systemName
    }
  }
}
</script>