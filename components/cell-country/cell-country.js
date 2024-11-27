Component({
  mixins: [],
  data: {},
  props: {
    title: "PROVIDER NAME",
    countryName: "Country Name",
    onReset: () => {},
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onReset() {
      if (this.props.onReset) {
        this.props.onReset(); // Memanggil fungsi reset dari parent
      }
    },
  },
});