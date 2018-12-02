import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

const SpinnerContainer = styled.div`
  position: relative;
  margin: 0px auto 10px auto;
  width: ${props => props.size};
  max-height: 100%;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
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
  stroke: ${props => props.color};
`

const Spinner = ({ size, color }) => (
  <SpinnerContainer size={size}>
    <Svg viewBox='25 25 50 50'>
      <Circle
        color={color}
        cx='50'
        cy='50'
        r='20'
        fill='none'
        strokeWidth='2'
        strokeMiterlimit='10'
      />
    </Svg>
  </SpinnerContainer>
)

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
}

Spinner.defaultProps = {
  size: '50px',
  color: 'rgb(255, 255, 255)'
}

export default Spinner
