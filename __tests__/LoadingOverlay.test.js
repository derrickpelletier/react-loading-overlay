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
    expect(wrapped.childAt(0).length).toBe(0)
  })

  it('is in DOM initially if active:true', () => {
    const wrapped = mount(<LoadingOverlay active />)
    expect(wrapped.childAt(0).length).toBe(1)
  })

  it('removes self from DOM when not active', () => {
    const wrapped = mount(<DelayedInactive />)
    expect(wrapped.childAt(0).length).toBe(1)
    jest.runAllTimers()
    expect(wrapped.childAt(0).length).toBe(0)
  })

  it('remains in dom when inactive if animate is true', () => {
    const wrapped = mount(<DelayedInactive animate />)
    expect(wrapped.childAt(0).length).toBe(1)
    jest.runOnlyPendingTimers()
    expect(wrapped.state('active')).toBeFalsy()
    expect(wrapped.childAt(0).length).toBe(1)
  })
})
