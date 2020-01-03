import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'
import { css, cx } from 'emotion'

import Spinner from './components/Spinner'
import STYLES from './styles'
import {LoadingOverlayDefaultProps, LoadingOverLayProps, LoadingOverlayState, OverflowCSS} from './LoadingOverlayTypes'
import {TransitionStatus} from 'react-transition-group/Transition';

class LoadingOverlayWrapper extends PureComponent<LoadingOverLayProps, LoadingOverlayState> {
  static defaultProps: LoadingOverlayDefaultProps = {
    classNamePrefix: '_loading_overlay_',
    fadeSpeed: 500,
    styles: {}
  }

  wrapper = React.createRef<HTMLDivElement>();

  constructor (props: LoadingOverLayProps) {
    super(props)

    this.state = { overflowCSS: {} }
  }

  componentDidMount () {
    const wrapperStyle: {[key: string]: any} = window.getComputedStyle(this.wrapper.current!)
    const overflowCSS = ['overflow', 'overflowX', 'overflowY'].reduce((m: {[key: string]: string}, i) => {
      if (wrapperStyle[i] !== 'visible') m[i] = 'hidden'
      return m
    }, {})
    this.setState({ overflowCSS })
  }

  componentDidUpdate (prevProps: LoadingOverLayProps) {
    const { active } = this.props
    if (active && this.wrapper?.current) this.wrapper.current.scrollTop = 0
  }

  /**
   * Return an emotion css object for a given element key
   * If a custom style was provided via props, run it with
   * the base css obj.
   */
  getStyles = (key: string, providedState?: OverflowCSS | TransitionStatus) => {
    const base = STYLES[key](providedState, this.props)
    const custom = this.props.styles ? this.props.styles[key] : undefined
    if (!custom) return base
    return typeof custom === 'function'
      ? custom(base, this.props)
      : custom
  }

  /**
   * Convenience cx wrapper to add prefix classes to each of the child
   * elements for styling purposes.
   */
  cx = (names: string | Array<string | false | undefined>, ...args: any) => {
    const arr = Array.isArray(names) ? names : [names]
    return cx(
      ...arr.map(name => name ? `${this.props.classNamePrefix}${name}` : ''),
      ...args
    )
  }

  render () {
    const { overflowCSS } = this.state
    const {
      children,
      className,
      onClick,
      active,
      fadeSpeed,
      spinner,
      text
    } = this.props

    return (
      <div
        data-testid='wrapper'
        ref={this.wrapper}
        className={
          this.cx(
            ['wrapper', active && 'wrapper--active'],
            css(this.getStyles('wrapper', active ? overflowCSS : {})),
            className
          )
        }
      >
        <CSSTransition
            in={active}
            classNames='_loading-overlay-transition'
            timeout={fadeSpeed!}
            unmountOnExit
        >
          {state => (
              <div
                  data-testid='overlay'
                  className={this.cx('overlay', css(this.getStyles('overlay', state)))}
                  onClick={onClick}
              >
                <div className={this.cx('content', css(this.getStyles('content')))}>
                  {spinner && (
                      typeof spinner === 'boolean'
                          ? <Spinner cx={this.cx} getStyles={this.getStyles}/>
                          : spinner
                  )}
                  {text}
                </div>
              </div>
          )}
        </CSSTransition>
        {children}
      </div>
    )
  }
}

export default LoadingOverlayWrapper
