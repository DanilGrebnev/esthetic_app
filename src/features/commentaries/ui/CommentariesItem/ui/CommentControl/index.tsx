import { getDateRange } from '@/shared/utils/getDateRange'
import clsx from 'clsx'
import { MouseEventHandler } from 'react'

import { CommentLikeBtn } from '../CommentLikeBtn'
import { AnswerBtn } from './Buttons/AnswerBtn'
import { DeleteBtn } from './Buttons/DeleteBtn'
import { EditBtn } from './Buttons/EditBtn'
import s from './comment-control.module.scss'

type TBtn = MouseEventHandler<HTMLButtonElement>

interface CommentControlProps {
    dateOfCreation: Date
    className?: string
    onResponse?: TBtn
    onEdit?: TBtn
    onDelete?: TBtn
    isOwner?: boolean
    likeCount: number
    isLiked: boolean
    commentId: string
}
export const CommentControl = (props: CommentControlProps) => {
    const {
        dateOfCreation,
        className,
        isLiked,
        isOwner,
        likeCount,
        commentId,
        onEdit,
        onResponse,
        onDelete,
    } = props

    return (
        <div className={clsx(s['comm-control'], className)}>
            <p>{getDateRange(dateOfCreation)}</p>
            <div className={s['btn-control']}>
                {!isOwner ? (
                    <AnswerBtn onClick={onResponse} />
                ) : (
                    <>
                        <EditBtn onClick={onEdit} />
                        <DeleteBtn onClick={onDelete} />
                    </>
                )}
                <div className={s.like_btn_container}>
                    <CommentLikeBtn
                        className={s.like_btn}
                        isOwner={isOwner}
                        commentId={commentId}
                        isLiked={isLiked}
                        likeCount={likeCount}
                    />
                </div>
            </div>
        </div>
    )
}
