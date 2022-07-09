Component({
  props: {
    isLoading: true,
    orderIcons: [
      {
        key: 'waiting',
        value: 'Đắc nhân tâm',
        src: '/assets/icons/book1.svg',
      },
      {
        key: 'processing',
        value: 'Truyên Kiều',
        src: '/assets/icons/book2.svg',
      },
      {
        key: 'shipping',
        value: 'Ngồi khóc tr...',
        src: '/assets/icons/book3.svg',
      },
    ],
    numOrders: {
      waiting: 0,
      processing: 0,
      shipping: 0,
    },
  },

  methods: {
    onMoveOrderManagement(e) {
      my.navigateTo({ url: `pages/home/index` });
    },
  },

  // Life cycle
  didMount() {},
});
