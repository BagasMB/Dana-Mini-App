import pakets from '/data/pakets'
import translations from '/data/translations'

Page({
  data: {
    countryName: '',
    countryIcon: '',
    countryType: '',
    pakets,
    buyEnabled: false,
    lastSelectedId: null,
    checked: false,
    select: [
      { id: 0,  name: 'Pilih'},
      { id: 1,  name: 'Pilih 1'},
      { id: 2,  name: 'Pilih 2'},
    ],
    selectedLanguageIndex: 0, // Default ke bahasa Indonesia
    translations,
    // Konten yang ditampilkan
    content: {}
  },

  openHistoryESIM(){
    my.navigateTo({
      url: '/pages/history/history',
    });
  },

  onCheckboxChange(e) {
    this.setData({
      isValid: e.detail.value.includes('accepted')
    });
  },

  openBuyESIM() {
    if (this.data.buyEnabled) {
      // dd.showToast({ content: 'eSIM purchased!', type: 'success' });
      this.payment.show();
    }
  },

  saveBuyESIM(ref) {
    this.payment = ref
  },

  
  closeBuyESIM() {
    this.payment.hide()
  },
  
  saveSuccessBuyESIM(ref){
    this.success = ref
  },
  
  successBuyESIM() {
    this.payment.hide();
    this.success.show();
  },

  closeSuccessBuyESIM() {
    this.success.hide()
  },

  onLoad(query) {
    const savedLanguageIndex = my.getStorageSync({ key: 'languageIndex' }).data;
    const languageIndex = savedLanguageIndex !== undefined ? savedLanguageIndex : 0;

    // Atur bahasa default
    this.setData({
      selectedLanguageIndex: languageIndex,
      countryName: query.countryName, 
      countryIcon:query.countryIcon,
      countryType:query.countryType,
      pakets: this.data.pakets.map(paket => ({ ...paket, selected: false }))
    });

    // Render konten sesuai bahasa
    this.updateContent(languageIndex);
  },

  // Perbarui konten berdasarkan bahasa
  updateContent(languageIndex) {
    const selectedLang = languageIndex === 0 ? 'id' : 'en';
    this.setData({
      content: this.data.translations[0].KRcountry[selectedLang],
    });
  },

  selectPaket(e) {
    const id = e.currentTarget.dataset.id;
    const { pakets, lastSelectedId } = this.data;

    // Jika id yang sama diklik dua kali, hapus pilihan
    if (id === lastSelectedId) {
      const updatedPakets = pakets.map(paket => ({ ...paket, selected: false }));
      this.setData({ pakets: updatedPakets, buyEnabled: false, lastSelectedId: null });
    } else {
      // Jika id berbeda, pilih yang baru
      const updatedPakets = pakets.map(paket => {
        paket.selected = paket.id === id;
        return paket;
      });
      this.setData({ pakets: updatedPakets, buyEnabled: true, lastSelectedId: id });
    }
  },

   // Fungsi untuk mereset pilihan (dipanggil saat tombol "CHANGE" diklik)
  onReset() {
    this.setData({
      pakets: this.data.pakets.map(paket => ({ ...paket, selected: false })),
      buyEnabled: false,
      lastSelectedId: null,
    });
    my.navigateBack();
  },
  
  toggleCheckbox() {
    this.setData({
      checked: !this.data.checked
    });
  }
});
