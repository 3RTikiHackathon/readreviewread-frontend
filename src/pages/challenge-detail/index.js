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
      participant: 100
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