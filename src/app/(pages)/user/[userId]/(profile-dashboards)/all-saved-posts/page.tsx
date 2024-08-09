import { Container } from '@/shared/ui/Container'
import { PostsList } from '@/widgets/PostsList'

import s from './s.module.scss'

export default function AllPosts() {
    return (
        <Container className={s['all-saved-posts']}>
            <h1 className={s.title}>Все посты</h1>
            <PostsList className={s.list} />
        </Container>
    )
}
