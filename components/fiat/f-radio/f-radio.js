Component({
  mixins: [],
  data: {
    defaultClasses: "f-radio",
  },
  props: {
    value: "",
    label: "Radio",
    color: "blue",
    size: 24,
    disabled: false,
    readonly: false,
    checked: false,
    centered: false,
    activeValue: null
  },
  didMount() {
    const { props } = this
    this.setData({
      defaultClasses: `${props.checked ? "checked f-radio" : "f-radio"} \
        ${props.readonly ? "f-radio-readonly" : ""} \
        ${props.disabled ? "f-radio-disabled" : ""} \
        ${props.reversed ? "f-radio-reversed" : ""} \
        ${props.centered ? "f-radio-centered" : ""} \
        f-radio-${props.size} \
        f-radio-${props.color}`
        .replace(/\s{2,}/g, ' ')
    })
  },
  didUpdate() {
    const { props } = this
    if (props.activeValue) {
      if (props.activeValue !== props.value) {
        let classes = this.data.defaultClasses
        classes = classes.replace(/checked /i, "")
        this.setData({
          defaultClasses: classes
        })  
      }
    }
  },
  didUnmount() {},
  methods: {
    toggleChecked(e) {
      let classes = this.data.defaultClasses
      if (e.detail.value) {
        classes = `checked ${classes}`
      }
      this.setData({
        defaultClasses: classes
      })
    }
  },
});