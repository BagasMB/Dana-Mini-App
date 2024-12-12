import translations from '/data/translations'

Page({
  data: {
    // Bahasa yang didukung
    languages: ['Bahasa Indonesia', 'English'],
    selectedLanguageIndex: 0, // Default ke bahasa Indonesia
    translations,
    // Konten yang ditampilkan
    content: {},

    groupedCountries: [
      {
        letter: "Popular Countries",
        countries: [
          { name: "Kanada", icon: "/assets/countries/kanada.png", type: "Country" },
          { name: "Turkey", icon: "/assets/countries/turkey.png" , type: "Country" },
          { name: "USA", icon: "/assets/countries/usa.png", type: "Country"},
          { name: "UK", icon: "/assets/countries/uk.png" , type: "Country"},
        ],
      },
      {
        letter: "Global eSIMS",
        countries: [
          { name: "Global 10 GB", icon: "/assets/icons/global.svg", type: "Global"},
          { name: "Global 5 GB", icon: "/assets/icons/global.svg", type: "Global" },
          { name: "Global 3 GB", icon: "/assets/icons/global.svg", type: "Global" },
        ],
      },
    ],

    select: [
      { id: 0,  name: 'Indonesia', icon: "/assets/icons/indonesia.svg"},
      { id: 1,  name: 'English', icon: "/assets/icons/inggris.svg"},
    ],
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
      content: this.data.translations[0].ladingpage[selectedLang],
    });
  },


  onCountries(e) {
    // Ambil data dari dataset
    const countryName = e.target.dataset.country;
    const countryIcon = e.target.dataset.icon;
    const countryType = e.target.dataset.type;

    if (countryName && countryIcon && countryType) {
      // Navigasi ke halaman dengan parameter
      my.navigateTo({
        url: `/pages/KR-Country/KR-Country?countryName=${countryName}&countryIcon=${encodeURIComponent(countryIcon)}&countryType=${countryType}`,
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
  
  allCountries(){
    my.navigateTo({ url:'/pages/all-countries/all-countries' });
  },

  handleTapIconOutterRight () {
    console.log('Tap icon outter right')
  },

  openMyESIM(){
    my.navigateTo({ url: '/pages/history/history'});
  },

  abouteSIM(){
    my.navigateTo({
      url: '../E-SIM-info/E-SIM-info',
    });
  },

  saveRefDialogSetting(ref) {
    this.dialogSettingRef = ref
  },
  showDialogSetting () {
    this.dialogSettingRef.show()
  },
  closeDialogSetting () {
    this.dialogSettingRef.hide()
  },
});