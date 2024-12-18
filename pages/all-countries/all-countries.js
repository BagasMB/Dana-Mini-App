import translations from '/data/translations';

Page({
  data: {
    tabs: [],
    activeTab: 0, // Default tab
    groupedCountries: [
      {
        letter: "A",
        countries: [
          { name: "Afghanistan", icon: "/assets/countries/afghanistan.png", type: "Country" },
          { name: "Albania", icon: "/assets/countries/albania.png", type: "Country" },
          { name: "Algeria", icon: "/assets/countries/algeria.png", type: "Country" },
          { name: "Asia", icon: "/assets/countries/asia.png", type: "Regions" }, 
          { name: "America", icon: "/assets/countries/america.png", type: "Regions" },
          { name: "Australia", icon: "/assets/countries/australia.png", type: "Regions" },
          { name: "Africa", icon: "/assets/countries/africa.png", type: "Regions" },
        ],
      },
      {
        letter: "B",
        countries: [
          { name: "Bahamas", icon: "/assets/countries/bahamas.png", type: "Country" },
          { name: "Bahrain", icon: "/assets/countries/bahrain.png", type: "Country" },
          { name: "Bangladesh", icon: "/assets/countries/bangladesh.png", type: "Country" },
        ],
      },
      {
        letter: "C",
        countries: [
          { name: "Canada", icon: "/assets/countries/canada.png", type: "Country" },
          { name: "Cambodia", icon: "/assets/countries/cambodia.png", type: "Country" },
          { name: "China", icon: "/assets/countries/china.png", type: "Country" },
        ],
      },
      {
        letter: "D",
        countries: [
          { name: "Denmark", icon: "/assets/countries/denmark.png", type: "Country" },
          { name: "Djibouti", icon: "/assets/countries/djibouti.png", type: "Country" },
          { name: "Dominica", icon: "/assets/countries/dominica.png", type: "Country" },
        ],
      },
      {
        letter: "E",
        countries: [
          { name: "Ecuador", icon: "/assets/countries/ecuador.png", type: "Country" },
          { name: "Egypt", icon: "/assets/countries/egypt.png", type: "Country" },
          { name: "Europe", icon: "/assets/countries/europe.png", type: "Regions" },
        ],
      },
      {
        letter: "F",
        countries: [
          { name: "Finland", icon: "/assets/countries/finland.png", type: "Country" },
          { name: "Fiji", icon: "/assets/countries/fiji.png", type: "Country" },
          { name: "France", icon: "/assets/countries/france.png", type: "Country" },
        ],
      },
      {
        letter: "G",
        countries: [
          { name: "Gabon", icon: "/assets/countries/gabon.png", type: "Country" },
          { name: "Gambia", icon: "/assets/countries/gambia.png", type: "Country" },
          { name: "Global", icon: "/assets/icons/global.svg", type: "Global" },
        ],
      },
    ],
    filteredCountries: [],
    selectedLanguageIndex: 0,
    translations,
    allcountryContent: {},
    languages: ['Indonesia', 'English'],
  },
  
  home(){
    my.navigateTo({ url: '/pages/index/index'});
  },

  openSearch() {
    my.navigateTo({ url: '/pages/search/search'});
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
    this.dialogSettingRef = ref;
  },

  showDialogSetting() {
    this.dialogSettingRef.show();
  },

  closeDialogSetting() {
    this.dialogSettingRef.hide();
  },

  // Saat halaman pertama kali dimuat
  onLoad() {
    const savedLanguageIndex = my.getStorageSync({ key: 'languageIndex' }).data;
  
    const languageIndex = savedLanguageIndex !== undefined ? savedLanguageIndex : 0;
  
    this.setData({  selectedLanguageIndex: languageIndex });
  
    this.updateContent(languageIndex);
    this.updateTabs(languageIndex);
    this.filterCountriesByTab();
  },
  

  onLanguageChange(e) {
    const newLanguageIndex = e.detail.value;
    my.setStorageSync({
      key: 'languageIndex',
      data: newLanguageIndex,
    });
    this.setData({
      selectedLanguageIndex: newLanguageIndex,
    });

    // Perbarui konten sesuai bahasa yang dipilih
    this.updateContent(newLanguageIndex);
    this.updateTabs(newLanguageIndex);
  },

  updateTabs(languageIndex) {
    const selectedLang = languageIndex === 0 ? 'id' : 'en';
    const tabs = this.data.translations[0].tabs[selectedLang];
    this.setData({ tabs });
  },

  // Perbarui konten berdasarkan bahasa
  updateContent(languageIndex) {
    const selectedLang = languageIndex === 0 ? 'id' : 'en';
    this.setData({
      allcountryContent: this.data.translations[0].allcountry[selectedLang],
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

  // Mengganti tab dan memfilter data
  changeTab(e) {
    const { tab } = e.currentTarget.dataset;
    const activeTab = parseInt(tab, 10);
    this.setData({ activeTab }, () => {
      this.filterCountriesByTab();
    });
  },

  // Memfilter negara berdasarkan tipe data
  filterCountriesByTab() {
    const { activeTab, groupedCountries } = this.data;
    let filteredCountries = [];

    if (activeTab === 0) {
      // Tab "Countries" (Default)
      filteredCountries = groupedCountries.map((group) => ({
        ...group,
        countries: group.countries.filter((country) => country.type === "Country"),
      }));
    } else if (activeTab === 1) {
      // Tab "Regions"
      filteredCountries = groupedCountries.map((group) => ({
        ...group,
        countries: group.countries.filter((country) => country.type === "Regions"),
      }));
    } else if (activeTab === 2) {
      // Tab "Global"
      filteredCountries = groupedCountries.map((group) => ({
        ...group,
        countries: group.countries.filter((country) => country.type === "Global"),
      }));
    }

    // Menghapus grup kosong
    filteredCountries = filteredCountries.filter((group) => group.countries.length > 0);

    this.setData({ filteredCountries });
  },
});