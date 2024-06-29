import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "legaldrafts" ,
    title: "សេចក្ដីព្រាង" 
  },
  records: [] ,
  record: null

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
    console.log( params )
    
    return await crud.list(rootState.apiServer+"/"+state.model.name + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
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
}

// mutations
const mutations = {
  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}