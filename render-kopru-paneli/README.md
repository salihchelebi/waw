# Render Köprü Paneli

Bu proje, mevcut projeden tamamen ayrı bir köprü panelidir. Ön yüzde tek sayfalık tamamen Türkçe ve acemi dostu bir HTML panel bulunur. Bu panel GitHub Pages veya Render Static Site üzerinde yayınlanır. Arka tarafta küçük bir Node.js köprü servisi Render Web Service olarak çalışır ve Render API ile GitHub verisini güvenli biçimde toplar. İlk çalışan sürümde bağlantı kontrolü, servis bilgileri, deploy özeti, log özeti, GitHub özeti, env anahtar adları, redeploy ve restart butonları bulunur.

## Ne işe yarar?
- Render servis sağlığını ve deploy özetini tek ekranda gösterir.
- GitHub son commit bilgisini özetler.
- Güvenli şekilde redeploy ve restart tetikler.
- Ortam değişkenlerinin yalnızca adlarını gösterir.

## Mimari Özeti
- `frontend/`: Düz HTML/CSS/JS tek sayfa panel.
- `backend/`: Node.js + Express köprü servisi.
- `docs/`: Kurulum ve kullanım adımları.

## Yayın Konumları
- `frontend/` → GitHub Pages veya Render Static Site
- `backend/` → Render Web Service

Detaylar için:
- `docs/KURULUM.md`
- `docs/KULLANIM.md`
