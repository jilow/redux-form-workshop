import * as constants from '../constants'

export const setDomainOwner = mutations => ({
  type: constants.SET_DOMAIN_OWNER,
  mutations
})

export const setDomainAdmin = mutations => ({
  type: constants.SET_DOMAIN_ADMIN,
  mutations
})

export const setSameAsOwner = same => ({
  type: constants.SET_SAME_AS_OWNER,
  same
})