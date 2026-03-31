# Kurulum Rehberi

## 1) Klasöre gir
```bash
cd render-kopru-paneli
```

## 2) Backend bağımlılıklarını kur
```bash
cd backend
npm install
```

## 3) Ortam değişkenlerini hazırla
Kök dizindeki `.env.example` dosyasını referans alarak Render üzerinde şu değişkenleri tanımla:
- `RENDER_API_KEY`
- `RENDER_SERVICE_ID`
- `RENDER_SERVICE_NAME`
- `GITHUB_TOKEN` (opsiyonel)
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH`

## 4) Backend'i yerelde çalıştır
```bash
npm start
```

## 5) Frontend'i yayınla
- `frontend/` klasörünü GitHub Pages veya Render Static Site olarak yayınla.
- Gerekirse `frontend/app.js` içindeki `API_BASE` değerini backend adresine ayarla.

## 6) Backend'i Render'a al
- Yeni bir Render Web Service oluştur.
- Root Directory: `render-kopru-paneli/backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: `.env.example` içindeki anahtarlar
