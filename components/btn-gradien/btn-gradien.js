import FiatComponent from '/components/fiat/core/fiat-component'

Component(FiatComponent({
  mixins: [],
  data: {
    defaultClasses: 'btn-gradien'
  },
  props: {
    type: 'primary',
    size: 'large',
    uppercase: false,
    disabled: false,
  },
  didMount() {
    const { props } = this
    const upperCaseClass = props.uppercase ? 'btn-gradien-uppercase' : ''
    this.setData({
      defaultClasses: `btn-gradien btn-gradien-${props.type} btn-gradien-${props.size} ${upperCaseClass}`
    })
  },
  didUpdate() {},
  didUnmount() {},
  methods: {},
}));
