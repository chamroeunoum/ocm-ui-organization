<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-mask-click="closeModal" transform-origin="center" :on-after-enter="initial" class=" relative min-h-screen" >
        <n-card class="w-11/12 font-pvh text-xl relative min-h-screen">
          <n-tabs
            class="card-tabs min-h-screen"
            default-value="meetingMembers"
            size="large"
            animated
            pane-wrapper-style="margin: 0 -4px"
            pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
            tab-style=" tab-style"
          >
          <!-- Members -->
            <n-tab-pane name="meetingMembers" tab="សមាជិកប្រជុំ" class="flex min-h-screen" >
              <!-- Member Form -->
              <div class=" flex-none w-1/5 min-h-full " >
                <!-- Search box -->
                <div class="w-full pb-2" >
                  <n-input type="text" v-model:value="peopleSearch" @keyup.enter="getPeople" class="w-full" placeholder="ស្វែងរក..." />
                </div>
                <!-- List members -->
                <div class="w-full" >
                  <div v-for="(person,index) in people" :key="index" class="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 duration-300" @click="toggleMeetingMembers(person)" >
                    <div class="member_name  text-gray-700" >{{  (index + 1 ) + ". " + person.lastname + " " + person.firstname }}</div>
                    <div v-if="person.organizations.length" class="member_organizations text-gray-500 text-xs " >{{ person.organizations.map( (p) => p.name ).join(' - ') }}</div>
                    <div v-if="person.positions.length" class="member_positions text-gray-500 text-xs " >{{ person.positions.map( (p) => p.name ).join(' - ') }}</div>
                    <div v-if="person.email != undefined && person.email.length > 0" class="member_email  text-gray-500 text-xs " >{{ person.email }}</div>
                    <div v-if="person.mobile_phone != undefined && person.mobile_phone.length > 0" class="member_email  text-gray-500 text-xs " >{{ person.mobile_phone }}</div>
                  </div>
                </div>
              </div>
              <!-- Selected Members -->
              <div class=" flex-grow px-4 ml-4 border border-gray-200" >
                <div class="selected_members font-moul w-full border-b border-gray-200 my-4" >បញ្ជីសមាជិកកិច្ចប្រជុំ ៖
                  <svg @click="memberAddDrawer.show=!memberAddDrawer.show" class="absolute top-6 right-4 w-8 cursor-pointer hover:text-blue-500 duration-300  " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
                </div>
                  <div v-for="(meetingMember,index) in meetingMembers" :key="index" class="p-2 border-b border-gray-200 relative " >
                    <div class="member_name mb-2" >
                      {{  (index + 1 ) + ". " + meetingMember.member.lastname + " " + meetingMember.member.firstname +( meetingMember.member.mobile_phone != undefined && meetingMember.member.mobile_phone.length > 0 ? ' - ' + meetingMember.member.mobile_phone : '' ) }}
                    </div>
                    <!-- Button remove member from meeting list -->
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg class="absolute top-2 right-2 w-6 cursor-pointer hover:text-red-500 duration-300 "
                          @click="toggleMeetingMembers(meetingMember.member)" 
                          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path></g></svg>
                      </template>
                      ដកសមាជិកពីបញ្ជីឈ្មោះសមាជិក
                    </n-tooltip>
                    <!-- Button check attend -->
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg :class=" ' absolute top-2 right-10 w-6 cursor-pointer text-gray-400 hover:text-green-700 duration-300 ' + ( meetingMember.attendant != undefined ? ' text-green-700 ' : '' ) "
                          @click="toggleMeetingMemberAttendant(meetingMember)"
                          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M31 30h-2v-3a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v3h-2v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5z" fill="currentColor"></path><path d="M24 12a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" fill="currentColor"></path><path d="M15 22h-2v-3a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v3H1v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5z" fill="currentColor"></path><path d="M8 4a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" fill="currentColor"></path></svg>
                      </template>
                      {{( 
                        meetingMember.attendant != undefined && meetingMember.attendant != null ? (
                          meetingMember.member != undefined && meetingMember.attendant.people_id != meetingMember.member.id
                            ? "ជំនួសដោយ ៖ " + meetingMember.attendant.member.lastname + " " + meetingMember.attendant.member.firstname
                            : 'មកផ្ទាល់' 
                        ) : 'អវត្តមានក្នុងកិច្ចប្រជុំ' 
                      )}}
                    </n-tooltip>

                    <n-popselect
                      v-model:value="meetingMember.role"
                      :options="meetingMemberRoles"
                      size="medium"
                      scrollable
                      @update:value="updateMemberGroupAndRole(meetingMember)"
                    >
                    <n-button class="mx-1" >{{ meetingMemberRoles.find( (r) => r.value == meetingMember.role ).label }}</n-button>  
                    </n-popselect>
                    <n-popselect
                      v-model:value="meetingMember.group"
                      :options="meetingMemberGroups"
                      size="medium"
                      scrollable
                      @update:value="updateMemberGroupAndRole(meetingMember)"
                    >
                      <n-button class="mx-1" >{{ meetingMemberGroups.find( (g) => g.value == meetingMember.group ).label }}</n-button>  
                    </n-popselect>
                  </div>
                  <n-drawer v-model:show="memberAddDrawer.show" placement="right" :width="768" >
                    <n-drawer-content >
                      <template #header >
                        បន្ថែមសមាជិកប្រជុំថ្មី 
                        <svg @click="savePeopleFromMeeting" class="w-10 absolute right-0 top-0 cursor-pointer hover:text-blue-600 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1V9.5A1.5 1.5 0 0 1 5.5 8h5A1.5 1.5 0 0 1 12 9.5V13a1 1 0 0 0 1-1V5.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 10.379 3H10v1.5A1.5 1.5 0 0 1 8.5 6h-2A1.5 1.5 0 0 1 5 4.5V3H4zm2 0v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V3H6zm5 10V9.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V13h6zM2 4a2 2 0 0 1 2-2h6.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 14 5.621V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z" fill="currentColor"></path></g></svg>
                      </template>
                      <div class="w-full text-sm text-center " >
                        <n-form 
                          class="w-full text-left font-btb text-lg flex flex-wrap" 
                          :label-width="80"
                          :model="memberAddDrawer.record"
                          size="large"
                          ref="formRef"
                        >
                          <n-form-item label="ងារ និង ឈ្មោះ" path="countesy" class="w-4/5 mr-8" >
                            <n-select
                              v-model:value="memberAddDrawer.record.countesy"
                              filterable
                              placeholder="សូមជ្រើសរើស ងារ"
                              :options="countesies.map( (c) => { return { label : c.name , value : c.id } })"
                            />
                          </n-form-item>
                          <n-form-item label="គោត្តនាម" path="lastname" class="w-4/5 mr-8 " >
                            <n-input type="text" name="lastname" v-model:value="memberAddDrawer.record.lastname" placeholder="គោត្តនាម" class="text-left font-bold mr-2" ></n-input>
                          </n-form-item>
                          <n-form-item label="នាមខ្លួន" path="firstname" class="w-4/5 mr-8" >
                            <n-input type="text" name="firstname" v-model:value="memberAddDrawer.record.firstname" placeholder="សូមបញ្ចូលនាមខ្លួន" class="text-left font-bold " ></n-input>
                          </n-form-item>
                          <n-form-item label="ភេទ" path="gender" class="w-4/5 mr-8" >
                            <n-select
                              v-model:value="memberAddDrawer.record.gender"
                              filterable
                              placeholder="សូមជ្រើសរើស ភេទ"
                              :options="[ { value : 0 , name: 'ស្រី់' } , { value : 1 , name : 'ប្រុស' }].map( (c) => { return { label : c.name , value : c.value } })"
                            />
                          </n-form-item>
                          <n-form-item label="ទូរស័ព្ទ" class="w-4/5 mr-8" >
                            <n-input type="text" name="phone" v-model:value="memberAddDrawer.record.phone" placeholder="សូមបញ្ចូលលេខទូរស័ព្ទ" class="text-left font-bold " ></n-input>
                          </n-form-item>
                          <n-form-item label="អ៊ីមែល" class="w-4/5 mr-8" >
                            <n-input type="text" name="email" v-model:value="memberAddDrawer.record.email" placeholder="សូមបញ្ចូលអ៊ីមែល" class="text-left font-bold " ></n-input>
                          </n-form-item>
                          <n-form-item label="តួនាទី" class="w-4/5 mr-8" >
                            <n-select
                              v-model:value="memberAddDrawer.record.position"
                              filterable
                              placeholder="សូមជ្រើសរើសតួនាទី"
                              :options="positions.map( (c) => { return { label : c.name , value : c.id } })"
                            />
                          </n-form-item>
                          <n-form-item label="ក្រសួង ស្ថាប័ន" class="w-4/5 mr-8" >
                            <n-select
                              v-model:value="memberAddDrawer.record.organization"
                              filterable
                              placeholder="សូមជ្រើសរើសក្រសួងស្ថាប័ន"
                              :options="organizations.map( (c) => { return { label : c.name , value : c.id } })"
                            />
                          </n-form-item>
                        </n-form>
                      </div>
                    </n-drawer-content>
                  </n-drawer>
                  <!-- Meeting member attendant -->
                  <n-drawer v-model:show="memberAttendantDrawer.show" placement="right" :width="768" >
                    <n-drawer-content >
                      <template #header >
                        ចុះវត្តមាន 
                      </template>
                      <div class="w-full text-sm text-center " >
                        <!-- Member Form -->
                        <div class="min-h-full " >
                          <!-- Search box -->
                          <div class="w-full pb-2" >
                            <n-radio-group v-model:value="memberAttendantDrawer.selectedAttendantOption" name="attendantOptions" @update:value="attendantChange()" >
                              <n-radio-button
                                v-for="attendantOption in [
                                  { label: 'អវត្តមាន' , value: 0 } ,
                                  { label: 'មកផ្ទាល់' , value: 1 } ,
                                  { label: 'មានគេជំនួស' , value: 2 }
                                ]"
                                :key="attendantOption.value"
                                :value="attendantOption.value"
                                :label="attendantOption.label"
                              />
                            </n-radio-group>
                          </div>
                          <Transition name="slide-fade" >
                            <div v-if="memberAttendantDrawer.showSearch" >
                              <!-- Search box -->
                              <div class="w-full pb-2" >
                                <n-input type="text" v-model:value="memberAttendantDrawer.peopleSearch" @keyup.enter="getPeopleForAttentant" class="w-full" placeholder="ស្វែងរក..." />
                              </div>
                              <!-- List members -->
                              <div class="w-full" >
                                <div v-for="(person,index) in memberAttendantDrawer.people" :key="index" class="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 duration-300" @click="saveAttendantMeeting(person)" >
                                  <div class="member_name" >
                                    {{  (index + 1 ) + ". " + person.lastname + " " + person.firstname + ( person.mobile_phone != undefined && person.mobile_phone.length != undefined ? ' - ' + person.mobile_phone : '' )  }}
                                  </div>
                                  <div v-if="person.positions.length" class="member_positions" >{{ person.positions.map( (p) => p.name ).join(' - ') }}</div>
                                  <div v-if="person.organizations.length" class="member_organizations" >{{ person.organizations.map( (p) => p.name ).join(' - ') }}</div>
                                </div>
                              </div>
                            </div>
                          </Transition>
                        </div>
                      </div>
                    </n-drawer-content>
                  </n-drawer>
                  <!-- End meeting member attendant -->
              </div>
            </n-tab-pane>
          <!-- Organizations -->
            <n-tab-pane name="organizations" tab="ក្រសួងសាមី" class="flex min-h-screen" >
              <!-- Organization Form -->
              <div class=" flex-none w-1/5 min-h-full " >
                <!-- Search box -->
                <div class="w-full pb-2" >
                  <n-input type="text" v-model:value="organizationSearch" @keyup.enter="getOrganizations" class="w-full" placeholder="ស្វែងរក..." />
                </div>
                <!-- List organizations -->
                <div class="w-full relative" >
                  <div v-if="organizations.length" v-for="(organization,index) in organizations" :key="index" class="py-1 border-b border-gray-200 cursor-pointer hover:bg-gray-100 duration-300" @click="toggleMeetingOrganizations(organization)" >
                    <table>
                      <tr>
                        <!-- <td class="w-10">{{ (index + 1 ) }} .</td> -->
                        <td class="flex-grow organization_name" >{{  organization.name }}</td>
                      </tr>
                    </table>
                  </div>
                  <!-- Loading -->
                  <Transition name="slide-fade" >
                    <div v-if="!organizations.length" class="table-loading absolute flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-80 ">
                      <div class="flex mx-auto items-center text-gray-400">សូមបញ្ចូលពាក្យគន្លឹះក្នុងប្រអប់ខាងលើដើម្បីស្វែងរកឯកសារគតិយុត្ត។</div>
                    </div>
                  </Transition>
                </div>
              </div>
              <!-- Selected Members -->
              <div class=" flex-grow px-4 ml-4 border border-gray-200" >
                <div class="selected_members font-moul w-full border-b border-gray-200 my-4" >ក្រសួងសាមី ៖</div>
                  <div v-for="(meetingOrganization,index) in meetingOrganizations" :key="index" class="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 duration-300" @click="toggleMeetingOrganizations(meetingOrganization)" >
                    <table>
                      <tr>
                        <!-- <td class="w-10">{{ (index + 1 ) }} .</td> -->
                        <td class="member_name" >{{  meetingOrganization.name }}</td>
                      </tr>
                    </table>
                  </div>
              </div>
            </n-tab-pane>
          <!-- Rooms -->
            <n-tab-pane name="meetingRooms" tab="បន្ទប់ប្រជុំ" class="relative h-screen" >
              <!-- Selected Rooms -->
              <div class="border-t border-gray-200 py-2 font-moul" >ជ្រើសរើសបន្ទប់ប្រជុំ</div>
              <div v-if="rooms.length" class="flex justify-center p-8 " >
                <div v-for="(room,index) in rooms" :key="index" @click="toggleMeetingRooms(room)" class="relative p-4 rounded border w-40 h-40 font-moul flex items-center place-content-center text-center m-4 cursor-pointer hover:shadow duration-300 hover:border-blue-400" >
                  បន្ទប់ ឬ សាល<br/>{{ room.name }}
                  <svg v-if="selectedRooms.find( (selectedRoom) => selectedRoom.id == room.id)" class="absolute right-2 top-2 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2zm0 1.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17zm-1.25 9.94l4.47-4.47a.75.75 0 0 1 1.133.976l-.073.084l-5 5a.75.75 0 0 1-.976.073l-.084-.073l-2.5-2.5a.75.75 0 0 1 .976-1.133l.084.073l1.97 1.97l4.47-4.47l-4.47 4.47z" fill="currentColor"></path></g></svg>
                </div>
              </div>
            </n-tab-pane>
          <!-- Preengs -->
            <n-tab-pane name="seichdeyPreengs" tab="សេចក្ដីព្រាង" class="flex min-h-screen" >
              <!-- Organization Form -->
              <div class=" flex-none w-3/12 min-h-full " >
                <!-- Search box -->
                <div class="w-full pb-2 font-moul relative h-10 border-b border-gray-200 leading-10" >
                  សេចក្ដីព្រាង
                  <svg @click="preengUploadVariables.show=!preengUploadVariables.show" class="w-10 absolute right-0 top-0 cursor-pointer hover:text-blue-600 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" fill="currentColor"></path></svg>
                  <n-drawer v-model:show="preengUploadVariables.show" placement="right" :width="500" :onAfterLeave="clearPreengUpload" >
                    <n-drawer-content >
                      <template #header >
                        បញ្ចូលសេចក្ដីព្រាង
                        <div @click="uploadPreengs" class="w-24 h-8 p-2 absolute right-2 top-2 text-center border border-green-600 rounded text-green-700 cursor-pointer " >រក្សារទុក</div>
                      </template>
                      <input type="file" multiple @change="fileChangePreengs" class="hidden" id="preengs" />
                      <div class="border rounded border-gray-200 w-full text-sm text-center " >
                        <div class="no-files-upload h-full w-full p-2 cursor-pointer hover:text-green-500 duration-500" @click="clickUploadPreengs" >
                          <svg  class="w-12 mx-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" fill="currentColor"></path></svg>
                          <div class="w-full my-2 " >សូមបញ្ចូលសេចក្ដីព្រាង សម្រាប់កិច្ចប្រជុំ</div>
                        </div>
                        <div v-if="preengUploadVariables.files.length" class="list-files-upload w-full p-4" >
                          <div class="selectedFiles w-full text-left border-b border-gray-100 py-2" v-for="(pdf,index) in preengUploadVariables.files" :key="index" v-html="(index+1) + '. ' + pdf.name + ' , ទំហំ៖ ' + (pdf.size/1024/1024).toFixed(2) + ' មេកាបៃ (MB)' " ></div>
                        </div>
                      </div>
                    </n-drawer-content>
                  </n-drawer>
                </div>
                <!-- List organizations -->
                <div class="w-full" >
                  <div v-for="(preeng,index) in selectedSeichdeyPreengs" :key="index" class="relative p-1 border-b border-gray-200 cursor-pointer hover:bg-gray-100 duration-300" >
                    <div class="meetingSeichdeyPreeng p-1 pr-8 w-full" @click="previewSeichdeyPreengs(preeng)" >
                      <strong>{{ ( index + 1 )}}</strong> . {{ preeng.name }}
                    </div>
                    <svg @click="removeSeichdeyPreeng(preeng)" class="w-6 absolute top-2 right-0 text-red-500  cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path></g></svg>
                  </div>
                </div>
              </div>
              <!-- Selected Members -->
              <div class="flex-grow p-1 ml-4 border border-gray-200 relative" >
                <div class="w-full flex items-center" >
                  <div v-if="!preengUploadVariables.pdf.show" class="w-full text-center text-2xl text-gray-400 p-16" >
                    <svg class="mt-20 mx-auto w-60 text-gray-300 mb-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5c-17.2-10.5-28.7-25-36.8-46.3c3.9-16.1 10.1-40.6 5.4-56c-4.2-26.2-37.8-23.6-42.6-5.9c-4.4 16.1-.4 38.5 7 67.1c-10 23.9-24.9 56-35.4 74.4c-20 10.3-47 26.2-51 46.2c-3.3 15.8 26 55.2 76.1-31.2c22.4-7.4 46.8-16.5 68.4-20.1c18.9 10.2 41 17 55.8 17c25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35c-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8c-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7c8.3 15.1 18.9 27.2 30.1 35.5c-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" fill="currentColor"></path></svg>
                  </div>
                  <vue-pdf-embed v-if="preengUploadVariables.pdf.show" :source="preengUploadVariables.pdf.url" class="w-full h-screen overflow-y-scroll" />
                </div>
                <svg @click="clearPreengPdf" class="w-10 absolute right-6 top-4 text-red-500 cursor-pointer bg-white bg-opacity-85 rounded-full p-1 shadow-md border border-gray-200 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M26 20h-6v-2h6z" fill="currentColor"></path><path d="M30 28h-6v-2h6z" fill="currentColor"></path><path d="M28 24h-6v-2h6z" fill="currentColor"></path><path d="M17.003 20a4.895 4.895 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.699 5.699 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2zm-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848zM15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.617 16.617 0 0 1 10 24H8a17.342 17.342 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13.025 13.025 0 0 0 17.596 28z" fill="currentColor"></path></svg>
              </div>
            </n-tab-pane>
          <!-- Other Documents -->
            <n-tab-pane name="otherDocuments" tab="ឯកសារយោង" class="flex min-h-screen" >
              <!-- Organization Form -->
              <div class=" flex-none w-3/12 min-h-full " >
                <!-- Search box -->
                <div class="w-full pb-2 font-moul relative h-10 border-b border-gray-200 leading-10" >
                  ឯកសារយោង
                  <svg @click="otherDocumentUploadVariables.show=!otherDocumentUploadVariables.show" class="w-10 absolute right-0 top-0 cursor-pointer hover:text-blue-600 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" fill="currentColor"></path></svg>
                  <n-drawer v-model:show="otherDocumentUploadVariables.show" placement="right" :width="500" :onAfterLeave="clearOtherDocumentUpload" >
                    <n-drawer-content >
                      <template #header >
                        បញ្ចូលឯកសារយោង
                        <div @click="uploadOtherDocuments" class="w-24 h-8 p-2 absolute right-2 top-2 text-center border border-green-600 rounded text-green-700 cursor-pointer " >រក្សារទុក</div>
                      </template>
                      <input type="file" multiple @change="fileChangeOtherDocuments" class="hidden" id="otherDocument" />
                      <div class="border rounded border-gray-200 w-full text-sm text-center " >
                        <div class="no-files-upload h-full w-full p-2 cursor-pointer hover:text-green-500 duration-500" @click="clickUploadOtherDocuments" >
                          <svg  class="w-12 mx-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" fill="currentColor"></path></svg>
                          <div class="w-full my-2 " >សូមបញ្ចូលឯកសារយោង សម្រាប់កិច្ចប្រជុំ</div>
                        </div>
                        <div v-if="otherDocumentUploadVariables.files.length" class="list-files-upload w-full p-4" >
                          <div class="selectedFiles w-full text-left border-b border-gray-100 py-2" v-for="(pdf,index) in otherDocumentUploadVariables.files" :key="index" v-html="(index+1) + '. ' + pdf.name + ' , ទំហំ៖ ' + (pdf.size/1024/1024).toFixed(2) + ' មេកាបៃ (MB)' " ></div>
                        </div>
                      </div>
                    </n-drawer-content>
                  </n-drawer>
                </div>
                <!-- List organizations -->
                <div class="w-full" >
                  <div v-for="(otherDocument,index) in selectedOtherDocuments" :key="index" class="relative p-1 border-b border-gray-200 cursor-pointer hover:bg-gray-100 duration-300" >
                    <div class="meetingSeichdeyPreeng p-1 pr-8 w-full" @click="previewOtherDocuments(otherDocument)" >
                      <strong>{{ ( index + 1 )}}</strong> . {{ otherDocument.name }}
                    </div>
                    <svg @click="removeOtherDocument(otherDocument)" class="w-6 absolute top-2 right-0 text-red-500  cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path></g></svg>
                  </div>
                </div>
              </div>
              <!-- Selected Members -->
              <div class="flex-grow p-1 ml-4 border border-gray-200 relative" >
                <div class="w-full flex items-center" >
                  <div v-if="!otherDocumentUploadVariables.pdf.show" class="w-full text-center text-2xl text-gray-400 p-16" >
                    <svg class="mt-20 mx-auto w-60 text-gray-300 mb-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5c-17.2-10.5-28.7-25-36.8-46.3c3.9-16.1 10.1-40.6 5.4-56c-4.2-26.2-37.8-23.6-42.6-5.9c-4.4 16.1-.4 38.5 7 67.1c-10 23.9-24.9 56-35.4 74.4c-20 10.3-47 26.2-51 46.2c-3.3 15.8 26 55.2 76.1-31.2c22.4-7.4 46.8-16.5 68.4-20.1c18.9 10.2 41 17 55.8 17c25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35c-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8c-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7c8.3 15.1 18.9 27.2 30.1 35.5c-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" fill="currentColor"></path></svg>
                  </div>
                  <vue-pdf-embed v-if="otherDocumentUploadVariables.pdf.show" :source="otherDocumentUploadVariables.pdf.url" class="w-full h-screen overflow-y-scroll" />
                </div>
                <svg @click="clearOtherDocumentPdf" class="w-10 absolute right-6 top-4 text-red-500 cursor-pointer bg-white bg-opacity-85 rounded-full p-1 shadow-md border border-gray-200 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M26 20h-6v-2h6z" fill="currentColor"></path><path d="M30 28h-6v-2h6z" fill="currentColor"></path><path d="M28 24h-6v-2h6z" fill="currentColor"></path><path d="M17.003 20a4.895 4.895 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.699 5.699 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2zm-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848zM15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.617 16.617 0 0 1 10 24H8a17.342 17.342 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13.025 13.025 0 0 0 17.596 28z" fill="currentColor"></path></svg>
              </div>
            </n-tab-pane>
          <!-- Regulators-->
            <n-tab-pane name="regulators" tab="ឯកសារគតិយុត្ត" class="flex min-h-screen" >
              <!-- Member Form -->
              <div class=" flex-none w-4/12 min-h-full" >
                <!-- Search box -->
                <div class="w-full pb-2" >
                  <n-input type="text" v-model:value="regulatorSearch" @keyup.enter="getRegulators" class="w-full" placeholder="ស្វែងរកឯកសារគតិយុត្តសម្រាប់កិច្ចប្រជុំ..." />
                </div>
                <!-- List members -->
                <div class="w-full relative" >
                  <div v-if="regulators.length" v-for="(regulator,index) in regulators" :key="index" class="relative p-1 border-b border-gray-200 cursor-pointer hover:bg-gray-100 duration-300" >
                    <div class="member_name" @click="toggleMeetingRegulators(regulator)" >
                      <strong>{{(index + 1 )}}</strong>{{  ". " + regulator.types.map( (t) => t.desp ).join('') + " - " + regulator.fid + " - " + regulator.year }}
                      <div class="py-1" >{{ regulator.objective }}</div>
                    </div>
                    <svg v-if="regulator.pdf==true" @click="previewRegulators(regulator)" class="absolute top-2 right-1 w-5 text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M30 18v-2h-6v10h2v-4h3v-2h-3v-2h4z" fill="currentColor"></path><path d="M19 26h-4V16h4a3.003 3.003 0 0 1 3 3v4a3.003 3.003 0 0 1-3 3zm-2-2h2a1.001 1.001 0 0 0 1-1v-4a1.001 1.001 0 0 0-1-1h-2z" fill="currentColor"></path><path d="M11 16H6v10h2v-3h3a2.003 2.003 0 0 0 2-2v-3a2.002 2.002 0 0 0-2-2zm-3 5v-3h3l.001 3z" fill="currentColor"></path><path d="M22 14v-4a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 14 2H4a2.006 2.006 0 0 0-2 2v24a2 2 0 0 0 2 2h16v-2H4V4h8v6a2.006 2.006 0 0 0 2 2h6v2zm-8-4V4.4l5.6 5.6z" fill="currentColor"></path></svg>
                    <!-- <div v-if="regulator.organizations.length" class="member_organizations" >{{ regulator.organizations.map( (p) => p.name ).join(' - ') }}</div> -->
                  </div>
                  <!-- Loading -->
                  <Transition name="slide-fade" >
                    <div v-if="!regulators.length" class="table-loading absolute flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-80 ">
                      <div class="flex mx-auto items-center text-gray-400">ស្វែងរក ឯកសារគតិយុត្ត</div>
                    </div>
                  </Transition>
                </div>
              </div>
              <!-- Selected Members -->
              <div class=" flex-grow px-4 ml-4 border border-gray-200" >
                <div class="selected_members font-moul w-full border-b border-gray-200 my-4" >បញ្ជីឯកសារគតិយុត្ត ៖</div>
                <div v-for="(regulator,index) in selectedRegulators" :key="index" class="relative p-2 pr-8 border-b border-gray-200 cursor-pointer hover:bg-gray-100 duration-300" >
                  <div class="member_name" @click="toggleMeetingRegulators(regulator)" >
                    <strong>{{(index + 1 )}}</strong>{{  ". " + regulator.types.map( (t) => t.desp ).join('') + " - " + regulator.fid + " - " + regulator.year + " , " + regulator.objective }}
                  </div>
                  <svg v-if="regulator.pdf==true" @click="previewRegulators(regulator)"  class="absolute top-2 right-1 w-5 text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M30 18v-2h-6v10h2v-4h3v-2h-3v-2h4z" fill="currentColor"></path><path d="M19 26h-4V16h4a3.003 3.003 0 0 1 3 3v4a3.003 3.003 0 0 1-3 3zm-2-2h2a1.001 1.001 0 0 0 1-1v-4a1.001 1.001 0 0 0-1-1h-2z" fill="currentColor"></path><path d="M11 16H6v10h2v-3h3a2.003 2.003 0 0 0 2-2v-3a2.002 2.002 0 0 0-2-2zm-3 5v-3h3l.001 3z" fill="currentColor"></path><path d="M22 14v-4a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 14 2H4a2.006 2.006 0 0 0-2 2v24a2 2 0 0 0 2 2h16v-2H4V4h8v6a2.006 2.006 0 0 0 2 2h6v2zm-8-4V4.4l5.6 5.6z" fill="currentColor"></path></svg>
                </div>
                <n-drawer v-model:show="regulatorUploadVariables.pdf.show" placement="right" :width="768" >
                  <!-- <svg @click="regulatorUploadVariables.pdf.show=!regulatorUploadVariables.pdf.show" class="w-10 absolute right-0 top-0 cursor-pointer hover:text-blue-600 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" fill="currentColor"></path></svg> -->
                  <n-drawer-content >
                    <div class="border rounded border-gray-200 w-full text-sm text-center " >
                      <vue-pdf-embed v-if="regulatorUploadVariables.pdf.show" :source="regulatorUploadVariables.pdf.base64" class="w-full h-screen overflow-y-scroll" />
                    </div>
                  </n-drawer-content>
                </n-drawer>
              </div>
            </n-tab-pane>
            <!-- Reports -->
            <n-tab-pane name="reports" tab="លទ្ធផលកិច្ចប្រជុំ" class="flex min-h-screen" >
              <!-- Organization Form -->
              <div class=" flex-none w-3/12 min-h-full " >
                <!-- Search box -->
                <div class="w-full pb-2 font-moul relative h-10 border-b border-gray-200 leading-10" >
                  លទ្ធផលកិច្ចប្រជុំ
                  <svg @click="reportUploadVariables.show=!reportUploadVariables.show" class="w-10 absolute right-0 top-0 cursor-pointer hover:text-blue-600 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" fill="currentColor"></path></svg>
                  <n-drawer v-model:show="reportUploadVariables.show" placement="right" :width="500" :onAfterLeave="clearReportUpload" >
                    <n-drawer-content >
                      <template #header >
                        បញ្ចូល លទ្ធផលកិច្ចប្រជុំ
                        <div @click="uploadReports" class="w-24 h-8 p-2 absolute right-2 top-2 text-center border border-green-600 rounded text-green-700 cursor-pointer " >រក្សារទុក</div>
                      </template>
                      <input type="file" multiple @change="fileChangeReports" class="hidden" id="reports" />
                      <div class="border rounded border-gray-200 w-full text-sm text-center " >
                        <div class="no-files-upload h-full w-full p-2 cursor-pointer hover:text-green-500 duration-500" @click="clickUploadReports" >
                          <svg  class="w-12 mx-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" fill="currentColor"></path></svg>
                          <div class="w-full my-2 " >សូមបញ្ចូលរបាយការណ៍ សម្រាប់កិច្ចប្រជុំ</div>
                        </div>
                        <div v-if="reportUploadVariables.files.length" class="list-files-upload w-full p-4" >
                          <div class="selectedFiles w-full text-left border-b border-gray-100 py-2" v-for="(pdf,index) in reportUploadVariables.files" :key="index" v-html="(index+1) + '. ' + pdf.name + ' , ទំហំ៖ ' + (pdf.size/1024/1024).toFixed(2) + ' មេកាបៃ (MB)' " ></div>
                        </div>
                      </div>
                    </n-drawer-content>
                  </n-drawer>
                </div>
                <!-- List organizations -->
                <div class="w-full" >
                  <div v-for="(report,index) in selectedReports" :key="index" class="relative p-1 border-b border-gray-200 cursor-pointer hover:bg-gray-100 duration-300" >
                    <div class="meetingSeichdeyPreeng p-1 pr-8 w-full" @click="previewReports(report)" >
                      <strong>{{ ( index + 1 )}}</strong> . {{ report.name }}
                    </div>
                    <svg @click="removeReport(report)" class="w-6 absolute top-2 right-0 text-red-500  cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path></g></svg>
                  </div>
                </div>
              </div>
              <!-- Selected Members -->
              <div class="flex-grow p-1 ml-4 border border-gray-200 relative" >
                <div class="w-full flex items-center" >
                  <div v-if="!reportUploadVariables.pdf.show" class="w-full text-center text-2xl text-gray-400 p-16" >
                    <svg class="mt-20 mx-auto w-60 text-gray-300 mb-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5c-17.2-10.5-28.7-25-36.8-46.3c3.9-16.1 10.1-40.6 5.4-56c-4.2-26.2-37.8-23.6-42.6-5.9c-4.4 16.1-.4 38.5 7 67.1c-10 23.9-24.9 56-35.4 74.4c-20 10.3-47 26.2-51 46.2c-3.3 15.8 26 55.2 76.1-31.2c22.4-7.4 46.8-16.5 68.4-20.1c18.9 10.2 41 17 55.8 17c25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35c-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8c-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7c8.3 15.1 18.9 27.2 30.1 35.5c-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" fill="currentColor"></path></svg>
                  </div>
                  <vue-pdf-embed v-if="reportUploadVariables.pdf.show" :source="reportUploadVariables.pdf.url" class="w-full h-screen overflow-y-scroll" />
                </div>
                <svg @click="clearReportPdf" class="w-10 absolute right-6 top-4 text-red-500 cursor-pointer bg-white bg-opacity-85 rounded-full p-1 shadow-md border border-gray-200 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M26 20h-6v-2h6z" fill="currentColor"></path><path d="M30 28h-6v-2h6z" fill="currentColor"></path><path d="M28 24h-6v-2h6z" fill="currentColor"></path><path d="M17.003 20a4.895 4.895 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.699 5.699 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2zm-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848zM15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.617 16.617 0 0 1 10 24H8a17.342 17.342 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13.025 13.025 0 0 0 17.596 28z" fill="currentColor"></path></svg>
              </div>
            </n-tab-pane>
          </n-tabs>
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
import VuePdfEmbed from 'vue-pdf-embed'

export default {
  components: {
    Save20Regular ,
    DocumentPdf24Regular ,
    VuePdfEmbed
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
    const dialog = useDialog()
    const btnSavingLoadingRef = ref(false)

    const meeting = ref( null )
    const meetingMemberGroups = ref([
      {
        label: 'អ្នកដឹកនាំប្រជុំ' ,
        value: 'lead_meeting'
      },
      {
        label: 'អ្នកការពារ' ,
        value: 'defender'
      },
      {
        label: 'អ្នកចូលរួម' ,
        value: 'audient'
      }
    ])
    const meetingMemberRoles = ref([
      {
        label: 'ប្រធាន' ,
        value: 'leader'
      },
      {
        label: 'អនុប្រធាន' ,
        value: 'deputy_leader'
      },
      {
        label: 'សមាជិក' ,
        value: 'member'
      }
    ])
    

    const places = ref([])
    const selectedPlaces = ref( [] )

    const today = ref( new Date() )

    const meetingDateTime = reactive({
      year: parseInt( dateFormat( today.value , 'yyyy') ) ,
      month: parseInt( dateFormat( today.value , 'mm') ) ,
      day: parseInt( dateFormat( today.value , 'dd') ) ,
      start: {
        hour : parseInt( dateFormat( today.value , 'H') ) ,
        minutes : parseInt( dateFormat( today.value , 'MM') )
      },
      end: {
        hour: parseInt( dateFormat( today.value , 'H') ) ,
        minutes: parseInt( dateFormat( today.value , 'MM') )
      }
    })

    /**
     * Preeng upload
     */
    const selectedSeichdeyPreengs = ref( [] )
    const preengUploadVariables = reactive({
      show : false ,
      files : [] ,
      base64: [] ,
      pdf: {
        show: false ,
        url: ''
      }
    })

    function clickUploadPreengs(){
      document.getElementById('preengs').click()
    }

    function uploadPreengs(){
      let formData = new FormData()
      formData.append('id', props.record.id )
      for( var i in preengUploadVariables.files ){
        formData.append('files[]', preengUploadVariables.files[i] )  
      }
      notify.info({
        title: 'រក្សារទុកព័ត៌មាន' ,
        description: 'កំពុងបញ្ចូល សេចក្ដីព្រាង។' ,
        duration: 3000
      })
      store.dispatch('meeting/uploadSeichdeyPreengs', formData )
      .then( res => {
        notify.success({
          title: 'រក្សារទុកព័ត៌មាន' ,
          description: 'បានបញ្ចូល សេចក្ដីព្រាង រួចរាល់។' ,
          duration: 3000
        })

        preengUploadVariables.show = false
        props.record.seichdey_preeng = res.data.record.seichdey_preeng
        selectedSeichdeyPreengs.value = props.record.seichdey_preeng
        document.getElementById('preengs').value = []

      }).catch( err => {
        notify.error({
          title: 'រក្សារទុកព័ត៌មាន' ,
          description: 'មានបញ្ហាពេលបញ្ចូលឯកសារយោង។' ,
          duration: 3000
        })
      })
    }

    function fileChangePreengs(event){
      for(const file of event.target.files ){
        // if( index == 'item' || index == 'length' ) continue;

        // allowed types
        let allowed_mime_types = [ 
          /**
           * Image mime type
           */
          // 'image/jpeg', 'image/png' 
          /**
           * Application file mime type
           */
          "application/pdf"
          ];
        
        // allowed max size in MB
        let allowed_size_mb = 25 ;

        // Validate file type
        if(allowed_mime_types.indexOf(file.type) == -1) {
          notify.error({
            title: "ឯកសារយោង" ,
            description: "ឯកសារនេះជាប្រភេទ ៖ "+ file.type +"។ អនុញ្ញាតតែឯកសារដែលមានប្រភេទជា PDF។" ,
            duration: 3000
          })
          return;
        }

        // Validate file size
        if(file.size > allowed_size_mb*1024*1024) {
          notify.error({
            title: "ឯកសារយោង" ,
            description: "ទំហំនៃឯកសារគឺ ៖ " + (file.size/1024/1024).toFixed(2) + " មេកាបៃ (MB) លើលទំហំដែលកំណត់គឺ ៥ មេកាបៃ។" ,
            duration: 3000
          })
          return;
        }

        if( file.size <= 0 ){
          notify.error({
            title: "ឯកសារយោង" ,
            description: "ទំហំនៃឯកសារគឺ ៖ 0។" ,
            duration: 3000
          })
          return;
        }

        let reader = new FileReader();
        reader.onerror = function(e) {
          // console.log('On error');
        };
        reader.onprogress = function(e) {
          // console.log('On progress');
        };
        reader.onabort = function(e) {
          // console.log('On abort');
        };
        reader.onloadstart = function(e) {
          // console.log( "On load start" )
        };
        reader.onload = function(e) {
          // Ensure that the progress bar displays 100% at the end.
          console.log( 'On load' )
          /**
           * Read binary string from 'e.target.result' and convert to base64
           */
          //  preengUploadVariables.files.push( btoa( e.target.result ) );
          // formData.append('files', btoa( e.target.result ) )
        }
        // // // Read in the image file as base64 type
        // // reader.readAsDataURL(file);
        reader.readAsBinaryString(file);

        // // Read in the image file as base64 type
        // props.record.pdfs.push( window.URL.createObjectURL( file ) )
        preengUploadVariables.files.push( file )
      }
    }

    function previewSeichdeyPreengs(preeng){
      store.dispatch('meeting/readPreeng',{
        id: props.record.id ,
        serial: preeng.serial
      })
      .then( res => {
        preengUploadVariables.pdf.url = res.data.pdf
        preengUploadVariables.pdf.show = true
      }).catch( err => {
        console.log( err )
        notify.error({
          title: 'អានសេចក្ដីព្រាង' ,
          description: 'មានបញ្ហាពេលអានសេចក្ដីព្រាង។' ,
          duration: 3000
        })
      })
    }
    
    function removeSeichdeyPreeng(preeng){
      dialog.warning({
        title: 'លុបសេចក្ដីព្រាង',
        content: 'តើអ្នកចង់លុបសេចក្ដីព្រាង '+ preeng.name +' មែនទេ?',
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch('meeting/removePreeng',{
            id: props.record.id ,
            serial: preeng.serial
          })
          .then( res => {
            props.record.seichdey_preeng = res.data.record.seichdey_preeng
            selectedSeichdeyPreengs.value = res.data.record.seichdey_preeng
          }).catch( err => {
            console.log( err )
            notify.error({
              title: 'អានសេចក្ដីព្រាង' ,
              description: 'មានបញ្ហាពេលអានសេចក្ដីព្រាង។' ,
              duration: 3000
            })
          })
        },
        onNegativeClick: () => {
          
        }
      })
    }

    function clearPreengUpload(){
      document.getElementById('preengs').value = []
      preengUploadVariables.files = [] 
      preengUploadVariables.base64 = [] 
    }

    function clearPreengPdf(){
      preengUploadVariables.pdf.url = ''
      preengUploadVariables.pdf.show = false
    }

    /**
     * Report upload
     */
    const reports = ref([])
    const selectedReports = ref( [] )
    const reportUploadVariables = reactive({
      show : false ,
      files : [] ,
      base64: [] ,
      pdf: {
        show: false ,
        url: ''
      }
    })

    function clickUploadReports(){
      document.getElementById('reports').click()
    }

    function uploadReports(){
      let formData = new FormData()
      formData.append('id', props.record.id )
      for( var i in reportUploadVariables.files ){
        formData.append('files[]', reportUploadVariables.files[i] )  
      }
      notify.info({
        title: 'រក្សារទុកព័ត៌មាន' ,
        description: 'កំពុងបញ្ចូល សេចក្ដីព្រាង។' ,
        duration: 3000
      })
      store.dispatch('meeting/uploadReports', formData )
      .then( res => {
        notify.success({
          title: 'រក្សារទុកព័ត៌មាន' ,
          description: 'បានបញ្ចូល សេចក្ដីព្រាង រួចរាល់។' ,
          duration: 3000
        })

        reportUploadVariables.show = false
        props.record.reports = res.data.record.reports
        selectedReports.value = props.record.reports
        document.getElementById('reports').value = []

      }).catch( err => {
        notify.error({
          title: 'រក្សារទុកព័ត៌មាន' ,
          description: 'មានបញ្ហាពេលបញ្ចូលឯកសារយោង។' ,
          duration: 3000
        })
      })
    }

    function fileChangeReports(event){
      for(const file of event.target.files ){
        // if( index == 'item' || index == 'length' ) continue;

        // allowed types
        let allowed_mime_types = [ 
          /**
           * Image mime type
           */
          // 'image/jpeg', 'image/png' 
          /**
           * Application file mime type
           */
          "application/pdf"
          ];
        
        // allowed max size in MB
        let allowed_size_mb = 25 ;

        // Validate file type
        if(allowed_mime_types.indexOf(file.type) == -1) {
          notify.error({
            title: "ឯកសារយោង" ,
            description: "ឯកសារនេះជាប្រភេទ ៖ "+ file.type +"។ អនុញ្ញាតតែឯកសារដែលមានប្រភេទជា PDF។" ,
            duration: 3000
          })
          return;
        }

        // Validate file size
        if(file.size > allowed_size_mb*1024*1024) {
          notify.error({
            title: "ឯកសារយោង" ,
            description: "ទំហំនៃឯកសារគឺ ៖ " + (file.size/1024/1024).toFixed(2) + " មេកាបៃ (MB) លើលទំហំដែលកំណត់គឺ ៥ មេកាបៃ។" ,
            duration: 3000
          })
          return;
        }

        if( file.size <= 0 ){
          notify.error({
            title: "ឯកសារយោង" ,
            description: "ទំហំនៃឯកសារគឺ ៖ 0។" ,
            duration: 3000
          })
          return;
        }

        let reader = new FileReader();
        reader.onerror = function(e) {
          // console.log('On error');
        };
        reader.onprogress = function(e) {
          // console.log('On progress');
        };
        reader.onabort = function(e) {
          // console.log('On abort');
        };
        reader.onloadstart = function(e) {
          // console.log( "On load start" )
        };
        reader.onload = function(e) {
          // Ensure that the progress bar displays 100% at the end.
          console.log( 'On load' )
          /**
           * Read binary string from 'e.target.result' and convert to base64
           */
          //  preengUploadVariables.files.push( btoa( e.target.result ) );
          // formData.append('files', btoa( e.target.result ) )
        }
        // // // Read in the image file as base64 type
        // // reader.readAsDataURL(file);
        reader.readAsBinaryString(file);

        // // Read in the image file as base64 type
        // props.record.pdfs.push( window.URL.createObjectURL( file ) )
        reportUploadVariables.files.push( file )
      }
    }

    function previewReports(report){
      store.dispatch('meeting/readReport',{
        id: props.record.id ,
        serial: report.serial
      })
      .then( res => {
        reportUploadVariables.pdf.url = res.data.pdf
        reportUploadVariables.pdf.show = true
      }).catch( err => {
        console.log( err )
        notify.error({
          title: 'អានរបាយកាណ៍' ,
          description: 'មានបញ្ហាពេលអានរបាយការណ៍។' ,
          duration: 3000
        })
      })
    }
    
    function removeReport(report){
      dialog.warning({
        title: 'លុបរបាយណ៍',
        content: 'តើអ្នកចង់លុបរបាយការណ៍ '+ report.name +' មែនទេ?',
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch('meeting/removeReport',{
            id: props.record.id ,
            serial: report.serial
          })
          .then( res => {
            props.record.reports = res.data.record.reports
            selectedReports.value = res.data.record.reports
          }).catch( err => {
            console.log( err )
            notify.error({
              title: 'លុបរបាយណ៍' ,
              description: 'មានបញ្ហាពេលលុបរបាយណ៍។' ,
              duration: 3000
            })
          })
        },
        onNegativeClick: () => {
          
        }
      })
    }

    function clearReportUpload(){
      document.getElementById('reports').value = []
      reportUploadVariables.files = [] 
      reportUploadVariables.base64 = [] 
    }

    function clearReportPdf(){
      reportUploadVariables.pdf.url = ''
      reportUploadVariables.pdf.show = false
    }

    /**
     * Other document upload
     */
    const otherDocuments = ref([])
    const selectedOtherDocuments = ref( [] )
    const otherDocumentUploadVariables = reactive({
      show : false ,
      files : [] ,
      base64: [] ,
      pdf: {
        show: false ,
        url: ''
      }
    })

    function clickUploadOtherDocuments(){
      document.getElementById('otherDocument').click()
    }

    function uploadOtherDocuments(){
      let formData = new FormData()
      formData.append('id', props.record.id )
      for( var i in otherDocumentUploadVariables.files ){
        formData.append('files[]', otherDocumentUploadVariables.files[i] )  
      }
      notify.info({
        title: 'រក្សារទុកព័ត៌មាន' ,
        description: 'កំពុងបញ្ចូល សេចក្ដីព្រាង។' ,
        duration: 3000
      })
      store.dispatch('meeting/uploadOtherDocuments', formData )
      .then( res => {
        notify.success({
          title: 'រក្សារទុកព័ត៌មាន' ,
          description: 'បានបញ្ចូល សេចក្ដីព្រាង រួចរាល់។' ,
          duration: 3000
        })

        reportUploadVariables.show = false
        props.record.other_documents = res.data.record.other_documents
        selectedOtherDocuments.value = props.record.other_documents
        document.getElementById('otherDocument').value = []

      }).catch( err => {
        notify.error({
          title: 'រក្សារទុកព័ត៌មាន' ,
          description: 'មានបញ្ហាពេលបញ្ចូលឯកសារយោង។' ,
          duration: 3000
        })
      })
    }

    function fileChangeOtherDocuments(event){
      for(const file of event.target.files ){
        // if( index == 'item' || index == 'length' ) continue;

        // allowed types
        let allowed_mime_types = [ 
          /**
           * Image mime type
           */
          // 'image/jpeg', 'image/png' 
          /**
           * Application file mime type
           */
          "application/pdf"
          ];
        
        // allowed max size in MB
        let allowed_size_mb = 25 ;

        // Validate file type
        if(allowed_mime_types.indexOf(file.type) == -1) {
          notify.error({
            title: "ឯកសារយោង" ,
            description: "ឯកសារនេះជាប្រភេទ ៖ "+ file.type +"។ អនុញ្ញាតតែឯកសារដែលមានប្រភេទជា PDF។" ,
            duration: 3000
          })
          return;
        }

        // Validate file size
        if(file.size > allowed_size_mb*1024*1024) {
          notify.error({
            title: "ឯកសារយោង" ,
            description: "ទំហំនៃឯកសារគឺ ៖ " + (file.size/1024/1024).toFixed(2) + " មេកាបៃ (MB) លើលទំហំដែលកំណត់គឺ ៥ មេកាបៃ។" ,
            duration: 3000
          })
          return;
        }

        if( file.size <= 0 ){
          notify.error({
            title: "ឯកសារយោង" ,
            description: "ទំហំនៃឯកសារគឺ ៖ 0។" ,
            duration: 3000
          })
          return;
        }

        let reader = new FileReader();
        reader.onerror = function(e) {
          // console.log('On error');
        };
        reader.onprogress = function(e) {
          // console.log('On progress');
        };
        reader.onabort = function(e) {
          // console.log('On abort');
        };
        reader.onloadstart = function(e) {
          // console.log( "On load start" )
        };
        reader.onload = function(e) {
          // Ensure that the progress bar displays 100% at the end.
          console.log( 'On load' )
          /**
           * Read binary string from 'e.target.result' and convert to base64
           */
          //  preengUploadVariables.files.push( btoa( e.target.result ) );
          // formData.append('files', btoa( e.target.result ) )
        }
        // // // Read in the image file as base64 type
        // // reader.readAsDataURL(file);
        reader.readAsBinaryString(file);

        // // Read in the image file as base64 type
        // props.record.pdfs.push( window.URL.createObjectURL( file ) )
        otherDocumentUploadVariables.files.push( file )
      }
    }

    function previewOtherDocuments(otherDocument){
      store.dispatch('meeting/readOtherDocument',{
        id: props.record.id ,
        serial: otherDocument.serial
      })
      .then( res => {
        otherDocumentUploadVariables.pdf.url = res.data.pdf
        otherDocumentUploadVariables.pdf.show = true
      }).catch( err => {
        console.log( err )
        notify.error({
          title: 'អានរឯកសារផ្សេង' ,
          description: 'មានបញ្ហាពេលអានឯកសារផ្សេង។' ,
          duration: 3000
        })
      })
    }
    
    function removeOtherDocument(otherDocument){
      dialog.warning({
        title: 'លុបឯកសារផ្សេង',
        content: 'តើអ្នកចង់លុបឯកសារផ្សេង '+ otherDocument.name +' មែនទេ?',
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch('meeting/removeOtherDocument',{
            id: props.record.id ,
            serial: otherDocument.serial
          })
          .then( res => {
            props.record.other_documents = res.data.record.other_documents
            selectedOtherDocuments.value = res.data.record.other_documents
          }).catch( err => {
            console.log( err )
            notify.error({
              title: 'លុបឯកសារផ្សេង' ,
              description: 'មានបញ្ហាពេលឯកសារផ្សេង។' ,
              duration: 3000
            })
          })
        },
        onNegativeClick: () => {
          
        }
      })
    }

    function clearOtherDocumentUpload(){
      document.getElementById('otherDocument').value = []
      otherDocumentUploadVariables.files = [] 
      otherDocumentUploadVariables.base64 = [] 
    }

    function clearOtherDocumentPdf(){
      otherDocumentUploadVariables.pdf.url = ''
      otherDocumentUploadVariables.pdf.show = false
    }

    function clearForm(){
      props.record.id = 0
      props.record.objective = '' 
      props.record.contact_info = '' 

      meetingDateTime.year = parseInt( dateFormat( today.value , 'yyyy') )
      meetingDateTime.month = parseInt( dateFormat( today.value , 'mm') )
      meetingDateTime.day = parseInt( dateFormat( today.value , 'dd') )
      meetingDateTime.start = {
          hour : parseInt( dateFormat( today.value , 'H') ) ,
          minutes : parseInt( dateFormat( today.value , 'MM') )
      }
      meetingDateTime.end = {
        hour: parseInt( dateFormat( today.value , 'H') ) ,
        minutes: parseInt( dateFormat( today.value , 'MM') )
      }

      props.record.date = [meetingDateTime.year,meetingDateTime.month,meetingDateTime.day].join('-')
      props.record.start = [meetingDateTime.start.hour,meetingDateTime.start.minutes].join(':')
      props.record.end = [meetingDateTime.end.hour,meetingDateTime.end.minutes].join(':')

      props.record.orgainzations = []
      meetingOrganizations.value = []

      if( props.show == true ){
        props.onClose()
      }
    }

    // End upload

    /**
     * Search member
     */
    const people = ref([])
    const peopleSearch = ref('')
    const meetingMembers = ref( [] )
    const memberAddDrawer = reactive({
      show : false ,
      record: {
        countesy: null ,
        lastname : '' ,
        firstname : '' ,
        gender: 1 ,
        phone : '' ,
        email: '' ,
        position: null ,
        organization: null
      }
    })

    function getPeople(){
      store.dispatch( props.model.name+'/people',{
        search : peopleSearch.value ,
        perPage : 50 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          people.value = res.data.records
        }else{
          notify.warning({
            'title' : 'សមាជិកប្រជុំ' ,
            'description' : 'មិនមានសមាជិកប្រជុំ។' ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'សមាជិកប្រជុំ' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកសមាជិកប្រជុំ។' ,
          duration : 3000
        })
      })
    }

    function getPeopleForAttentant(){
      store.dispatch( props.model.name+'/people',{
        search : memberAttendantDrawer.peopleSearch ,
        perPage : 50 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          memberAttendantDrawer.people = res.data.records
        }else{
          notify.warning({
            'title' : 'សមាជិកប្រជុំ' ,
            'description' : 'មិនមានសមាជិកប្រជុំ។' ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'សមាជិកប្រជុំ' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកសមាជិកប្រជុំ។' ,
          duration : 3000
        })
      })
    }

    /**
     * Save people for meeting 
     */
    function savePeopleFromMeeting(){
      store.dispatch( props.model.name+'/peopleSave',{
        countesy: memberAddDrawer.record.countesy ,
        lastname : memberAddDrawer.record.lastname ,
        firstname : memberAddDrawer.record.firstname ,
        gender: memberAddDrawer.record.gender ,
        phone : memberAddDrawer.record.phone ,
        email: memberAddDrawer.record.email ,
        position: memberAddDrawer.record.position ,
        organization: memberAddDrawer.record.organization
      }).then( res => {
        if( res.data.ok ){
          getPeople()
          memberAddDrawer.show = false
          // memberAddDrawer.record = {
          //   countesy: null ,
          //   lastname : '' ,
          //   firstname : '' ,
          //   gender: 1 ,
          //   phone : '' ,
          //   email: '' ,
          //   position: null ,
          //   organization: null
          // }
        }else{
          notify.warning({
            'title' : 'បញ្ចូលសមាជិក' ,
            'description' : res.data.message ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'បញ្ចូលសមាជិក' ,
          'description' : err.response.data.message ,
          duration : 3000
        })
      })
    }

    /**
     * Search member for attendant
     */
    const memberAttendantDrawer = reactive({
      show : false ,
      showSearch : false ,
      member: null ,
      meetingMember: null ,
      people : [] ,
      peopleSearch : '' ,
      meetingMembers : [] ,
      selectedAttendantOption : 0 ,
      record: {
        memberId : 0
      }
    })

    /**
     * Update the member attendant when the attendant option change
     */
    function attendantChange(){
      console.log( memberAttendantDrawer.selectedAttendantOption )
      // 0 => absent , 1 => come by him/her self , 2 => there is someone come on behave
      if( memberAttendantDrawer.selectedAttendantOption === 0 ){
        memberAttendantDrawer.showSearch = false
        if( memberAttendantDrawer.meetingMember.attendant != undefined ){
          saveAttendantMeeting( memberAttendantDrawer.meetingMember.member )
        }
      }
      else if( memberAttendantDrawer.selectedAttendantOption === 1 ){
        memberAttendantDrawer.showSearch = false
        saveAttendantMeeting( memberAttendantDrawer.meetingMember.member )
      }else{
        memberAttendantDrawer.showSearch = true
      }

    }
    /**
     * Save people for meeting 
     */
    function saveAttendantMeeting( member ){ 
      memberAttendantDrawer.member = member
      store.dispatch(props.model.name + '/toggleMeetingMemberAttendant',{ 
        member_id : memberAttendantDrawer.member.id , 
        meeting_member_id : memberAttendantDrawer.meetingMember.id
      })
      .then( res => {
        if( res.data.ok ){
          memberAttendantDrawer.peopleSearch = '' 
          memberAttendantDrawer.people = []
          memberAttendantDrawer.show = false
          meetingMembers.value = res.data.record.list_members 
          memberAttendantDrawer.meetingMembers = res.data.record.list_members 
          if( memberAttendantDrawer.selectedAttendantOption === 0 ){
            message.info( "បាន កំណត់ថាសមាជិកនេះ អវត្តមានក្នុងកិច្ចប្រជុំ។" )
          }
          else if( memberAttendantDrawer.selectedAttendantOption === 1 ){
            message.success( "បាន កំណត់ថាសមាជិកនេះ វត្តមានក្នុងកិច្ចប្រជុំ។" )
          }
          else if( memberAttendantDrawer.selectedAttendantOption === 2 ){
            message.success( "បាន កំណត់ថាសមាជិកនេះ មានអ្នកដំណាង។" )
          }
        }else{
          notify.error({
            'title' : 'សមាជិកប្រជុំ' ,
            'description' : res.data.message ,
            duration : 3000
          })
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'សមាជិកប្រជុំ' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកសមាជិកប្រជុំ។' ,
          duration : 3000
        })
      } )
    }

    function toggleMeetingMembers(member){
      // helper == true -> add member to the meeting, helper == false remove the member from the meeting
      store.dispatch(props.model.name + '/toggleMeetingMember',{ 
        member : member , 
        meeting : props.record 
      })
      .then( res => {
        if( res.data.ok ){
          meetingMembers.value = res.data.record.list_members 
        }else{
          notify.error({
            'title' : 'សមាជិកប្រជុំ' ,
            'description' : res.data.message ,
            duration : 3000
          })
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'សមាជិកប្រជុំ' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកសមាជិកប្រជុំ។' ,
          duration : 3000
        })
      } )
    }

    function toggleMeetingMemberAttendant(meetingMember){
      memberAttendantDrawer.show = true
      memberAttendantDrawer.meetingMember = meetingMember
      memberAttendantDrawer.member = meetingMember.member
      memberAttendantDrawer.selectedAttendantOption = memberAttendantDrawer.meetingMember.attendant == null
        ? 0
        : ( memberAttendantDrawer.meetingMember.member != null && ( memberAttendantDrawer.meetingMember.attendant.people_id == memberAttendantDrawer.meetingMember.member.id ) ? 1 : 2 )
    }

    function updateMemberGroupAndRole(meetingMember){
      // helper == true -> add member to the meeting, helper == false remove the member from the meeting
      store.dispatch(props.model.name + '/updateMemberGroupAndRole',{ 
        id : meetingMember.id ,
        role : meetingMember.role ,
        group : meetingMember.group ,
        meeting_id : props.record.id ,
        people_id : meetingMember.people_id ,
        remark : meetingMember.remark
      })
      .then( res => {
        if( res.data.ok ){
          meetingMembers.value = res.data.record.list_members 
        }else{
          notify.error({
            'title' : 'សមាជិកប្រជុំ' ,
            'description' : res.data.message ,
            duration : 3000
          })
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'សមាជិកប្រជុំ' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកសមាជិកប្រជុំ។' ,
          duration : 3000
        })
      } )
    }

    // Search Positions
    const positions = ref([])
    function getPositions(){
      store.dispatch( props.model.name+'/positions',{
        search : '' ,
        perPage : 100 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          positions.value = res.data.records
        }else{
          notify.error({
            'title' : 'តួនាទី' ,
            'description' : res.data.message ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'តួនាទី' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកតួនាទី។' ,
          duration : 3000
        })
      })
    }

    // Search Countesies
    const countesies = ref([])
    function getCountesies(){
      store.dispatch( props.model.name+'/countesies',{
        search : '' ,
        perPage : 100 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          countesies.value = res.data.records
        }else{
          notify.error({
            'title' : 'ងារ' ,
            'description' : res.data.message ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'ងារ' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកងារ។' ,
          duration : 3000
        })
      })
    }

    // Search Organization
    const organizations = ref([])
    const organizationSearch = ref('')
    const meetingOrganizations = ref( [] )

    function getOrganizations(){
      store.dispatch( props.model.name+'/organizations',{
        search : organizationSearch.value ,
        perPage : 500 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          organizations.value = res.data.records
        }else{
          notify.error({
            'title' : 'សមាជិកប្រជុំ' ,
            'description' : res.data.message ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'សមាជិកប្រជុំ' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកសមាជិកប្រជុំ។' ,
          duration : 3000
        })
      })
    }

    function toggleMeetingOrganizations(organization){
      store.dispatch( props.model.name+'/toggleMeetingOrganization',{ organization : organization , meeting : props.record })
      .then( res => {
        if( res.data.ok ){
          meetingOrganizations.value = res.data.record.organizations 
        }else{
          notify.warning({
            'title' : 'ក្រសួងសាមី' ,
            'description' : 'មិនមានក្រសួងសាមីឡើយ' ,
            duration : 3000
          })
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'ក្រសួងសាមី' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកក្រសួងសាមី។' ,
          duration : 3000
        })
      } )
    }


    /**
     * Search Regulator
     */
    const regulators = ref([])
    const regulatorSearch = ref('')
    const selectedRegulators = ref( [] )
    const regulatorUploadVariables = reactive({
      pdf: {
        show: false ,
        base64: ''
      }
    })

    function getRegulators(){
      store.dispatch( props.model.name+'/regulators',{
        search : regulatorSearch.value ,
        perPage : 50 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          regulators.value = res.data.records
        }else{
          notify.warning({
            'title' : 'ឯកសារគតិយុត្ត' ,
            'description' : 'មិនមានឯកសារគតិយុត្ត។' ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'ឯកសារគតិយុត្ត' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកឯកសារគតិយុត្ត។' ,
          duration : 3000
        })
      })
    }

    function toggleMeetingRegulators(regulator){
      // helper == true -> add member to the meeting, helper == false remove the member from the meeting
      store.dispatch(props.model.name + '/toggleMeetingRegulator',{ regulator : regulator , meeting : props.record })
      .then( res => {
        if( res.data.ok ){
          selectedRegulators.value = res.data.record.regulators 
        }else{
          notify.error({
            'title' : 'ឯកសារគតិយុត្ត' ,
            'description' : res.data.message ,
            duration : 3000
          })
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'ឯកសារគតិយុត្ត' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកឯកសារគតិយុត្ត។' ,
          duration : 3000
        })
      } )
    }

    function previewRegulators(regulator){
      store.dispatch('meeting/readRegulator',{
        id: regulator.id ,
      })
      .then( res => {
        regulatorUploadVariables.pdf.base64 = res.data.pdf
        regulatorUploadVariables.pdf.show = true
      }).catch( err => {
        console.log( err )
        notify.error({
          title: 'អានសេចក្ដីព្រាង' ,
          description: 'មានបញ្ហាពេលអានសេចក្ដីព្រាង។' ,
          duration: 3000
        })
      })
    }

    function closeModal(){
      
      if( props.show == true ){
        people.value = []
        peopleSearch.value = ''
        organizations.value = [] 
        organizationSearch.value = ''
        props.onClose()
      }
    }


    // Search Rooms
    const rooms = ref([])
    const roomSearch = ref('')
    const selectedRooms = ref( [] )

    function getRooms(){
      store.dispatch( props.model.name+'/rooms',{
        search : roomSearch.value ,
        perPage : 500 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          rooms.value = res.data.records
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'បន្ទប់ប្រជុំ' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកបន្ទប់ប្រជុំ។' ,
          duration : 3000
        })
      })
    }

    function toggleMeetingRooms(room){
      store.dispatch( props.model.name+'/toggleMeetingRoom',{ room : room , meeting : props.record })
      .then( res => {
        if( res.data.ok ){
          selectedRooms.value = res.data.record.rooms 
        }else{
          notify.warning({
            'title' : 'បន្ទប់ប្រជុំ' ,
            'description' : 'មិនមានបន្ទប់ប្រជុំឡើយ' ,
            duration : 3000
          })
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'បន្ទប់ប្រជុំ' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកបន្ទប់ប្រជុំ។' ,
          duration : 3000
        })
      } )
    }


    /**
     * End upload functions
     */

    function initial(){
      getCountesies()
      getPositions()
      getPeople()
      getOrganizations()
      getRooms()
      selectedSeichdeyPreengs.value = props.record.seichdey_preeng != undefined && props.record.seichdey_preeng.length > 0 ? props.record.seichdey_preeng : [] 
      selectedReports.value = props.record.reports != undefined && props.record.reports.length > 0 ? props.record.reports : []
      selectedOtherDocuments.value = props.record.other_documents != undefined && props.record.other_documents.length > 0 ? props.record.other_documents : []
      selectedRegulators.value = props.record.regulators != undefined && props.record.regulators.length > 0 ? props.record.regulators : []
      selectedRooms.value = props.record.rooms != undefined && props.record.rooms.length > 0 ? props.record.rooms : []
      meetingMembers.value = props.record.listMembers != undefined && props.record.listMembers.length > 0 ? props.record.listMembers : []
      meetingOrganizations.value = props.record.organizations != undefined && props.record.organizations.length > 0 ? props.record.organizations : []
      today.value = props.record.date ? new Date( props.record.date ) : new Date()
      meetingDateTime.value = reactive({
        year: parseInt( dateFormat( today.value , 'yyyy') ) ,
        month: parseInt( dateFormat( today.value , 'mm') ) ,
        day: parseInt( dateFormat( today.value , 'dd') ) ,
        start: {
          hour : parseInt( dateFormat( today.value , 'H') ) ,
          minutes : parseInt( dateFormat( today.value , 'MM') )
        },
        end: {
          hour: parseInt( dateFormat( today.value , 'H') ) ,
          minutes: parseInt( dateFormat( today.value , 'MM') )
        }
      })
    }

    return {
      /**
       * Variables
       */
      btnSavingLoadingRef ,
      reports ,
      otherDocuments ,
      organizations ,
      rooms ,
      regulators ,
      positions ,
      countesies ,
      people ,
      peopleSearch ,
      regulatorSearch ,
      roomSearch ,
      organizationSearch ,
      selectedSeichdeyPreengs ,
      selectedReports ,
      selectedOtherDocuments ,
      meetingOrganizations ,
      selectedRooms ,
      selectedRegulators ,
      meetingMembers ,
      meetingDateTime ,
      regulatorUploadVariables ,
      meetingMemberGroups ,
      meetingMemberRoles ,
      /**
       * Member add drawer
       */
      memberAddDrawer ,
      memberAttendantDrawer ,
      /**
       * Functions
       */
      initial ,
      getPeople , 
      getPeopleForAttentant ,
      getOrganizations ,
      getPositions ,
      getCountesies ,
      getRooms ,
      getRegulators ,
      toggleMeetingMembers , // Add or remove member from the meeting
      toggleMeetingMemberAttendant , // Check attendant of the member
      updateMemberGroupAndRole , // Update the information of group and role of meeting member
      toggleMeetingOrganizations , // Add or remove organization from the meeting
      toggleMeetingRegulators ,
      toggleMeetingRooms , // Add or remove member from the meeting
      previewRegulators ,
      savePeopleFromMeeting ,
      saveAttendantMeeting , 
      attendantChange , 
      /**
       * File upload
       */
      // Preeng
      preengUploadVariables ,
      clickUploadPreengs ,
      fileChangePreengs ,
      uploadPreengs ,
      previewSeichdeyPreengs ,
      clearPreengPdf ,
      removeSeichdeyPreeng ,
      clearPreengUpload ,
      // Report
      reportUploadVariables ,
      clickUploadReports ,
      fileChangeReports ,
      uploadReports ,
      previewReports ,
      clearReportPdf ,
      removeReport ,
      clearReportUpload ,
      
      // Other Document
      otherDocumentUploadVariables ,
      clickUploadOtherDocuments ,
      fileChangeOtherDocuments ,
      uploadOtherDocuments ,
      previewOtherDocuments ,
      clearOtherDocumentPdf ,
      removeOtherDocument ,
      clearOtherDocumentUpload ,
      
      closeModal
    }
  }
}
</script>
<style type="text/css" scoped >
</style>