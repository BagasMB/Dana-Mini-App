Page({
  data: {
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

  openSearch() {
    my.navigateTo({ url: '/pages/search/search'});
  },
  
  allCountries(){
    my.navigateTo({ url:'/pages/all-countries/all-countries' });
  },

  handleTapIconOutterRight () {
    console.log('Tap icon outter right')
  },

  abouteSIM(){
    my.navigateTo({
      url: '../E-SIM-info/E-SIM-info',
    });
  },

  onLoad(query) {
    // Page load
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.setData({ providersSearchResult: this.data.providers })
  },

  onShareAppMessage() {
    // Back to custom sharing information
    return {
      title: 'DANA Mini Program Template',
      desc: 'DANA Mini Program tempalate',
      path: 'pages/index/index',
    };
  },

  onSearchInput(e)  {
    const searchKey = e.detail.value || ''
    const lowerCaseSearchKey = searchKey.toLowerCase()
    const filtered = this.data.providers.filter(provider => {
      const lowerCaseProviderName = provider.name.toLowerCase()
      if (lowerCaseProviderName.indexOf(lowerCaseSearchKey) !== -1) {
        return provider
      }
    })
    if (searchKey) {
      this.setData({ 
        providersSearchResult: filtered,
        isSearch: true,
      })
    } else {
      this.setData({
        providersSearchResult: this.data.providers,
        isSearch: false,
      })
    }
  },
});