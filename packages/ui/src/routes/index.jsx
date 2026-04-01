import { useRoutes } from 'react-router-dom'

import MainRoutes from './MainRoutes'
import CanvasRoutes from './CanvasRoutes'
import ChatbotRoutes from './ChatbotRoutes'
import AuthRoutes from '@/routes/AuthRoutes'
import ExecutionRoutes from './ExecutionRoutes'
import MinimalDeployRoutes from './MinimalDeployRoutes'
import config from '@/config'

const FullRoutes = [MainRoutes, AuthRoutes, CanvasRoutes, ChatbotRoutes, ExecutionRoutes]

// [TALİMAT NO: 1 | TALİMAT ADI: SADECE REPO DOSYALARINA VE BU TALİMATA GÖRE HAREKET ET] Bu açıklama, karar yüzeyinin yalnızca repo dosyalarıyla sınırlandığını gösterir.
// [TALİMAT NO: 5 | TALİMAT ADI: CANVAS, CHATBOT VE PUBLIC EXECUTION YÜZEYLERİNİ DEPLOY-DIŞI PASİF KÜMEYE AL] Bu açıklama, minimal deploy hedefinde çekirdek dışı route yüzeylerinin registry dışına alındığını gösterir.
const activeRoutes = config.minimalDeployMode ? MinimalDeployRoutes : FullRoutes

export default function ThemeRoutes() {
    return useRoutes(activeRoutes, config.basename)
}
