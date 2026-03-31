# Kullanım Rehberi

## Butonlar
1. **Bağlantıyı Kontrol Et**: Backend ayakta mı kontrol eder.
2. **Servis Bilgilerini Getir**: Servis adı, tipi ve durum bilgisini getirir.
3. **Durumu Yenile**: Tüm kartları toplu yeniler.
4. **Log Özetini Getir**: Son loglardan kısa özet getirir.
5. **Yeniden Deploy Başlat**: Onay sonrası redeploy çağrısı yapar.
6. **Servisi Yeniden Başlat**: Onay sonrası restart çağrısı yapar.
7. **GitHub Son Durumu Getir**: Son commit, branch ve repo linkini gösterir.
8. **Ortam Değişkeni Adlarını Göster**: Sadece env adlarını listeler.
9. **Kopyalanabilir Durum Özeti Oluştur**: Ekrandaki ana bilgileri panoya kopyalar.

## Bilgiler nerede görünür?
- Bağlantı durumu: **Bağlantı Durumu** kartı
- Render verileri: **Render Servis Özeti** ve **Son Deploy Özeti** kartları
- Loglar: **Log Özeti** kartı
- GitHub: **GitHub Özeti** kartı
- Env adları: **Ortam Değişkenleri Özeti** kartı
- Son işlem sonucu: **İşlem Sonucu / Uyarı Alanı** kartı

## Hata olursa ne anlaşılmalı?
- Kullanıcıya sade Türkçe hata mesajı gösterilir.
- Teknik detaylar backend logunda kalır.
- API anahtarı veya env değerleri ön yüze yazdırılmaz.
