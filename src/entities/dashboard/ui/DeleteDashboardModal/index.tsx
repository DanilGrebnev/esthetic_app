import { useDeleteDashboardMutation } from '@/shared/api/dashboards'
import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { Button } from '@/shared/ui/Button'
import { BaseModalWindow } from '@/shared/ui/modal'

interface DeleteDashboardModalModalProps {
    onClose: () => void
    dashboardId: string
}
export const DeleteDashboardModal = ({
    onClose,
    dashboardId,
}: DeleteDashboardModalModalProps) => {
    const { data: profileData } = useGetProfileByCookieQuery()

    const { mutate, isPending } = useDeleteDashboardMutation({
        userId: profileData?.userId || '',
    })

    const deleteDashboard = () => {
        mutate(dashboardId)
    }

    return (
        <BaseModalWindow>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                <h3>Удалить доску?</h3>
                <div style={{ display: 'flex', gap: 'var(--global-gap)' }}>
                    <Button
                        loading={isPending}
                        onClick={deleteDashboard}
                    >
                        Удалить
                    </Button>
                    <Button
                        disabled={isPending}
                        onClick={onClose}
                    >
                        Отмена
                    </Button>
                </div>
            </div>
        </BaseModalWindow>
    )
}
