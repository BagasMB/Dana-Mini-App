Page({
  data: {
    isValid: false
  },

  onViewDestinations() {
    my.navigateTo({
      url: '/pages/all-countries/all-countries',
    });
  },
});