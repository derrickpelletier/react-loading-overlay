/**
 * LoadingOverlay
 *
 * Wrap your component in this and set active={true/false}.
 * react transition group will handle the fade of the overlay portion.
 * apply any classnames you need as normal with className prop.

  <LoadingOverlay active={true} text='Saving...'>my children</LoadingOverlay>
 */
import React from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import styled, { keyframes } from 'styled-components'

function FirstChild (props) {
  const childrenArray = React.Children.toArray(props.children)
  return childrenArray[0] || null
}

class LoadingOverlayWrapper extends React.Component {
  render () {
    const loadNode = this.props.active ? (<LoadingOverlay key='the_dimmer' {...this.props} />) : null
    let wrapNode = loadNode
    if (this.props.animate || this.props.spinner) {
      wrapNode = (
        <ReactCSSTransitionGroup
          transitionName='_loading-overlay-transition'
          transitionAppear
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppearTimeout={500}
          component={FirstChild}>
          {loadNode}
        </ReactCSSTransitionGroup>
      )
    }
    return wrapNode
  }
}

LoadingOverlayWrapper.propTypes = {
  active: React.PropTypes.bool,
  text: React.PropTypes.string,
  spinner: React.PropTypes.bool,
  spinnerSize: React.PropTypes.string,
  className: React.PropTypes.string,
  background: React.PropTypes.string,
  color: React.PropTypes.string,
  zIndex: React.PropTypes.number,
  animate: React.PropTypes.bool
}

LoadingOverlayWrapper.defaultProps = {
  active: false,
  className: '_loading-overlay',
  background: 'rgba(0,0,0,.7)',
  spinnerSize: '50px',
  color: '#FFF',
  zIndex: 800,
  animate: false
}

class LoadingOverlay extends React.Component {
  render () {
    const Overlay = styled.div`
      position: absolute;
      height: 100%;
      width: 100%;
      background: ${this.props.background};
      color: ${this.props.color};
      top: 0px;
      left: 0px;
      transition: opacity ${this.props.speed}ms ease-out;
      display: flex;
      text-align: center;
      font-size: 1.2em;
      z-index: ${this.props.zIndex};
      &._loading-overlay-transition-appear,
      &._loading-overlay-transition-enter {
        opacity: 0.01;
      }
      &._loading-overlay-transition-appear._loading-overlay-transition-appear-active,
      &._loading-overlay-transition-enter._loading-overlay-transition-enter-active {
        opacity: 1;
        transition: opacity .5s ease-in;
      }
      &._loading-overlay-transition-leave {
        opacity: 1;
      }
      &._loading-overlay-transition-leave._loading-overlay-transition-leave-active {
        opacity: 0;
        transition: opacity .5s ease-in;
      }
    `

    const Spinner = styled.div`
      position: relative;
      margin: 0px auto 10px auto;
      width: ${this.props.spinnerSize};
      max-height: 100%;
      &:before {
        content: '';
        display: block;
        padding-top: 100%;
      }
    `

    const Content = styled.div`
      margin: auto;
    `

    const rotate360 = keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    `

    const spinnerDash = keyframes`
      0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -124px;
      }
    `

    const Svg = styled.svg`
      animation: ${rotate360} 2s linear infinite;
      height: 100%;
      transform-origin: center center;
      width: 100%;
      position: absolute;
      top: 0; bottom: 0; left: 0; right: 0;
      margin: auto;
    `

    const Circle = styled.circle`
      animation: ${spinnerDash} 1.5s ease-in-out infinite;
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      stroke: ${this.props.color};
    `

    let spinnerNode = null
    if (this.props.spinner) {
      spinnerNode = (
        <Spinner>
          <Svg viewBox='25 25 50 50'>
            <Circle cx='50' cy='50' r='20' fill='none' strokeWidth='2' strokeMiterlimit='10' />
          </Svg>
        </Spinner>
      )
    }

    let textNode = null
    if (this.props.text) textNode = <div>{this.props.text}</div>

    let contentNode = null
    if (this.props.text || this.props.spinner) {
      contentNode = (
        <Content>
          {spinnerNode}
          {textNode}
        </Content>
      )
    }

    return <Overlay key='dimmer'>{contentNode}</Overlay>
  }
}

LoadingOverlay.defaultProps = {
  text: null,
  spinner: false
}

export default LoadingOverlayWrapper
