import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "meetings" ,
    title: "កិច្ចប្រជុំ" 
  },
  records: [] ,
  record: null ,

})

// getters
const getters = {
  getRecords (state, getters, rootState) {
    return state.records
  },
  getRecord (state, getters, rootState) {
    return state.record
  }
}

// actions
const actions = {
  async list ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer+"/"+state.model.name + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page ,
        status: params.status ,
        type_id: params.type_id ,
        date: params.date
      }).toString()
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+'/read')
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name,params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/update",params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(rootState.apiServer+"/"+state.model.name+"/"+params.id+"/delete")
  },
  async start ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/start",params)
  },
  async end ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/end",params)
  },
  // Organization
  async organizations ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer + "/organizations?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async toggleMeetingOrganization ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer + "/"+state.model.name + "/"+params.meeting.id+"/organization/"+params.organization.id+"/toggle")
  },
  // Rooms
  async rooms ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer + "/rooms?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async meetingRooms ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer + "/meetingrooms?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async toggleMeetingRoom ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer + "/"+state.model.name + "/"+params.meeting.id+"/room/"+params.room.id+"/toggle")
  },
  // Positions
  async positions ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer + "/positions?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  // Countesies
  async countesies ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer + "/countesies?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  // Regulator
  async regulators ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer + "/regulators?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async toggleMeetingRegulator ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer + "/"+state.model.name + "/"+params.meeting.id+"/regulator/"+params.regulator.id+"/toggle")
  },
  async readRegulator ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/regulators/pdf?id="+params.id)
  },
  // Meeting member
  async people ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer + "/people?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async peopleSave ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer + "/people/save",params)
  },
  async meetingMembers ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer + "/members?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async toggleMeetingMember ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer + "/"+state.model.name + "/"+params.meeting.id+"/member/"+params.member.id+"/toggle")
  },
  async toggleMeetingMemberAttendant ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer + "/"+state.model.name + "/meeting_member/"+params.meeting_member_id+"/member/"+params.member_id+"/toggle")
  },
  async updateMemberGroupAndRole ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer + "/"+state.model.name + "/update_group_role",params)
  },
  // Preeng
  async uploadSeichdeyPreengs({ state, commit, rootState },formData) {
    return await crud.upload(rootState.apiServer + "/"+state.model.name + "/upload/preengs",formData)
  },
  async readPreeng ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+'/read/preeng/'+params.serial)
  },
  async removePreeng ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+'/remove/preeng/'+params.serial)
  },
  // Report
  async uploadReports({ state, commit, rootState },formData) {
    return await crud.upload(rootState.apiServer + "/"+state.model.name + "/upload/reports",formData)
  },
  async readReport ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+'/read/report/'+params.serial)
  },
  async removeReport ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+'/remove/report/'+params.serial)
  },
  // Other Document
  async uploadOtherDocuments({ state, commit, rootState },formData) {
    return await crud.upload(rootState.apiServer + "/"+state.model.name + "/upload/otherdocuments",formData)
  },
  async readOtherDocument ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+'/read/otherdocument/'+params.serial)
  },
  async removeOtherDocument ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+'/remove/otherdocument/'+params.serial)
  },
  // TV - Meeting
  async tvMeetings ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer+"/tv/"+state.model.name + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  /**
   * Dashboard functions
   */
  async total ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/dashboard/"+state.model.name+"/total")
  },
  async totalByType ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/dashboard/"+state.model.name+"/total/bytype")
  },
  async totalByStatus ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/dashboard/"+state.model.name+"/total/bystatus")
  },
}

// mutations
const mutations = {
  // increment (state) {
  //   // `state` is the local module state
  //   state.count++
  // }
  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  },

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}