const config = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    basename: '',
    defaultPath: '/chatflows',
    // [TALİMAT NO: 2 | TALİMAT ADI: MİNİMAL DEPLOY UI HEDEFİNİ SADECE ROOT VE CHATFLOWS SHELL OLARAK SABİTLE] Bu açıklama, ikinci daraltma turundaki UI hedefinin root ve chatflows shell ile sınırlandığını gösterir.
    minimalDeployMode: true,
    // You can specify multiple fallback fonts
    fontFamily: `'Inter', 'Roboto', 'Arial', sans-serif`,
    borderRadius: 12
}

export default config
