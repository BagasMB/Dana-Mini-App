import FiatComponent from '../core/fiat-component'
import addClass from '/utils/addClass'
import removeClass from '/utils/removeClass'

Component(FiatComponent({
  exportAutocompleteHandler: true,
  mixins: [],
  data: {
    autocompleteValue: '',
    showClearIcon: false,
    autocompleteCssClass: '',
    autocompleteTypeClass: 'f-autocomplete__text-box',
    isShow: false,
    showNoData: false,
  },
  props: {
    type: 'text',
    placeholder: '',
    loading: false,
    helperMsg: '',
    errorMsg: '',
    isError: false,
    autocompleteType: 'text-box',
    disabled: false,
    data: [],
    emptyPlaceholder: "No data available",
  },
  didMount() {
    this.setAutocompleteTypeClass()
    this.setIconInnerLeftStyle()
    this.setIconInnerRightStyle()
    this.setErrorStyle()
  },
  deriveDataFromProps(nextProps) {
    this.updateClearIcon(nextProps)
  },
  didUpdate() {
    this.setErrorStyle()
  },
  didUnmount() { },
  methods: {
    updateClearIcon(props) {
      if (!props) props = this.props
      const { loading } = props
      const { autocompleteValue } = this.data
      if (autocompleteValue && !loading) {
        this.setData({
          showClearIcon: true
        })
      } else {
        this.setData({
          showClearIcon: false
        })
      }
    },
    onInputFocus(e) {
      const { autocompleteTypeClass, autocompleteValue, currentOption } = this.data
      const { onInputFocus, data } = this.props
      let options = data;
      if (onInputFocus) onInputFocus(e)
      if (autocompleteValue) {
        options = data.filter((e) => e.name.toLowerCase().includes(autocompleteValue.toLowerCase()))
      }
      this.setData({
        autocompleteTypeClass: addClass(autocompleteTypeClass, 'f-autocomplete--focus'),
        isShow: true,
        currentOption: options,
      });
      if (options.length === 0) {
        this.setData({
          showNoData: true,
        });
      }
    },
    onInputBlur(e) {
      const { onInputBlur } = this.props
      const { autocompleteTypeClass, currentOption } = this.data
      if (onInputBlur) onInputBlur(e)
      this.setData({
        autocompleteTypeClass: removeClass(autocompleteTypeClass, 'f-autocomplete--focus'),
      });
      if (currentOption.length === 0) {
        this.setData({
          showNoData: false,
        });
      }
    },
    onInput(e) {
      const { onInput, data } = this.props
      const { value: autocompleteValue } = e.detail
      const { currentOption } = this.data

      const newOptions = data.filter((e) => e.name.toLowerCase().includes(autocompleteValue.toLowerCase()))

      this.setData({
        autocompleteValue,
        currentOption: newOptions
      }, () => {
        this.updateClearIcon()
      })

      if (currentOption.length === 0) {
        this.setData({
          showNoData: true,
        });
      }

      if (onInput) onInput(e)
    },
    setOption(e) {
      let dataset = e.target.targetDataset.name
      this.setData({
        autocompleteValue: dataset,
        isShow: false
      });
    },
    onClearIconTap(e) {
      const { onInput } = this.props
      this.setData({
        autocompleteValue: '',
        showClearIcon: false,
        isShow: false,
      }, () => {
        this.updateClearIcon()
      })
      if (onInput) {
        const detail = e.detail ? e.detail : {}
        detail.value = ''
        onInput({ ...e, detail })
      }
    },
    setIconInnerLeftStyle() {
      const { autocompleteCssClass } = this.data
      const iconInnerLeft = this.props.$slots.iconInnerLeft
      iconInnerLeft && iconInnerLeft.length > 0 && this.setData({
        autocompleteCssClass: addClass(autocompleteCssClass, 'has-icon-inner-left')
      })
    },
    setIconInnerRightStyle() {
      const { autocompleteCssClass } = this.data
      const iconInnerRight = this.props.$slots.iconInnerRight
      iconInnerRight && iconInnerRight.length > 0 && this.setData({
        autocompleteCssClass: addClass(autocompleteCssClass, 'has-icon-inner-right')
      })
    },
    setErrorStyle() {
      const { autocompleteCssClass, autocompleteTypeClass } = this.data
      if (this.props.isError) {
        this.setData({
          autocompleteCssClass: addClass(autocompleteCssClass, 'error'),
          autocompleteTypeClass: addClass(autocompleteTypeClass, 'f-autocomplete-error')
        })
      } else {
        this.setData({
          autocompleteTypeClass: removeClass(autocompleteTypeClass, 'f-autocomplete-error'),
          autocompleteCssClass: removeClass(autocompleteCssClass, 'error')
        })
      }
    },
    setAutocompleteTypeClass() {
      switch (this.props.autocompleteType) {
        case 'text-field':
          this.setData({
            autocompleteTypeClass: 'f-autocomplete__text-field'
          })
          break
        default:
          this.setData({
            autocompleteTypeClass: 'f-autocomplete__text-box'
          })
      }
    },
  },
}));
