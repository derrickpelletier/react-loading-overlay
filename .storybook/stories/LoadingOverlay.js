import React from 'react'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components'
import LoadingOverlay from '../../src/LoadingOverlay.js'

const wrapped = (
  <div style={{padding: '20px', background: '#FFF'}}>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Eget nunc scelerisque viverra mauris. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Tincidunt eget nullam non nisi est sit amet facilisis magna. Pharetra vel turpis nunc eget lorem dolor sed viverra. Condimentum mattis pellentesque id nibh tortor id aliquet. Mi sit amet mauris commodo. Vehicula ipsum a arcu cursus. Tortor id aliquet lectus proin nibh nisl. Iaculis eu non diam phasellus vestibulum lorem. Urna et pharetra pharetra massa massa ultricies mi quis. Egestas dui id ornare arcu odio. Morbi quis commodo odio aenean sed adipiscing.</p>
    <p>In hac habitasse platea dictumst quisque sagittis purus sit amet. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Tristique et egestas quis ipsum. Risus pretium quam vulputate dignissim suspendisse in. Eget est lorem ipsum dolor. Cum sociis natoque penatibus et magnis dis. Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Lorem mollis aliquam ut porttitor leo a diam sollicitudin. Porta lorem mollis aliquam ut porttitor leo a diam.</p>
  </div>)

class FadeWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: true
    }
  }

  toggleActive = () => {
    this.setState((prevState) => ({
      active: !prevState.active
    }))
  }

  render () {
    const { active } = this.state
    return (
      <>
        <button
          type='button'
          onClick={this.toggleActive}
        >
          turn loader {active ? 'off' : 'on'}
        </button>
        <br />
        <br />
        <LoadingOverlay
          {...this.props}
          onClick={action('overlay-click')}
          active={this.state.active}
        />
      </>
    )
  }
}

storiesOf('LoadingOverlay', module)
  .add('no props', () => (
    <LoadingOverlay>
      {wrapped}
    </LoadingOverlay>
  ))
  .add('active with text', () => (
    <div>
      Don't overlay this
      <LoadingOverlay
        active
        text='Loading your fake content...'
      >
        {wrapped}
      </LoadingOverlay>
    </div>
  ))
  .add('with spinner', () => (
    <FadeWrapper
      active
      spinner
    >
      {wrapped}
    </FadeWrapper>
  ))
  .add('No fade', () => (
    <div>
      <FadeWrapper
        text='No fade when toggled'
        fadeSpeed={0}
      >
        {wrapped}
      </FadeWrapper>
    </div>
  ))
  .add('with spinner and text', () => (
    <FadeWrapper
      active
      spinner
      text='Loading stuff...'
    >
      {wrapped}
    </FadeWrapper>
  ))
  .add('with custom spinner', () => (
    <FadeWrapper
      active
      spinner={<p>FAKE SPINNER</p>}
      text='Loading stuff...'
    >
      {wrapped}
    </FadeWrapper>
  ))
  .add('styles prop', () => (
    <FadeWrapper
      active
      spinner
      styles={{
        wrapper: (base, props) => ({
          ...base,
          width: 300,
          height: 200,
          overflow: props.active ? 'hidden' : 'scroll'
        }),
        overlay: (base) => ({
          ...base,
          background: 'rgba(0, 0, 255, 0.5)'
        }),
        spinner: (base) => ({
          ...base,
          width: '100px',
          '& svg circle': {
            stroke: '#FF0000'
          }
        })
      }}
    >
      {wrapped}
    </FadeWrapper>
  ))
  .add('styled-components (or with classes)', () => {
    const StyledLoader = styled(FadeWrapper)`
      width: 250px;
      height: 400px;
      overflow: scroll;
      .myOverlay_overlay {
        background: rgba(255, 0, 0, 0.5);
      }
      &.myOverlay_wrapper--active {
        overflow: hidden;
      }
    `
    return (
      <StyledLoader
        classNamePrefix='myOverlay_'
        active
        spinner
      >
        {wrapped}
      </StyledLoader>
    )
  })