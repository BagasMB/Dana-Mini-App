import translations from '/data/translations'

Page({
  data: {
    // Bahasa yang didukung
    languages: ['Indonesia', 'English'],
    selectedLanguageIndex: 0, // Default ke bahasa Indonesia
    translations,
    // Konten yang ditampilkan
    content: {},
    groupedCountries: [ 
      { name: "Kanada", icon: "/assets/countries/kanada.png", type: "Country" },
      { name: "Turkey", icon: "/assets/countries/turkey.png" , type: "Country" },
      { name: "USA", icon: "/assets/countries/usa.png", type: "Country"},
      { name: "UK", icon: "/assets/countries/uk.png" , type: "Country"},
    ],
    global: [
      { name: "Global 10 GB", icon: "/assets/icons/global.svg", type: "Global"},
      { name: "Global 5 GB", icon: "/assets/icons/global.svg", type: "Global" },
      { name: "Global 3 GB", icon: "/assets/icons/global.svg", type: "Global" },
    ],
  },

  onLoad() {
    // Cek apakah ada bahasa tersimpan di local storage
    const savedLanguageIndex = my.getStorageSync({ key: 'languageIndex' }).data;
  
    if (savedLanguageIndex !== null) {
      // Gunakan bahasa yang tersimpan
      this.setData({ selectedLanguageIndex: savedLanguageIndex });
    } else {
      // Jika tidak ada, gunakan bahasa sistem
      const systemLanguage = my.getSystemInfoSync().language;
      const isIndonesian = systemLanguage.startsWith('id');
      const newLanguageIndex = isIndonesian ? 0 : 1;
  
      this.setData({ selectedLanguageIndex: newLanguageIndex });
    }
  
    // Render konten sesuai bahasa
    this.updateContent(this.data.selectedLanguageIndex);
  },

  // Ganti bahasa saat dropdown berubah
  onLanguageChange(e) {
    const newLanguageIndex = e.detail.value;

    // Simpan bahasa ke local storage
    my.setStorageSync({
      key: 'languageIndex',
      data: newLanguageIndex,
    });
    this.setData({ selectedLanguageIndex: newLanguageIndex });

    // Perbarui konten sesuai bahasa yang dipilih
    this.updateContent(newLanguageIndex);
  },

  // Perbarui konten berdasarkan bahasa
  updateContent(languageIndex) {
    const selectedLang = languageIndex === 0 ? 'id' : 'en';
    this.setData({
      content: this.data.translations[0].ladingpage[selectedLang],
    });
  },


  onCountries(e) {
    const { country, icon, type } = e.target.dataset;
    if (country && icon && type) {
      my.navigateTo({
        url: `/pages/KR-Country/KR-Country?countryName=${country}&countryIcon=${encodeURIComponent(icon)}&countryType=${type}`,
      });
    } else {
      console.error("Data not found in the dataset.");
    }
  },


  openSearch(e) {
    const query = e.detail.value; // Ambil nilai input
    if (query.length > 0) {
      // Navigasi ke halaman pencarian dengan query sebagai parameter
      my.navigateTo({
        url: `/pages/search/search?query=${encodeURIComponent(query)}`
      });
    }
  },

  allCountries() {
    my.navigateTo({
      url: '/pages/all-countries/all-countries'
    });
  },

  handleTapIconOutterRight() {
    console.log('Tap icon outter right')
  },

  openMyESIM() {
    my.navigateTo({
      url: '/pages/history/history'
    });
  },

  abouteSIM() {
    my.navigateTo({
      url: '../E-SIM-info/E-SIM-info',
    });
  },

  saveRefDialogSetting(ref) {
    this.dialogSettingRef = ref
  },
  showDialogSetting() {
    this.dialogSettingRef.show()
  },
  closeDialogSetting() {
    this.dialogSettingRef.hide()
  },
});