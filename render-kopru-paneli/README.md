# Render Köprü Paneli

Bu proje, mevcut uygulamadan tamamen izole bir paneldir. Frontend tek sayfa Türkçe HTML arayüzdür, backend ise Node.js + Express köprü servisidir. Frontend ve backend linkleri farklı olabilir; frontend içinden backend API adresi kaydedilebilir.

<!-- [TALİMAT NO: 16 | TALİMAT ADI: README VE DOKÜMANLARI GERÇEK DURUMA EŞLE] Bu açıklama, doküman ile gerçek kod davranışını eşitlemek için eklendi. -->

## Klasör Yapısı
- `frontend/`: Statik yayınlanacak panel (`index.html`, `app.js`, `styles.css`)
- `backend/`: Render/GitHub API köprüsü
- `docs/`: Kurulum ve kullanım rehberi
- `render.yaml`: Render backend blueprint

## Kısa Çalışma Akışı
1. Backend'i Render veya yerelde çalıştır.
2. Frontend'i statik olarak yayınla.
3. Frontend üstündeki “Backend API Adresi” alanına backend `/api` adresini gir ve kaydet.
4. Butonlarla durumları çek ve yönetim aksiyonlarını kullan.

## Zorunlu / Opsiyonel ENV
- **Zorunlu (canlı Render verisi için):** `RENDER_API_KEY`, `RENDER_SERVICE_ID`
- **Opsiyonel:** `RENDER_SERVICE_NAME`, `Nekot_Buhtig`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`

Detaylar:
- `docs/KURULUM.md`
- `docs/KULLANIM.md`
