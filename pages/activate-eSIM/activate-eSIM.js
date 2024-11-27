Page({
  data: {
    isExpanded: true // State to track if details are expanded
  },
  toggleExpand() {
    this.setData({
      isExpanded: !this.data.isExpanded
    });
  },
  onLoad() {},
  openManualInstall() {
    my.navigateTo({ url: '/pages/manual-install/manual-install'})
  },
});
