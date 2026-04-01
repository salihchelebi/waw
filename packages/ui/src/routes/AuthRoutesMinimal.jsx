import { lazy } from 'react'

import Loadable from '@/ui-component/loading/Loadable'
import AuthLayout from '@/layout/AuthLayout'

const ResolveLoginPage = Loadable(lazy(() => import('@/views/auth/login')))
const SignInPage = Loadable(lazy(() => import('@/views/auth/signIn')))
const UnauthorizedPage = Loadable(lazy(() => import('@/views/auth/unauthorized')))

// [TALİMAT NO: 6 | TALİMAT ADI: AUTH YÜZEYİNİ ZORUNLU GİRİŞLERLE SINIRLA VE TAM AUTH AİLESİNİ KÖRLEMEYE ÇALIŞMA] Bu açıklama, auth yüzeyinin kör budama yerine kontrollü daraltıldığını gösterir.
const AuthRoutesMinimal = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: '/login',
            element: <ResolveLoginPage />
        },
        {
            path: '/signin',
            element: <SignInPage />
        },
        {
            path: '/unauthorized',
            element: <UnauthorizedPage />
        }
    ]
}

export default AuthRoutesMinimal
