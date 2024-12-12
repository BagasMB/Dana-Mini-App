import translations from '/data/translations'

Page({
  data: {
    // languages: [
    //   { id: 0,  name: 'Indonesia', icon: "/assets/icons/indonesia.svg"},
    //   { id: 1,  name: 'English', icon: "/assets/icons/inggris.svg"},
    // ],
    // Bahasa yang didukung
    languages: ['Bahasa Indonesia', 'English'],
    selectedLanguageIndex: 0, // Default ke bahasa Indonesia
    translations,
    // Konten yang ditampilkan
    content: {},
  },

  // Pada halaman dimuat
  onLoad() {
    // Deteksi bahasa perangkat
    const systemLanguage = my.getSystemInfoSync().language;
    const isIndonesian = systemLanguage.startsWith('id');
    const defaultLanguage = isIndonesian ? 0 : 1; // 0 untuk Indonesia, 1 untuk Inggris

    // Atur bahasa default
    this.setData({
      selectedLanguageIndex: defaultLanguage,
    });

    // Render konten sesuai bahasa
    this.updateContent(defaultLanguage);
  },

   // Ganti bahasa saat dropdown berubah
   onLanguageChange(e) {
    const newLanguageIndex = e.detail.value;
    this.setData({
      selectedLanguageIndex: newLanguageIndex,
    });

    // Perbarui konten sesuai bahasa yang dipilih
    this.updateContent(newLanguageIndex);
  },

  // Perbarui konten berdasarkan bahasa
  updateContent(languageIndex) {
    const selectedLang = languageIndex === 0 ? 'id' : 'en';
    this.setData({
      content: this.data.translations[0].esiminfo[selectedLang],
    });
  },

  // Navigasi ke halaman lain
  onViewDestinations() {
    my.navigateTo({
      url: '/pages/all-countries/all-countries',
    });
  },
});
