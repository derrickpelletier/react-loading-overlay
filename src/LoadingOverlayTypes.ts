import React from 'react'

export type LoadingOverLayProps = {
    active?: boolean,
    fadeSpeed?: number,
    onClick?: () => void,
    className?: string,
    classNamePrefix?: string,
    spinner?: boolean | React.ReactNode,
    text?: React.ReactNode,
    styles?: {
        content?: any,
        overlay?: any,
        spinner?: any,
        wrapper?: any,
        [key: string]: any
    }
}

export type OverflowCSS = {
    overflow?: string,
    overflowX?: string,
    overflowY?: string
}

export type LoadingOverlayState = {
    overflowCSS?: OverflowCSS
}

export type LoadingOverlayDefaultProps = {
    classNamePrefix: string,
    fadeSpeed: number,
    styles: {}
}
