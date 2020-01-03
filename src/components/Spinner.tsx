import React from 'react'
import { css } from 'emotion'

type SpinnerProps = {
    getStyles: (key: string) => TemplateStringsArray,
    cx: (name: string, arg2: any) => string
}

const Spinner: React.FC<SpinnerProps> = props => (
  <div className={props.cx('spinner', css(props.getStyles('spinner')))}>
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

export default Spinner
