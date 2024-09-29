'use client'

import { CommentariesWriteField } from '@/features/commentaries'
import { useGetDetailPostsQuery } from '@/shared/api/posts'
import { Container } from '@/shared/ui/Container'
import Image from 'next/image'

import { PostsDetailComments } from './PostsDetailComments'
import { PostsDetailHeader } from './PostsDetailHeader'
import s from './s.module.scss'

interface DetailPostsParams {
    params: {
        postId: string
    }
}

export const PostsDetailPage = ({ params }: DetailPostsParams) => {
    const { data: postData, isPending } = useGetDetailPostsQuery(params.postId)

    if (isPending) return <h1>Загрузка</h1>
    if (!postData && !isPending) return

    const { post } = postData

    return (
        <Container
            size='m'
            className={s.page}
        >
            <div className={s['content-container']}>
                <div
                    style={{ aspectRatio: post?.media?.aspectRatio }}
                    className={s['image-container']}
                >
                    <Image
                        fill={true}
                        sizes='400px'
                        quality={100}
                        alt={post.name}
                        src={post?.media?.url}
                    />
                </div>

                <div className={s.content}>
                    <PostsDetailHeader
                        postsId={post?.postId}
                        title={post.name}
                        description={post?.description}
                        className={s['content__header']}
                        pathToImg={post?.media?.url}
                        author={post?.author}
                    />
                    <PostsDetailComments
                        count={1}
                        className={s['content__comments']}
                    />
                    <div className={s['write-commentaries']}>
                        <CommentariesWriteField />
                    </div>
                </div>
            </div>
        </Container>
    )
}
