import translations from '/data/translations'

Page({
  data: {
    plans: [
      {
        data: "USA 5GB",
        icon: "/assets/countries/usa.png",
        duration: "7 Days",
        price: "Rp15.50",
        status: "eSIM installed but off",
        iccid: "891030000004493528",
        dataRemaining: "0 GB",
        date: "25 Feb 2022",
      },
      {
        data: "Jamaica 5GB",
        icon: "/assets/countries/jamaicaa.png",
        duration: "7 Days",
        price: "Rp15.50",
        status: "eSIM installed but off",
        iccid: "891030000004493528",
        dataRemaining: "0 GB",
        date: "25 Feb 2022",
      },
    ],

    recent: [
      {
        data: "Austria 5GB",
        icon: "/assets/countries/austria.png",
        duration: "7 Days",
        price: "Rp15.50",
        status: "eSIM installed but off",
        iccid: "891030000004493528",
        dataRemaining: "5 GB",
        date: "25 Feb 2022",
      },
    ],

    selectedLanguageIndex: 0,
    translations,
    content: {}
  },

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
      content: this.data.translations[0].history[selectedLang],
    });
  },
  
  openActivateeSIM() {
    my.navigateTo({ url: '/pages/activate-eSIM/activate-eSIM'})
  },
  openTopUp() {
    my.navigateTo({ url: '/pages/top-up/top-up'})
  },
});
