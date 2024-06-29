<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-mask-click="onClose" :on-esc="onClose" transform-origin="center">
        <n-card class="w-1/2 font-pvh text-xl" :title="'បន្ថែម ' + model.title" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="create()" >
              <template #icon>
                <n-icon>
                  <Save20Regular />
                </n-icon>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <!-- Form edit account -->
          <div class="crud-create-form w-full border-t">
            <div class=" mx-auto p-4 flex-wrap">
              <div class="crud-form-panel w-full flex flex-wrap ">
                <n-form 
                  class="w-full text-left font-btb text-lg flex flex-wrap" 
                  :label-width="80"
                  :model="record"
                  :rules="rules"
                  size="large"
                  ref="formRef"
                >
                  <n-form-item label="ឈ្មោះ" path="name" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.name" placeholder="ឈ្មោះថតឯកសារ" @keyup.enter="create()" />
                  </n-form-item>
                </n-form>
                <div class="w-1/2 h-8"></div>  
              </div>
            </div>
          </div>
          <!-- End form edit account -->
          <template #footer></template>
        </n-card>
      </n-modal>
    </div>
    <!-- End of edit account -->
</template>
<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'
import { Save20Regular } from '@vicons/fluent'

export default {
  components: {
    Save20Regular
  },
  props: {
    model: {
      type: Object ,
      required: true ,
      default: () => {
        return reactive({
          name: 'Undefined' ,
          title: 'No title'
        })
      },
      // validator: (val) => {}
    } , 
    record: {
      type: Object ,
      required: false ,
      default: () => {
        return reactive({
          id: 0 ,
          name: ''
        })
      },
      // validator: (val) => {
      //   for(var field in ['id','username','firstname','lastname','email','phone','password','active'] ){
      //     if( !val.hasOwnProperty(field) ) return false
      //   }
      //   return true 
      // }
    },
    show: {
      type: Boolean ,
      default: false
    },
    onClose: {
      type: Function
    } ,
    // onShow: {
    //   type: Function
    // }
  },
  setup(props){
    const store = useStore()
    const message = useMessage()
    const notify = useNotification()
    /**
     * Variables
     */    
    const rules = {
        name: {
          required: true,
          message: 'សូមបញ្ចូលនាម',
          trigger: [ 'blur']
        }
    }
    const helpers = reactive({
      username: false ,
      email: false ,
      phone: false ,
    })
    /**
     * Functions
     */
    function clearRecord(){
      props.record = {
        id : 0 ,
        name: '' 
      }
    }

    function create(){
      if( props.record.name == "" ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបំពេញ ឈ្មោះរបស់ថតឯកសារ។' ,
          duration : 3000
        })
        return false
      }
      store.dispatch( props.model.name+'/create',{
        // id: props.record.id ,
        name: props.record.name
      }).then( res => {
        switch( res.status ){
          case 200 : 
          notify.success({
            'title' : 'រក្សារទុកព័ត៌មាន' ,
            'description' : res.data.message ,
            duration : 3000
          })
          props.record.name = '' 
          props.onClose()
          break;
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : 'មានបញ្ហាក្នុងពេលរក្សារទុកព័ត៌មាន។' ,
          duration : 3000
        })
      })
    }
    

    return {
      /**
       * Variables
       */
      rules ,
      /**
       * Functions
       */
      create
    }
  }
}
</script>