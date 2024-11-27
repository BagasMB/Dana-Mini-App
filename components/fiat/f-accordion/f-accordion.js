import FiatComponent from '../core/fiat-component'
var prefixKey = function prefixKey(prefix) {
  return function (key) {
    return prefix + "-" + key;
  };
};

var collapsePrefix = prefixKey('f-accordion');

Component(FiatComponent({
  mixins: [],
  data: {
    handleItemTap: [],
  },
  props: {
    activeKey:[],
    toggle: false,
    className: '',
    collapseKey: '',
    onChange: function(){},
  },
  didMount() {
    this.initData();
  },
  didUpdate() {},
  didUnmount() {
    // clear cache in page when didUnmount
    delete this.$page[collapsePrefix("ids-" + this.props.collapseKey)];
    delete this.$page[collapsePrefix("updates-" + this.props.collapseKey)];
  },
  methods: {
    initData: function initData() {
      var _this$props = this.props,
          toggle = _this$props.toggle,
          activeKey = _this$props.activeKey,
          collapseKey = _this$props.collapseKey;
      var activeArr = [];
      this.$page[collapsePrefix("handleItemTap-" + collapseKey)] = this.handleItemTap.bind(this);

      if (toggle) {
        if (typeof activeKey === 'string') {
          activeArr = [activeKey];
        } else {
          activeArr = [this.$page[collapsePrefix("ids-" + collapseKey)] && this.$page[collapsePrefix("ids-" + collapseKey)][0]];
        }
      } else if (typeof activeKey === 'string') {
        activeArr = [activeKey];
      } else if (activeKey instanceof Array) {
        activeArr = activeKey;
      }
      this.updateItems(activeArr);
    },
    updateItems: function updateItems(activeArr) {
      var _this = this;

      var collapseKey = this.props.collapseKey;
      this.setData({
        activeArr: activeArr
      });
      this.props.onChange(activeArr);
      this.$page[collapsePrefix("updates-" + collapseKey)].forEach(function (update) {
        if (typeof update === 'function') {
          update({
            activeKey: _this.data.activeArr
          });
        }
      });
    },
    handleItemTap: function handleItemTap(key) {
      var activeArr = this.data.activeArr;

      if (this.props.toggle) {
        if(activeArr.indexOf(key) === -1) {
          this.updateItems([key]);
        } else {
          this.updateItems([]);
        }
      } else {
        var index = activeArr.indexOf(key);

        if(index !== -1) {
          activeArr.splice(index, 1);
        } else {
          activeArr.push(key);
        }

        this.updateItems(activeArr);
      }
    }
  },
}));
