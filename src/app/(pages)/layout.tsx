import { roboto } from '@/shared/fonts'
import '@/shared/styles/globals.css'
import '@/shared/styles/reset.css'
import '@/shared/styles/root.css'
import '@/shared/styles/tailwind-global.css'
import { Layout } from '@/shared/types/layout'
import { _ModalRoot } from '@/shared/ui/modal'
import { clsx } from 'clsx'
import { type Metadata } from 'next'

import { MainProvider } from './MainProvider'

export const metadata: Metadata = {
    title: 'Esthetic',
    description: 'This is a "Esthetic App"',
}

const RootLayout = ({ children }: Layout) => {
    return (
        <html lang='ru'>
            <body className={clsx(roboto.variable, 'scrollbar')}>
                <_ModalRoot />
                <MainProvider>{children}</MainProvider>
            </body>
        </html>
    )
}

export default RootLayout
