'use client'

import { DashboardItemSkeleton } from '@/entities/dashboard/ui/DashboardModalList/ui/DashboardItemSkeleton'
import { useCheckAuthQuery } from '@/shared/api/auth'
import {
    useCheckPostInDashboard,
    useGetDashboardsByCookieQuery,
} from '@/shared/api/dashboards'
import { clsx } from 'clsx'
import { type FC } from 'react'

import { DashboardGroupContainer } from './DashboardGroupContainer'
import { DashboardItem } from './DashboardItem'
import s from './DashboardList.module.scss'
import { DashboardListSkeleton } from './DashboardListSkeleton'

interface DashboardListProps {
    className?: string
    onClick?: () => void
    postsId: string
}

export const DashboardModalList: FC<DashboardListProps> = (props) => {
    const { className, postsId } = props
    const { data: authData } = useCheckAuthQuery()

    const {
        data: dashboardsByCookie,
        isPending: pendingInitialDashboardList,
        isError: dashboardsError,
    } = useGetDashboardsByCookieQuery({ enabled: !!authData?.isAuth })

    const { data: postsCheck, isFetching: fetchingPostsCheck } =
        useCheckPostInDashboard({ postsId, enabled: !!dashboardsByCookie })

    console.log('postsCheck?.inDashboards', postsCheck?.inDashboards)
    console.log('dashboardsByCookie', dashboardsByCookie)

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={clsx(s['dashboard-container'], className)}
        >
            <h2 className={s['container-title']}>Сохранение</h2>
            {dashboardsError && <h2>Ошибка получения досок</h2>}
            {!dashboardsError && (
                <div className={s['dashboard-list']}>
                    <DashboardGroupContainer groupName='Сохранение на доске'>
                        {pendingInitialDashboardList && (
                            <DashboardListSkeleton amount={5} />
                        )}
                        {dashboardsByCookie?.favorites && (
                            <DashboardItem
                                postsId={postsId}
                                loading={fetchingPostsCheck}
                                skeleton={pendingInitialDashboardList}
                                deleteBtn={postsCheck?.inFavorites}
                                dashboardName='Избранное'
                                {...dashboardsByCookie?.favorites}
                            />
                        )}
                        {dashboardsByCookie?.dashboards?.map((dashboard) => {
                            return (
                                <DashboardItem
                                    key={dashboard.dashboardId}
                                    loading={fetchingPostsCheck}
                                    postsId={postsId}
                                    deleteBtn={postsCheck?.inDashboards.includes(
                                        dashboard.dashboardId,
                                    )}
                                    {...dashboard}
                                />
                            )
                        })}
                    </DashboardGroupContainer>
                </div>
            )}
        </div>
    )
}

DashboardModalList.displayName = 'DashboardsList'
