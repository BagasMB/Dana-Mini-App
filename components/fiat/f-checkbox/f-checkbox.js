Component({
  data: {
    defaultClasses: "f-checkbox",
  },
  props: {
    value: null,
    name: null,
    label: "Checkbox",
    color: "blue",
    size: 24,
    disabled: false,
    readonly: false,
    checked: false,
    centered: false,
    isIndeterminate: false,
  },
  didMount() {
    const { props } = this
    this.setData({
      defaultClasses: `${props.checked ? "checked f-checkbox" : "f-checkbox"} \
        ${props.readonly ? "f-checkbox-readonly" : ""} \
        ${props.disabled ? "f-checkbox-disabled" : ""} \
        ${props.reversed ? "f-checkbox-reversed" : ""} \
        ${props.centered ? "f-checkbox-centered" : ""} \
        ${props.isIndeterminate ? "f-checkbox-indeterminate" : ""} \
        f-checkbox-${props.size} \
        f-checkbox-${props.color}`
        .replace(/\s{2,}/g, ' ')
    })
  },
  methods: {
    toggleChecked(e) {
      let classes = this.data.defaultClasses
      if (e.detail.value) {
        classes = `checked ${classes}`
      } else {
        classes = classes.replace(/checked /g, "")
      }
      this.setData({
        defaultClasses: classes
      })
    },
  },
});
