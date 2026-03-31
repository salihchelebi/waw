# Render hizlandirma plani

Bu belge WAW icin Render + GitHub tarafinda uygulanan ve hedeflenen hizlandirma noktalarini toplar.

## Uygulanan kod tarafi noktalar

1. Ayrı blueprint dosyasi eklendi.
2. Blueprint repo root'a sabitlendi.
3. Runtime docker olarak korundu; migration riski artirilmadi.
4. Blueprint dockerfile path yeni hizli dosyaya alindi.
5. Health check path sabitlendi.
6. Auto deploy tetigi commit'e baglandi.
7. Frankfurt region blueprint'e yazildi.
8. Branch main olarak sabitlendi.
9. Dependency cache icin manifest-once kopyalama uygulandi.
10. Root manifest ayri kopyalandi.
11. Workspace manifestleri ayri kopyalandi.
12. pnpm lock dosyasi install katmanina alindi.
13. turbo.json install katmanina alindi.
14. pnpm surumu corepack ile sabitlendi.
15. npm install -g pnpm adimi kaldirildi.
16. apk update kaldirildi.
17. Tek apk add --no-cache kullanildi.
18. curl paket ihtiyaci kaldirildi.
19. Recursive chown kaldirildi.
20. HUSKY=0 ile gereksiz hook calismasi kapatildi.
21. CI=true ile daha deterministik build hedeflendi.
22. PUPPETEER indirme adimi kapatildi.
23. Chromium yolu acikca sabitlendi.
24. NODE_OPTIONS bellek limiti korunup sabitlendi.
25. Source copy, dependency install sonrasina tasindi.
26. pnpm install frozen lockfile ile sabitlendi.
27. prefer-offline ile ag tekrarlarinin etkisi azaltildi.
28. build sonrasi pnpm store prune eklendi.
29. Ayrı GitHub Actions dogrulama akisi eklendi.
30. GitHub->Render koprusu icin blueprint tabanli tek kaynak gercek olusturuldu.

## Platform bagli ama kod altyapisi hazir noktalar

1. Render tarafinda yeni Blueprint instance bu dosyadan yaratilabilir.
2. Blueprint kullanildiginda servis ayarlari repo ile drift etmez.
3. Commit tabanli deploy akisinda manuel menuler daha az gerekir.
4. Render service yeniden olusturmada ayni ayarlar koddan geri gelir.
5. Dockerfile secimi UI yerine repo dosyasindan kontrol edilir.
6. Gelecekte deploy hook eklenirse GitHub workflow ile kolay baglanir.
7. Disk ve env standardizasyonu blueprint uzerinden tasinabilir.
8. Free plan cold start'i kodla tamamen bitmez; plan kaynakli kalir.

## Not

Free plan cold start ayri problemdir. Bu belge daha cok build/deploy suresini ve tekrar kurulabilirligi hizlandirmak icin tutulur.
