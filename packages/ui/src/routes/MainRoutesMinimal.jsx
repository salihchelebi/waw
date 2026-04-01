import { lazy } from 'react'

import MainLayout from '@/layout/MainLayout'
import Loadable from '@/ui-component/loading/Loadable'
import { RequireAuth } from '@/routes/RequireAuth'
import { DefaultRedirect } from '@/routes/DefaultRedirect'

const Chatflows = Loadable(lazy(() => import('@/views/chatflows')))

// [TALİMAT NO: 4 | TALİMAT ADI: MAİN ROUTES DOSYASINI AYRIŞTIR VE CHATFLOWS DIŞI AĞIR YÜZEYLERİ MİNİMAL MODDAN ÇIKAR] Bu açıklama, chatflows dışı ağır route yüzeylerinin minimal moddan çıkarıldığını gösterir.
const MainRoutesMinimal = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DefaultRedirect />
        },
        {
            path: '/chatflows',
            element: (
                <RequireAuth permission={'chatflows:view'}>
                    <Chatflows />
                </RequireAuth>
            )
        }
    ]
}

export default MainRoutesMinimal
