<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-mask-click="closeModal" transform-origin="center" :on-after-enter="initial" class=" relative min-h-screen" >
        <n-card class="w-11/12 font-pvh text-xl relative min-h-screen">
          <div class="w-full pb-4 font-moul border-b border-gray-200 mb-4" >សវតានៃកិច្ចប្រជុំ
            <div class="w-full text-center font-moul" >{{ topMeetingObjective }}</div>
          </div>
          <div class="flex w-full flex-wrap" >
            <table v-if="legalDraft != null && Array.isArray( legalDraft.meetings ) && legalDraft.meetings.length > 0 " class="vcb-table border border-gray-300 rounded-lg" >
              <tr class="vcb-table-headers bg-gray-300" >
                <th class="vcb-table-header" >ល.រ</th>
                <th class="vcb-table-header">ខ្លឹមសារ</th>
                <th class="vcb-table-header">ថ្ងៃប្រជុំ</th>
                <th class="vcb-table-header">ចាប់ផ្ដើម</th>
                <th class="vcb-table-header">បញ្ចប់</th>
                <th class="vcb-table-header">ប្រភេទប្រជុំ</th>
                <th class="vcb-table-header text-center w-28">ស្ថានភាព</th>
              </tr>
              <tr v-for="(record, index) in legalDraft.meetings" :key='index' :class=" 'vcb-table-row hover:bg-gray-200 duration-500 ' + ( index % 2 ? ' bg-gray-100 ' : ' bg-gray-50 ' ) " >
                <td class="vcb-table-cell font-bold w-12" >{{ index + 1 }}</td>
                <td class="main-cell vcb-table-cell flex flex-wrap justify-content relative" >
                  <div class="w-full py-2" >{{ record.objective }}</div>

                  <div v-if="Array.isArray( record.organizations ) && record.organizations.length > 0" class="pr-4 flex text-gray-600" >
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg class="cursor-pointer w-4 text-yellow-600 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g fill="none"><path d="M24 14.001a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm1.346-9.554a2.25 2.25 0 0 0-2.692 0L6.71 16.349c-1.35 1.007-.637 3.152 1.046 3.152H9v12.005a5.25 5.25 0 0 0-3 4.744v3.5c0 .69.56 1.25 1.25 1.25h33.5c.69 0 1.25-.56 1.25-1.25v-3.5a5.25 5.25 0 0 0-3-4.744V19.5h1.244c1.684 0 2.396-2.145 1.047-3.152L25.346 4.447zM36.5 31H32V19.5h4.5V31zm-7 0h-4.25V19.5h4.25V31zm-6.75 0H18.5V19.5h4.25V31zM16 31h-4.5V19.5H16V31zm-5.986-13.999L24 6.561l13.985 10.44H10.014zM8.5 36.251a2.75 2.75 0 0 1 2.75-2.75h25.5a2.75 2.75 0 0 1 2.75 2.75v2.25h-31v-2.25z" fill="currentColor"></path></g></svg>
                      </template>
                      ក្រសួងស្ថាប័ន
                    </n-tooltip>
                    {{ record.organizations.map( o => o.name ).join( ' , ' ) }}
                  </div>
                  
                  <div v-if="Array.isArray( record.rooms ) && record.rooms.length > 0" class="pr-4 flex text-gray-600" >
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg class="cursor-pointer w-4 text-yellow-600 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28"><g fill="none"><path d="M11.894 2.014l11.5 2.25A.75.75 0 0 1 24 5v18a.75.75 0 0 1-.606.736l-11.5 2.25A.75.75 0 0 1 11 25.25V2.75a.75.75 0 0 1 .894-.736zm.606 1.647V24.34l10-1.956V5.618l-10-1.957zm-2.5.84V6H5.5v16H10v1.5H4.75a.75.75 0 0 1-.743-.649L4 22.75V5.25a.75.75 0 0 1 .648-.743L4.75 4.5H10zm5 8.5a1 1 0 1 1 0 2a1 1 0 0 1 0-2z" fill="currentColor"></path></g></svg>
                      </template>
                      សាលប្រជុំ
                    </n-tooltip>
                    {{ record.rooms.map( o => o.name ).join( ' , ' ) }}
                  </div>

                  <!-- Lead by -->
                  <div class="w-full text-gray-600 my-2" >{{ record.listMembers.length > 0 
                  ? "ដឹកនាំប្រជុំដោយ៖ " + 
                    record.listMembers.filter( (memberInList) => memberInList.role == 'leader' && memberInList.group == 'lead_meeting' ).map( (memberInList) => 
                      ( 
                        memberInList.member.countesies != undefined && memberInList.member.countesies.length > 0  
                        ? memberInList.member.countesies.map( (c) => c.name ).join(' ') + ' ' 
                        : '' 
                      ) 
                      + ( memberInList.member.lastname + " " + memberInList.member.firstname + " ")
                      + ( 
                        memberInList.member.positions != undefined && memberInList.member.positions.length > 0  
                        ? memberInList.member.positions.map( (p) => p.name ).join(' ') + ' ' 
                        : '' 
                      ) 
                    ).join(' - ') 
                  : '' }}</div>

                </td>
                <td class="vcb-table-cell w-40" >{{ record.date }}</td>
                <td  class="vcb-table-cell w-28" >{{ record.start }}</td>
                <td  class="vcb-table-cell w-28" >{{ record.end }}</td>
                <td class="vcb-table-cell w-48" >{{ record.type != undefined ? record.type.name : '' }}</td>
                <td :class=" 'vcb-table-cell w-28 font-btb-black ' + ( statuses.find( (g) => g.value == record.status ).color ) " >
                  {{ statuses.find( (g) => g.value == record.status ).label }}
                </td>
              </tr>
            </table>
            <div v-if="legalDraft != null && Array.isArray( legalDraft.meetings ) && legalDraft.meetings.length > 0 " class="my-4 w-full" >
              <div class="w-1/4 border border-gray-300 bg-gray-100 rounded p-4 my-2 " >ចំនួនថ្ងៃប្រើប្រាស់ដើម្បីប្រជុំ ៖ {{ total != null ? ( parseInt( total.days ) + " ថ្ងៃ " ): "0 ថ្ងៃ" }}</div>
              <div class="w-1/4 border border-gray-300 bg-gray-100 rounded p-4 my-2 " >ចំនួនម៉ោងប្រើប្រាស់ដើម្បីប្រជុំ ៖ {{ total != null ? ( parseInt( total.time / 60 ) + ' ម៉ោង' ) : "0 ម៉ោង" }}</div>
              <div class="w-1/4 border border-gray-300 bg-gray-100 rounded p-4 my-2 " v-if="total != null " >
                ប្រភេទកិច្ចប្រជុំបានឆ្លងកាត់ ៖
                <div class="font-sr ml-4" v-for="(type,index) in total.types.records" >{{ (index+1) }}. {{ type.type.name + " ចំនួន " + type.total + " ដង" }}</div>
              </div>
              <!-- <div class="w-1/4" v-if="total != null " >
                <div class="" v-for="(status,index) in total.statuses" >{{ status.status.name + " " + status.total }}</div>
              </div> -->
            </div>
            <div v-else class="text-xl text-gray-500 text-center place-items-center place-content-center w-full h-60 flex" >
              មិនមានកិច្ចប្រជុំទេ។
            </div> 
          </div>
        </n-card>
      </n-modal>
    </div>
    <!-- End of edit account -->
</template>
<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification, useDialog } from 'naive-ui'
import { Save20Regular } from '@vicons/fluent'
import { DocumentPdf24Regular } from '@vicons/fluent'
import dateFormat from "dateformat";

export default {
  components: {
    
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
          start: '' ,
          end: '' ,
          type_id: null ,
          type: null ,
          status: null ,
          objective: '' ,
          contact_info: '' ,
          date: new Date() ,
          seichdeyPreeng: [] ,
          reports: [] ,
          other_documents: [] ,
          organizations: [] ,
          listMembers: [] ,
          regulators: [] ,
          places: []
        })
      }
    },
    show: {
      type: Boolean ,
      default: false
    },
    onClose: {
      type: Function
    }
  },
  setup(props){
    const store = useStore()
    const message = useMessage()
    const notify = useNotification()
    const dialog = useDialog()
    const btnSavingLoadingRef = ref(false)
    const legalDraft = ref(null)
    const total = ref(null)
    const topMeetingObjective = computed( () => {
      return props.record.objective != "" ? props.record.objective : '' 
    })

    const statuses = reactive([
      {
        label: 'ទាំងអស់' ,
        value : 0 ,
        color: 'text-gray-200'
      },
      {
        label: 'ថ្មី' ,
        value : 1 ,
        color: ' text-blue-600 ' 
      } ,
      {
        label: 'កំពុងប្រជុំ' ,
        value : 2 ,
        color: ' text-green-600' 
      } ,
      {
        label: 'នៅបន្ត' ,
        value : 4 ,
        color: ' text-yellow-600' 
      } ,
      {
        label: 'ប្ដូរ' ,
        value : 8 ,
        color: ' text-pink-600' 
      } ,
      {
        label: 'ពន្យាពេល' ,
        value : 16 ,
        color: ' text-brown-600' 
      } ,
      {
        label: 'ចប់' ,
        value : 32 ,
        color: ' text-gray-600' 
      }
    ])

    function closeModal(){
      if( props.show == true ){
        props.onClose()
      }
    }

    /**
     * Get meeting history
     */
    function getMeetingHistory(){
      store.dispatch('meeting/history',{id:props.record.id}).then(
        res => {
          if( res.data.ok ){
            legalDraft.value = res.data.record
            total.value = res.data.total
          }
        }
      ).catch( 
        e => {
          console.log( e.response )
        }
      )
    }
    

    function initial(){
      getMeetingHistory()
    }

    return {
      /**
       * Variables
       */
       legalDraft ,
       statuses ,
       total ,
      /**
       * Computed
       */
      topMeetingObjective ,
      /**
       * Member add drawer
       */
      
      /**
       * Functions
       */
      initial ,
      
      closeModal
    }
  }
}
</script>
<style type="text/css" scoped >
</style>