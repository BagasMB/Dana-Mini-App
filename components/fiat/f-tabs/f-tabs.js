Component({
  mixins: [],
  data: {
    activeIndex: 0,
  },
  props: {
    tabs:[],
    notifType: 'dot',
    type: 'static'
  },
  didMount() {
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onTap(e) {
      const { index } = e.target.dataset
      if(this.data.activeIndex !== index) {
        this.setData({activeIndex: index})
      }
    },
    onChangeSwipper(e) {
      const nextTarget = e.detail.current
      if(this.data.activeIndex !== nextTarget) {
        this.setData({activeIndex: nextTarget})
      }
    }
  },
});
