'use client'

import { clsx } from 'clsx'
import { m } from 'framer-motion'
import dynamic from 'next/dynamic'
import { type FC } from 'react'

import s from './DropDownMenu.module.scss'

const NotAuthorized = dynamic(() => import('./NotAuthorized'))
const SuccessAuth = dynamic(() => import('./SuccessAuth'))

interface DropDownMenuProps {
    className?: string
    auth?: boolean
    userId?: string
    open?: boolean
}

const variants = {
    open: { scale: 1 },
    closed: { scale: 0 },
}

export const DropDownMenu: FC<DropDownMenuProps> = (props) => {
    const { className, auth, userId, open } = props

    return (
        <m.div
            initial={{ scale: 0 }}
            variants={variants}
            animate={open ? 'open' : 'closed'}
            transition={{ duration: 0.1 }}
        >
            <div className={clsx(s['drop-down'], className)}>
                <div className={s['drop-down-wrapper']}>
                    {auth ? <SuccessAuth userId={userId} /> : <NotAuthorized />}
                </div>
            </div>
        </m.div>
    )
}

DropDownMenu.displayName = 'DropDownMenu'
