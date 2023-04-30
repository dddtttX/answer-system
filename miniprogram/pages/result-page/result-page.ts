import { formatIndex } from "../../utils/util"

// pages/result-page/result-page.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        questionBank: [] as any,
        currentQuestionListState: [] as number[],
        selectedOption: [] as any,
        score: "", //分数
        count: 0, //正确的题目数量
        currentShowItem: {},
        currentTapItem: -1, //当前题库下的某道题
        currentShowItemColor: "",
        isShowCurrentShowItem: false,
        currentNavTab: -1 as number, //当前选择题库
        correctAnswer: "", //正确答案,用于在错题页面显示
        accuracyRate: "", //正确率
        valueList: [] as any, //问答题填写情况
        yourAnswer: "", //当前题目下你的答案
        isShow: true, //点击查看解析这句话
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
        this.data.currentQuestionListState.forEach((item: number) => {
            if (item === 1) {
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
        let className = this.data.currentQuestionListState[index] === 1 ? "true-item" : "wrong-item"
        this.setData({
            currentShowItem,
            isShowCurrentShowItem: true,
            currentShowItemColor: className,
            currentTapItem: index,
            isShow: false
        })
        this.handleGetTheCorrectAnswer(currentShowItem)
    },

    // 问答题获取你的答案和正确答案，用于在页面显示
    handleGetTheCorrectAnswer(arr: any) {
        if (this.data.currentNavTab == 1) {
            let yourAnswer = ""
            arr.answers.map((item: any, index: number, arr: any) => {
                yourAnswer += formatIndex(item)
                if (index < arr.length - 1) {
                    yourAnswer += "、"
                }
                this.setData({ yourAnswer })
            })
        }
        // 填空题
        if (this.data.currentNavTab == 2) {
            let selectedOption = this.data.selectedOption
            let currentTapItem = this.data.currentTapItem
            let arr = selectedOption[currentTapItem]
            let yourAnswer = ""
            if (arr === null  || arr.length == 0) {
                // 所有空都没有填
                yourAnswer = "你未填写答案"
            } else {
                // 存在一个空没有填
                let newArr =  arr.map((item: any) => {
                    console.log(item);
                    
                    if (item === null || item === "") {
                        item = "未填写"
                    }
                    return item
                })
                console.log(newArr);
                
                yourAnswer = newArr.toString()
            }
            this.setData({ yourAnswer })


        }

        // 问答题
        if (this.data.currentNavTab == 3) {
            let yourAnswer = this.data.valueList[this.data.currentTapItem] || "未填写"
            this.setData({ yourAnswer })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(option) {
        let questionsBank = JSON.parse(option.questionsBank || "")
        let currentQuestionListState = JSON.parse(option.currentQuestionListState || "")
        let selectedOption = JSON.parse(option.selectedOption || "")
        let currentNavTab = Number(option.currentNavTab)
        let valueList = JSON.parse(option.valueList || "")

        this.setData({
            questionBank: questionsBank || [],
            currentQuestionListState: currentQuestionListState,
            currentNavTab: currentNavTab,
            valueList,
            selectedOption
        })
        // 调用计算得分函数
        this.handleWrongCount()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() { },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() { },

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
    onPullDownRefresh() { },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() { },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() { },
})
