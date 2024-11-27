import FiatComponent from '../core/fiat-component'
import addClass from '/utils/addClass'
import removeClass from '/utils/removeClass'
Component(FiatComponent({
  exportInputHandler: true,
  mixins: [],
  data: {
    inputValue: '',
    inputCssClass: '',
    inputTypeClass: ''
  },
    props: {
    maxlength: 140,
    placeholder: '',
    showLoader: false,
    helperMsg: '',
    errorMsg: '',
    autoHeight: '',
    initialValue:'',
    disabled: false,
    showCount: false,
    readonly: false,
  },
  didMount() {
    this.setInputStyle()
    this.setInputValue()
    this.setErrorStyle()
    this.setIconInnerLeftStyle()
  },
  didUpdate() {
    this.setErrorStyle()
  },
  didUnmount() {},
  methods: {
    onInputFocus (e) {
      const { inputTypeClass } = this.data
      const { onInputFocus } = this.props
      if (onInputFocus) onInputFocus(e)
      this.setData({
        inputTypeClass: addClass(inputTypeClass, 'f-textarea--focus')
      });
    },
    onInputBlur (e) {
      const { onInputBlur } = this.props
      const { inputTypeClass } = this.data
      if (onInputBlur) onInputBlur(e)
      this.setData({
        inputTypeClass: removeClass(inputTypeClass, 'f-textarea--focus')
      });
    },
    onInput (e) {
      const { onInput } = this.props
      const { value: inputValue } = e.detail
      
      this.setData({
        inputValue,
      })

      if (onInput) onInput(e)
    },
    setIconInnerLeftStyle () {
      const { inputCssClass } = this.data
      const iconInnerLeft = this.props.$slots.iconInnerLeft
      iconInnerLeft && iconInnerLeft.length > 0 && this.setData({
        inputCssClass: addClass(inputCssClass, 'has-icon-inner-left')
      })
    },
    setErrorStyle () {
      const { inputTypeClass } = this.data
      if (this.props.errorMsg) {
        this.setData({
          inputTypeClass: addClass(inputTypeClass, 'error')
        })
      } else {
        this.setData({
          inputTypeClass: removeClass(inputTypeClass, 'error')
        })
      }
    },
    setInputStyle () {
      const { inputTypeClass } = this.data
      if (this.props.disabled) {
        this.setData({
          inputTypeClass: addClass(inputTypeClass, 'disabled')
        })
      }
      if (this.props.readonly) {
        this.setData({
          inputTypeClass: addClass(inputTypeClass, 'f-textarea-readonly')
        })
      }
    },
    setInputValue() {
      if(this.props.initialValue) {
        this.setData({
          inputValue: this.props.initialValue
        })
      }
    }
  },
  
}));
