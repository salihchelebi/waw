# Render deploy (Flowise server only)

## Root cause
Render'da `/opt/render/project/src` yazılabilir olmadığı durumlarda Flowise storage bootstrap adımında boot zinciri kırılabiliyor.

## Wrapper neden var?
`scripts/render-start.sh`, storage path'i disk mount'a yönlendirip yoksa geçici `/tmp` fallback'i ile süreci başlatır. Böylece yazma işlemleri uygulama başlamadan önce güvenli path'e alınır.

## `/var/data` neden kullanılıyor?
Render disk mount kalıcıdır. `FLOWISE_FILE_STORAGE_PATH=/var/data/.flowise` ile dosya tabanlı state deploy'lar arasında korunur.

## Disk yoksa ne olur?
Fallback olarak `/tmp/.flowise` kullanılır; bu yol ephemeral'dır ve restart/deploy sonrası veri kalıcılığı garanti edilmez.

## Runtime pin notu
Storage fix doğru olsa bile runtime Node/pnpm sürümleri repo engines ile uyumlu değilse boot zinciri durur. Docker image tarafında Node 20 ve pnpm 10.26.0 pin'i korunmalıdır.
