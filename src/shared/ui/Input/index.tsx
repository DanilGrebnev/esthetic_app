import TextField from '@mui/material/TextField'
import { StyledEngineProvider } from '@mui/material/styles'
import { clsx } from 'clsx'
import { forwardRef, memo } from 'react'

import s from './s.module.scss'

type CustomInputProps = Parameters<typeof TextField>[0]

export const Input = memo(
    forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
        const { variant, className, ...other } = props

        return (
            <StyledEngineProvider injectFirst>
                <TextField
                    ref={ref}
                    className={clsx(s.input, className)}
                    variant='filled'
                    {...other}
                />
            </StyledEngineProvider>
        )
    }),
)

Input.displayName = 'CustomInput'
