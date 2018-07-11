import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Form, Field } from 'react-final-form'

const MyForm = ({ state, dispatch }) => {

  console.log(state, dispatch)

  const onSubmit = async ({admin, owner, adminSameAsOwner}) => {
    dispatch.setDomainOwner(owner)
    dispatch.setDomainAdmin(adminSameAsOwner ? owner : admin)
    dispatch.setSameAsOwner(adminSameAsOwner)
  }

  const createFields = (obj, prefix) => {
    return Object.keys(obj).map(key => createField(key, prefix))
  }

  const createField = (key, prefix) => (
    <div key={ prefix + key }>
      <Field name={ `${prefix}.${key}` } validate={ mustBeText }>
        {({ input, meta }) => (
          <div>
            <label>{ prefix } { key }: </label>
            <input {...input} type="text" placeholder={ key } />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>
    </div>
  )

  const validation = () => ({
    admin: {
      email: {
        validator: mustBeText,
        message: "Email must be text"
      }
    }
  })

  const mustBeText = value => (/\w+/g.test(value) ? undefined : "Must be a word")

  const required = value => (value ? false : "Required")

  const isEmpty = (obj) => {
    return Object.values(obj).every(val => !val)
  }

  const validateForm = (values) => {
    console.log(values)
  }

  return (
    <Form 
      onSubmit={ onSubmit }
      initialValues={ state.domain }
      validate={ validateForm }
      render={({ handleSubmit, pristine, reset, submitting, values }) => {
        return (
          <form onSubmit={ handleSubmit }>

            { createFields(values.owner, 'owner') }

            { !values.adminSameAsOwner && createFields(values.admin, 'admin') }

            {/* Copy domain owner to admin if not same and admin is empty */}
            { !values.adminSameAsOwner && isEmpty(values.admin) && (values.admin = values.owner) && true }

            <div>
              <label>Same: </label>
              <Field
                name="adminSameAsOwner"
                component="input"
                type="checkbox"
              />
            </div>

            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
            </div>
            <div>
              <label>Form state: </label>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </div>
            <div>
              <label>Redux state: </label>
              <pre>{JSON.stringify(state.domain, 0, 2)}</pre>
            </div>
          </form>
        )
      }}
    />
  )
}

const mapStateToProps = state => ({
  state: {
    domain: state.domain
  }
})

const mapDispatchToProps = dispatch => ({
  dispatch: {
    setDomainAdmin: mutations => dispatch(actions.setDomainAdmin(mutations)),
    setDomainOwner: mutations => dispatch(actions.setDomainOwner(mutations)),
    setSameAsOwner: same => dispatch(actions.setSameAsOwner(same)),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyForm)

