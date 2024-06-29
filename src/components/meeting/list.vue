<template>
  <div class="w-full" >
    <div class="w-full leading-9 font-moul -mt-12 mb-4 text-left pl-16" v-html="model.title" ></div>
    <!-- Top action panel of crud -->
    <div class="flex w-full title-bar border-b px-4 border-gray-200 py-4 ">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title hidden" >
        <svg class="flex-none h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8h14v2H16z" fill="currentColor"></path><path d="M6 10.59L3.41 8L2 9.41l4 4l8-8L12.59 4L6 10.59z" fill="currentColor"></path><path d="M16 22h14v2H16z" fill="currentColor"></path><path d="M6 24.59L3.41 22L2 23.41l4 4l8-8L12.59 18L6 24.59z" fill="currentColor"></path></svg>
        <div class="leading-9 font-moul" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex p-2">
        <!-- New Button -->
        <div class="mt-1 ml-2">
          <n-button type="success" @click="showCreateModal()" >
            <template #icon>
              <n-icon>
                <Add20Regular />
              </n-icon>
            </template>
            បន្ថែម
          </n-button>
        </div>
        <!-- Search Button -->
        <div class="w-1/5 relative ml-2 " >
          <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 duration-500 " placeholder="ស្វែងរក" />
          <svg class="absolute right-1 top-2 w-7 text-gray-400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
        </div>
        <!-- Status filter dropdown list-->
        <div class="w-1/6 mt-1 relative ml-2" >
          <n-select 
            @update:value="updateStatus"
            placeholder="ស្ថានភាពកិច្ចប្រជុំ"
            :options="statuses"
            multiple
          >
          </n-select>
        </div>
        <!-- Type filter dropdown list-->
        <div class="w-1/6 mt-1 relative ml-2" >
          <n-select 
            @update:value="updateType"
            placeholder="ប្រភេទកិច្ចប្រជុំ"
            :options="types"
            multiple
          >
          </n-select>
        </div>
        <!-- Organization filter dropdown list-->
        <div class="w-1/6 mt-1 relative ml-2" >
          <n-select 
            @update:value="updateOrganization"
            placeholder="ក្រសួង ស្ថាប័ន"
            :options="organizations"
            multiple
            filterable
          >
          </n-select>
        </div>
        <!-- Meeting member filter dropdown list-->
        <div class="w-1/6 mt-1 relative ml-2" >
          <n-select 
            @update:value="updatePeople"
            placeholder="សមាសភាពអង្គប្រជុំ"
            :options="people"
            multiple
            filterable
          >
          </n-select>
        </div>
        <!-- Meeting room filter dropdown list-->
        <div class="w-1/6 mt-1 relative ml-2" >
          <n-select 
            @update:value="updateRoom"
            placeholder="សាលប្រជុំ"
            :options="rooms"
            multiple
            filterable
          >
          </n-select>
        </div>
        <!-- Type filter dropdown list-->
        <div class="w-1/6 mt-1 relative ml-2" >
          <n-date-picker 
          v-model:value="selectedDate" 
          @update:value="updateDate"
          type="date" />
        </div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel">
      <Transition name="slide-fade" >
        <div class="vcb-table w-full" >
          <div class="flex w-full flex-wrap" >
            <table v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="vcb-table border border-gray-300 rounded-lg" >
              <tr class="vcb-table-headers bg-gray-300" >
                <th class="vcb-table-header" >ល.រ</th>
                <th class="vcb-table-header">ខ្លឹមសារ</th>
                <th class="vcb-table-header">ថ្ងៃប្រជុំ</th>
                <th class="vcb-table-header">ចាប់ផ្ដើម</th>
                <th class="vcb-table-header">បញ្ចប់</th>
                <th class="vcb-table-header">ប្រភេទប្រជុំ</th>
                <th class="vcb-table-header text-center w-28">ស្ថានភាព</th>
                <!-- <th class="vcb-table-header text-right w-40" >ប្រតិបត្តិការ</th> -->
              </tr>
              <tr v-for="(record, index) in table.records.matched" :key='index' :class=" 'vcb-table-row hover:bg-gray-200 duration-500 ' + ( index % 2 ? ' bg-gray-100 ' : ' bg-gray-50 ' ) " >
                <td class="vcb-table-cell font-bold w-12" >{{ index + 1 }}</td>
                <td class="main-cell vcb-table-cell flex flex-wrap justify-content relative" >
                  <div class="w-full py-2" >{{ record.objective }}</div>

                  <div v-if="Array.isArray( record.organizations ) && record.organizations.length > 0" class="pr-4 flex" >
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg class="cursor-pointer w-4 text-yellow-600 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g fill="none"><path d="M24 14.001a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm1.346-9.554a2.25 2.25 0 0 0-2.692 0L6.71 16.349c-1.35 1.007-.637 3.152 1.046 3.152H9v12.005a5.25 5.25 0 0 0-3 4.744v3.5c0 .69.56 1.25 1.25 1.25h33.5c.69 0 1.25-.56 1.25-1.25v-3.5a5.25 5.25 0 0 0-3-4.744V19.5h1.244c1.684 0 2.396-2.145 1.047-3.152L25.346 4.447zM36.5 31H32V19.5h4.5V31zm-7 0h-4.25V19.5h4.25V31zm-6.75 0H18.5V19.5h4.25V31zM16 31h-4.5V19.5H16V31zm-5.986-13.999L24 6.561l13.985 10.44H10.014zM8.5 36.251a2.75 2.75 0 0 1 2.75-2.75h25.5a2.75 2.75 0 0 1 2.75 2.75v2.25h-31v-2.25z" fill="currentColor"></path></g></svg>
                      </template>
                      ក្រសួងស្ថាប័ន
                    </n-tooltip>
                    {{ record.organizations.map( o => o.name ).join( ' , ' ) }}
                  </div>
                  
                  <div v-if="Array.isArray( record.rooms ) && record.rooms.length > 0" class="pr-4 flex" >
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg class="cursor-pointer w-4 text-yellow-600 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28"><g fill="none"><path d="M11.894 2.014l11.5 2.25A.75.75 0 0 1 24 5v18a.75.75 0 0 1-.606.736l-11.5 2.25A.75.75 0 0 1 11 25.25V2.75a.75.75 0 0 1 .894-.736zm.606 1.647V24.34l10-1.956V5.618l-10-1.957zm-2.5.84V6H5.5v16H10v1.5H4.75a.75.75 0 0 1-.743-.649L4 22.75V5.25a.75.75 0 0 1 .648-.743L4.75 4.5H10zm5 8.5a1 1 0 1 1 0 2a1 1 0 0 1 0-2z" fill="currentColor"></path></g></svg>
                      </template>
                      សាលប្រជុំ
                    </n-tooltip>
                    {{ record.rooms.map( o => o.name ).join( ' , ' ) }}
                  </div>

                  <!-- <div v-if="Array.isArray( record.listMembers ) && record.listMembers.length > 0" class="w-full pr-4 flex leading-8" >
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg class="cursor-pointer w-4 text-yellow-600 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 512"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" fill="currentColor"></path></svg>
                      </template>
                      សមាជិកប្រជុំ
                    </n-tooltip>
                    {{ record.listMembers.map( o => o.member.lastname + " " + o.member.firstname ).join( ' , ' ) }}
                  </div> -->

                  <!-- <div class="meeting-details w-full">
                    <div v-if="Array.isArray( record.seichdey_preeng ) && record.seichdey_preeng.length > 0" class="w-full p-2 mr-1 my-2 border-b border-gray-200 rounded-sm" >សេចក្ដីព្រាង ៖ <br/> {{ record.seichdey_preeng.map( o => o.name ).join( ' , ' ) }}</div>
                    <div v-if="Array.isArray( record.reports ) && record.reports.length > 0" class="w-full p-2 mr-1 my-2 border-b border-gray-200 rounded-sm" >របាយការណ៍ ៖ <br/> {{ record.reports.map( o => o.name ).join( ' , ' ) }}</div>
                    <div v-if="Array.isArray( record.other_documents ) && record.other_documents.length > 0" class="w-full p-2 mr-1 my-2 border-b border-gray-200 rounded-sm" >ឯកសារផ្សេង ៖ <br/> {{ record.other_documents.map( o => o.name ).join( ' , ' ) }}</div>
                    <div v-if="Array.isArray( record.organizations ) && record.organizations.length > 0" class="w-full p-2 mr-1 my-2 border-b border-gray-200 rounded-sm" >ក្រសួងសាមី ៖ <br/> {{ record.organizations.map( o => o.name ).join( ' , ' ) }}</div>
                    <div v-if="Array.isArray( record.regulators ) && record.regulators.length > 0" class="w-full p-2 mr-1 my-2 border-b border-gray-200 rounded-sm" >លិខិតគតិយុត្ត ៖ <br/> {{ record.regulators.map( o => o.types.map( (t) => t.desp ).join('') + " - " + o.fid + " - " + o.year + " , " + o.objective ).join( ' , ' ) }}</div>
                    <div v-if="Array.isArray( record.listMembers ) && record.listMembers.length > 0" class="w-full p-2 mr-1 my-2 border-b border-gray-200 rounded-sm" >សមាជិកប្រជុំ ៖ <br/> {{ record.listMembers.map( o => o.member.lastname + " " + o.member.firstname ).join( ' , ' ) }}</div>
                    <div v-if="Array.isArray( record.rooms ) && record.rooms.length > 0" class="w-full p-2 mr-1 my-2 border-b border-gray-200 rounded-sm" >បន្ទប់ប្រជុំ ៖ <br/> {{ record.rooms.map( o => o.name ).join( ' , ' ) }}</div>
                  </div> -->

                  <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M10 18h8v2h-8z" fill="currentColor"></path><path d="M10 13h12v2H10z" fill="currentColor"></path><path d="M10 23h5v2h-5z" fill="currentColor"></path><path d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM12 4h8v4h-8zm13 24H7V7h3v3h12V7h3z" fill="currentColor"></path></svg> -->

                  <n-tooltip v-if="record.children.length" trigger="hover">
                    <template #trigger>
                      <div 
                      class="cursor-pointer absolute right-1 top-1 text-xs h-6 leading-4 text-center bg-gray-100 border border-gray-400 text-gray-800 font-bold p-1 px-2 rounded-full" >{{ record.children.length }}</div>
                    </template>
                    ធ្លាប់បានប្រជុំចំនួន {{ record.children.length }}
                  </n-tooltip>

                  <div class="action-panel flex w-full mt-4" >
                    <!-- Record Actions -->
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg class="cursor-pointer w-6 text-red-500 mx-1" @click="destroy(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>
                      </template>
                      លុបគណនីនេះចោល
                    </n-tooltip>

                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg @click="showUpdateModal(record)" class="cursor-pointer w-6 text-yellow-600 mx-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M21.03 2.97a3.578 3.578 0 0 1 0 5.06L9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L15.97 2.97a3.578 3.578 0 0 1 5.06 0zM15 6.06L5.062 16a.75.75 0 0 0-.193.333l-1.05 3.85l3.85-1.05A.75.75 0 0 0 8 18.938L17.94 9L15 6.06zm2.03-2.03l-.97.97L19 7.94l.97-.97a2.079 2.079 0 0 0-2.94-2.94z" fill="currentColor"></path></g></svg>
                      </template>
                      កែប្រែព័ត៌មាន
                    </n-tooltip>

                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg class="cursor-pointer w-6 text-blue-500 mx-1" @click="showChildMeetingModal(record)" 
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
                      </template>
                      បញ្ចូលការប្រជុំបន្ទាប់
                    </n-tooltip>
                    
                    <n-tooltip v-if="parseInt( record.pid ) > 0 || record.children.length > 0 " trigger="hover">
                      <template #trigger>
                        <svg @click="showHistoryModal(record)" class="cursor-pointer w-6 text-gray-500 mx-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M23 9.005h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1H11v-1a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h4v20a2.002 2.002 0 0 0 2 2h4v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1h-4v-9h4v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1h-4v-9h4v1a2 2 0 0 0 2 2zm0-6h6v4h-6zm-14 4H3v-4h6zm14 18h6v4h-6zm0-11h6v4h-6z" fill="currentColor"></path></svg>
                      </template>
                      ប្រវត្តកិច្ចប្រជុំ
                    </n-tooltip>

                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg @click="showOtherModal(record)" class="cursor-pointer w-6 text-green-500 mx-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M26 6V2H2v10h9v18h19V6zM4 10V4h20v2H11v4zm24 18H13V8h15z" fill="currentColor"></path><path d="M15 11h2v2h-2z" fill="currentColor"></path><path d="M19 11h7v2h-7z" fill="currentColor"></path><path d="M15 17h2v2h-2z" fill="currentColor"></path><path d="M19 17h7v2h-7z" fill="currentColor"></path><path d="M15 23h2v2h-2z" fill="currentColor"></path><path d="M19 23h7v2h-7z" fill="currentColor"></path></svg>
                      </template>
                      មុខងារផ្សេងទៀត
                    </n-tooltip>

                  </div>
                </td>
                <td class="vcb-table-cell w-40" >{{ record.date }}</td>
                <td  class="vcb-table-cell w-28" >{{ record.start }}</td>
                <td  class="vcb-table-cell w-28" >{{ record.end }}</td>
                <td class="vcb-table-cell w-48" >{{ record.type != undefined ? record.type.name : '' }}</td>
                <td :class=" 'vcb-table-cell w-28 font-btb-black ' + ( statuses.find( (g) => g.value == record.status ).color ) " >
                  {{ statuses.find( (g) => g.value == record.status ).label }}
                  <!-- <n-popselect
                    v-model:value="record.status"
                    :options="statuses"
                    size="medium"
                    scrollable
                    @update:value="updateMeetingStatus(record)"
                  >
                  <n-button class="mx-1" >{{ statuses.find( (g) => g.value == record.status ).label }}</n-button>  
                  </n-popselect> -->
                </td>
                <!-- <td class="vcb-table-actions-panel text-right w-40" >
                  
                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <svg class="cursor-pointer w-6 text-red-500 mx-1" @click="destroy(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>
                    </template>
                    លុបគណនីនេះចោល
                  </n-tooltip>

                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <svg class="cursor-pointer w-6 text-yellow-600 mx-1" @click="showUpdateModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M21.03 2.97a3.578 3.578 0 0 1 0 5.06L9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L15.97 2.97a3.578 3.578 0 0 1 5.06 0zM15 6.06L5.062 16a.75.75 0 0 0-.193.333l-1.05 3.85l3.85-1.05A.75.75 0 0 0 8 18.938L17.94 9L15 6.06zm2.03-2.03l-.97.97L19 7.94l.97-.97a2.079 2.079 0 0 0-2.94-2.94z" fill="currentColor"></path></g></svg>
                    </template>
                    កែប្រែព័ត៌មាន
                  </n-tooltip>

                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <svg class="cursor-pointer w-6 text-blue-500 mx-1" @click="showChildMeetingModal(record)" 
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
                    </template>
                    បញ្ចូលការប្រជុំបន្ទាប់
                  </n-tooltip>
                  
                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <svg @click="showOtherModal(record)" class="cursor-pointer w-6 text-blue-500 mx-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M26 6V2H2v10h9v18h19V6zM4 10V4h20v2H11v4zm24 18H13V8h15z" fill="currentColor"></path><path d="M15 11h2v2h-2z" fill="currentColor"></path><path d="M19 11h7v2h-7z" fill="currentColor"></path><path d="M15 17h2v2h-2z" fill="currentColor"></path><path d="M19 17h7v2h-7z" fill="currentColor"></path><path d="M15 23h2v2h-2z" fill="currentColor"></path><path d="M19 23h7v2h-7z" fill="currentColor"></path></svg>
                    </template>
                    មុខងារផ្សេងទៀត
                  </n-tooltip>

                  <n-tooltip v-if="parseInt( record.pid ) > 0" trigger="hover">
                    <template #trigger>
                      <svg class="cursor-pointer w-6 text-blue-500 mx-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M23 9.005h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1H11v-1a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h4v20a2.002 2.002 0 0 0 2 2h4v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1h-4v-9h4v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1h-4v-9h4v1a2 2 0 0 0 2 2zm0-6h6v4h-6zm-14 4H3v-4h6zm14 18h6v4h-6zm0-11h6v4h-6z" fill="currentColor"></path></svg>
                    </template>
                    ប្រវត្តកិច្ចប្រជុំ
                  </n-tooltip>

                </td> -->
              </tr>
            </table>   
            <div v-else class="text-xl text-gray-500 text-center place-items-center place-content-center w-full h-60 flex" >
              មិនមានកិច្ចប្រជុំទេ។
            </div> 
          </div>
        </div>
      </Transition>
      <!-- Loading -->
      <Transition name="slide-fade" >
        <div v-if="table.loading" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-80 ">
          <div class="flex mx-auto items-center">
            <div class="spinner">
              <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
              <br/><br/>កំពុងអាន...
            </div>
          </div>
          <div class="absolute top-1 right-1 cursor-pointer bg-white rounded-full " @click="closeTableLoading" >
            <svg class="w-14 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
          </div>
        </div>
      </Transition>
    </div>
    <!-- Pagination of crud -->
    <Transition name="fade" >
      <!-- Pagination of crud -->
      <div v-if="table.pagination.buttons.length" class="fixed left-0 right-0 bottom-12 h-12 flex" >
        <div class="vcb-table-pagination ">
          <!-- First -->
          <!-- Previous -->
          <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='"<"' @click="previous()" ></div>
          <!-- Pages (7) -->
          <div v-for="(page, index) in table.pagination.buttons" :key="index" :class="'vcb-pagination-page pages h-8 mx-2 font-bold' + (table.pagination.page == page ? ' bg-blue-500 text-white  rounded-full' : '' )" @click="table.pagination.page == page ? false : goTo(page) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">{{ page }}</div>
          </div>
          <!-- <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(1) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">1</div>
          </div> -->
          <!-- Next -->
          <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='">"' @click="next()" ></div>
          <!-- Last -->
          <!-- Go to -->
          <!-- Total per page -->
        </div>
      </div>
    </Transition>
    <!-- Pagination of crud -->
    <Transition name="fade" >
      <create-form v-bind:model="model" v-bind:show="createModal.show" :onClose="closeCreateModal"/>
    </Transition>
    <Transition name="fade" >
      <update-form v-bind:model="model" v-bind:record="editRecord" v-bind:show="updateModal.show" :onClose="closeUpdateModal"/>
    </Transition>
    <Transition name="fade" >
      <other-form v-bind:model="model" v-bind:record="editRecord" v-bind:show="otherModal.show" :onClose="closeOtherModal"/>
    </Transition>
    <Transition name="fade" >
      <child-meeting-form v-bind:model="model" v-bind:parent="editRecord" v-bind:show="childMeetingModal.show" :onClose="closeChildMeetingModal"/>
    </Transition>
    <Transition name="fade" >
      <history-form v-bind:model="model" v-bind:record="editRecord" v-bind:show="historyModal.show" :onClose="closeHistoryModal"/>
    </Transition>
  </div>
</template>
<script>
import { isAuth, getUser , authLogout } from './../../plugins/authentication.js'
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
import dateFormat from 'dateformat'
import CreateForm from './create.vue'
import UpdateForm from './update.vue'
import OtherForm from './others.vue'
import HistoryForm from './history.vue'
import ChildMeetingForm from './child.vue'

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
    IosRefresh ,
    CloseCircleOutline ,
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
    // Form
    CreateForm ,
    OtherForm ,
    UpdateForm ,
    ChildMeetingForm ,
    HistoryForm
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    
    const selectedStatuses = ref([])
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
    function updateStatus(value, selection){
      selectedStatuses.value = value 
      goTo(1)
    }

    /**
     * Variables
     */    
    const model = reactive( {
      name: "meeting" ,
      title: "កិច្ចប្រជុំ"
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
          objective: '' ,
          date: '' ,
          contact_info: ''
        },
        format: {
          id: 0 ,
          objective: '' ,
          date: '' ,
          start: new Date() ,
          end: new Date() ,
          actual_start: new Date() ,
          actual_end: new Date() ,
          contact_info: '' ,
          status : 0 ,
          seichdey_seichdeyPreeng: [] ,
          reports: [] ,
          other_documents: [] ,
          regulators: [] ,
          organizations: [] ,
          members: [] ,
          rooms: [] ,
          created_by : null ,
          updated_by : null
        }
      } ,
      pagination: {
        perPage: 10 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0 ,
        start: 0 ,
        end: 0 ,
        buttons: []
      }
    })
    const filterPanel = ref(false)

    const today = computed(() => {
      return dateFormat( new Date( attendantDate.value ) , 'yyyy-mm-dd' )
    })

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
      console.log( selectedRooms.value )
      console.log( selectedTypes.value )
      console.log( selectedOrganizations.value )
      console.log( selectedPeople.value )
      console.log( selectedStatuses.value )
      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.name+'/list',{
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page ,
        date: dateFormat( new Date( selectedDate.value ) , 'yyyy-mm-dd' ) ,
        statuses: selectedStatuses.value ,
        types: selectedTypes.value ,
        members : selectedPeople.value ,
        organizations : selectedOrganizations.value ,
        rooms : selectedRooms.value
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

    function getStatusLabel( code ){
      let status = statuses.find( s => s.code == code )
      return status != undefined ? status.label : "មិនមាន"
    }

    /**
     * Create modal handling
     */
    var createModal = reactive({show:false})
    function showCreateModal(){
      createModal.show = true
    }

    function closeCreateModal( ){
      createModal.show = false
      if( !createModal.show ){
        getRecords()
      }
    }

    /**
     * Edit modal handling
     */
     var updateModal = reactive({show:false})
    function showUpdateModal(record){
      updateModal.show = true
      editRecord.id = record.id
      editRecord.objective = record.objective
      editRecord.contact_info = record.contact_info
      editRecord.start = record.start
      editRecord.end = record.end
      editRecord.date = record.date
      editRecord.type_id = record.type_id
      
    }

    function closeUpdateModal( ){
      updateModal.show = false
      if( !updateModal.show ){
        getRecords()
      }
    }

    /**
     * Edit record
     */
    const editRecord = reactive({
      id: 0 ,
      start: '' ,
      end: '' ,
      objective: '' ,
      contact_info: '' ,
      status: null ,
      type_id: null ,
      type: null ,
      date: new Date() ,
      seichdey_preeng: [] ,
      reports: [] ,
      other_documents: [] ,
      organizations: [] ,
      listMembers: [] ,
      regulators: [] ,
      rooms: []
    })

    /**
     * Other modal handling
     */
    var otherModal = reactive({show:false})
    function showOtherModal(record){
      otherModal.show = true
      editRecord.id = record.id
      editRecord.objective = record.objective
      editRecord.start = record.start
      editRecord.end = record.end
      editRecord.date = record.date
      editRecord.status = record.status
      editRecord.type_id = record.type_id
      editRecord.type = record.type
      editRecord.seichdey_preeng = record.seichdey_preeng
      editRecord.reports = record.reports
      editRecord.other_documents = record.other_documents
      editRecord.organizations = record.organizations
      editRecord.listMembers = record.listMembers
      editRecord.regulators = record.regulators
      editRecord.rooms = record.rooms
    }

    function closeOtherModal( ){
      otherModal.show = false
      if( !otherModal.show ){
        getRecords()
      }
    }

    /**
     * History modal handling
     */
     var historyModal = reactive({show:false})
    function showHistoryModal(record){
      historyModal.show = true
      editRecord.id = record.id
      editRecord.objective = record.objective
      editRecord.start = record.start
      editRecord.end = record.end
      editRecord.date = record.date
      editRecord.status = record.status
      editRecord.type_id = record.type_id
      editRecord.type = record.type
      editRecord.seichdey_preeng = record.seichdey_preeng
      editRecord.reports = record.reports
      editRecord.other_documents = record.other_documents
      editRecord.organizations = record.organizations
      editRecord.listMembers = record.listMembers
      editRecord.regulators = record.regulators
      editRecord.rooms = record.rooms
    }

    function closeHistoryModal( ){
      historyModal.show = false
      if( !historyModal.show ){
        getRecords()
      }
    }

    /**
     * Child meeting modal handle
     */

    var childMeetingModal = reactive({show:false})
    function showChildMeetingModal(record){
      childMeetingModal.show = true
      editRecord.id = record.id
    }

    function closeChildMeetingModal( ){
      childMeetingModal.show = false
      if( !childMeetingModal.show ){
        getRecords()
      }
    }

    function destroy(record){
      dialog.warning({
        title: "លុបកិច្ចប្រជុំ" ,
        content: "តើអ្នកចង់ លុប កិច្ចប្រជុំនេះមែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch(model.name+'/delete',{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'លុបកិច្ចប្រជុំ' ,
                description: 'លុបបានរួចរាល់។' ,
                duration: 3000
              })
              getRecords()
            }else{
              notify.success({
                title: 'លុបកិច្ចប្រជុំ' ,
                description: 'មានបញ្ហាក្នុងពេលលុបកិច្ចប្រជុំ។' ,
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

    function updateMeetingStatus(record){
      store.dispatch( model.name+'/update',{
        id: record.id ,
        objective: record.objective ,
        date: record.date  ,
        start: record.start ,
        end: record.end ,
        status: record.status ,
        type_id: record.type_id ,
        contact_info : record.contact_info
      }).then( res => {
        switch( res.status ){
          case 200 : 
          message.success("រួចរាល់។")
          break;
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : 'មានបញ្ហាក្នុងពេលកែប្រែស្ថានភាពប្រជុំ។' ,
          duration : 3000
        })
      })
    }

    // function getOrganizations(){
    //   store.dispatch('organization/list',{page:1, perPage : 1000 , search : '' })
    //   .then( res => {
    //     store.commit('organization/setRecords', res.data.records)
    //   }).catch( err => {
    //     notify.error( err )
    //   })
    // }

    function getTypes(){
      store.dispatch('type/list',{page:1, perPage : 1000 , search : '' })
      .then( res => {
        store.commit('type/setRecords', res.data.records)
      }).catch( err => {
        notify.error( err )
      })
    }
    const types = computed( () => {
      let types = 
        store.getters['type/getRecords'].map( type => {
          return { label : type.name , value : type.id }
        })
        types.unshift({
          label: 'ទាំងអស់' ,
          value: 0
        })
      return types
    })
    const selectedTypes = ref([])
    function updateType(value,selection){
      selectedTypes.value = value
      goTo(1)
    }

    function getOrganizations(){
      store.dispatch('organization/list',{page:1, perPage : 1000 , search : '' })
      .then( res => {
        store.commit('organization/setRecords', res.data.records)
      }).catch( err => {
        notify.error( err )
      })
    }
    const organizations = computed( () => {
      let organizations = 
        store.getters['organization/getRecords'].map( organization => {
          return { label : organization.name , value : organization.id }
        })
        organizations.unshift({
          label: 'ទាំងអស់' ,
          value: 0
        })
      return organizations
    })
    const selectedOrganizations = ref([])
    function updateOrganization(value,selection){
      selectedOrganizations.value = value
      goTo(1)
    }


    function getPeople(){
      store.dispatch('meeting/people',{page:1, perPage : 1000 , search : '' })
      .then( res => {
        store.commit('meeting/setPeople', res.data.records)
      }).catch( err => {
        notify.error( err )
      })
    }
    const people = computed( () => {
      let people = 
        store.getters['meeting/people'].map( person => {
          return { label : person.lastname + " " + person.firstname , value : person.id }
        })
        people.unshift({
          label: 'ទាំងអស់' ,
          value: 0
        })
      return people
    })
    const selectedPeople = ref([])
    function updatePeople(value,selection){
      selectedPeople.value = value
      goTo(1)
    }

    function getRooms(){
      store.dispatch('room/list',{page:1, perPage : 1000 , search : '' })
      .then( res => {
        store.commit('room/setRecords', res.data.records)
      }).catch( err => {
        notify.error( err )
      })
    }
    const rooms = computed( () => {
      let rooms = 
        store.getters['room/getRecords'].map( room => {
          return { label : room.name , value : room.id }
        })
        rooms.unshift({
          label: 'ទាំងអស់' ,
          value: 0
        })
      return rooms
    })
    const selectedRooms = ref([])
    function updateRoom(value,selection){
      selectedRooms.value = value
      goTo(1)
    }

    const selectedDate = ref(new Date().getTime())
    function updateDate(value){
      selectedDate.value = value
      goTo(1)
    }

    /**
     * Initial the data
     */
    getRecords()
    getTypes()
    getOrganizations()
    getPeople()
    getRooms()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      filterPanel ,
      updateMeetingStatus ,
      /**
       * module variable
       */
      statuses ,
      selectedStatuses ,
      types ,
      selectedDate ,
      organizations,
      selectedOrganizations,
      people ,
      selectedPeople,
      rooms ,
      selectedRooms ,
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
      applyTagMark ,
      /**
       * Module functions
       */
      getStatusLabel ,

      /**
       * Create modal
       */
      closeCreateModal ,
      showCreateModal ,
      createModal ,

      /**
       * Update modal
       */
      closeUpdateModal ,
      showUpdateModal ,
      updateModal ,

      /**
       * Other modal
       */
      closeOtherModal ,
      showOtherModal ,
      otherModal ,

      /**
       * History modal
       */
      closeHistoryModal ,
      showHistoryModal ,
      historyModal ,

      /**
       * Child meeting modal
       */
      closeChildMeetingModal ,
      showChildMeetingModal ,
      childMeetingModal ,

      /**
       * Edit record
       */
      editRecord ,

      /**
       * Record function
       */
      destroy ,
      updateStatus ,
      updateType ,
      updateOrganization ,
      updatePeople ,
      updateRoom ,
      updateDate 
    }
  }
}

</script>