# Kullanım Rehberi

## İlk açılış
- `https://<backend>.onrender.com/` panel ekranını açar.
- `https://<backend>.onrender.com/api` adresi endpoint listesi döner (boş ekran değildir).
1. Frontend linkini aç.
2. Gerekirse backend API adresini üstteki alana gir ve kaydet.
3. Önce **Bağlantıyı Kontrol Et** ile doğrula.

## Buton-Endpoint eşleşmesi
- Bağlantıyı Kontrol Et → `GET /api/health`
- Servis Bilgilerini Getir → `GET /api/render/service`
- Durumu Yenile → `GET /api/summary`
- Log Özetini Getir → `GET /api/render/logs`
- Yeniden Deploy Başlat → `POST /api/render/redeploy`
- Servisi Yeniden Başlat → `POST /api/render/restart`
- GitHub Son Durumu Getir → `GET /api/github/summary`
- Ortam Değişkeni Adlarını Göster → `GET /api/render/env-names`
- Kopyalanabilir Durum Özeti Oluştur → Paneldeki güncel metinleri panoya kopyalar

## Hata davranışı
- Kullanıcıya sade Türkçe hata gösterilir.
- Teknik detay backend logunda kalır.
- Summary endpoint bir parça hata verse bile diğer kartlar yüklenmeye devam eder.
