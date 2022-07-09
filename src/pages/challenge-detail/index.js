Page({
  data: {
    isLoading: false,
    detail: {
      isJoined: false,
      isSubmitted: false,
      title: 'Bố già',
      author: 'Mario Puzo',
      bookCover: '/assets/images/book-cover-bo-gia.jpg',
      bannerPath: '',
      rule: 'Express your feeling about Bố già by Mario Puzo (up to 300 words).\nThe result is based on:\n• Community votes\n• Review by author',
      finishTime: 'July, 25th, 2022',
      participant: 100,
      top1: {
        topId: 1,
        avaPath: '/assets/images/sample-avatar-1.jpg',
        displayName: 'Hoàng',
        shortReview: 'Cuốn sách này rất hay, làm tôi đọc đêm quên ăn, ngày quên ngủ. Giá như tôi biết đến cuốn sách n...',
        point: 100
      },
      leaderboard: [
        {
          topId: 2,
          avaPath: '/assets/images/sample-avatar-2.jpg',
          displayName: 'Khang',
          shortReview: '',
          point: 90
        },
        {
          topId: 3,
          avaPath: '/assets/images/sample-avatar-3.jpg',
          displayName: 'Trường',
          shortReview: '',
          point: 80
        },
      ],
      reviews: [
        {
          userId: 2,
          userName: 'Khang',
          userAvatar: '/assets/images/sample-avatar-2.jpg',
          image: '',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris n',
          postedTime: '16:30 July 7, 2022',
          likes: 20,
          comments: 5,
          isLiked: false
        },
        {
          userId: 3,
          userName: 'Trường',
          userAvatar: '/assets/images/sample-avatar-3.jpg',
          image: '',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris n',
          postedTime: '16:30 July 7, 2022',
          likes: 20,
          comments: 5,
          isLiked: false
        }
      ]
    }
  },

  async loadData() {
    this.setData({
      isLoading: true
    });

    try {
      this.setData({
        isLoading: false,
      })
    } 
    catch (error) {
      this.setData({
        isLoading: false,
      })
    }
  },

  // Life cycle
  onReady(){
    this.loadData();
  },

  onSubmit(){
    
  },

  onOk(){

  },

  onCancel(){

  }
})