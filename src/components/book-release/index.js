Component({
  props: {
    isLoading: true,
    orderIcons: [
      {
        key: 'waiting',
        value: 'Đắc nhân tâm',
        src: '/assets/icons/book1.svg',
        author: 'Dale Caanegie',
      },
      {
        key: 'processing',
        value: 'Truyên Kiều',
        src: '/assets/icons/book2.svg',
        author: 'Nguyễn Du',
      },
      {
        key: 'shipping',
        value: 'Ngồi khóc tr...',
        src: '/assets/icons/book3.svg',
        author: 'Nguyễn Nhật...'
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
    
      onItemTap(){
        navigate({
          page: 'book_detail',
        });
      }
    
  },

  // Life cycle
  didMount() {},
});
