Page({
  data: {
    search: "",
    filteredData: [],
    isSearching: false,
    dataNegara: [
      { name: "Afghanistan", icon: "/assets/countries/afghanistan.png", type: "Asia" },
      { name: "Albania", icon: "/assets/countries/albania.png", type: "Europe" },
      { name: "Algeria", icon: "/assets/countries/algeria.png", type: "Africa" },
      { name: "Bahamas", icon: "/assets/countries/bahamas.png", type: "America" },
      { name: "Bahrain", icon: "/assets/countries/bahrain.png", type: "Asia" },
      { name: "Bangladesh", icon: "/assets/countries/bangladesh.png", type: "Asia" },
      { name: "Canada", icon: "/assets/countries/canada.png", type: "America" },
      { name: "Cambodia", icon: "/assets/countries/cambodia.png", type: "Asia" },
      { name: "China", icon: "/assets/countries/china.png", type: "Asia" },
      { name: "Denmark", icon: "/assets/countries/denmark.png", type: "Europe" },
      { name: "Djibouti", icon: "/assets/countries/djibouti.png", type: "Africa" },
      { name: "Dominica", icon: "/assets/countries/dominica.png", type: "America" },
      { name: "Ecuador", icon: "/assets/countries/ecuador.png", type: "America" },
      { name: "Egypt", icon: "/assets/countries/egypt.png", type: "Africa" },
      { name: "Finland", icon: "/assets/countries/finland.png", type: "Europe" },
      { name: "Fiji", icon: "/assets/countries/fiji.png", type: "Australia" },
      { name: "France", icon: "/assets/countries/france.png", type: "Europe" },
      { name: "Gabon", icon: "/assets/countries/gabon.png", type: "Africa" },
      { name: "Gambia", icon: "/assets/countries/gambia.png", type: "Africa" },
    ],
    dataBenua: [
      { name: "Europe", type: "Continent", icon: "/assets/countries/europe.svg" },
      { name: "Asia", type: "Continent", icon: "/assets/countries/asia.png" },
      { name: "America", type: "Continent", icon: "/assets/countries/america.png" },
      { name: "Australia", type: "Continent", icon: "/assets/countries/australia.png" },
      { name: "Africa", type: "Continent", icon: "/assets/countries/africa.png" },
    ],
    dataGlobal: { name: "Global", type: "Global", icon: "/assets/countries/global.svg" },
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

  handleSearch(e) {
    const query = e.detail.value.toLowerCase(); 
    const isSearching = query.length > 0;
    this.setData({ search: e.detail.value, isSearching });

    if (query.length < 3) {
      this.setData({ filteredData: [] });
      return;
    }

    const matchingCountries = this.data.dataNegara.filter((country) =>
      country.name.toLowerCase().startsWith(query)
    );

    const matchingContinents = this.data.dataBenua.filter((continent) =>
    continent.name.toLowerCase().startsWith(query)
    );

    // Searching Global
    if (query === "global") {
      this.setData({ filteredData: [this.data.dataGlobal] });
      return;
    }

    // Searching Continent
    if (matchingContinents.length > 0) {
      this.setData({
        filteredData: [...matchingContinents, this.data.dataGlobal],
      });
      return;
    }

    // Searching Countries and Continent
    if (matchingCountries.length > 0) {
      const matchingCountriesNames = matchingCountries.map((country) => country.type);
      const relatedContinents = this.data.dataBenua.filter((continent) =>
        matchingCountriesNames.includes(continent.name)
      );

      this.setData({
        filteredData: [...matchingCountries, ...relatedContinents, this.data.dataGlobal],
      });
      return;
    }

    this.setData({ filteredData: [] });
  },
});
