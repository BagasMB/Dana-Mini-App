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
  },
  openActivateeSIM() {
    my.navigateTo({ url: '/pages/activate-eSIM/activate-eSIM'})
  },
  openTopUp() {
    my.navigateTo({ url: '/pages/top-up/top-up'})
  },
  onLoad() {},
});
