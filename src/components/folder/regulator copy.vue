<template>
  <div class="w-full" >
    <!-- Top action panel of crud -->
    <div class="flex w-full title-bar border-b px-4 border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <div class="submenu-icon h-8 flex">
          <svg class="flex-none mr-2 text-yellow-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
          <div class="submenu-icon-title flex-grow w-full leading-9 font-bold" v-html="model.title" ></div>
        </div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <div class="mt-1 ml-2">
          <!-- <n-button type="success" @click="showCreateModal()" >
            <template #icon>
              <n-icon>
                <Add20Regular />
              </n-icon>
            </template>
            បន្ថែម
          </n-button> -->
          <!-- <n-button type="default" @click="$router.push('/welcome')" class="mx-2"  >
            <template #icon>
              <n-icon>
                <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.166h.333a1.167 1.167 0 0 0 0-2.334H6.5zm.833 1.334H7V12h.333a.167.167 0 0 1 0 .334zM12 11.499a.5.5 0 0 1 .5-.499h.999a.5.5 0 0 1 0 1h-.5v.335h.5a.5.5 0 1 1 0 1h-.5l.001.164a.5.5 0 0 1-1 .002L12 12.834L12 11.499zM9.498 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5H10a1.5 1.5 0 0 0 0-3h-.502zm.5 2v-1H10a.5.5 0 0 1 0 1h-.002zM4 4a2 2 0 0 1 2-2h4.585a1.5 1.5 0 0 1 1.061.44l3.914 3.914a1.5 1.5 0 0 1 .44 1.06v1.668a1.5 1.5 0 0 1 .998 1.414v4.003A1.5 1.5 0 0 1 16 15.913V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.087A1.5 1.5 0 0 1 3 14.5v-4.003A1.5 1.5 0 0 1 4 9.082V4zm11 4h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v4.996h10V8zM5 15.999A1 1 0 0 0 6 17h8a1 1 0 0 0 1-1.001H5zm6-12.792V6.5a.5.5 0 0 0 .5.5h3.293L11 3.207zM4.5 9.996a.5.5 0 0 0-.5.5v4.003a.5.5 0 0 0 .5.5h10.997a.5.5 0 0 0 .5-.5v-4.003a.5.5 0 0 0-.5-.5H4.501z" fill="currentColor"></path></g></svg>
              </n-icon>
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
    <div class="vcb-table-panel relative flex">
      <Transition name="slide-fade" >
        <div v-if="table.records.matched.length > 0" class="vcb-table w-full" >
          <div v-for="(document, index) in table.records.matched" :key='index' class="vcb-table-row text-left relative mb-8" >
            <div class="vcb-table-cell font-bold mb-2 leading-6 text-justify break-words" v-html="( index + 1 ) + ' . ' + applyTagMark(document.objective)" ></div>
            <div  class="vcb-table-cell text-xs" >
              លេខចុះ ៖ {{ document.fid }} 
              កាលបរិច្ឆែទ ៖ {{ document.type != undefined ? ' - ' + document.type.name : '' }} - {{ document.year.slice(0,10) }} 
              <!-- {{ document.createdBy != undefined ? ( ' - ' + document.createdBy.lastname + ' ' + document.createdBy.firstname ) : '' }} -->
            </div>
            <div class="vcb-table-actions-panel h-5 absolute bottom-0 right-0 text-right">
              <n-icon v-if="document.pdf"  size="20" class="cursor-pointer text-red-500 ml-4"  @click="showShareModalPopup(document)" title="មើលឯកសារ" alt="មើលឯកសារ" >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M7.503 13.002a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-.5H8.5a1.5 1.5 0 0 0 0-3h-.997zm.997 2h-.497v-1H8.5a.5.5 0 1 1 0 1zm6.498-1.5a.5.5 0 0 1 .5-.5h1.505a.5.5 0 1 1 0 1h-1.006l-.001 1.002h1.007a.5.5 0 0 1 0 1h-1.007l.002.497a.5.5 0 0 1-1 .002l-.003-.998v-.002l.003-2.002zm-3.498-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h.498a2 2 0 0 0 0-4H11.5zm.5 3v-2a1 1 0 0 1 0 2zM20 20v-1.164c.591-.281 1-.884 1-1.582V12.75c0-.698-.409-1.3-1-1.582v-1.34a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04a.63.63 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v7.168c-.591.281-1 .884-1 1.582v4.504c0 .698.409 1.3 1 1.582V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-2 .5H6a.5.5 0 0 1-.5-.5v-.996h13V20a.5.5 0 0 1-.5.5zm.5-10.5v1h-13V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5zm-1.122-1.5H14a.5.5 0 0 1-.5-.5V4.621L17.378 8.5zm-12.628 4h14.5a.25.25 0 0 1 .25.25v4.504a.25.25 0 0 1-.25.25H4.75a.25.25 0 0 1-.25-.25V12.75a.25.25 0 0 1 .25-.25z" fill="currentColor"></path></g></svg>
              </n-icon>
              <n-icon v-if="isLoggedIn"  size="20" class="cursor-pointer text-blue-700 font-bold ml-4" title="ដាក់ឯកសារចូលថត" alt="ដាក់ឯកសារចូលថត" @click="showFolderModalPopup(document)" >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
              </n-icon>
            </div>
            <!-- Document Actions -->
            <div class="record-actions-panel" >
              <n-icon size="22" class="cursor-pointer text-blue-500 mx-1" @click="showShareRegulatorModal(document)" title="ប្រតិបត្តិការផ្សេងៗ" >
                <AppsList20Regular />
              </n-icon>
              <n-icon size="22" class="cursor-pointer text-blue-500" @click="showEditModal(document)" title="កែប្រែព័ត៌មាន" >
                <Edit20Regular />
              </n-icon>
              <n-icon size="22" class="cursor-pointer text-red-500" @click="destroy(document)" title="លុបគណនីនេះចោល" >
                <TrashOutline />
              </n-icon>
              <!-- <n-icon size="22" :class="'cursor-pointer ' + (document.active == 1 ? ' text-green-500 ' : ' text-gray-500 ') " @click="activateRegulator(document)" :title="record.active == 1 ? 'គណនីនេះកំពុងបើកតំណើរការ' : 'គណនីនេះកំពុងត្រូវបានបិទមិនអាចប្រើប្រាស់បាន' " >
                <IosCheckmarkCircleOutline />
              </n-icon> -->
              <n-icon size="22" class="cursor-pointer mx-1  text-green-500" @click="showAccessibilityModal(document)" title="ឯកសារកំពុងបើកជាសាធារណ" >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M22 14a8 8 0 1 0 8 8a8.01 8.01 0 0 0-8-8zm5.91 7h-1.954a12.03 12.03 0 0 0-1.218-4.332A6.01 6.01 0 0 1 27.91 21zm-7.854 0A10.014 10.014 0 0 1 22 16.015A10.012 10.012 0 0 1 23.945 21zm3.89 2A10.01 10.01 0 0 1 22 27.985A10.012 10.012 0 0 1 20.055 23zm-4.684-6.332A12.027 12.027 0 0 0 18.044 21H16.09a6.01 6.01 0 0 1 3.172-4.332zM16.09 23h1.953a12.027 12.027 0 0 0 1.218 4.332A6.01 6.01 0 0 1 16.09 23zm8.648 4.332A12.024 12.024 0 0 0 25.956 23h1.954a6.009 6.009 0 0 1-3.172 4.332z" fill="currentColor"></path><path d="M6 14h6v2H6z" fill="currentColor"></path><path d="M6 6h12v2H6z" fill="currentColor"></path><path d="M6 10h12v2H6z" fill="currentColor"></path><path d="M6 24h6v2H6z" fill="currentColor"></path><path d="M12 30H4a2.002 2.002 0 0 1-2-2V4a2.002 2.002 0 0 1 2-2h16a2.002 2.002 0 0 1 2 2v8h-2V4H4v24h8z" fill="currentColor"></path></svg>
              </n-icon>
              <div v-if="document.pdf" class="cursor-pointer " @click="pdfPreview(document)" title="មើលឯកសារ" alt="មើលឯកសារ" >
                <n-icon size="20" class="cursor-pointer text-red-500" >
                  <DocumentPdf24Regular />
                </n-icon>
              </div>
              <n-icon size="20" class="cursor-pointer text-blue-700 mx-1" title="ដាក់ឯកសារចូលថត" alt="ដាក់ឯកសារចូលថត" @click="showFolderModalPopup(document)" >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
              </n-icon>
              <n-icon size="20" class="cursor-pointer mx-1" @click="$router.push('/regulator/child/'+document.id)" >
                <ParentChild />
              </n-icon>
            </div>
          </div>
        </div>
      </Transition>
      <!-- <table class="vcb-table" >
        <tr class="vcb-table-headers" >
          <th class="vcb-table-header" >ល.រ</th>
          <th class="vcb-table-header">កម្មវត្ថុ</th>
          <th class="vcb-table-header">លេខ</th>
          <th class="vcb-table-header w-32">ប្រភេទ</th>
          <th class="vcb-table-header w-24">ថ្ងៃខែឆ្នាំ</th>
          <th class="vcb-table-header text-right w-28" >ប្រតិបត្តិការ</th>
        </tr>
        <tr v-for="(record, index) in table.records.matched" :key='index' class="vcb-table-row" >
          <td class="vcb-table-cell font-bold" >{{ index + 1 }}</td>
          <td class="vcb-table-cell" v-html="record.objective" ></td>
          <td  class="vcb-table-cell" >{{ record.fid }}</td>
          <td  class="vcb-table-cell" >{{ record.type.name }}</td>
          <td class="vcb-table-cell" >{{ record.year.slice(0,10) }}</td>
          <td class="vcb-table-actions-panel text-right" >
            <n-icon size="22" class="cursor-pointer text-blue-500" @click="showEditModal(record)" title="កែប្រែព័ត៌មាន" >
              <Edit20Regular />
            </n-icon>
            
            <n-icon size="22" :class="'cursor-pointer ' + (record.active == 1 ? ' text-green-500 ' : ' text-gray-500 ') " @click="activateRegulator(record)" :title="record.active == 1 ? 'គណនីនេះកំពុងបើកតំណើរការ' : 'គណនីនេះកំពុងត្រូវបានបិទមិនអាចប្រើប្រាស់បាន' " >
              <IosCheckmarkCircleOutline />
            </n-icon>
            <n-icon size="30" :class="'cursor-pointer ' + (record.pdf == 1 ? ' text-green-500 ' : ' text-gray-500 ') " @click="activateRegulator(record)" :title="record.active == 1 ? 'គណនីនេះកំពុងបើកតំណើរការ' : 'គណនីនេះកំពុងត្រូវបានបិទមិនអាចប្រើប្រាស់បាន' " >
              <DocumentPdf24Regular />
            </n-icon>
            <n-icon size="20" class="cursor-pointer text-red-500 p-2  pt-1  mx-1" @click="removeDocumentFromFolder(record)" title="ដកឯកសារចេញពីថត" >
              <TrashOutline />
            </n-icon>
            <n-icon size="20" class="cursor-pointer text-red-500 p-2 mx-1" @click="viewPdf(record)" title="មើលឯកសារយោង" >
              <DocumentPdf24Regular />
            </n-icon>
            <n-icon v-if="record.pdf != 1" size="20" class="cursor-pointer text-red-500 p-2 pt-1  mx-1"  @click="viewPdf(record)" title="មើលឯកសារ" alt="មើលឯកសារ"  >
              <DocumentPdf24Regular />
            </n-icon>
          </td>
        </tr>
      </table> -->
      <!-- Loading -->
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
    </div>
    <!-- Pagination of crud -->
    <div class="vcb-table-pagination">
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
    <!-- Filter panel of crud -->
    <div v-if="filterPanel" class="vcb-filter-panel h-64">
      <div class="filter-container relative w-full flex">
        <Icon size="40" class="absolute right-0 top-0 cursor-pointer text-red-700" @click="filterPanel=!filterPanel" >
          <CloseCircleOutline />
        </Icon>
      </div>
    </div>
    <!-- PDF Dialog -->
    <div v-if="pdf.viewer" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white z-50">
        <vue-pdf-embed :source="pdf.url" class="w-full h-screen overflow-y-scroll" />
        <div class="absolute top-3 right-3 cursor-pointer " @click="closePdf" >
          <svg class="w-12 h-12 mr-4 mt-0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" fill="currentColor"></path></svg>
        </div>
        <div class="absolute top-3 right-20 cursor-pointer " @click="copyShareLink" >
          <svg class="w-8 h-8 mr-4 mt-2 cursor-pointer font-bold ml-4"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><g><path d="M383.822,344.427c-16.045,0-31.024,5.326-41.721,15.979l-152.957-88.42c1.071-5.328,2.142-9.593,2.142-14.919
            c0-5.328-1.071-9.593-2.142-14.919l150.826-87.35c11.762,10.653,26.741,17.041,43.852,17.041c35.295,0,64.178-28.766,64.178-63.92
            C448,72.767,419.117,44,383.822,44c-35.297,0-64.179,28.767-64.179,63.92c0,5.327,1.065,9.593,2.142,14.919l-150.821,87.35
            c-11.767-10.654-26.741-17.041-43.856-17.041c-35.296,0-63.108,28.766-63.108,63.92c0,35.153,28.877,63.92,64.178,63.92
            c17.115,0,32.089-6.389,43.856-17.042l151.891,88.421c-1.076,4.255-2.141,8.521-2.141,13.847
            c0,34.094,27.806,61.787,62.037,61.787c34.229,0,62.036-27.693,62.036-61.787C445.858,372.12,418.052,344.427,383.822,344.427z"></path></g></g></svg>
        </div>
      </div>
      <!-- End PDF Dialog -->
  </div>
</template>
<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { Switcher, Filter, DataStructured } from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { IosCheckmarkCircleOutline, IosRefresh } from '@vicons/ionicons4'
import { TrashOutline, CloseCircleOutline } from '@vicons/ionicons5'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { ArrowBackIosRound } from '@vicons/material'
import { Edit20Regular, Key16Regular, Save20Regular, Add20Regular, Search20Regular , ContactCard28Regular, DocumentPdf24Regular, AppsList20Regular } from '@vicons/fluent'
import VuePdfEmbed from 'vue-pdf-embed'
/**
 * CRUD component form
 */
export default {
  name: "FolderRegulator" ,
  components: {
    QrcodeVue ,
    Vue3Barcode,
    Switcher,
    Add20Regular ,
    DataStructured,
    Icon,
    IosCheckmarkCircleOutline,
    IosRefresh ,
    CloseCircleOutline ,
    Search20Regular ,
    Edit20Regular,
    Key16Regular,
    DocumentPdf24Regular ,
    Save20Regular ,
    TrashOutline ,
    ContactCard28Regular ,
    Filter,
    ArrowBackIosRound ,
    VuePdfEmbed ,
    AppsList20Regular
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    const route = useRoute()
    /**
     * Variables
     */    
    const model = reactive( {
      name: "FolderRegulator" ,
      title: "ឯកសារដែលបានរក្សារទុក"
    })
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
          notify.warning({
            title: 'អានឯកសារ' ,
            description: res.data.message ,
            duration: 3000
          })
        }
        closeTableLoading()
      }).catch( err => {
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

    const pdf = reactive({
      viewer: false ,
      filename: '' ,
      url: ''
    })
    const pdfShareLink = ref(null)
    function viewPdf(record){
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

    function closePdf(){
      pdf.viewer = false
      pdf.url = ""
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
  
    /**
     * Initial the data
     */
    getRecords()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      filterPanel ,
      pdf ,
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
       * Functions
       */
      applyTagMark,
      removeDocumentFromFolder ,
      viewPdf ,
      closePdf ,
      copyShareLink
    }
  }
}

</script>

<style scoped>
  .vcb-table-panel {
    @apply relative p-4 overflow-auto;
  }
  .vcb-table {
    @apply w-full ;
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
    @apply flex flex-row fixed bg-white right-0 bottom-0 border border-l p-3 z-50 ;
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