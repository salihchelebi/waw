# WAW REPOSU HARİTA METODU

## 1. Kısa Sonuç
Bu repo en çok **uygulama kodu + servis/iş mantığı + yapılandırma/deploy** katmanlarına yaslanıyor. Bunun somut dayanağı `packages/server`, `packages/ui`, `packages/components` (uygulama omurgası) ile `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `render.yaml`, `Dockerfile*` (çalıştırma/deploy omurgası) dosyalarının birlikte bulunmasıdır.

## 2. Repo Omurgası

| Yol | Tür | Neden omurga olduğu |
|---|---|---|
| `package.json` | Kök çalışma/komut dosyası | Monorepo script zincirini ve çalışma komutlarını tanımlar. |
| `pnpm-workspace.yaml` | Workspace yapılandırması | Paketlerin birlikte nasıl yönetileceğini belirler. |
| `pnpm-lock.yaml` | Bağımlılık kilidi | Kurulumun tutarlılığını sağlar. |
| `turbo.json` | Monorepo build orkestrasyonu | Paketler arası build/test akışını yönetir. |
| `packages/server/` | Backend uygulama katmanı | API, komutlar, route’lar, DB erişimi ve sunucu davranışı burada. |
| `packages/ui/` | Frontend uygulama katmanı | Arayüz route/state/view akışı burada. |
| `packages/components/` | Flowise node/iş mantığı katmanı | Tool/node/credential bileşenleri burada; çekirdek davranışı besler. |
| `packages/server/src/index.ts` | Uygulama giriş noktası (server) | Backend başlatma zincirinin merkez dosyalarından biridir. |
| `packages/server/bin/run` | Başlatma komutu köprüsü | Server komutlarının CLI üzerinden çağrılmasını sağlar. |

## 3. Yardımcı Katmanlar

| Yol | Tür | Neden yardımcı olduğu |
|---|---|---|
| `docs/` | Dokümantasyon klasörü | Çalışma planları ve açıklamalar içerir; runtime omurgası değildir. |
| `ops/` | Operasyonel notlar | Deploy rehberleri içerir; uygulama kodu değildir. |
| `metrics/` | Gözlemleme yapılandırmaları | Prometheus/Grafana/OTEL desteği sağlar; çekirdek akışın üst katmanıdır. |
| `docker/` | Docker yardımcı dosyaları | Alternatif container senaryoları sağlar. |
| `render-kopru-paneli/` | Ayrı panel/yardımcı yüzey | Ana Flowise omurgasından ayrı bir alt proje yapısıdır. |
| `i18n/` | Çeviri dökümanları | Bilgilendirme amaçlıdır, çalışma omurgası değildir. |
| `assets/`, `images/` | Görsel içerik | Dokümantasyon/arayüz destek varlıklarıdır. |
| `.github/workflows/` | CI otomasyonları | Depo kalite/doğrulama hattıdır; runtime iş mantığı değildir. |

## 4. Dosya Türlerine Göre Açıklama

### MD dosyaları ne işe yarıyor?
- Repo anlatımı, katkı ve güvenlik belgeleri için kullanılır.
- Gerçek örnekler: `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `DEPLOY_RENDER.md`, `ops/render-deploy.md`.

### YAML/YML dosyaları ne işe yarıyor?
- Deploy blueprint, CI workflow, compose ve gözlemleme yapılandırmalarını taşır.
- Gerçek örnekler: `render.yaml`, `render.safe.yaml`, `.github/workflows/*.yml`, `docker/docker-compose.yml`, `metrics/otel/otel.config.yml`.

### Service dosyaları ne işe yarıyor?
- İş mantığı ve dış sistem etkileşimlerini içerir.
- Gerçek örnekler: `render-kopru-paneli/backend/src/services/renderService.js`, `render-kopru-paneli/backend/src/services/githubService.js`, `packages/server/src/utils/*`, `packages/components/nodes/*`.

### Config dosyaları ne işe yarıyor?
- Build, workspace, paket ve araç ayarlarını belirler.
- Gerçek örnekler: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `packages/ui/vite.config.js`, `packages/server/tsconfig.json`.

### Build/deploy dosyaları ne işe yarıyor?
- Container imajı, deploy komutu ve ortam başlangıcını tanımlar.
- Gerçek örnekler: `Dockerfile`, `Dockerfile.render`, `Dockerfile.render.blueprint`, `scripts/render-start.sh`, `render.yaml`.

### Entry point dosyaları ne işe yarıyor?
- Uygulamayı fiilen başlatan giriş noktalarıdır.
- Gerçek örnekler: `packages/server/src/index.ts`, `packages/server/bin/run`, `packages/ui/src/index.jsx`, `scripts/render-start.js`, `scripts/render-start.sh`.

## 5. Acemi İçin Okuma Sırası
1. `README.md` — Repo amacını ve genel yapıyı gör.
2. `package.json` — Hangi komutlarla build/start yapıldığını öğren.
3. `pnpm-workspace.yaml` + `turbo.json` — Monorepo paket ilişkisini gör.
4. `packages/server/src/index.ts` + `packages/server/bin/run` — Backend nasıl ayağa kalkıyor gör.
5. `packages/server/src/routes/` — API yüzeyini somut olarak gör.
6. `packages/server/src/DataSource.ts` + `packages/server/src/database/` — Veri katmanını anla.
7. `packages/ui/src/index.jsx` + `packages/ui/src/routes/` — Frontend giriş ve rota akışını gör.
8. `render.yaml` + `Dockerfile.render.blueprint` + `scripts/render-start.sh` — Render deploy zincirini öğren.
9. `ops/render-deploy.md` + `DEPLOY_RENDER.md` — Operasyonel çalışma notlarını oku.

## 6. Net Hüküm
Bu repo, gerçek dizin yapısına göre yüzde seksen ihtimalle en çok **uygulama kodu + servis mantığı** katmanına yaslanıyor; ikinci güçlü katman **config/deploy** katmanıdır. Bu hüküm `packages/server`, `packages/ui`, `packages/components` yoğunluğu ile kökteki `package.json`, `render.yaml`, `Dockerfile*` dosya ailesine dayanır.
