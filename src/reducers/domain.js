import * as constants from '../constants'

const DEFAULT_DOMAIN_STATE = {
  owner: {
    name: 'Owner',
    email: 'owner@example.com',
  },
  admin: {
    name: '',
    email: '',
  },
  adminSameAsOwner: true,
}

const domain = (state = DEFAULT_DOMAIN_STATE, action) => {
  switch(action.type) {
    case constants.SET_DOMAIN_OWNER: 
      return {
        ...state,
        owner: {
          ...state.owner,
          ...action.mutations
        }
      }
    case constants.SET_DOMAIN_ADMIN:
      return {
        ...state,
        admin: {
          ...state.admin,
          ...action.mutations
        }
      }
    case constants.SET_SAME_AS_OWNER:
      return {
        ...state,
        adminSameAsOwner: action.same
      }
    default:
      return state
  }
}

export default domain
