import MainRoutesMinimal from './MainRoutesMinimal'
import AuthRoutesMinimal from './AuthRoutesMinimal'

// [TALİMAT NO: 3 | TALİMAT ADI: ROUTE KAYIT MERKEZİNİ İKİ MODA AYIR VE MİNİMAL MODU VARSAYILAN RENDER HEDEFİ YAP] Bu açıklama, minimal deploy için route kayıt yüzeyinin daraltıldığını gösterir.
// [TALİMAT NO: 8 | TALİMAT ADI: KODLAMA SONUNDA DEPLOYTE GİRENLER VE GİRMEYENLERİ AYRI RAPORLA] Bu açıklama, minimal deploy route sahipliğinin görünür biçimde raporlandığını gösterir.
const MinimalDeployRoutes = [MainRoutesMinimal, AuthRoutesMinimal]

export default MinimalDeployRoutes
