import { memo } from 'react'

import { useTagsInput } from '../../hooks/useTagsInput'
import { type InputProps } from '../../types'
import { AcceptBtn } from '../AcceptBtn'
import s from './s.module.scss'

export const Input = memo((props: InputProps) => {
    const { placeholder, setTags, onChange, tags, ref } = props

    const { onChangeTags, addTagByEnterKey, addTag, label } = useTagsInput({
        setTags,
        onChange,
        tags,
    })

    return (
        <div className={s.input_container}>
            <input
                ref={ref}
                value={label}
                className={s.input}
                onChange={onChangeTags}
                placeholder={placeholder}
                onKeyDown={addTagByEnterKey}
            />
            {label && <AcceptBtn onClick={addTag} />}
        </div>
    )
})

Input.displayName = 'Input'
