Component({
  props: {
    isLoading: true,
    tab: 0,
    src: '',
    text: '',
    value: '',
    author:'',
    onTap: () => {},
  },
  methods: {
    _onTap() {
      this.props.onTap(this.props.tab);
    },
  },
});
