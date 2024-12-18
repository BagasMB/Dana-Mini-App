import translations from '/data/translations'

Page({
  data: {
    selectedLanguageIndex: 0, // Default ke bahasa Indonesia
    translations,
    // Konten yang ditampilkan
    content: {},
  },

  // Pada halaman dimuat
  onLoad() {
    const savedLanguageIndex = my.getStorageSync({ key: 'languageIndex' }).data;
    const languageIndex = savedLanguageIndex !== undefined ? savedLanguageIndex : 0;

    // Atur bahasa default
    this.setData({ selectedLanguageIndex: languageIndex });

    // Render konten sesuai bahasa
    this.updateContent(languageIndex);
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
