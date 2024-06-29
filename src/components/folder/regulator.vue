<template>
  <div class="w-full" >
    <!-- Title of crud -->
    <div class="flex w-full h-12 py-1 title -mt-12 border-b" >
      <Icon size="27" class="text-red-600 mr-2" >
        <n-icon>
          <DocumentPdf24Regular />
        </n-icon>
      </Icon>
      <div class="leading-9 font-moul" v-html="model.title + ' ' + 'នៃថតឯកសារ' " ></div>
    </div>
    <!-- Top action panel of crud -->
    <div class="flex w-full title-bar border-b px-4 border-gray-200 py-4 ">
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex">
        <div class="w-2/5 relative" >
          <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
          <Icon size="27" class="absolute right-1 top-2 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)" >
            <n-icon>
              <Search20Regular />
            </n-icon>
          </Icon>
          <!-- <Icon size="27" class="absolute -left-10 top-2 text-gray-500 hover:text-blue-700 cursor-pointer" @click="filterPanel=!filterPanel">
            <n-icon>
              <Filter />
            </n-icon>
          </Icon> -->
        </div>
        <!-- New Button -->
        <div class="mt-1 ml-2">
          <!-- <n-button type="success" @click="showCreateModal()" >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z" fill="currentColor"></path></svg>
            </template>
            បន្ថែម
          </n-button> -->
          <n-button type="default" @click="$router.push('/folders')" class="mx-2 "  >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
            </template>
            ថតឯកសារ
          </n-button>
        </div>
        <div class="mt-1 ml-2"></div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel">
      <Transition name="fade" >
        <div v-if="table.records.matched.length > 0" class="vcb-table w-full" >
          <div v-for="(document, index) in table.records.matched" :key='index' class="vcb-table-row text-left relative mb-8" >
            <div class="vcb-table-cell font-bold mb-2 leading-6 text-justify break-words" v-html="( index + 1 ) + ' . ' + applyTagMark(document.objective)" ></div>
            <div  class="vcb-table-cell text-xs mb-2" >
              លេខចុះ ៖ {{ document.fid }} 
              កាលបរិច្ឆែទ ៖ {{ document.type != undefined ? ' - ' + document.type.name : '' }} - {{ document.year.slice(0,10) }} 
              <!-- {{ document.createdBy != undefined ? ( ' - ' + document.createdBy.lastname + ' ' + document.createdBy.firstname ) : '' }} -->
            </div>
            <!-- Document Actions -->
            <div class="record-actions-panel flex  mb-2" >
                <!-- <n-icon size="22" class="cursor-pointer text-blue-500 mx-1" @click="showShareRegulatorModal(document)" title="ប្រតិបត្តិការផ្សេងៗ" >
                  <AppsList20Regular />
                </n-icon> -->
                <!-- <n-icon size="22" class="cursor-pointer mx-1  text-green-500" @click="showAccessibilityModal(document)" title="ឯកសារកំពុងបើកជាសាធារណ" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M22 14a8 8 0 1 0 8 8a8.01 8.01 0 0 0-8-8zm5.91 7h-1.954a12.03 12.03 0 0 0-1.218-4.332A6.01 6.01 0 0 1 27.91 21zm-7.854 0A10.014 10.014 0 0 1 22 16.015A10.012 10.012 0 0 1 23.945 21zm3.89 2A10.01 10.01 0 0 1 22 27.985A10.012 10.012 0 0 1 20.055 23zm-4.684-6.332A12.027 12.027 0 0 0 18.044 21H16.09a6.01 6.01 0 0 1 3.172-4.332zM16.09 23h1.953a12.027 12.027 0 0 0 1.218 4.332A6.01 6.01 0 0 1 16.09 23zm8.648 4.332A12.024 12.024 0 0 0 25.956 23h1.954a6.009 6.009 0 0 1-3.172 4.332z" fill="currentColor"></path><path d="M6 14h6v2H6z" fill="currentColor"></path><path d="M6 6h12v2H6z" fill="currentColor"></path><path d="M6 10h12v2H6z" fill="currentColor"></path><path d="M6 24h6v2H6z" fill="currentColor"></path><path d="M12 30H4a2.002 2.002 0 0 1-2-2V4a2.002 2.002 0 0 1 2-2h16a2.002 2.002 0 0 1 2 2v8h-2V4H4v24h8z" fill="currentColor"></path></svg>
                </n-icon> -->
                <n-icon size="20" class="cursor-pointer text-red-500 mx-1" @click="removeDocumentFromFolder(document)" title="ដកឯកសារចេញពីថត" >
                  <TrashOutline />
                </n-icon>
                <n-icon v-if="document.pdf" size="20" class="cursor-pointer text-red-500 mx-1" @click="pdfPreview(document)" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M7.503 13.002a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-.5H8.5a1.5 1.5 0 0 0 0-3h-.997zm.997 2h-.497v-1H8.5a.5.5 0 1 1 0 1zm6.498-1.5a.5.5 0 0 1 .5-.5h1.505a.5.5 0 1 1 0 1h-1.006l-.001 1.002h1.007a.5.5 0 0 1 0 1h-1.007l.002.497a.5.5 0 0 1-1 .002l-.003-.998v-.002l.003-2.002zm-3.498-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h.498a2 2 0 0 0 0-4H11.5zm.5 3v-2a1 1 0 0 1 0 2zM20 20v-1.164c.591-.281 1-.884 1-1.582V12.75c0-.698-.409-1.3-1-1.582v-1.34a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04a.63.63 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v7.168c-.591.281-1 .884-1 1.582v4.504c0 .698.409 1.3 1 1.582V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-2 .5H6a.5.5 0 0 1-.5-.5v-.996h13V20a.5.5 0 0 1-.5.5zm.5-10.5v1h-13V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5zm-1.122-1.5H14a.5.5 0 0 1-.5-.5V4.621L17.378 8.5zm-12.628 4h14.5a.25.25 0 0 1 .25.25v4.504a.25.25 0 0 1-.25.25H4.75a.25.25 0 0 1-.25-.25V12.75a.25.25 0 0 1 .25-.25z" fill="currentColor"></path></g></svg>
                </n-icon>
              </div>
          </div>
        </div>
      </Transition>
      <Transition name="slide-fade" >
        <div v-if="table.records.matched.length <= 0" class="vcb-table w-full p-16" >មិនមានព័ត៌មាននោះឡើយ។</div>
      </Transition>
      <!-- Loading -->
      <Transition name="slide-fade" >
        <div v-if="table.loading" class="table-loading absolute left-0 top-0 right-0 bottom-0 bg-white bg-opacity-75 ">
          <div class="spinner mt-24">
            <Icon size="40" class="animate-spin  text-blue-500" >
            <IosRefresh />
            </Icon><br/><br/>
            កំពុងអាន...
          </div>
          <div class="absolute top-3 right-3 " @click="closeTableLoading" >
            <Icon size="40" class="text-red-600" >
            <CloseCircleOutline />
            </Icon>
          </div>
        </div>
      </Transition>
    </div>
    <!-- Pagination of crud -->
    <Transition name="fade" >
      <div v-if="table.pagination.buttons.length" class="vcb-table-pagination">
        <!-- First -->
        <!-- Previous -->
        <div class="vcb-pagination-page" v-html='"<"' @click="previous()" ></div>
        <!-- Pages (7) -->
        <div v-for="(page, index) in table.pagination.buttons" :key="index" class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="table.pagination.page == page ? false : goTo(page) " >
          <div :class="'page w-8 h-8 text-center align-middle leading-8 cursor-pointer' + (table.pagination.page == page ? ' text-blue-500' : '' ) ">{{ page }}</div>
        </div>
        <!-- Next -->
        <div class="vcb-pagination-page" v-html='">"' @click="next()" ></div>
        <!-- Last -->
        <!-- Go to -->
        <!-- Total per page -->
      </div>
    </Transition>
    <!-- Filter panel of crud -->
    <div v-if="filterPanel" class="vcb-filter-panel h-64">
      <div class="filter-container relative w-full flex">
        <Icon size="40" class="absolute right-0 top-0 cursor-pointer text-red-700" @click="filterPanel=!filterPanel" >
          <CloseCircleOutline />
        </Icon>
      </div>
    </div>
    <!-- Form create account -->
    <create-form v-bind:model="model" v-bind:show="createModal.show" :onClose="closeCreateModal"/>
    <!-- Form update account -->
    <update-form v-bind:model="model" v-bind:record="editRecord" v-bind:show="editModal.show" :onClose="closeEditModal"/>
    <!-- PDF Dialog -->
    <div v-if="pdf.viewer" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white z-40">
      <vue-pdf-embed :source="pdf.url" class="w-full h-screen overflow-y-scroll" />
      <div class="absolute top-3 right-3 cursor-pointer " @click="closePdf" >
        <svg class="w-12 h-12 mr-4 mt-0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" fill="currentColor"></path></svg>
      </div>
      <!-- <div class="absolute top-3 right-20 cursor-pointer " @click="copyShareLink" >
        <svg class="w-8 h-8 mr-4 mt-2 cursor-pointer font-bold ml-4"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><g><path d="M383.822,344.427c-16.045,0-31.024,5.326-41.721,15.979l-152.957-88.42c1.071-5.328,2.142-9.593,2.142-14.919
          c0-5.328-1.071-9.593-2.142-14.919l150.826-87.35c11.762,10.653,26.741,17.041,43.852,17.041c35.295,0,64.178-28.766,64.178-63.92
          C448,72.767,419.117,44,383.822,44c-35.297,0-64.179,28.767-64.179,63.92c0,5.327,1.065,9.593,2.142,14.919l-150.821,87.35
          c-11.767-10.654-26.741-17.041-43.856-17.041c-35.296,0-63.108,28.766-63.108,63.92c0,35.153,28.877,63.92,64.178,63.92
          c17.115,0,32.089-6.389,43.856-17.042l151.891,88.421c-1.076,4.255-2.141,8.521-2.141,13.847
          c0,34.094,27.806,61.787,62.037,61.787c34.229,0,62.036-27.693,62.036-61.787C445.858,372.12,418.052,344.427,383.822,344.427z"></path></g></g></svg>
      </div> -->
    </div>
    <!-- Form Action Menu -->
    <add-remove-reader-form v-bind:model="model" v-bind:record="regulatorRecord" v-bind:show="regulatorModal.show" :onClose="closeShareRegulatorModal"/>
    <!-- Form Accessibility -->
    <accessibility-form v-bind:model="model" v-bind:record="accessibilityRecord" v-bind:show="accessibilityModal.show" :onClose="closeAccessibilityModal"/>
    <!-- Folder modal selection -->
    <n-modal v-model:show="showFolderModal" @on-after-leave="showFolderModal.value=false" >
      <n-card
        style="width: 600px"
        title="សូមជ្រើសរើសថតឯកសារ"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <!-- <template #header-extra>
          Oops!
        </template> -->
        <!-- Where the available folder of the user -->
        <div v-for="(folder, index) in listFolders" :key="index" class="p-2 cursor-pointer hover:bg-gray-100 rounded duration-500 flex" 
        >
          <div class="flex-grow">
            {{ (index +1 ) + '. ' + folder.name }}
          </div>
          <Icon v-if="!folder.exists" size="20" class="text-gray-600 flex-none" @click="addDocumentToFolder(folder)"  >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M13.854 7.854a.5.5 0 0 0-.708-.708L8.5 11.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l5-5zM5.682 3A2.682 2.682 0 0 0 3 5.682v8.636C3 15.8 4.2 17 5.682 17h8.636C15.8 17 17 15.8 17 14.318V5.682C17 4.2 15.8 3 14.318 3H5.682zM4 5.682C4 4.753 4.753 4 5.682 4h8.636C15.247 4 16 4.753 16 5.682v8.636c0 .929-.753 1.682-1.682 1.682H5.682A1.682 1.682 0 0 1 4 14.318V5.682z" fill="currentColor"></path></g></svg>
          </Icon>
          <Icon v-if="folder.exists" size="20" class="text-green-600 flex-none" @click="removeDocumentFromFolder(folder)"  >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M13.854 7.854a.5.5 0 0 0-.708-.708L8.5 11.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l5-5zM5.682 3A2.682 2.682 0 0 0 3 5.682v8.636C3 15.8 4.2 17 5.682 17h8.636C15.8 17 17 15.8 17 14.318V5.682C17 4.2 15.8 3 14.318 3H5.682zM4 5.682C4 4.753 4.753 4 5.682 4h8.636C15.247 4 16 4.753 16 5.682v8.636c0 .929-.753 1.682-1.682 1.682H5.682A1.682 1.682 0 0 1 4 14.318V5.682z" fill="currentColor"></path></g></svg>
          </Icon>
        </div>  
        <!-- <template #footer>
          Footer
        </template> -->
      </n-card>
    </n-modal>
    <!-- End folder modal selection -->
  </div>
</template>
<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import VuePdfEmbed from 'vue-pdf-embed'
import { Switcher, Filter, DataStructured , ParentChild} from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { IosCheckmarkCircleOutline, IosRefresh } from '@vicons/ionicons4'
import { TrashOutline, CloseCircleOutline } from '@vicons/ionicons5'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { Edit20Regular, Key16Regular, Save20Regular, Add20Regular, Search20Regular , ContactCard28Regular, DocumentPdf24Regular, AppsList20Regular } from '@vicons/fluent'
/**
 * CRUD component form
 */
import CreateForm from './create.vue'
import UpdateForm from './update.vue'
import AddRemoveReaderForm from './actions/addremovereader.vue'
import AccessibilityForm from './actions/accessibility.vue'
export default {
  name: "Regulator" ,
  components: {
    ParentChild, 
    QrcodeVue ,
    Vue3Barcode,
    Switcher,
    Add20Regular ,
    DataStructured,
    Icon,
    IosCheckmarkCircleOutline,
    CreateForm,
    IosRefresh ,
    CloseCircleOutline ,
    UpdateForm,
    Search20Regular ,
    Edit20Regular,
    Key16Regular,
    DocumentPdf24Regular ,
    Save20Regular ,
    TrashOutline ,
    ContactCard28Regular ,
    Filter ,
    VuePdfEmbed ,
    AppsList20Regular ,
    AddRemoveReaderForm ,
    AccessibilityForm
  },
  setup(){
    const store = useStore()
    const route = useRoute()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    const showFolderModal = ref(false)
    const listFolders = ref([])
    const selectedDocumentId = ref(0)
    /**
     * Variables
     */    
    const model = reactive( {
      name: "regulator" ,
      title: "ឯកសារ"
    })

    const regulatorAccessibilities = ref([
      "បិទទាំងស្រុង" , // 0 
      "ខ្លួនឯង និង អ្នកដែលចែករំលែកទៅ" , // 1 
      "ទូទាំងប្រព័ន្ធ" , // 2 
      "" , // 3 
      "ជាសកល" , // 4 
    ])

    const table = reactive( {
      loading: false , 
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        },
        format: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        }
      } ,
      pagination: {
        perPage: 20 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0 ,
        start: 0 ,
        end: 0 ,
        buttons: []
      }
    })
    const filterPanel = ref(false)

    function filterRecords(helper=true){
      if( helper ){
        table.records.matched = []
        if( table.search != "" ) {
          for(var index in table.records.all ){
            for(var field in table.records.all[index] ){
              if( (""+table.records.all[index][field]).includes( table.search ) !== false ) {
                table.records.matched.push( table.records.all[index] )
                break;
              }
            }
          }
        }
        if( table.records.matched.length <= 0 ) {
          table.records.matched = table.records.all
        }
      }else{
        setTimeout( goTo(1) , 500 )
      }
    }

    /**
     * Functions
     */
     function getRecords(){
      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch("folder/regulators",{
        id: route.params.id ,
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page
      }).then(res => {
        console.log( res )
        if( res.data.ok ){
          table.records.all = table.records.matched = res.data.records
          table.pagination = res.data.pagination

          var paginationNumberList = 5
          if( ( table.pagination.page - ( paginationNumberList - 1 ) ) < 1 ){
            table.pagination.start = 1
            table.pagination.end = table.pagination.totalPages > 9 ? 9 : table.pagination.totalPages
          }
          else{
            table.pagination.start = table.pagination.page  - ( paginationNumberList - 1 )
            table.pagination.end = table.pagination.page + 4 >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 4
          }
          /**
           * Create pagination buttons
           */
          table.pagination.buttons = []
          for(var i=table.pagination.start;i<=table.pagination.end;i++){
            table.pagination.buttons.push(i)
          }
        }else{
          table.records.all = table.records.matched = []
          notify.warning({
            title: 'អានឯកសារ' ,
            description: res.data.message ,
            duration: 3000
          })
        }
        closeTableLoading()
      }).catch( err => {
        table.records.all = table.records.matched = []
        notify.warning({
            title: 'អានឯកសារ' ,
            description: err.response.data.message ,
            duration: 3000
          })
          closeTableLoading()
      })
    }
    function closeTableLoading(){
      table.loading = false
    }

    /**
     * Pagination functions
     */
    function previous(){
      goTo( table.pagination.page <= 1 ? 1 : table.pagination.page - 1 )
    }
    function next(){
      goTo( table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 1 )
    }
    function goTo(page){
      table.pagination.page = page > table.pagination.totalPages ? table.pagination.totalPages : ( page < 1 ? 1 : page)
      getRecords()
    }
    function updatePerpage(perPage){
      table.pagination.perPage = perPage < 5 ? 5 : ( perPage > 100 ? 100 : perPgae )
      table.pagination.page = 1
      getRecords()
    }
    const paginationButtons = computed(()=>{
      /**
       * 9 Buttons is recommended
       */
      return table.pagination.totalPages ? table.pagination.totalPages : 0
    })

    function activateRegulator(record){
      dialog.warning({
        title: "បិទ ឬ បើក ឯកសារ" ,
        content: "តើអ្នកចង់ " + ( record.active == 1 ? "បិទ" : "បើក" )+ " ឯកសារនេះមែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch( model.name+(parseInt(record.active)==1?'/deactivate':'/activate'),{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'ស្ថានភាពឯកសារ' ,
                description: 'ស្ថានភាពឯកសារបានកែប្រែជោគជ័យ។' ,
                duration: 3000
              })
              getRecords()
            }else{
              notify.error({
                title: 'ស្ថានភាពគណនី' ,
                description: 'មានបញ្ហាក្នុងពេលកែប្រែស្ថានភាពឯកសារ។' ,
                duration: 3000
              })
            }
          }).catch( err => {
            message.error( err )
          })
        },
        onNegativeClick: () => {
          
        }
      })
    }
    /**
     * Create modal handling
     */
    var createModal = reactive({show:false})
    function showCreateModal(){
      createModal.show = true
    }

    function closeCreateModal(){
      createModal.show = false
      getRecords()
    }

    var editModal = reactive({show:false})
    var editRecord = reactive({
      id: 0 ,
      number: "" ,
      title: "" ,
      objective: "" ,
      type_id: null ,
      year: null ,
      pdfs: [] ,
      publish: 0 ,
      active: 0 
    })
    function showEditModal(record){
      editRecord.id = record.id
      editRecord.number = record.fid
      editRecord.title = record.title
      editRecord.objective = record.objective
      editRecord.type_id = record.document_type
      editRecord.year = new Date( record.year ).getTime()
      editRecord.publish = record.publish
      editRecord.active = record.active
      // editRecord.pdfs = record.pdf
      editModal.show = true
    }
    function closeEditModal(record){
      editModal.show = false
      getRecords()
    }

    /**
     * Action Modal
     */
    var regulatorModal = reactive({show:false})
    var regulatorRecord = reactive({
      id: 0 ,
      number: "" ,
      title: "" ,
      objective: "" ,
      type_id: null ,
      year: null ,
      pdfs: [] ,
      publish: 0 ,
      active: 0 ,
      accessibility: 0
    })
    function showShareRegulatorModal(record){
      regulatorRecord.id = record.id
      regulatorRecord.number = record.fid
      regulatorRecord.title = record.title
      regulatorRecord.objective = record.objective
      regulatorRecord.type_id = record.document_type
      regulatorRecord.year = new Date( record.year ).getTime()
      regulatorRecord.publish = record.publish
      regulatorRecord.active = record.active
      regulatorRecord.accessibility = record.accessibility
      // actionRecord.pdfs = record.pdf
      regulatorModal.show = true
    }
    function closeShareRegulatorModal(record){
      regulatorModal.show = false
      getRecords()
    }

    /**
     * Accessibility Modal
     */
    var accessibilityModal = reactive({show:false})
    var accessibilityRecord = reactive({
      id: 0 ,
      number: "" ,
      title: "" ,
      objective: "" ,
      type_id: null ,
      year: null ,
      pdfs: [] ,
      publish: 0 ,
      active: 0 ,
      accessibility : 0
    })
    function showAccessibilityModal(record){
      accessibilityRecord.id = record.id
      accessibilityRecord.number = record.fid
      accessibilityRecord.title = record.title
      accessibilityRecord.objective = record.objective
      accessibilityRecord.type_id = record.document_type
      accessibilityRecord.year = new Date( record.year ).getTime()
      accessibilityRecord.publish = record.publish
      accessibilityRecord.active = record.active
      accessibilityRecord.accessibility = record.accessibility
      // actionRecord.pdfs = record.pdf
      accessibilityModal.show = true
    }
    function closeAccessibilityModal(record){
      accessibilityModal.show = false
      getRecords()
    }

    function inputPassword(record){
      changePasswordModal.account = record
      changePasswordModal.form = {
        id: record.id ,
        password: record.password
      }
      changePasswordModal.show = true
    }

    function destroy(record){
      dialog.warning({
        title: "លុបឯកសារ" ,
        content: "តើអ្នកចង់ លុប ឯកសារនេះមែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch(model.name+'/delete',{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'លុបឯកសារ' ,
                description: 'លុបបានរួចរាល់។' ,
                duration: 3000
              })
              getRecords()
            }else{
              notify.success({
                title: 'លុបឯកសារ' ,
                description: 'មានបញ្ហាក្នុងពេលលុបឯកសារ។' ,
                duration: 3000
              })
            }
        }).catch( err => {
          message.error( err )
        })
        },
        onNegativeClick: () => {
        }
      })
    }

    /**
     * Load pivot data of this model
     */
    function getDocumentTypes(){
      store.dispatch('regulatorType/list').then(res=>{
        store.commit('regulatorType/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានប្រភេទឯកសារ' ,
          description: 'មានបញ្ហាក្នុងពេលអានប្រភេទឯកសារ។'
        })
        console.log( err )
      })
    }

    /**
     * Mark the matched text with in search box
     */
     function applyTagMark(str){
      // Split the string by whitespace
      if( table.search.trim() != "" ){
        var arrStrSearch = table.search.split(/(\s+)/).filter( e => e.trim().length > 0).map( e => e.replaceAll(" ","") )
        for( var i in arrStrSearch ){
          if( str.includes( arrStrSearch[i] ) ) str = str.replaceAll( arrStrSearch[i] , '<mark>' + arrStrSearch[i] + '</mark>' ) 
        }
      }
      return str
    }

    const pdf = reactive({
      viewer: false ,
      filename: '' ,
      url: ''
    })
    const pdfShareLink = ref(null)
    function pdfPreview(record){
      if( record.pdf ){
        store.dispatch('regulator/pdf',{id:record.id})
          .then( res => {
            pdfShareLink.value = res.data.serial != "" ? window.origin+"/#/globalshare/"+res.data.serial : null
            pdf.filename = res.data.filename
            pdf.url = res.data.pdf
            pdf.viewer = true
            // notify.success({
            //   title: "បង្ហាញឯកសារយោង" ,
            //   content: res.data.message ,
            //   duration: 1000
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
    function closePdf(){
      pdf.url = ""
      pdf.viewer = false
    }
    function copyShareLink(){
      if( pdfShareLink.value != "" && pdfShareLink.value != null && pdfShareLink.value != undefined ){
        if (window.isSecureContext) {
          navigator.clipboard.writeText( pdfShareLink.value )
          message.info("អសយដ្ឋាន សម្រាប់ចែករំលែកឯកសារនេះបាន ចម្លងទុកក្នុង Clipboart ។")
        } else {
          dialog.info({
            title: 'ចែករំលែកឯកសារ',
            content: () => 'អសយដ្ឋាននៃឯកសារ សម្រាប់ចែករំលែក ៖ ' + pdfShareLink.value
          })
        }
      }else{
        message.warning("មានបញ្ហាចែករំលែកពេលចម្លង អសយដ្ឋានឯកសារ ចូលក្នុង Clipboart ។")
      }
    }

    function showFolderModalPopup(document){
      showFolderModal.value = true
      /**
       * Mark the selected document
       */
      selectedDocumentId.value = document.id
      
    }

    function closeFolderModalPopup(){
      showFolderModal.value = false
      listFolders.value = []
      selectedDocumentId.value = 0
    }

    function addDocumentToFolder(folder){
      store.dispatch('folder/addRegulator',{
        id: folder.id ,
        document_id : selectedDocumentId.value
      }).then( res => {
        notify.success({
          title: "ដាក់ឯកសារចូលថត" ,
          content: res.data.message ,
          duration: 3000
        })
        
      }).catch( err => {
        console.log( err.response.data )
        notify.error({
          title: "ដាក់ឯកសារចូលថត" ,
          content: res.response.data.message ,
          duration: 3000
        })
      })
    }

    function removeDocumentFromFolder(document){
      dialog.warning({
        title: "ដកឯកសារ" ,
        content: "តើអ្នកចង់ ដកឯកសារនេះចេញមែនទេ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch('folder/removeRegulator',{
            id: route.params.id ,
            document_id : document.id
          }).then( res => {
            notify.success({
              title: "ដកឯកសារចេញពីថត" ,
              content: res.data.message ,
              duration: 3000
            })
            getRecords()
          }).catch( err => {
            console.log( err.response.data )
            notify.error({
              title: "ដកឯកសារចេញពីថត" ,
              content: res.response.data.message ,
              duration: 3000
            })
          })
        },
        onNegativeClick: () => {
        }
      })
    }

    /**
     * Initial the data
     */
    getRecords()
    getDocumentTypes()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      filterPanel ,
      pdf,
      /**
       * Table
       */
      filterRecords ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      previous ,
      next ,
      paginationButtons ,
      /**
       * Loading overlay
       */
      closeTableLoading ,
      /**
       * Creating
       */
      createModal ,
      showCreateModal ,
      closeCreateModal ,     
      /**
       * Editing
       */
      editModal ,
      showEditModal ,
      closeEditModal , 
      editRecord ,
      /**
       * Actions
       */
      showShareRegulatorModal ,
      closeShareRegulatorModal , 
      /**
       * Functions
       */
      activateRegulator ,
      destroy ,
      applyTagMark ,
      pdfPreview ,
      closePdf ,
      copyShareLink ,
      /**
       * Actions
       */
      regulatorModal ,
      showShareRegulatorModal ,
      closeShareRegulatorModal , 
      regulatorRecord ,
      /**
       * Accessibility
       */
      accessibilityModal ,
      showAccessibilityModal ,
      closeAccessibilityModal ,
      accessibilityRecord ,
      /**
       * Folder
       */
      showFolderModalPopup ,
      closeFolderModalPopup ,
      addDocumentToFolder ,
      removeDocumentFromFolder ,
      showFolderModal ,
      listFolders
    }
  }
}

</script>

<style scoped>
  .vcb-table-panel {
    @apply relative p-4 overflow-auto;
  }
  .vcb-table {
    @apply w-full;
    height: fit-content ;
  }
  .vcb-table tr.vcb-table-row {
    @apply border-b border-gray-100 text-left ;
  }
  .vcb-table tr.vcb-table-row td {
    @apply p-2;
  }
  .vcb-table-actions-panel {
    @apply flex flex-row-reverse ;
  }
  .vcb-table-actions-panel .vcb-action-button {
    @apply  rounded-full border border-gray-200 w-8 h-8 mx-2 text-center cursor-pointer hover:border-blue-500 hover:text-blue-500  duration-300;
  }
  .vcb-table-headers {
    @apply border-b border-gray-200;
  }
  .vcb-table-headers .vcb-table-header {
    @apply px-2 py-4 text-left ;
  }
  .vcb-table-pagination {
    @apply flex flex-row fixed bg-white right-0 bottom-0 border border-l p-3  z-50;
  }
  .vcb-pagination-page {
    @apply  rounded-full border border-gray-200 mx-1 leading-7 w-8 h-8 font-bold cursor-pointer hover:text-blue-500 hover:border-blue-500 duration-300;
  }
  .vcb-filter-panel {
    @apply flex flex-row fixed bg-white right-0 bottom-0 left-0 border border-l p-3 ;
  }
  .vcb-table-cell {
    @apply leading-6 align-text-top;
  }
</style>