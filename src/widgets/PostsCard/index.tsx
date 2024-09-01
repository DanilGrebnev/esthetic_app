import { SaveToDashboardButton } from '@/entities/dashboard'
import { DownloadFileBtn } from '@/entities/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'

import s from './s.module.scss'

interface PostCardProps {
    mediaUrl: string
    aspect?: string
    className?: string
    name: string
}

export const PostsCard: FC<PostCardProps> = (props) => {
    const { mediaUrl, name, aspect = '9/16', className } = props

    return (
        <Link
            href={'/posts-detail/postId'}
            className={clsx(s.card, className)}
            style={{ aspectRatio: aspect }}
        >
            <div className={s['button-group']}>
                <SaveToDashboardButton className={s['save-btn']} />
                <DownloadFileBtn
                    href={mediaUrl}
                    downloadFileName={'test_file_name'}
                    className={s['card-circle-icon']}
                />
            </div>
            <Image
                className={s.img}
                loading='lazy'
                alt='test'
                sizes='200px'
                src={mediaUrl}
                fill={true}
            />
        </Link>
    )
}
