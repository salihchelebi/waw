# Kurulum Rehberi

## 1) Backend kurulumu (yerel)
```bash
cd render-kopru-paneli/backend
npm install
npm start
```

## 2) Backend env değişkenleri
Backend açılırken şu sırayla env dosyası okunur: `backend/.env` → `render-kopru-paneli/.env` → `render-kopru-paneli/.env.example`.
`.env.example` içindeki anahtarları kullan.
- **Zorunlu (Render verisi için):** `RENDER_API_KEY`, `RENDER_SERVICE_ID`
- **Opsiyonel:** `RENDER_SERVICE_NAME`, `Nekot_Buhtig`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH` (varsayılan: `main`)

## 3) Render backend deploy
`render-kopru-paneli/render.yaml` dosyası backend deploy için hazırdır.
- Service type: Web Service
- Root Directory: `render-kopru-paneli/backend`
- Build: `npm install`
- Start: `npm start`
- Port: Render tarafından `PORT` env ile verilir.

## 4) Frontend yayın seçenekleri
<!-- [TALİMAT NO: 15 | TALİMAT ADI: FRONTEND YAYIN AKIŞINI BOŞLUKSUZ ANLAT] Bu açıklama, statik frontend yayın akışının açık yazılması için eklendi. -->

### GitHub Pages
1. `render-kopru-paneli/frontend` içeriğini ayrı bir repoda köke koy veya mevcut repoda Pages publish kaynağı olarak bu klasörü seç.
2. Publish edilen klasörde `index.html`, `app.js`, `styles.css` aynı seviyede kalmalı.

### Render Static Site
1. Yeni Static Site oluştur.
2. Root Directory: `render-kopru-paneli/frontend`
3. Build Command: boş bırakılabilir.
4. Publish Directory: `.`

## 5) Frontend-backend eşleştirme
Frontend açıldıktan sonra üstteki “Backend API Adresi” alanına backend linkini `/api` ile gir:
- Örnek: `https://render-kopru-paneli-backend.onrender.com/api`
- Kaydet butonuna basınca adres localStorage’da saklanır.
- Frontend ve backend linkleri farklı domainlerde olabilir.


## 6) GitHub Actions Secret Notu
- CI/CD içinde secret gerektiğinde repository/environment secrets kısmına **`Nekot_Buhtig`** olarak ekleyin.
- Workflow içinde bu secret değeri env olarak backend süreçlerine geçirilmelidir.
- Secret değeri commit, log veya artefakt içine yazılmamalıdır.


## 7) Arayüz neden boş görünür?
- `Cannot GET /` görüyorsanız sadece backend API ayağa kalkmış, frontend servis edilmiyor demektir.
- Bu repo yapısında backend, `../frontend/index.html` dosyasını bulursa `/` adresinden paneli doğrudan gösterir.
- Deploy sonrası `https://<backend>.onrender.com/` açıldığında panel görünmeli; API yolları `https://<backend>.onrender.com/api/*` olarak devam eder.
