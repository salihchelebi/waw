# WAW Repo Haritası — Flowise Minimal Çalışan Çekirdek (Render)

> Bu belge sadece **waw** reposu için hazırlanmıştır. Hedef: Render üzerinde Flowise server'ın minimal ve sürdürülebilir şekilde ayağa kalkmasıdır.

## 1) Repo kısa özeti
- Bu repo monorepo yapıdadır: `packages/server` (Flowise backend), `packages/ui` (Flowise frontend), `packages/components` (node/credential/runtime bileşenleri), `packages/api-documentation`, `packages/agentflow`.
- Render için fiili giriş zinciri: `render.yaml` + `Dockerfile.render.blueprint` + `scripts/render-start.sh` + root `package.json` start script zinciri.
- `render-kopru-paneli`, `metrics`, `docker/worker`, `artillery-load-test.yml` ve çoklu i18n dokümanları minimal v1 çekirdeği için zorunlu değildir.

## 2) Katman bazlı repo haritası

| Katman | Ana yol(lar) | Etiket | Neden | Render etkisi |
|---|---|---|---|---|
| Frontend çekirdeği | `packages/ui/src`, `packages/ui/public` | ÇEKİRDEK | Flowise web arayüzü buradan servis edilir. | Build süresi ve image boyutunu belirler. |
| Backend çekirdeği | `packages/server/src/index.ts`, `packages/server/src/commands/start.ts`, `packages/server/bin/run` | ÇEKİRDEK | API sunucusu ve boot zinciri buradadır. | Runtime başarısını doğrudan belirler. |
| API route katmanı | `packages/server/src/routes/*` | ÇEKİRDEK (seçilmiş alt küme), ERTELENEBİLİR (ileri endpointler) | Ping + chatflow + prediction + files + authsız temel route'lar zorunludur. | Route fazlalığı cold-start ve bakım yükünü artırır. |
| Veritabanı erişim katmanı | `packages/server/src/DataSource.ts`, `packages/server/src/database/entities`, `packages/server/src/database/migrations/*` | ÇEKİRDEK (sqlite taban), ERTELENEBİLİR (tam migration geçmişi) | Temel persistans gerekir; tüm migration geçmişi ilk v1 için şart değildir. | DB seçimi deploy riskini belirler. |
| Model/flow çalışma katmanı | `packages/components/src`, `packages/server/src/utils/buildChatflow.ts`, `NodesPool.ts` | ÇEKİRDEK | Flow çalıştırma motoru burada. | Eksik olursa Flowise ana işlev çalışmaz. |
| Auth/kullanıcı | `packages/server/src/routes/apikey`, `verify`, `credentials` | ERTELENEBİLİR | Minimal iç kullanımda basit erişim yeterlidir. | Karmaşık auth zinciri runtime riskini artırır. |
| Queue/worker | `packages/server/src/queue/*`, `packages/server/src/commands/worker.ts`, `docker/worker/*` | DIŞLANABİLİR (v1) | Senkron temel kullanım worker olmadan çalışır. | Redis/ek servis bağımlılıklarını kaldırır. |
| Entegrasyonlar | Çoklu provider credential dosyaları, marketplace JSON'ları | ERTELENEBİLİR | Temel demo için sınırlı provider seti yeterlidir. | Build/lint yüzeyini büyütür. |
| Admin/debug/analytics/telemetry | `metrics/*`, server metrics modülleri, `render-kopru-paneli/*` | DIŞLANABİLİR (v1) | İşletimsel gözlem katmanı çekirdek çalışmayı engellemez. | İlk deploy karmaşıklığını düşürür. |
| Test/script/build yardımcıları | `cypress`, `artillery`, bazı docs/scripts | ERTELENEBİLİR | Üretim runtime için zorunlu değildir. | CI süresi ve bakım yükünü azaltır. |

### DELILX Kod İçi Yorum Delili
`[TALİMAT NO: 2 | TALİMAT ADI: REPOYU KATMAN BAZLI HARİTALA VE SINIFLANDIR] Bu açıklama, ilgili bileşenin çekirdek veya dışlanabilir olarak DELILX kapsamında sınıflandırıldığını gösterir.`

## 3) Flowise minimal ihtiyaçları
Flowise'ın Render üzerinde açılması için kesin zorunlu zincir:
1. Node 20 + pnpm 10.26.0 ile uyumlu build/runtime.
2. Sunucu entrypoint (`packages/server` start zinciri).
3. UI build çıktısının servis edilmesi (`packages/ui` derleme zinciri).
4. Persistans için en az sqlite veya doğru `DATABASE_URL` ile tek bir DB yolu.
5. Yazılabilir storage path (`FLOWISE_FILE_STORAGE_PATH`) ve Render disk mount.
6. `PORT` üzerinden bind edilen HTTP sunucu.

### DELILX Kod İçi Yorum Delili
`[TALİMAT NO: 1 | TALİMAT ADI: FLOWISE İÇİN MİNİMAL ÇALIŞAN ÇEKİRDEK KAPSAMI ÇIKAR] Bu bölüm, minimal çekirdeğe dahil edilen zorunlu yapıların DELILX kapsamında ayrıldığını gösterir.`

## 4) Frontend için seçilecek çekirdek parçalar
**Seç (ÇEKİRDEK):**
- `packages/ui/src/routes` içinden ana uygulama rotaları.
- `packages/ui/src/store` temel state ve reducer zinciri.
- `packages/ui/public` statik giriş dosyaları.

**Dışla (DIŞLANABİLİR):**
- Demo/örnek ekranlar ve agentflow example UI'ları (`packages/agentflow/examples`).

**Sonraya bırak (ERTELENEBİLİR):**
- İleri seviye UI modülleri, nadir kullanılan yönetim ekranları.

## 5) Backend için seçilecek çekirdek parçalar
**Seç (ÇEKİRDEK):**
- `packages/server/src/index.ts`, `commands/start.ts`, `bin/run`.
- Route alt kümesi: `ping`, `chatflows`, `predictions`, `nodes`, `files`, `credentials`.
- `NodesPool`, `buildChatflow`, temel utility zinciri.

**Dışla (DIŞLANABİLİR):**
- `queue/*`, `commands/worker.ts` (v1 için).
- `render-kopru-paneli/backend/*` (Flowise runtime dışı).

**Sonraya bırak (ERTELENEBİLİR):**
- `openai-assistants*`, `agentflowv2-generator`, ileri analiz/evaluation route'ları.

## 6) Veritabanı için zorunlu / ertelenebilir parçalar
- **ZORUNLU:** `DataSource.ts`, entity seti, tek bir aktif DB stratejisi.
- **ERTELENEBİLİR:** Çoklu DB motorlarına ait tüm migration geçmişini ilk aşamada tam taşımak.
- **DIŞLANABİLİR (v1):** Enterprise DB katmanı (`packages/server/src/enterprise/*`) eğer ürün hedefi open-source çekirdekse.

## 7) Render deploy için tutulacak minimum dosya seti

### ZORUNLU DOSYA SETİ
- `render.yaml`
- `Dockerfile.render.blueprint`
- `scripts/render-start.sh`
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `turbo.json`
- `packages/server/**` (çekirdek route + datasource + commands)
- `packages/ui/**` (çekirdek UI)
- `packages/components/**` (flow runtime bağımlılıkları)

### Deploy dışı bırakılacak (v1)
- `render-kopru-paneli/**`
- `metrics/**`
- `docker/worker/**`
- `artillery-load-test.yml`
- `packages/agentflow/examples/**`

### İkinci aşamada geri alınacak
- İleri gözlemlenebilirlik (`metrics/*`)
- Queue/worker katmanı
- Enterprise/auth genişletmeleri
- Ek provider/marketplace paketleri

### DELILX Kod İçi Yorum Delili
`[TALİMAT NO: 3 | TALİMAT ADI: RENDER DEPLOY İÇİN MİNİMUM GEREKLİ DOSYA SETİNİ BELİRLE] Bu açıklama, deploy için zorunlu dosya zincirinin DELILX kapsamında ayrıldığını gösterir.`

## 8) Dışlanacak parçalar
- `render-kopru-paneli/*`: Flowise çekirdek runtime'ın parçası değildir.
- `metrics/*`: İlk boot için zorunlu değildir.
- `docker/worker/*`: Worker bağımlılıkları v1 kapsamı dışındadır.
- `packages/agentflow/examples/*`: Örnek/demo yüzeyidir.

## 9) İkinci aşamada eklenecek parçalar
- Worker/queue altyapısı (yüksek trafik ve async iş yükleri için).
- Telemetry ve Prometheus/Grafana.
- Gelişmiş auth/enterprise katmanları.
- Geniş provider/marketplace seti.

## 10) Nihai “şunları seç / şunları dışla / şunları sonra ekle” tablosu

| Karar | Kapsam | Net hüküm |
|---|---|---|
| ŞUNLARI SEÇ | Render docker zinciri + server/core UI + datasource + storage wrapper | Minimal v1 için tutulacak çekirdek set budur. |
| ŞUNLARI DIŞLA | Panel, metrics, worker, demo/example, ikincil ops katmanları | İlk deploy riskini düşürmek için kapsam dışı kalır. |
| ŞUNLARI SONRA EKLE | Queue/worker, telemetry, enterprise/auth genişletmeleri, ileri entegrasyonlar | Stabil v1 sonrası kontrollü geri alınır. |

### FLOWISE Minimal İhtiyaç Matrisi

| İşlev | Zorunluluk | Katman | Bağlı dosya/klasör | Neden gerekli | Dışlanırsa sonuç | 2. aşama mı |
|---|---|---|---|---|---|---|
| HTTP server boot | ZORUNLU | Backend | `packages/server/src/index.ts`, `commands/start.ts` | Uygulama açılışı buradan başlar | Uygulama hiç açılmaz | Hayır |
| Flow execution | ZORUNLU | Backend+Components | `packages/components/src`, `NodesPool.ts` | Flowise ana değer önerisi | Chatflow çalışmaz | Hayır |
| UI entry | ZORUNLU | Frontend | `packages/ui/src`, `packages/ui/public` | Kullanıcı etkileşimi için şart | Sadece API kalır | Hayır |
| DB persistence (sqlite veya URL) | ZORUNLU | Database | `DataSource.ts`, entity'ler | Konfigürasyon ve geçmiş verisi | Veriler kalıcı olmaz | Hayır |
| Writable storage path | ZORUNLU | Runtime/Ops | `scripts/render-start.sh`, `FLOWISE_FILE_STORAGE_PATH` | Dosya tabanlı yazımlar için şart | Boot/write hataları | Hayır |
| Queue worker | ERTELENEBİLİR | Async | `queue/*`, `worker.ts` | Ölçekleme ve async iş | Temel kullanım devam eder | Evet |
| Telemetry/metrics | ERTELENEBİLİR | Ops | `metrics/*` | Gözlemleme | İzlenebilirlik düşer | Evet |
| Enterprise SSO/Auth genişletme | ERTELENEBİLİR | Auth | `enterprise/*` | Kurumsal gereksinim | OSS çekirdek etkilenmez | Evet |

### DELILX Kod İçi Yorum Delili
`[TALİMAT NO: 4 | TALİMAT ADI: FLOWISE MİNİMAL İHTİYAÇ MATRİSİNİ ÜRET] Bu açıklama, minimal ihtiyaç matrisindeki zorunlu alanların DELILX kapsamında işaretlendiğini gösterir.`

### DELILX Kod İçi Yorum Delili
`[TALİMAT NO: 5 | TALİMAT ADI: ŞUNLARI SEÇ ŞUNLARI DIŞLA ŞUNLARI SONRAYA BIRAK RAPORU ÜRET] Bu açıklama, nihai minimal seçim raporunun DELILX kapsamında kararlandırıldığını gösterir.`

---

## DELILX Checklist

- Talimat No: 1
  - Talimat Adı: FLOWISE İÇİN MİNİMAL ÇALIŞAN ÇEKİRDEK KAPSAMI ÇIKAR
  - Uygulanan Değişiklik: Minimal çekirdek zinciri netleştirildi.
  - Kod İçi Yorum Delili: Var (Talimat 1 DELILX satırı).
  - Kod Sonrası Doğrulama Delili: `harita.md` çekirdek zorunlu listesi.

- Talimat No: 2
  - Talimat Adı: REPOYU KATMAN BAZLI HARİTALA VE SINIFLANDIR
  - Uygulanan Değişiklik: Katman tablosu ve ÇEKİRDEK/ERTELENEBİLİR/DIŞLANABİLİR ayrımı üretildi.
  - Kod İçi Yorum Delili: Var (Talimat 2 DELILX satırı).
  - Kod Sonrası Doğrulama Delili: Katman bazlı harita tablosu.

- Talimat No: 3
  - Talimat Adı: RENDER DEPLOY İÇİN MİNİMUM GEREKLİ DOSYA SETİNİ BELİRLE
  - Uygulanan Değişiklik: Zorunlu dosya seti + dışlanacak + ikinci aşama listeleri çıkarıldı.
  - Kod İçi Yorum Delili: Var (Talimat 3 DELILX satırı).
  - Kod Sonrası Doğrulama Delili: Render minimum dosya seti bölümü.

- Talimat No: 4
  - Talimat Adı: FLOWISE MİNİMAL İHTİYAÇ MATRİSİNİ ÜRET
  - Uygulanan Değişiklik: İşlev bazlı ihtiyaç matrisi eklendi.
  - Kod İçi Yorum Delili: Var (Talimat 4 DELILX satırı).
  - Kod Sonrası Doğrulama Delili: Minimal ihtiyaç matrisi tablosu.

- Talimat No: 5
  - Talimat Adı: ŞUNLARI SEÇ ŞUNLARI DIŞLA ŞUNLARI SONRAYA BIRAK RAPORU ÜRET
  - Uygulanan Değişiklik: Nihai seçim/dışlama/sonra-ekle karar tablosu eklendi.
  - Kod İçi Yorum Delili: Var (Talimat 5 DELILX satırı).
  - Kod Sonrası Doğrulama Delili: Nihai karar tablosu.
