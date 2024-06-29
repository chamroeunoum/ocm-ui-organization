<template>
  <div class="w-full" >
    <div class="w-full leading-9 font-moul -mt-12 mb-4 text-left pl-16" v-html="model.title" ></div>
    <div class="flex justify-center p-8">
      <div class="w-1/5 p-4 " @click="$router.push('/reports/totalbyorganization')" >
        <div class="font-moul border border-gray-200 rounded bg-gray-100 p-8 cursor-pointer hover:shadow hover:border-gray-300 duration-500 " >បូកសរុបកិច្ចប្រជុំតាមក្រសួង</div>
      </div>
      <div class="w-1/5 p-4 " @click="$router.push('/reports/totalbyleader')" >
        <div class="font-moul border border-gray-200 rounded bg-gray-100 p-8 cursor-pointer hover:shadow hover:border-gray-300 duration-500 " >បូកសរុបកិច្ចប្រជុំតាមថ្នាក់ដឹកនាំ</div>
      </div>
    </div>
  </div>
</template>
<script>
import { isAuth, getUser , authLogout } from './../../plugins/authentication.js'
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import dateFormat from 'dateformat'
import { useDialog , useMessage , useNotification } from 'naive-ui'

export default {
  name: "TotalMeetingReport" ,
  components: {
    // Form
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    
    const model = reactive({
      name: 'report' ,
      title: 'របាយការណ៍'
    })
    return {
      /**
       * Variables
       */
      model
    }
  }
}

</script>
