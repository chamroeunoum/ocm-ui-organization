<template>
  <div class="w-full relative" >
    <div class="w-full leading-9 font-moul -mt-12 mb-2 text-left pl-16 z-45" v-html="model.title" ></div>
    <div class="w-full text-left flex p-4 bg-gray-100 z-40 print:hidden">
      <n-button type="default" class="w-40 bg-white" @click="$router.push('/reports')" >បកក្រោយ</n-button>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-select class="flex-grow ml-4" @update:value="updateOrganization" :options="optionOrganizations" filterable placeholder="សូមជ្រើសរើសក្រសួងស្ថាប័ន" />
        </template>
        សូមជ្រើសរើសក្រសួងស្ថាប័ន ដើម្បីផលិតរបាយការណ៍
      </n-tooltip>
      
      <n-tooltip trigger="hover" v-if="false">
        <template #trigger>
          <svg class="ml-4 border border-gray-300 rounded-full w-10 p-1 bg-white printer_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V5h.5A2.5 2.5 0 0 1 18 7.5v5a1.5 1.5 0 0 1-1.5 1.5H15v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-5A2.5 2.5 0 0 1 4.5 5H5v-.5zM6 5h8v-.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V5zm-1 8v-1.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V13h1.5a.5.5 0 0 0 .5-.5v-5A1.5 1.5 0 0 0 15.5 6h-11A1.5 1.5 0 0 0 3 7.5v5a.5.5 0 0 0 .5.5H5zm1.5-2a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-7z" fill="currentColor"></path></g></svg>
        </template>
        បោះពុម្ភរបាយការណ៍
      </n-tooltip>
      
    </div>
    <div id="report" class="report w-full p-16 flex flex-wrap
    print:absolute print:top-0 print:left-0 print:right-0 print:bottom-0
    print:z-50 print:p-0 print:m-0 
    print:flex print:flex-wrap
    " >
      <div class="page relative w-a4w h-a4h my-8 mx-auto shadow-lg rounded-lg border border-gray-200 print:border-none print:rounded-none print:border-0 print:shadow-none print:my-0 print:mt-2 " style="page-break-after: always;" >
        <div class="sub-page relative p-8" >
          <!-- <div class="document-identification-number absolute left-0 top-40 hidden" style="color: #042fa2; " >
            <div class="font-moul text-left text-md" >រាជរដ្ឋាភិបាលកម្ពុជា</div>
            <div class="font-moul text-left text-md flex" >
              <div class="font-moul w-16" >លេខចុះ៖</div>
              <div class="flex-grow leading-7">........................</div>
            </div>
          </div> -->
          <!-- Header -->
          <div class="report-header first:visible" style="color: #042fa2; " >
            <img class="w-24 h-24 flex-none mx-auto bg-center bg-no-repeat bg-contain " src="/src/assets/royallogoblue.png" />
            <div class="font-moul text-md" >ព្រះរាជាណាចក្រកម្ពុជា</div>
            <div class="font-moul text-md" >ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
            <div class="font-tacteing text-md" >rriss</div>
            <div v-if="organization!=null" class="report-title font-moul mt-8 text-md" >សរុបរបាយការណ៍កិច្ចប្រជុំដែលស្នើរមកពី<br/>{{ organization.name }}</div>
          </div>
          <!-- Objective -->
          <div v-if="organization!=null" class="report-content text-xs my-4 leading-8 text-left" >
            <table v-if="organization.meetings.length > 0 " class="vcb-table rounded-lg" >
              <tr class="vcb-table-headers" >
                <th class="vcb-table-header" >ល.រ</th>
                <th class="vcb-table-header">ខ្លឹមសារ</th>
              </tr>
              <tr v-for="(record, index) in organization.meetings" :key='index' class=" vcb-table-row" >
                <td class="vcb-table-cell font-bold w-12" >{{ index + 1 }}</td>
                <td class="main-cell vcb-table-cell flex flex-wrap justify-content relative" >
                  <div class="w-full py-2" >{{ record.objective }}</div>
                  <div v-show="false"  v-if="Array.isArray( record.organizations ) && record.organizations.length > 0" class="pr-4 flex text-gray-600" >
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg class="cursor-pointer w-4 text-yellow-600 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g fill="none"><path d="M24 14.001a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm1.346-9.554a2.25 2.25 0 0 0-2.692 0L6.71 16.349c-1.35 1.007-.637 3.152 1.046 3.152H9v12.005a5.25 5.25 0 0 0-3 4.744v3.5c0 .69.56 1.25 1.25 1.25h33.5c.69 0 1.25-.56 1.25-1.25v-3.5a5.25 5.25 0 0 0-3-4.744V19.5h1.244c1.684 0 2.396-2.145 1.047-3.152L25.346 4.447zM36.5 31H32V19.5h4.5V31zm-7 0h-4.25V19.5h4.25V31zm-6.75 0H18.5V19.5h4.25V31zM16 31h-4.5V19.5H16V31zm-5.986-13.999L24 6.561l13.985 10.44H10.014zM8.5 36.251a2.75 2.75 0 0 1 2.75-2.75h25.5a2.75 2.75 0 0 1 2.75 2.75v2.25h-31v-2.25z" fill="currentColor"></path></g></svg>
                      </template>
                      ក្រសួងស្ថាប័ន
                    </n-tooltip>
                    {{ record.organizations.map( o => o.name ).join( ' , ' ) }}
                  </div>
                  
                  <div v-show="false"  v-if="Array.isArray( record.rooms ) && record.rooms.length > 0" class="pr-4 flex text-gray-600" >
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg class="cursor-pointer w-4 text-yellow-600 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28"><g fill="none"><path d="M11.894 2.014l11.5 2.25A.75.75 0 0 1 24 5v18a.75.75 0 0 1-.606.736l-11.5 2.25A.75.75 0 0 1 11 25.25V2.75a.75.75 0 0 1 .894-.736zm.606 1.647V24.34l10-1.956V5.618l-10-1.957zm-2.5.84V6H5.5v16H10v1.5H4.75a.75.75 0 0 1-.743-.649L4 22.75V5.25a.75.75 0 0 1 .648-.743L4.75 4.5H10zm5 8.5a1 1 0 1 1 0 2a1 1 0 0 1 0-2z" fill="currentColor"></path></g></svg>
                      </template>
                      សាលប្រជុំ
                    </n-tooltip>
                    {{ record.rooms.map( o => o.name ).join( ' , ' ) }}
                  </div>

                  <!-- Lead by -->
                  <div v-show="false" class="w-full text-gray-600 my-2" >{{ record.listMembers.length > 0 
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
                <!-- <td class="vcb-table-cell w-40" >{{ record.date }}</td>
                <td  class="vcb-table-cell w-28" >{{ record.start }}</td>
                <td  class="vcb-table-cell w-28" >{{ record.end }}</td>
                <td class="vcb-table-cell w-48" >{{ record.type != undefined ? record.type.name : '' }}</td>
                <td :class=" 'vcb-table-cell w-28 font-btb-black ' + ( statuses.find( (g) => g.value == record.status ).color ) " >
                  {{ statuses.find( (g) => g.value == record.status ).label }}
                </td> -->
              </tr>
            </table>
            <div v-if="organization.meetings.length > 0 " class="total-information my-4 w-full" >
              <div class="p-2 " >ចំនួនម៉ោងប្រើប្រាស់ដើម្បីប្រជុំ ៖ {{ organization != null ? ( parseInt( organization.totalSpentMinutes / 60 ) + ' ម៉ោង' ) : "0 ម៉ោង" }}</div>
              <div class="p-2 " v-if="organization != null " >
                ប្រភេទកិច្ចប្រជុំ ៖
                <div class="font-sr ml-4" v-for="(type,index) in organization.totalMeetingsByTypes" >{{ (index+1) }}. {{ type.type.name + " ចំនួន " + type.total + " ដង" }}</div>
              </div>
            </div>
          </div>
          <div class="created_by mt-4 w-full bg-green-400 flex flex-col-reverse" >
            <div class="w-1/3 absolute right-0 bottom-0 " >
              <div class="text-center p-2" >ថ្ងៃច័ន្ទ ទី០៤ ខែមីនា ឆ្នាំ ២០២៤</div>
              <div class="text-center h-24 w-24" ></div>
              <div class="text-center p-2 font-moul" >{{ reporter }}</div>
            </div>
          </div>
          <div v-if="organization==null" class=" text-gray-500 text-center place-items-center place-content-center w-full h-60 flex print:hidden" >
            <div v-if="selectedOrganization==null" class="text-xl" >សូមជ្រើសរើសក្រសួងស្ថាប័នដើម្បីបង្កើតរបាយការណ៍</div>
            <div v-if="selectedOrganization!=null" class="text-xl" >មិនមានរបាយការណ៍កិច្ចប្រជុំសម្រាប់ {{ selectedOrganization.label }}</div>
          </div>
        </div>
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
  name: "TotalMeetingReportByOrganization" ,
  components: {
    // Form
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    
    const model = reactive({
      name: 'reportbyorganization' ,
      title: 'របាយការណ៍ តាមក្រសួងស្ថាប័ន'
    })

    const statusCodes = [1,2,4,8,16,32] ;
    const statuses = reactive([
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
        color: ' text-pink-600' 
      } ,
      {
        label: 'ប្ដូរ' ,
        value : 8 ,
        color: ' text-brown-600' 
      } ,
      {
        label: 'ពន្យាពេល' ,
        value : 16 ,
        color: ' text-yellow-600' 
      } ,
      {
        label: 'ចប់' ,
        value : 32 ,
        color: ' text-red-600' 
      }
    ])

    const organizations = ref([])
    const organization = ref(null)
    const optionOrganizations = computed( () => {
      return organizations.value.length > 0 ? organizations.value.map( (o) => { return { label: o.name , value: o.id } } ) : []
    })
    const selectedOrganization = ref(null)
    function getOrganizations(){
      store.dispatch('organization/list',{
        page: 1 ,
        perPage : 1000 ,
        search : ''
      }).then( res => {
        if( res.data.ok ){
          organizations.value = res.data.records
        }else{
          notify.error({
            title: 'អានព័ត៌មានក្រសួងស្ថាប័ន' ,
            content: 'មានបញ្ហាអានព័ត៌មានក្រសួងស្ថាប័ន។' 
          })
        }
      }).catch( err => {
        console.log( err )
      })
    }
    function updateOrganization(value , selection ){
      selectedOrganization.value = selection
      fetchReportData()
    }

    function fetchReportData(){
      if( selectedOrganization.value.value > 0 ){
        store.dispatch('meeting/totalByOrganization',{
          id: selectedOrganization.value.value
        }).then( res => {
          if( res.data.ok ){
            if( Array.isArray( res.data.result ) && res.data.result.length > 0 ){
              organization.value = res.data.result[0]
            }else{
              organization.value = null  
            }
          }else{
            organization.value = null
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
    }

    const reporter = computed( () => {
      let user = getUser()
      return user != null && user != undefined ? user.lastname + " " +user.firstname : 'គ្មានឈ្មោះ'
    })

    getOrganizations()

    return {
      /**
       * Variables
       */
      model ,
      organizations ,
      organization ,
      optionOrganizations ,
      selectedOrganization ,
      updateOrganization ,
      statuses ,
      statusCodes , 
      reporter ,
      /**
       * Functions
       */
    }
  }
}

</script>

<style type="text/css" scoped >
  .page {
    counter-increment: page;
  }
  div.page div.report-header {
    display: none;
  }
  div.page:first-child div.report-header {
    display: block;
  }
  div.page div.total-information {
    display: none;
  }
  div.page:last-child div.total-information {
    display: block;
  }
  div.page div.created_by {
    display: none;
  }
  @media print {
    div.page:after {
      content: " ទំព័រ - " counter(page);
      position: absolute;
      bottom: 0px;
      right: 15px;
      z-index: 999;
      padding: 2px 12px;
      border-right: 2px solid #23b8e7;
      font-size: 12px;
    }
    div.page:last-child div.created_by {
      display: block;
    }
    @page {
      size: A4 portrait;
    }
  }
  
</style>
