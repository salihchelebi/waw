# NİHAİ DEPLOY PLANI — WAW / RENDER / MİNİMAL FLOWISE

## 1. Nihai karar
- **Birincil deploy hattı:** `render.yaml` + `Dockerfile.render.blueprint` + `scripts/render-start.sh` + root `package.json` (`pnpm start`).
- **Seçim nedeni:** Bu hat tek yerde disk mount, health check ve docker command zincirini birlikte tanımlıyor; hızlı UI görünürlüğü için en kısa runtime yolunu veriyor.
- **Diğer hattın primary olmama nedeni:** `render.safe.yaml` + `Dockerfile.render.safe` hattı daha geniş env yüzeyi ve alternatif başlangıç kurgusu içeriyor; fallback için uygun ama minimal birincil hat kadar sade değil.

## 2. Hedef
1. Container ayağa kalksın.
2. `/api/v1/ping` sağlıklı dönsün.
3. UI görülsün.
4. Worker/metrics/panel gibi ikinci aşama bileşenler sonradan ele alınsın.

## 3. Birincil deploy zinciri
- **YAML:** `render.yaml`
- **Dockerfile:** `Dockerfile.render.blueprint`
- **Start script:** `scripts/render-start.sh`
- **Komut zinciri:** Render `dockerCommand` => `sh scripts/render-start.sh` => `pnpm start` => root start zinciri (`packages/server/bin/run start`)

## 4. Zorunlu dosya seti
- `render.yaml` — Render servis tanımı, health check, disk mount, docker command.
- `Dockerfile.render.blueprint` — Node 20 + pnpm 10.26.0 ile build/runtime hattı.
- `scripts/render-start.sh` — yazılabilir storage path garantisi.
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `turbo.json` — çalışma ve build bağımlılık omurgası.
- `packages/server/**` — server ve API runtime omurgası.
- `packages/ui/**` — arayüzün build/servis katmanı.
- `packages/components/**` — Flowise node/iş mantığı bağımlılıkları.

## 5. Şimdilik dokunulmayacak ama çekirdek olmayan yapılar
- `metrics/**`
- `docker/worker/**`
- `render-kopru-paneli/**`
- `packages/agentflow/examples/**`
- Demo/example/telemetry/worker yüzeyleri

Karar: Bu klasörler **şimdilik silinmeyecek**, ikinci aşama kapsamında değerlendirilecek.

## 6. Minimum Render ayarları
- runtime: `docker`
- docker context: `.`
- dockerfile path: `./Dockerfile.render.blueprint`
- docker command: `sh scripts/render-start.sh`
- health check path: `/api/v1/ping`
- disk mount: `/var/data` (kalıcı yazma için gerekli)
- storage path: `FLOWISE_FILE_STORAGE_PATH=/var/data/.flowise`
- port: `PORT` env (Render tarafından sağlanır, app tarafından kullanılmalı)

## 7. Minimum env yaklaşımı
### Kesin gerekli
- `FLOWISE_FILE_STORAGE_PATH` (disk mount ile eşleşmeli)
- `PORT` (Render web service portu)

### Opsiyonel / doğrulanmalı
- `DATABASE_URL` (harici DB kullanılacaksa)
- sqlite fallback (DATABASE_URL yoksa sqlite yolu DataSource ve storage ile çalışır)
- disk mount ihtiyacı (kalıcılık isteniyorsa zorunlu, geçici kullanımda `/tmp` fallback mümkün)

## 8. Patch planı
Bu turda minimum risk için yalnızca plan dosyası eklenecek:
- `nihai-deploy-plani.md` oluşturuldu.
- Deploy hattı dosyalarında ek değişiklik yapılmadı; mevcut birincil zincir tutarlı.

## 9. Yapılmaması gerekenler
- Büyük refactor yapma.
- Worker/metrics temizliğine şimdi girme.
- Ana uygulama katmanını parçalama.
- Birincil deploy hattı doğrulanmadan ikinci aşama işleri açma.

## 10. Doğrulama planı
1. Node/pnpm sürüm uyumunu doğrula (`package.json` engines ile).
2. `pnpm build` çalıştır.
3. Docker image build doğrulaması yap.
4. Render health check yolu `/api/v1/ping` doğrula.
5. Root UI görünürlüğünü doğrula.
6. Başarısızsa fallback: `render.safe.yaml` + `Dockerfile.render.safe` hattını devreye al.

## 11. Nihai hüküm
Sistem, mevcut dosya yapısına göre Render deploy’a yakındır; en hızlı görünür sonuç için `render.yaml` + `Dockerfile.render.blueprint` + `scripts/render-start.sh` hattı korunmalıdır. Worker/metrics/panel/example katmanları şimdi değil, çekirdek hat stabil olduktan sonra ikinci aşamada ele alınmalıdır.
