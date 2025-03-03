import {
    useDeleteTagFromSearchPostSelector,
    useSetTagInSearchPostSelector,
} from '@/shared/store/posts'
import { TSearchPostsTags } from '@/shared/types/posts'
import { clsx } from 'clsx'
import { memo } from 'react'

import s from './s.module.scss'

interface TagsItemProps extends TSearchPostsTags {}

export const SearchPostsTags = memo((props: TagsItemProps) => {
    const { tag, active } = props
    const setTags = useSetTagInSearchPostSelector()
    const deleteTag = useDeleteTagFromSearchPostSelector()

    return (
        <div
            className={clsx(s.tag, 'tag', {
                [s.active]: active,
            })}
            onClick={() => {
                if (active) {
                    deleteTag(tag)
                    return
                }
                setTags(tag)
            }}
        >
            {tag}
        </div>
    )
})

SearchPostsTags.displayName = 'SearchPostsTags'
