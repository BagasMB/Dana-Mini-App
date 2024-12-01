Page({
  data: {
    plans: [
      { data: "Austria 1GB", duration: "7 Days", price: "Rp4.00", topup: "Top Up for Rp.4.00" },
      { data: "Austria 5GB", duration: "7 Days", price: "Rp5.00", topup: "Top Up for Rp.5.00" },
      { data: "Austria 7GB", duration: "7 Days", price: "Rp7.00", topup: "Top Up for Rp.7.00" },
      { data: "Austria 10GB", duration: "7 Days", price: "Rp10.00", topup: "Top Up for Rp.10.00" },
      { data: "Austria 25GB", duration: "7 Days", price: "Rp25.00", topup: "Top Up for Rp.25.00" },
      { data: "Austria 50GB", duration: "7 Days", price: "Rp50.00", topup: "Top Up for Rp.50.00" },
    ],
    groupedCountries: [
      {
        countries: [
          { name: "Austria", icon: "/assets/countries/austria.png" },
        ],
      },
    ],
    activeCountry: null,
  },

  onLoad() {
    // Ambil nama negara pertama dari groupedCountries
    let firstCountry = null;
    if (
      this.data.groupedCountries &&
      this.data.groupedCountries.length > 0 &&
      this.data.groupedCountries[0].countries &&
      this.data.groupedCountries[0].countries.length > 0
    ) {
      firstCountry = this.data.groupedCountries[0].countries[0].name;
    }

    this.setData({
      activeCountry: firstCountry,
    });
  },

  onTap() {
    my.navigateTo({ url: "/pages/history/history" });
  },

  toggleDropdown(e) {
    const countryName = e.currentTarget.dataset.name;
    // Jika negara yang sama ditekan lagi, tutup dropdown
    this.setData({
      activeCountry: this.data.activeCountry === countryName ? null : countryName,
    });
  },
});
