import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/css'

const Spinner = ({ getStyles, cx }) => (
  <div className={cx('spinner', css(getStyles('spinner')))}>
    <svg viewBox='25 25 50 50'>
      <circle
        cx='50'
        cy='50'
        r='20'
        fill='none'
        strokeWidth='2'
        strokeMiterlimit='10'
      />
    </svg>
  </div>
)

Spinner.propTypes = {
  getStyles: PropTypes.func.isRequired,
  cx: PropTypes.func.isRequired
}

export default Spinner
