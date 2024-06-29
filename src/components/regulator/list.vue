<template>
  <div class="w-full" >
    <!-- Top action panel of crud -->
    <div class="flex w-full title-bar border-b px-4 border-gray-200 py-4 ">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <svg  class="text-red-600 mr-2" @click="pdfPreview(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5c-17.2-10.5-28.7-25-36.8-46.3c3.9-16.1 10.1-40.6 5.4-56c-4.2-26.2-37.8-23.6-42.6-5.9c-4.4 16.1-.4 38.5 7 67.1c-10 23.9-24.9 56-35.4 74.4c-20 10.3-47 26.2-51 46.2c-3.3 15.8 26 55.2 76.1-31.2c22.4-7.4 46.8-16.5 68.4-20.1c18.9 10.2 41 17 55.8 17c25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35c-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8c-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7c8.3 15.1 18.9 27.2 30.1 35.5c-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" fill="currentColor"></path></svg>
        <div class="leading-8 font-moul" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <div class="mt-1 ml-2">
          <n-button type="success" @click="showCreateModal()" >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z" fill="currentColor"></path></svg>
            </template>
            បន្ថែម
          </n-button>
          <!-- <n-button type="default" @click="$router.push('/welcome')" class="mx-2 "  >
            <template #icon>
              <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.166h.333a1.167 1.167 0 0 0 0-2.334H6.5zm.833 1.334H7V12h.333a.167.167 0 0 1 0 .334zM12 11.499a.5.5 0 0 1 .5-.499h.999a.5.5 0 0 1 0 1h-.5v.335h.5a.5.5 0 1 1 0 1h-.5l.001.164a.5.5 0 0 1-1 .002L12 12.834L12 11.499zM9.498 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5H10a1.5 1.5 0 0 0 0-3h-.502zm.5 2v-1H10a.5.5 0 0 1 0 1h-.002zM4 4a2 2 0 0 1 2-2h4.585a1.5 1.5 0 0 1 1.061.44l3.914 3.914a1.5 1.5 0 0 1 .44 1.06v1.668a1.5 1.5 0 0 1 .998 1.414v4.003A1.5 1.5 0 0 1 16 15.913V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.087A1.5 1.5 0 0 1 3 14.5v-4.003A1.5 1.5 0 0 1 4 9.082V4zm11 4h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v4.996h10V8zM5 15.999A1 1 0 0 0 6 17h8a1 1 0 0 0 1-1.001H5zm6-12.792V6.5a.5.5 0 0 0 .5.5h3.293L11 3.207zM4.5 9.996a.5.5 0 0 0-.5.5v4.003a.5.5 0 0 0 .5.5h10.997a.5.5 0 0 0 .5-.5v-4.003a.5.5 0 0 0-.5-.5H4.501z" fill="currentColor"></path></g></svg>
            </template>
            ស្វែងរកឯកសារ
          </n-button> -->
        </div>
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
        <div class="mt-1 ml-2"></div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel">
      <Transition name="slide-fade" >
        <div v-if="table.records.matched.length > 0" class="vcb-table w-full" >
          <div v-for="(regulator, index) in table.records.matched" :key='index' class="vcb-table-row text-left relative mb-8" >
            <div class="vcb-table-cell font-bold mb-2 leading-6 text-justify break-words" v-html="( index + 1 ) + ' . ' + applyTagMark(regulator.objective)" ></div>
            <div  class="vcb-table-cell text-xs mb-2" >
              លេខចុះ ៖ {{ regulator.fid }} 
              កាលបរិច្ឆែទ ៖ {{ regulator.type != undefined ? ' - ' + regulator.type.name : '' }} - {{ regulator.year.slice(0,10) }} 
              <!-- {{ regulator.createdBy != undefined ? ( ' - ' + regulator.createdBy.lastname + ' ' + regulator.createdBy.firstname ) : '' }} -->
            </div>
            <!-- Document Actions -->
            <div class="record-actions-panel flex mb-2" >
                <n-icon size="22" class="cursor-pointer text-blue-500 mx-1" @click="showShareRegulatorModal(regulator)" title="ប្រតិបត្តិការផ្សេងៗ" >
                  <AppsList20Regular />
                </n-icon>
                <n-icon size="22" class="cursor-pointer text-blue-500" @click="showEditModal(regulator)" title="កែប្រែព័ត៌មាន" >
                  <Edit20Regular />
                </n-icon>
                <n-icon size="22" class="cursor-pointer text-red-500" @click="destroy(regulator)" title="លុបគណនីនេះចោល" >
                  <TrashOutline />
                </n-icon>
                <!-- <n-icon size="22" :class="'cursor-pointer ' + (record.active == 1 ? ' text-green-500 ' : ' text-gray-500 ') " @click="activateRegulator(record)" :title="record.active == 1 ? 'គណនីនេះកំពុងបើកតំណើរការ' : 'គណនីនេះកំពុងត្រូវបានបិទមិនអាចប្រើប្រាស់បាន' " >
                  <IosCheckmarkCircleOutline />
                </n-icon> -->
                <n-icon size="22" class="cursor-pointer mx-1  text-green-500" @click="showAccessibilityModal(regulator)" title="ឯកសារកំពុងបើកជាសាធារណ" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M22 14a8 8 0 1 0 8 8a8.01 8.01 0 0 0-8-8zm5.91 7h-1.954a12.03 12.03 0 0 0-1.218-4.332A6.01 6.01 0 0 1 27.91 21zm-7.854 0A10.014 10.014 0 0 1 22 16.015A10.012 10.012 0 0 1 23.945 21zm3.89 2A10.01 10.01 0 0 1 22 27.985A10.012 10.012 0 0 1 20.055 23zm-4.684-6.332A12.027 12.027 0 0 0 18.044 21H16.09a6.01 6.01 0 0 1 3.172-4.332zM16.09 23h1.953a12.027 12.027 0 0 0 1.218 4.332A6.01 6.01 0 0 1 16.09 23zm8.648 4.332A12.024 12.024 0 0 0 25.956 23h1.954a6.009 6.009 0 0 1-3.172 4.332z" fill="currentColor"></path><path d="M6 14h6v2H6z" fill="currentColor"></path><path d="M6 6h12v2H6z" fill="currentColor"></path><path d="M6 10h12v2H6z" fill="currentColor"></path><path d="M6 24h6v2H6z" fill="currentColor"></path><path d="M12 30H4a2.002 2.002 0 0 1-2-2V4a2.002 2.002 0 0 1 2-2h16a2.002 2.002 0 0 1 2 2v8h-2V4H4v24h8z" fill="currentColor"></path></svg>
                </n-icon>
                <div v-if="regulator.pdf" class="cursor-pointer " @click="pdfPreview(regulator)" title="មើលឯកសារ" alt="មើលឯកសារ" >
                  <n-icon size="20" class="cursor-pointer text-red-500" >
                    <DocumentPdf24Regular />
                  </n-icon>
                </div>
                <n-icon size="20" class="cursor-pointer text-blue-700 mx-1" title="ដាក់ឯកសារចូលថត" alt="ដាក់ឯកសារចូលថត" @click="showFolderModalPopup(regulator)" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
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
      <!-- Pagination of crud -->
      <div class="fixed left-0 right-0 bottom-12 h-12 flex" >
        <div class="vcb-table-pagination ">
          <!-- First -->
          <!-- Previous -->
          <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='"<"' @click="previous()" ></div>
          <!-- Pages (7) -->
          <div v-for="(page, index) in table.pagination.buttons" :key="index" :class="'vcb-pagination-page pages h-8 mx-2 font-bold' + (table.pagination.page == page ? ' bg-blue-500 text-white  rounded-full' : '' )" @click="table.pagination.page == page ? false : goTo(page) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">{{ page }}</div>
          </div>
          <!-- Next -->
          <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='">"' @click="next()" ></div>
          <!-- Last -->
          <!-- Go to -->
          <!-- Total per page -->
        </div>
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
      <!-- Share button -->
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
          @click=" !folder.exists ? addDocumentToFolder(folder) : removeDocumentFromFolder(folder) "
        >
          <div class="flex-grow">
            {{ (index +1 ) + '. ' + folder.name }}
          </div>
          <Icon v-if="!folder.exists" size="20" class="text-gray-600 flex-none" >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M13.854 7.854a.5.5 0 0 0-.708-.708L8.5 11.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l5-5zM5.682 3A2.682 2.682 0 0 0 3 5.682v8.636C3 15.8 4.2 17 5.682 17h8.636C15.8 17 17 15.8 17 14.318V5.682C17 4.2 15.8 3 14.318 3H5.682zM4 5.682C4 4.753 4.753 4 5.682 4h8.636C15.247 4 16 4.753 16 5.682v8.636c0 .929-.753 1.682-1.682 1.682H5.682A1.682 1.682 0 0 1 4 14.318V5.682z" fill="currentColor"></path></g></svg>
          </Icon>
          <Icon v-if="folder.exists" size="20" class="text-green-600 flex-none" >
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
import { useRouter } from 'vue-router'
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
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    const showFolderModal = ref(false)
    const listFolders = ref([])
    const selectedRegulatorId = ref(0)
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
      store.dispatch(model.name+'/list',{
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page
      }).then(res => {
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

        closeTableLoading()
      }).catch( err => {
        console.log( err )
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
      editRecord.type_id = record.regulator_type
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
      regulatorRecord.type_id = record.regulator_type
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
      accessibilityRecord.type_id = record.regulator_type
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
      store.dispatch('regulatorType/compact').then(res=>{
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

    function getFolders(){
      store.dispatch('folder/listRegulatorWithValidation',{
        search: '' ,
        page: 1 ,
        perPage: 50 ,
        regulator_id : selectedRegulatorId.value
      }).then( res => {
        listFolders.value = res.data.records
      }).catch( err => {
        console.log( err.response )
      })
    }

    function showFolderModalPopup(regulator){
      showFolderModal.value = true
      /**
       * Mark the selected regulator
       */
      selectedRegulatorId.value = regulator.id
      getFolders()
    }

    function closeFolderModalPopup(){
      showFolderModal.value = false
      listFolders.value = []
      selectedRegulatorId.value = 0
    }

    function addDocumentToFolder(folder){
      store.dispatch('folder/addRegulator',{
        id: folder.id ,
        regulator_id : selectedRegulatorId.value
      }).then( res => {
        notify.success({
          title: "ដាក់ឯកសារចូលថត" ,
          content: res.data.message ,
          duration: 3000
        })
        showFolderModal.value = false
        getFolders()
      }).catch( err => {
        console.log( err.response.data )
        notify.error({
          title: "ដាក់ឯកសារចូលថត" ,
          content: res.response.data.message ,
          duration: 3000
        })
      })
    }

    function removeDocumentFromFolder(folder){
      store.dispatch('folder/removeRegulator',{
        id: folder.id ,
        regulator_id : selectedRegulatorId.value
      }).then( res => {
        notify.success({
          title: "ដកឯកសារចេញពីថត" ,
          content: res.data.message ,
          duration: 3000
        })
        showFolderModal.value = false
        getFolders( )
      }).catch( err => {
        console.log( err.response.data )
        notify.error({
          title: "ដកឯកសារចេញពីថត" ,
          content: res.response.data.message ,
          duration: 3000
        })
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
      getFolders ,
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
