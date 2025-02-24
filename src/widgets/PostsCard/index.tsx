'use client'

import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn } from '@/entities/posts'
import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { routes } from '@/shared/routes'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { type CSSProperties, memo } from 'react'

import s from './s.module.scss'
import { PostInfo } from './ui/PostInfo'

interface PostCardProps {
    url: string
    urlBlur: string
    aspectRatio?: (typeof aspectRatioVariants)[number]
    className?: string
    name: string
    postId: string
    quality?: number
    style?: CSSProperties
    uniqueId?: string
}

export const PostsCard = memo((props: PostCardProps) => {
    const {
        url,
        quality = 20,
        aspectRatio = '9/16',
        postId,
        className,
        style,
    } = props
    const href = routes.postsDetail.getRoute(postId)

    return (
        <Link
            className={clsx(s.card, className)}
            style={{ aspectRatio, minHeight: '20px', ...style }}
            href={href}
        >
            <div className={s.wrapper}>
                <div className={s.btn_group}>
                    <SaveToDashboardButton
                        postsId={postId}
                        className={s.save_btn}
                    />
                    <PostInfo
                        commentsAmount={31}
                        likeAmount={21}
                    />
                    <DownloadFileBtn
                        href={url}
                        downloadFileName={'test_file_name'}
                        className={s.card_circle_icon}
                    />
                </div>
                <Image
                    className={s.img}
                    loading='lazy'
                    alt='test'
                    quality={quality}
                    sizes='(max-width: 200px)'
                    src={url}
                    fill={true}
                />
            </div>
        </Link>
    )
})

PostsCard.displayName = 'PostsCard'
