<template>
  
  <div class="relative flex flex-wrap min-h-screen " >
    <div v-if="meetings.length > 0 " class=" flex w-full h-20 bg-blue-500 text-gray-100 p-1 absolute left-0 top-0 right-0" >
      <div class="w-90 text-left flex " >
        <div class="w-14 mx-1 ">
          <img src="./../../assets/logo.svg" class="w-full" >
        </div>
        <div class="tableCaption h-14 p-4 font-btb-black text-4xl" >កាលវិភាគកិច្ចប្រជុំប្រចាំ {{ khFullDate }}</div>
      </div>
      <div class="flex-grow text-right p-4 " >
        <DigitalClockComponent dgClass=" text-4xl text-white font-btb-black" />
      </div>
    </div>
    <Transition name="slide-fade" >
      <div v-if="toggleLoginForm && meetings.length > 0 " class="absolute right-0 left-0 top-20 bottom-20" >
        <table class="table-fixed w-full min-h-full bg-gray-100 border border-gray-200" >
          <tr class=" border-b border-gray-200 h-10 ">
            <th class="w-1/12 font-btb-black text-center text-3xl  p-2" >ល.រ</th>
            <th class="font-btb-black text-left text-3xl py-2" >ខ្លឹមសារ</th>
            <th class="w-2/12 text-center font-btb-black text-3xl  p-2" >ទីកន្លែង</th>
            <th class="w-2/12 text-center font-btb-black text-3xl  p-2" >ស្ថានភាព</th>
          </tr>
          <tr v-for="(meeting,index) in meetings" :key="index" :class="( index % 2 ? ' bg-gray-100 ' : ' bg-gray-200 ' ) " >
            <td class="w-1/12 text-center font-btb-black text-3xl " >{{  ( page * perPage ) + index + 1 }}</td>
            <td class="text-left" >
              <div class="font-btb-black text-xl text-gray-500" >{{ meeting.type != undefined ? meeting.type.name : '' }}</div>
              <div class="font-btb-black my-2 whitespace-nowrap overflow-hidden overflow-ellipsis text-3xl h-16 text-gray-800  flex items-center" >{{  meeting.objective }}</div>
              <div class="font-btb-black text-2xl text-gray-500" >{{ meeting.listMembers.length > 0 
              ? "ក្រោមអធិបតីភាព ៖ " + meeting.listMembers.filter( (memberInList) => memberInList.role == 'leader' && memberInList.group == 'lead_meeting' ).map( (memberInList) => 
              ( memberInList.member.countesies != undefined && memberInList.member.countesies.length > 0  ? memberInList.member.countesies.map( (c) => c.name ).join(' ') + ' ' : '' ) 
              + ( memberInList.member.lastname + " " + memberInList.member.firstname + " ")
              + ( memberInList.member.positions != undefined && memberInList.member.positions.length > 0  ? memberInList.member.positions.map( (p) => p.name ).join(' ') + ' ' : '' ) 
              ).join(' - ') 
              : '' }}</div>
            </td>
            <td class="w-2/12 text-center" >
              <div class="font-btb-black xl:text-2xl" >ម៉ោង ៖ {{ meeting.start }}</div>
              <div class="font-btb-black xl:text-2xl" >{{ meeting.rooms.length > 0 ? meeting.rooms.map( (room) => room.desp ).join(' ') : '' }}</div>
            </td>
            <td class="w-2/12 text-center" >
              <div :class=" ' font-btb-black text-3xl  w-3/4 mx-auto rounded-full text-center p-4 text-white ' + ( statuses.find( (s) => s.code == meeting.status ).color ) " >{{ statuses.find( (s) => s.code == meeting.status ).label }}</div>
            </td>
          </tr>
        </table>
      </div>
    </Transition>
    <!-- <div v-if="meetings.length <= 0 " class="absolute top-20 left-0 right-0 bottom-20 flex items-center place-content-center font-btb text-2xl" >ថ្ងៃនេះមិនមានកិច្ចប្រជុំឡើយ។</div> -->
    <div v-if="meetings.length > 0 " class=" fixed left-0 right-0 bottom-0 bg-blue-500 flex h-20">
      <div class="
      w-40 bg-blue-800 h-14 p-2 leading-10 text-white text-xl font-btb-black
      xl:w-60 xl:text-4xl xl:h-20 xl:py-6
      " >កំពុងប្រជុំ ៖ </div>
      <marquee class="flex-grow bg-blue-600 leading-10 w-full h-14 p-2 mx-0 vertical-middle text-white font-btb-black 
      xl:text-4xl xl:h-20 xl:py-6
      "  scrollamount="4" v-html="meetingInProgress.map( (meeting) => meeting.objective ).join(' . ')" ></marquee>
    </div>
  </div>
  <!-- Meeting result within a month -->
  <div v-if="meetings.length <= 0 " class=" flex w-full h-20 bg-blue-500 text-gray-100 p-1 absolute left-0 top-0 right-0" >
    <div class="w-90 text-left flex " >
      <div class="w-14 mx-1 ">
        <img src="./../../assets/logo.svg" class="w-full" >
      </div>
      <div class="tableCaption h-14 p-4 font-btb-black text-4xl" >លទ្ធផលកិច្ចប្រជុំប្រចាំខែនេះ</div>
    </div>
    <div class="flex-grow text-right p-4 " >
      <DigitalClockComponent dgClass=" text-4xl text-white font-btb-black" />
    </div>
  </div>
  <Transition name="slide-fade" >
      <div v-if="toggleLoginForm && meetings.length <= 0 " class="absolute right-0 left-0 top-20 bottom-0 p-2 flex flex-wrap items-center place-content-start" >
        <div class=" w-1/2 ">
          <div class="m-2 rounded shadow border border-gray-200 flex items-center p-8 place-content-center font-moul text-2xl" >ប្រជុំពេញអង្គ គ.រ.ម</div>
        </div>
        <div class=" w-1/2 ">
          <div class="m-2 rounded shadow border border-gray-200 flex items-center p-8 place-content-center font-moul text-2xl" >ប្រជុំគណៈអចិន្ត្រៃយ៍ គ.រ.ម</div>
        </div>
        <div class=" w-1/2 ">
          <div class="m-2 rounded shadow border border-gray-200 flex items-center p-8 place-content-center font-moul text-2xl" >ប្រជុំត្រួតពិនិត្យចុងក្រោយ</div>
        </div>
        <div class=" w-1/2 ">
          <div class="m-2 rounded shadow border border-gray-200 flex items-center p-8 place-content-center font-moul text-2xl" >ប្រជុំចង្អៀត</div>
        </div>
        <div class=" w-1/2 ">
          <div class="m-2 rounded shadow border border-gray-200 flex items-center p-8 place-content-center font-moul text-2xl" >ប្រជុំអន្តរក្រសួង</div>
        </div>
        <div class=" w-1/2 ">
          <div class="m-2 rounded shadow border border-gray-200 flex items-center p-8 place-content-center font-moul text-2xl" >ប្រជុំបច្ចេកទេស</div>
        </div>
        
      </div>
    </Transition>
</template>
<script>

import { getUser } from './../../plugins/authentication'
import { getRoutes } from './../../plugins/route'
import DigitalClockComponent from './../../components/widgets/DigitalClock.vue'
import { ref, reactive , onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useNotification , useMessage } from 'naive-ui'

export default {
  name: 'LoginTemplate' ,
  components: {
    DigitalClockComponent
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
    const page = ref(0)
    const perPage = ref(4)
    const totalPages = ref(2)
    const recordPages = ref([])
    const meetingInProgress = ref([])
    const khFullDate = computed( () =>{
      return meetings.value != undefined ? 
      ( meetings.value.length > 0 ? meetings.value[0].full_date : 'កាលបរិច្ឆែទប្រជុំ' ) : 'កាលបរិច្ឆែទប្រជុំ'
    })

    const statuses = ref([
      { 
        code : 1 ,
        label : 'ថ្មី' ,
        color: ' bg-blue-500 ' 
      }, {
        code : 2 , 
        label : 'កំពុងប្រជុំ' ,
        color: ' bg-green-600 ' 
      },
      {
        code : 4 , 
        label: 'នៅបន្ត' ,
        color: ' bg-yellow-500 ' 
      },
      {
        code: 8 ,
        label : 'ប្ដូរ' ,
        color: ' bg-purple-500 ' 
      },
      {
        code : 16 ,
        label : 'ពន្យាពេល' ,
        color: ' bg-red-500 ' 
      },
      {
        code : 32 ,
        label: 'ចប់' ,
        color: ' bg-blue-600 ' 
      }
    ])

    // if( getUser() !== undefined && getUser() !== null ){
    //   router.push('/welcome')  
    // }

    onMounted( () => {
      // setTimeout( function(){
      //   toggleLoginForm.value = true
      // } , 200 )
    })

    /**
     * Meeting
     */
    const meetings = ref([])
    function getMeetings(){
      store.dispatch('meeting/tvMeetings',{
        search: '' ,
        page: 1 ,
        perPage: totalPages.value * perPage.value
      })
      .then( res => {
        if( res.data.ok ){
          recordPages.value = []
          meetingInProgress.value = []
          for (let i = 0; i < res.data.records.length; i += perPage.value ) {
            let chunk = res.data.records.slice(i, i + perPage.value )
            if( chunk != undefined ){
              recordPages.value.push( chunk )
            }
          }
          meetingInProgress.value = res.data.records.filter( (meeting) => meeting.status == 1 )
          page.value = 0
          meetings.value = recordPages.value.length > 0 ? recordPages.value[ page.value ] : []
          toggleLoginForm.value = true
          console.log( meetingInProgress.value );
        }
      })
      .catch( err => {
        console.log( err )
      })
    }

    setInterval( function(){
      toggleLoginForm.value = false
      setTimeout(function(){
        if( page.value < ( recordPages.value.length - 1 ) ) {
          page.value = page.value + 1
          meetings.value = recordPages.value.length > 0 ? recordPages.value[ page.value ] : []
          toggleLoginForm.value = true  
        }
        else{
          getMeetings()
        }
      },200)
    }, 20000 )

    getMeetings()

    return {
      toggleLoginForm ,
      /**
       * Meeting
       */
      meetings ,
      getMeetings ,
      page ,
      perPage ,
      statuses ,
      meetingInProgress ,
      khFullDate
    }
  },
  mounted(){
    // console.log( this.credentials )
  }
}
</script>
<style scoped>
  .corner-tl , .corner-tr {
    @apply top-16; 
  }
</style>
