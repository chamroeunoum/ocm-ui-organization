<template >
  <!-- Total Meetings -->
  <div class="flex flex-wrap justify-center pb-4" >
    <div class="flex border-b border-gray-200 pb-2 w-full mb-4" >
      <svg class="hidden flex-none w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M9.472 4a4.25 4.25 0 0 0-4.095 3.113L4.436 10.5L4.5 10.5h2.01l.793-2.852A2.25 2.25 0 0 1 9.472 6H22.53a2.25 2.25 0 0 1 2.168 1.648l3.219 11.588a2.18 2.18 0 0 1-2.1 2.764H14.5v2h11.317c2.764 0 4.767-2.635 4.027-5.299L26.626 7.113A4.25 4.25 0 0 0 22.531 4H9.471zM14.5 26H24a1 1 0 1 1 0 2H14.47c.02-.164.03-.33.03-.5V26zM4.5 14a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-6zm-2.5.5A2.5 2.5 0 0 1 4.5 12h6a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 2 27.5v-13zM7.5 20a2 2 0 1 0 0-4a2 2 0 0 0 0 4z" fill="currentColor"></path></g></svg>
      <div class="flex-grow font-moul text-xs leading-7 text-left ml-1 ">សរុបកិច្ចប្រជុំតាមរយះថ្នាក់ដឹកនាំប្រចាំខែ</div>
      <!-- <div class="font-bold flex-none w-20 text-right leading-6 text-blue-600 " v-html="total" ></div> -->
    </div>
    <div v-for="(people,index) in listPeople" :key="index" 
      class="'flex flex-wrap justify-center border border-gray-200 hover:border-blue-400 duration-300 m-4 p-8 rounded cursor-pointer font-bold" 
      @click="preview(people)"
    >
      <div class="w-full text-center mb-4 " >
        <div class="font-moul text-xs mb-2" >{{ people.people.countesies.map( ( c ) => c.name ).join( "<br/>") }}</div>
        <div class="font-moul text-xs mb-2" >{{ people.people.lastname + ' ' + people.people.firstname }}</div>
      </div>
      <div v-for="(meeting,index) in people.totalMeetingsByTypes" :key="index" 
        class="w-full flex" >
        <div class="flex-grow text-left mb-4 " >{{ meeting.type.name }}</div>
        <div class="w-40 text-right text-blue-500 " >{{  meeting.total }}</div>
      </div>
      <div class="w-full flex text-green-500" >
        <div class="flex-grow text-left mb-4 " >សរុប</div>
        <div class="w-40 text-right " >{{  people.total }}</div>
      </div>
      <div class="w-full flex text-green-500" >
        <div class="flex-grow text-left mb-4 " >សរុបរយះពេល</div>
        <div class="w-40 text-right " >{{  parseInt( people.totalSpentMinutes / 60 ) }} ម៉ោង</div>
      </div>
    </div>
    <n-drawer v-model:show="drawer.show" width="90%" placement="right">
      <n-drawer-content title="សរុបកិច្ចប្រជុំតាមរយះថ្នាក់ដឹកនាំប្រចាំខែ">
        <div class="flex w-full flex-wrap" >
          <table v-if="selectedPeople.meetings.length > 0 " class="vcb-table border border-gray-300 rounded-lg" >
            <tr class="vcb-table-headers bg-gray-300" >
              <th class="vcb-table-header" >ល.រ</th>
              <th class="vcb-table-header">ខ្លឹមសារ</th>
              <th class="vcb-table-header">ថ្ងៃប្រជុំ</th>
              <th class="vcb-table-header">ចាប់ផ្ដើម</th>
              <th class="vcb-table-header">បញ្ចប់</th>
              <th class="vcb-table-header">ប្រភេទប្រជុំ</th>
              <th class="vcb-table-header text-center w-28">ស្ថានភាព</th>
            </tr>
            <tr v-for="(record, index) in selectedPeople.meetings" :key='index' :class=" 'vcb-table-row hover:bg-gray-200 duration-500 ' + ( index % 2 ? ' bg-gray-100 ' : ' bg-gray-50 ' ) " >
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
                <div v-show="false"  class="w-full text-gray-600 my-2" >{{ record.listMembers.length > 0 
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
          <div v-if="selectedPeople.meetings.length > 0 " class="my-4 w-full" >
            <div class="w-1/4 border border-gray-300 bg-gray-100 rounded p-4 my-2 " >ចំនួនម៉ោងប្រើប្រាស់ដើម្បីប្រជុំ ៖ {{ selectedPeople != null ? ( parseInt( selectedPeople.totalSpentMinutes / 60 ) + ' ម៉ោង' ) : "0 ម៉ោង" }}</div>
            <div class="w-1/4 border border-gray-300 bg-gray-100 rounded p-4 my-2 " v-if="selectedPeople != null " >
              ប្រភេទកិច្ចប្រជុំបានឆ្លងកាត់ ៖
              <div class="font-sr ml-4" v-for="(type,index) in selectedPeople.totalMeetingsByTypes" >{{ (index+1) }}. {{ type.type.name + " ចំនួន " + type.total + " ដង" }}</div>
            </div>
          </div>
          <div v-else class="text-xl text-gray-500 text-center place-items-center place-content-center w-full h-60 flex" >
            មិនមានកិច្ចប្រជុំទេ។
          </div> 
        </div>
      </n-drawer-content>
    </n-drawer>
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
    const selectedPeople = ref(null)
    const drawer = reactive({
      show : false
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
    
    const listPeople = ref([])
    function getRecords(){
      store.dispatch('meeting/totalByTypeByLeaderThisMonth').then( res => {
          if( res.data.ok ){
            listPeople.value = res.data.result
          }else{
            listPeople.value = []
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
    
    function preview(people){
      console.log( people )
      selectedPeople.value = people
      drawer.show = true
    }

    onMounted( () => {
      getRecords()
    })

    return {
      /**
       * Variables
       */
      listPeople ,
      drawer ,
      statuses ,
      statusCodes , 
      selectedPeople ,
      /**
       * Computed
       */
      /**
       * Functions
       */
       preview
    }
  }
}

</script >