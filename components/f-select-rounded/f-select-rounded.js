import FiatComponent from '/components/fiat/core/fiat-component'
import addClass from '/utils/addClass'
import removeClass from '/utils/removeClass'

Component(FiatComponent({
  exportSelectHandler: true,
  mixins: [],
  data: {
    selectValue: '',
    selectCssClass: '',
    selectTypeClass: 'f-select__text-box',
    index: 0,
    isShow: false,
  },
  props: {
    loading: false,
    helperMsg: '',
    errorMsg: '',
    isError: false,
    selectType: 'text-box',
    disabled: false,
    data: [],
  },
  didMount() {
    this.setSelectTypeClass()
    this.setIconInnerLeftStyle()
    this.setIconInnerRightStyle()
    this.setErrorStyle()
    this.setDisabled()
  },
  didUpdate() {
    this.setErrorStyle()
  },
  didUnmount() { },
  methods: {
    onTouchStart(e) {
      const { selectTypeClass, isShow } = this.data
      const { onTouchStart, disabled, loading } = this.props
      if (onTouchStart) onTouchStart(e)
      if (!disabled && !loading) {
        this.setData({
          selectTypeClass: addClass(selectTypeClass, 'f-select--focus'),
          isShow: !isShow
        });
      }
    },
    onTouchEnd(e) {
      const { onTouchEnd } = this.props
      const { selectTypeClass } = this.data
      if (onTouchEnd) onTouchEnd(e)
      this.setData({
        selectTypeClass: removeClass(selectTypeClass, 'f-select--focus')
      });
    },
    setOption(e) {
      let dataset = e.target.targetDataset.name
      this.setData({
        selectValue: dataset,
        isShow: false
      });
    },
    setIconInnerLeftStyle() {
      const { selectCssClass } = this.data
      const iconInnerLeft = this.props.$slots.iconInnerLeft
      iconInnerLeft && iconInnerLeft.length > 0 && this.setData({
        selectCssClass: addClass(selectCssClass, 'has-icon-inner-left')
      })
    },
    setIconInnerRightStyle() {
      const { selectCssClass } = this.data
      const iconInnerRight = this.props.$slots.iconInnerRight
      iconInnerRight && iconInnerRight.length > 0 && this.setData({
        selectCssClass: addClass(selectCssClass, 'has-icon-inner-right')
      })
    },
    setErrorStyle() {
      const { selectCssClass, selectTypeClass } = this.data
      if (this.props.isError) {
        this.setData({
          selectCssClass: addClass(selectCssClass, 'error'),
          selectTypeClass: addClass(selectTypeClass, 'f-select-error')
        })
      } else {
        this.setData({
          selectTypeClass: removeClass(selectTypeClass, 'f-select-error'),
          selectCssClass: removeClass(selectCssClass, 'error')
        })
      }
    },
    setDisabled() {
      const { selectCssClass } = this.data
      const { disabled, loading } = this.props
      if (disabled || loading) {
        this.setData({
          selectCssClass: addClass(selectCssClass, "disabled")
        })
      }
    },
    setSelectTypeClass() {
      switch (this.props.selectType) {
        case 'text-field':
          this.setData({
            selectTypeClass: 'f-select__text-field'
          })
          break
        default:
          this.setData({
            selectTypeClass: 'f-select__text-box'
          })
      }
    },
  },
}));
