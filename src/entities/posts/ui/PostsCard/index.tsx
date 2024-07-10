'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { type CSSProperties, type FC, useEffect, useRef, useState } from 'react'

import { CardCircleIcon } from '../CardCircleIcon'
import { SavePostsButton } from '../SavePostsButton'
import s from './s.module.sass'

interface PostCardProps {
    url: string
    aspect?: string
    className?: string
}

export const PostsCard: FC<PostCardProps> = (props) => {
    const { url, aspect = '9/16', className } = props
    const [w, setW] = useState(0)
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            const width = cardRef.current.offsetWidth
            setW(width)
        }
    }, [])

    const mathes = aspect.match(/([\d{0,2}])\/(\d{0,2})/)
    const a = Number(mathes?.[1])
    const b = Number(mathes?.[2])
    const height = +((w * b) / a).toFixed()

    return (
        <div
            ref={cardRef}
            className={clsx(
                s.card,
                `relative w-full cursor-pointer overflow-hidden rounded-[20px]`,
                className,
            )}
            style={{ height: height + 'px' }}
        >
            <div
                className={clsx(
                    s['button-group'],
                    'absolute z-[1] h-full w-full',
                )}
            >
                <SavePostsButton />
                <CardCircleIcon
                    variant='download'
                    className='absolute bottom-[10px] right-[10px]'
                />
            </div>
            <Image
                className='object-cover'
                loading='lazy'
                alt='test'
                src={url}
                fill={true}
            />
        </div>
    )
}
