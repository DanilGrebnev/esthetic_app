'use client'

import { AcceptBtn } from '@/shared/ui/InputWithTags/AcceptBtn'
import { TagItem } from '@/shared/ui/InputWithTags/TagItem'
import { clsx } from 'clsx'
import {
    type ChangeEvent,
    type FC,
    type KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'

import s from './s.module.scss'

interface Tags {
    tagId: string
    label: string
}

interface InputWithTagsProps {
    className?: string
    initialValue?: Tags[]
    onChange?: (value: string[]) => void
}

export const InputWithTags: FC<InputWithTagsProps> = (props) => {
    const { onChange, initialValue, className } = props

    const [tags, setTags] = useState<Tags[]>(() =>
        !initialValue?.length ? [] : initialValue,
    )
    const [value, setValue] = useState('')
    const [wrapperWidth, setWrapperWidth] = useState<number>(0)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setWrapperWidth(wrapperRef?.current?.offsetWidth as number)
    }, [])

    const addTag = () => {
        setTags([
            {
                tagId: Date.now().toString(),
                label: value,
            },
            ...tags,
        ])
        setValue('')
    }

    const addTagByClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addTag()
        }
    }

    useEffect(() => {
        onChange?.(tags.map(({ label }) => label))
    }, [tags])

    const deleteTag = useCallback(
        (tagId: string) => {
            setTags(tags.filter((tag) => tag.tagId !== tagId))
        },
        [tags],
    )

    const onChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const value = target.value
        if (value.length === 30) return
        setValue(value)
    }

    const focusOnInput = (e: any) => {
        inputRef?.current?.focus()
    }

    return (
        <div
            onClick={(e) => focusOnInput(e)}
            ref={wrapperRef}
            style={wrapperWidth ? { maxWidth: wrapperWidth + 'px' } : undefined}
            className={clsx(s['input-wrapper'], className)}
        >
            <div className={s['tags-wrapper']}>
                {tags.map(({ tagId, label }) => {
                    return (
                        <TagItem
                            key={tagId}
                            tagId={tagId}
                            label={label}
                            deleteTag={deleteTag}
                        />
                    )
                })}
                <div className={s['input-container']}>
                    <input
                        ref={inputRef}
                        value={value}
                        className={s.input}
                        onChange={onChangeInput}
                        onKeyDown={addTagByClickEnter}
                        placeholder={!tags.length ? 'Введите теги' : undefined}
                    />
                    {value && <AcceptBtn onClick={addTag} />}
                </div>
            </div>
        </div>
    )
}
