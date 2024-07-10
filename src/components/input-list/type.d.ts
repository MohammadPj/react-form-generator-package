import { GridProps } from '@mui/material/Grid'
import { SxProps } from '@mui/material'
import React from 'react'
import {RegisterOptions, Validate, ValidationRule} from 'react-hook-form'
import { TypographyProps } from '@mui/material/Typography'

export interface IUseFormInput {
    name: string
    label: React.ReactNode
    type?:
        | 'car-licencePlate'
        | 'motorcycle-licencePlate'
        | 'text'
        | 'select'
        | 'multi-select'
        |'auto-complete'
        | 'email'
        | 'password'
        | 'checkbox'
        | 'date-picker'
        | 'text-area'
        | 'number'
        | 'radio'
        | 'currency'
    options?: { value: string|number; label: string, labelProp?: any }[]
    rules?: RegisterOptions
    defaultValue?: any
    placeholder?: string
    gridItemProp?: GridProps
    sx?: SxProps
    disabled?: boolean
    readonly?: boolean
    props?: any
    controlWidth?: boolean
    labelProps?: Partial<TypographyProps<'any', {}>> | undefined
    helperText?:string,
    withoutHelperText?:boolean,
    isLoading?:boolean
    variant?: 'outlined' | 'filled' | 'standard',
    inputLabelMode?:TInputLabelMode,

}

export type TInputLabelMode = 'static'|'relative'
