/* global jest, describe, it, expect */
import LoadingOverlay from '../src/LoadingOverlay'
import React from 'react'
import { mount } from 'enzyme'

jest.useFakeTimers()

class DelayedInactive extends React.Component {
  constructor () {
    super()
    this.state = { active: true }
  }
  componentDidMount () {
    this.timer = setTimeout(() => this.setState({ active: false }), 600)
  }
  componentWillUnmount () {
    clearTimeout(this.timer)
  }
  render () {
    return <LoadingOverlay {...this.props} active={this.state.active} />
  }
}

describe('Loader DOM state', () => {
  it('is not in DOM initially if active:false', () => {
    const wrapped = mount(<LoadingOverlay />)
    expect(wrapped.html()).toBeNull()
  })

  it('removes self from DOM when not active', () => {
    const wrapped = mount(<DelayedInactive />)
    expect(wrapped.html()).not.toBeNull()
    jest.runAllTimers()
    expect(wrapped.html()).toBeNull()
  })

  it('remains in dom when inactive if animate is true', () => {
    const wrapped = mount(<DelayedInactive animate />)
    expect(wrapped.html()).not.toBeNull()
    jest.runOnlyPendingTimers()
    expect(wrapped.state('active')).toBeFalsy()
    expect(wrapped.html()).not.toBeNull()
  })
})
