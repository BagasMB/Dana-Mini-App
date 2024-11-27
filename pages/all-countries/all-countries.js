Page({
  data: {
    tabs: ["Countries", "Regions", "Global"],
    activeTab: 0, // Default tab
    groupedCountries: [
      {
        letter: "A",
        countries: [
          { name: "Afghanistan", icon: "/assets/countries/afghanistan.png", type: "Country" },
          { name: "Albania", icon: "/assets/countries/albania.png", type: "Country" },
          { name: "Algeria", icon: "/assets/countries/algeria.png", type: "Country" },
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
    filteredCountries: [], // Untuk menyimpan data sesuai tab
  },
  abouteSIM(){
    my.navigateTo({
      url: '../E-SIM-info/E-SIM-info',
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

  // Saat halaman pertama kali dimuat
  onLoad() {
    this.filterCountriesByTab();
  },
});
