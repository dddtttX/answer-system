// pages/result-page/result-page.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        questionBank: [] as any,
        currentQuestionListState: [] as any,
        score: "", //分数
        count: 0, //正确的题目数量
        currentShowItem: {},
        currentTapItem: 0, //当前题库下的某道题
        currentShowItemColor: "",
        isShowCurrentShowItem: false,
        currentNavTab: -1, //当前选择题库
        correctAnswer: "", //正确答案,用于在错题页面显示
        accuracyRate: "", //正确率
        valueList: [] as any, //问答题填写情况
        yourAnswer: "", //当前题目下你的答案
    },
    // 设定回退页面为主页
    handleToIndexPage() {
        wx.reLaunch({
            url: "../index-page/index-page",
        })
    },
    goSelectPage() {
        wx.navigateTo({ url: "../select-page/select-page" })
    },

    // 计算错题数
    handleWrongCount() {
        let count = 0
        this.data.currentQuestionListState.forEach((item: string) => {
            if (item === "1") {
                count++
            }
        })
        this.setData({ count })
        this.handleCalculateScore()
    },
    // 计算分数、正确率
    handleCalculateScore() {
        let perScore = 100 / this.data.questionBank.length
        let score = (perScore * this.data.count).toFixed(0)
        let accuracyRate = ((this.data.count / this.data.questionBank.length) * 100).toFixed(1)
        this.setData({
            score,
            accuracyRate,
        })
    },
    // 获取题目解析，同时判断对错，改变类名
    handleGetTheKeyItem(e: any) {
        let index = e.target.dataset.index
        let currentShowItem = this.data.questionBank[index]
        let className = this.data.currentQuestionListState[index] == "1" ? "true-item" : "wrong-item"
        this.setData({
            currentShowItem,
            isShowCurrentShowItem: true,
            currentShowItemColor: className,
            currentTapItem: index,
        })
        if (this.data.currentNavTab == 1 || this.data.currentNavTab == 2) {
            this.handleGetTheCorrectAnswer(currentShowItem)
        }
    },
    // 获取你的答案和正确答案，用于在页面显示
    handleGetTheCorrectAnswer(arr: any) {
        if (this.data.currentNavTab == 2) {
            let yourAnswer = this.data.valueList[this.data.currentTapItem] || "未填写"
            this.setData({ yourAnswer })
            return
        }
        let correctAnswer = ""
        arr.answer.map((item: any, index: number, arr: any) => {
            correctAnswer += item.optionId
            if (index < arr.length - 1) {
                correctAnswer += "、"
            }
        })
        this.setData({ correctAnswer })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(option) {
        let currentQuestionListState = JSON.parse(option.currentQuestionListState || "")
        let questionsBank = JSON.parse(option.questionsBank || "")
        let currentNavTab = JSON.parse(option.currentNavTab || "")
        let valueList = JSON.parse(option.valueList || "")
        this.setData({
            questionBank: questionsBank || [],
            currentQuestionListState: currentQuestionListState || "",
            currentNavTab: currentNavTab,
            valueList,
        })
        // 调用计算得分函数
        this.handleWrongCount()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        this.setData({
            score: "",
            count: 0,
        })
        this.handleToIndexPage()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
})
