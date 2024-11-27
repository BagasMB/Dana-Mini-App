Component({
  mixins: [],
  data: {
    defaultClasses: "f-collapse"
  },
  props: { 
    isOpen: false,
  },
  didMount() {
    if (this.props.isOpen) {
      this.setData({
        defaultClasses: "shown f-collapse"
      })
    }
  },
  didUpdate() {
    if (!this.props.isOpen) {
      this.setData({
        defaultClasses: "f-collapse"
      })
    } else {
      this.setData({
        defaultClasses: "shown f-collapse"
      })
    }
  },
  didUnmount() {},
  methods: {},
});
