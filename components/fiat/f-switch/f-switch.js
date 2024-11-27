Component({
  mixins: [],
  data: {
    defaultClasses: "f-switch"
  },
  props: {
    checked: false,
    disabled: false,
  },
  didMount() {
    const { props } = this
    this.setData({
      defaultClasses: `f-switch \
      ${props.checked ? "checked" : ""} \
      ${props.disabled ? "f-switch-disabled" : ""}`
      .replace(/\s{2,}/g, ' ')
    })
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    toggleSwitch(e) {
      let classes = this.data.defaultClasses
      if (e.detail.value) {
        classes = `checked ${classes}`
      } else {
        classes = classes.replace(/checked /i, "")
      }
      this.setData({
          defaultClasses: classes
      })
    }
  },
});
