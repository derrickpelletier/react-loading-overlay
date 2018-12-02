/**
 * LoadingOverlay
 *
 * Set as child component in a container. Toggle state with `active` prop.
 * React transition group will handle the fade of the overlay.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import Spinner from './Spinner'

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const Content = styled.div`
  margin: auto;
`

const Overlay = styled.div`
  z-index: ${props => props.zIndex};
  background: ${props => props.background};
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  display: flex;
  text-align: center;
  font-size: 1.2em;
  color: #FFF;
  &._loading-overlay-transition-appear,
  &._loading-overlay-transition-enter {
    opacity: 0.01;
  }
  &._loading-overlay-transition-appear._loading-overlay-transition-appear-active,
  &._loading-overlay-transition-enter._loading-overlay-transition-enter-active {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }
  &._loading-overlay-transition-exit {
    opacity: 1;
  }
  &._loading-overlay-transition-exit._loading-overlay-transition-exit-active {
    opacity: 0;
    transition: opacity 0.5s ease-in;
  }
`

class LoadingOverlayWrapper extends Component {
  constructor (props) {
    super(props)
    this.wrapper = React.createRef()
  }

  componentDidUpdate (prevProps) {
    const { active } = this.props
    if (active) this.wrapper.current.scrollTop = 0
  }

  render () {
    const {
      children,
      active,
      fadeSpeed,
      background,
      spinner,
      text,
      zIndex,
      onClick,
      classNames,
      overlay
    } = this.props

    const overlayProps = {
      zIndex,
      onClick,
      background,
      className: classNames.overlay,
      children: (
        <Content>
          {spinner && (
            typeof spinner === 'boolean'
              ? <Spinner className={classNames.spinner} />
              : spinner
          )}
          {text}
        </Content>
      )
    }

    return (
      <Wrapper ref={this.wrapper} className={classNames.wrapper}>
        <CSSTransition
          in={active}
          classNames='_loading-overlay-transition'
          timeout={fadeSpeed || 0}
          unmountOnExit
        >
          {overlay
            ? React.cloneElement(overlay, overlayProps)
            : <Overlay {...overlayProps} />
          }
        </CSSTransition>
        {children}
      </Wrapper>
    )
  }
}

LoadingOverlayWrapper.propTypes = {
  active: PropTypes.bool,
  fadeSpeed: PropTypes.number,
  onClick: PropTypes.func,

  // component props
  overlay: PropTypes.node,
  spinner: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.node
  ]),
  text: PropTypes.node,

  // convenience props
  background: PropTypes.string,
  zIndex: PropTypes.number,
  classNames: PropTypes.shape({
    wrapper: PropTypes.string,
    overlay: PropTypes.string,
    spinner: PropTypes.string
  })
}

LoadingOverlayWrapper.defaultProps = {
  background: 'rgba(0, 0, 0, 0.7)',
  zIndex: 800,
  fadeSpeed: 500,
  classNames: {}
}

export default LoadingOverlayWrapper
LoadingOverlayWrapper.Spinner = Spinner
LoadingOverlayWrapper.Overlay = Overlay
