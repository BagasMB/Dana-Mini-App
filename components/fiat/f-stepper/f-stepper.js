import FiatComponent from '../core/fiat-component'

Component(FiatComponent({
  mixins: [],
  data: {
    qty: 0,
  },
  props: {},
  methods: {
    substract(e) {
      const { qty } = this.data
      if (qty > 0) {
        this.setData({
          qty: qty-1
        })
      }
    },
    add(e) {
      const { qty } = this.data
      this.setData({
        qty: qty+1
      })
    }
  }
}));
