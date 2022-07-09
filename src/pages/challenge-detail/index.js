Page({
  data: {
    isLoading: false,
    isJoined: false,
    isSubmitted: false,
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
        avaPath: '/assets/images/ava_hoang.jpg',
        displayName: 'Hoàng',
        shortReview: 'Cuốn sách này rất hay, làm tôi đọc đêm quên ăn, ngày quên ngủ. Giá như tôi biết đến cuốn sách n...',
        point: 200
      },
      leaderboard: [
        {
          topId: 2,
          avaPath: '/assets/images/ava_khang.jpg',
          displayName: 'Khang',
          shortReview: '',
          point: 90
        },
        {
          topId: 3,
          avaPath: '/assets/images/ava_truong.jpg',
          displayName: 'Trường',
          shortReview: '',
          point: 80
        },
      ],
      reviews: [
        {
          userId: 2,
          userName: 'Khang',
          userAvatar: '/assets/images/ava_khang.jpg',
          image: '',
          content: 'Cuốn sách này khá là thú vị, tôi đã học được rất nhiều điều từ khi cầm nó trên tay.',
          postedTime: '16:30 July 7, 2022',
          likes: 20,
          comments: 5,
          isLiked: false
        },
        {
          userId: 3,
          userName: 'Yến',
          userAvatar: '/assets/images/ava_yen.jpg',
          image: '',
          content: 'Văn phong của tác giả là điều khiến tôi phải chú ý nhất',
          postedTime: '16:30 July 7, 2022',
          likes: 20,
          comments: 5,
          isLiked: false
        }
      ]
    },
    show: false,
    position: 'bottom',
    animation: true,
    mask: true,
    zIndex: 10,
    disableScroll: true,
    imgs: undefined,
    submitInput: "",
    mySubmit: {
      userId: 3,
      userName: 'Trường',
      userAvatar: '/assets/images/ava_truong.jpg',
      image: '',
      content: '',
      postedTime: '17:00 July 9, 2022',
      likes: 0,
      comments: 0,
      isLiked: false
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

  onOpenSubmit(e) {
    this.setData({
      ...e.target.dataset.popup
    });
  },

  onJoin() {
    this.setData({
      isJoined: true
    })
  },

  onSubmit() {
    if (this.data.submitInput !== "")
    {
      this.setData({
        show:false,
        isSubmitted: true,
        mySubmit: {
          ...this.data.mySubmit,
          content: this.data.submitInput
        }
      });
    }
  },

  onCancel() {
    this.setData({
      show:false
    });
  },

  onBrowse() {
    my.chooseImage({
      count: 5,
      success: (res) => {
        my.previewImage({
          urls: res.filePaths,
          enablesavephoto: true,
          enableShowPhotoDownload: true,
          success: (res) => {
            console.log('success', res);
          },
          fail: (err) => {
            console.log('fail', err);
          },
        });
      },
      fail: (e) => {
        console.log(e);
        my.alert({ title: 'Fail', content: JSON.stringify(e) });
      },
    });
  },

  onSubmitInput(e) {
    this.setData({
      submitInput: e.detail.value.toString()
    })
  }
})