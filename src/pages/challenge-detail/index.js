Page({
  data: {
    isLoading: false,
    detail: {
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
        shortReview: 'Cuốn sách này rất hay, làm tôi đọc đêm quên ăn, ngày quên ngủ. Giá như tôi biết đến cuốn s...',
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
  }
})