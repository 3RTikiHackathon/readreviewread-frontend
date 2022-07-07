Page({
  data: {
    isLoading: false,
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      this.setData({
        isLoading: false,
      })
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },

  onReady() {
    this.loadData();
  }
});