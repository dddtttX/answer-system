// pages/select-page/select-page.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionType: ["单选题", "多选题", "填空题", "问答题"],
    mode: 0 // 0 做题， 1 背题
  },


  goToAnswerTap(e: any) {
    let type = e.target.dataset.type
    let mode = this.data.mode
    wx.navigateTo({
      url: `../answer-page/answer-page?type=${type}&mode=${mode}`
    })
  },

  handleChangeModeTap(e: any) {
    let mode = Number(e.target.dataset.index)
    if (mode == this.data.mode) { return }
    this.setData({ mode })
    wx.showToast({
      title: `切换${ mode ==  0 ? '刷题' : '背题' }模式`,
      icon: 'success',
      duration: 1000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})