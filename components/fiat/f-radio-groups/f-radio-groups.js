Component({
  mixins: [],
  data: {
    radioValue: ""
  },
  props: {
    value: []
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleChange(e) {
      this.setData({
        radioValue: e.detail.value
      })
    },
  },
});