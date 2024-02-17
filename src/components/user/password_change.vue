<template>
  <top-menu />
  <div class="w-full leading-9 font-moul -mt-12 mb-4 text-left pl-16" v-html="model.title" ></div>
  <div class="w-full " >
    <!-- Title of crud -->
    <div class="flex w-full border-b py-3 title mt px-4 hidden" >
      <svg class="w-8 h-8 cursor-pointer text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2zm0 16a7.013 7.013 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18z" fill="currentColor"></path><circle cx="22" cy="10" r="2" fill="currentColor"></circle></svg>
      <div class="leading-9 font-moul ml-2" >ប្ដូរពាក្យសម្ងាត់</div>
    </div>
    <div class="w-full">
      <div class="flex w-full title-bar px-4 py-4 ">
        <!-- Actions button of the crud -->
        <div class="flex-grow action-buttons flex-row-reverse flex">
          <!-- New Button -->
          <div class="mt-1 ml-2">
            <!-- <n-button type="default" @click="$router.push('/welcome')" class="mx-2 "  >
              <template #icon>
                <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.166h.333a1.167 1.167 0 0 0 0-2.334H6.5zm.833 1.334H7V12h.333a.167.167 0 0 1 0 .334zM12 11.499a.5.5 0 0 1 .5-.499h.999a.5.5 0 0 1 0 1h-.5v.335h.5a.5.5 0 1 1 0 1h-.5l.001.164a.5.5 0 0 1-1 .002L12 12.834L12 11.499zM9.498 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5H10a1.5 1.5 0 0 0 0-3h-.502zm.5 2v-1H10a.5.5 0 0 1 0 1h-.002zM4 4a2 2 0 0 1 2-2h4.585a1.5 1.5 0 0 1 1.061.44l3.914 3.914a1.5 1.5 0 0 1 .44 1.06v1.668a1.5 1.5 0 0 1 .998 1.414v4.003A1.5 1.5 0 0 1 16 15.913V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.087A1.5 1.5 0 0 1 3 14.5v-4.003A1.5 1.5 0 0 1 4 9.082V4zm11 4h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v4.996h10V8zM5 15.999A1 1 0 0 0 6 17h8a1 1 0 0 0 1-1.001H5zm6-12.792V6.5a.5.5 0 0 0 .5.5h3.293L11 3.207zM4.5 9.996a.5.5 0 0 0-.5.5v4.003a.5.5 0 0 0 .5.5h10.997a.5.5 0 0 0 .5-.5v-4.003a.5.5 0 0 0-.5-.5H4.501z" fill="currentColor"></path></g></svg>
              </template>
              ស្វែងរកឯកសារ
            </n-button> -->
          </div>
          <div class="w-2/5 relative" ></div>
          <div class="mt-1 ml-2"></div>
        </div>
      </div>
      <Transition name="slide-fade" >
        <div  v-if="transitionHelper" class="bg-white passwordChange p-8 sm:w-2/3 md:w-3/5 lg:w-2/5 w-4/5 mx-auto border mb-8 relative">
          <div class="profileImage border rounded-full border-gray-200 p-2 w-40 h-40 flex-none mx-auto overflow-hidden bg-center bg-no-repeat bg-80% bg-white" style=" background-image: url('/src/assets/logo.png'); " ></div>
          <div class="my-12">
            <n-form
            ref="formRef"
            label-placement="left"
            label-width="120"
            :model="model" 
            :rules="rules"
            >
              <div class="w-full mb-8  text-left text-md font-bold" >សូមបញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នកក្នុងប្រអប់ខាងក្រោម ៖</div>
              <n-form-item-row  path="password"  label="ពាក្យសម្ងាត់" class="text-md" >
                <n-input type="password" placeholder="ពាក្យសម្ងាត់" class="text-left text-md" v-model:value="model.password" />
              </n-form-item-row>
              <n-form-item-row  path="confirmPassword"  label="បញ្ជាក់ពាក្យសម្ងាត់"  class="text-md">
                <n-input type="password" placeholder="បញ្ជាក់ពាក្យសម្ងាត់" class="text-left text-md" v-model:value="model.confirmPassword" />
              </n-form-item-row>
            </n-form>
            <n-button class="mx-8 w-32 my-1 text-md" @click="changePassword()" >ប្ដូរពាក្យសម្ងាត់</n-button>
          </div>
        </div>
      </Transition>
    </div>
    <div class="flex flex-wrap bottom-0 mx-auto w-full fixed z-40">
      <FooterComponent />
    </div>
  </div>
</template>
<script >
import { getUser , authLogout } from '../../plugins/authentication'
import { reactive , ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useNotification } from 'naive-ui'
import TopMenu from './../menu/topmenu-floattop.vue'
import FooterComponent from './../footer/copy-right.vue'

  export default {
    name: 'Profile' ,
    components: {
      FooterComponent ,
      TopMenu
    },
    setup(){
      const router = useRouter()
      const store = useStore()
      const notify = useNotification()
      const transitionHelper = ref(false)
      
      setTimeout(function(){
        transitionHelper.value = true
      },300)

      const model = reactive({
          password: '' ,
          confirmPassword: '' ,
          title: 'ប្ដូរពាក្យសម្ងាត់'
      })

      const rules = {
          password: [
              { required: true, message: 'សូមបញ្ចូលពាក្យសម្ងាត់!', trigger: 'blur' }
          ],
          confirmPassword: [
              { required: true, message: 'សូមបញ្ចូលពាក្យសម្ងាត់ម្ដងទៀតដើម្បីបញ្ជាក់!', trigger: 'blur' }
          ]
      }

      function changePassword(){
        if( model.password == '' || model.confirmPassword == '' ){
            notify.warning({  
                title: 'ពិនិត្យពាក្យសម្ងាត់' ,
                content: 'សូមបំពេញ ពាក្យសម្ងាត់ និង បញ្ជាក់ពាក្យសម្ងាត់។' ,
                duration: 1000
            })
          return false
        }
        if( model.password !== model.confirmPassword ) {
            notify.warning({
                title: 'ពិនិត្យពាក្យសម្ងាត់' ,
                content: 'សូមប្រាកដថា ពាក្យសម្ងាត់ និង បញ្ជាក់ពាក្យសម្ងាត់ គឺដូចគ្នា។' ,
                duration: 1000
            })
            return false
        }
        store.dispatch('user/passwordChange',{
            email: getUser().email ,
            password: model.password
        }).then( res => {
            if( res.data.ok ){
                notify.success({
                    title: 'ប្ដូរពាក្យសម្ងាត់ថ្មី' ,
                    content: res.data.message ,
                    duration: 1000
                })
                // authLogout()
                router.push({
                    name: "Login" ,
                    params: {
                        email: getUser().email
                    }
                })
            }else{
                notify.warning({
                    title: 'ប្ដូរពាក្យសម្ងាត់ថ្មី' ,
                    content: res.data.message ,
                    duration: 1000
                })
            }
        }).catch( err => {
            notify.error({
                title: 'ប្ដូរពាក្យសម្ងាត់ថ្មី' ,
                content: err.response.data.message ,
                duration: 3000
            })
        })
      }

      return {
        model ,
        rules ,
        changePassword ,
        transitionHelper
      }
    }

  }
</script>