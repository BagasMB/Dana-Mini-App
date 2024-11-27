Page({
  data: {
    tabs: ["IOS", "Android", "Pixel"],
    activeTab: 0,
    iosSteps: [
      "Go to Settings",
      "Tap on Mobile or Cellular data (in some regions mobile data will be called Cellular data).",
      "Tap on Add eSIM",
      "Tap on Use QR code",
      "Tap on Enter Details Manually. (Usually located at the bottom of your screen)",
    ],
    androidSteps: [
      "Go to Settings",
      "Tap on Network & Internet",
      "Tap on Mobile Network",
      "Tap on Advanced",
      "Tap on Carrier",
      "Tap on Add Carrier",
      "Enter the SM-DP+ Address and the Activation Code",
    ],
    pixelSteps: [
      "Go to Settings",
      "Tap on Network & Internet",
      "Tap on Mobile Network",
      "Tap on Advanced",
      "Tap on SIMs",
      "Tap on Add eSIM",
      "Enter the SM-DP+ Address and the Activation Code",
    ],
    iosStepsSecond: [
      "Log into your KnowRoaming profile",
      "Tap on My eSIMs & Top Up",
      "Tap on the status of your eSIM",
      'Scroll to "How to install your eSIM" and select manual from the four options',
      "The SM-DP+ and Activation Code for your eSIM are located here",
      "Tap on Continue. Your device will connect to our services and download your eSIM profile. This might take a few minutes"
    ],
    androidStepsSecond: [
      "Log into your KnowRoaming profile",
      "Tap on My eSIMs & Top Up",
      "Tap on the status of your eSIM",
      'Scroll to "How to install your eSIM" and select manual from the four options',
      "The SM-DP+ and Activation Code for your eSIM are located here",
      "Tap on Continue. Your device will connect to our services and download your eSIM profile. This might take a few minutes"
    ],
    pixelStepsSecond: [
      "Log into your KnowRoaming profile",
      "Tap on My eSIMs & Top Up",
      "Tap on the status of your eSIM",
      'Scroll to "How to install your eSIM" and select manual from the four options',
      "The SM-DP+ and Activation Code for your eSIM are located here",
      "Tap on Continue. Your device will connect to our services and download your eSIM profile. This might take a few minutes"
    ],
  },
  changeTab(e) {
    const { tab } = e.currentTarget.dataset;
    this.setData({ activeTab: parseInt(tab, 10) });
  },
});
