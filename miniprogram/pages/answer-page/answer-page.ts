// pages/answer-page/answer-page.ts



Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 题目类型
    currentTabQuestionBank: [] as any, //当前题库信息
    currentTabQuestionBankCount: 0, //当前题库的数量
    questionType: ["单选题", "多选题", "填空题", "问答题"],
    currentNavTab: 0 as number, //当前题库索引
    currentQuestionItemTab: 0, //当前题目在题库的索引
    selectedOption: [] as any[],//已选择的选项，用于改变颜色
    currentQuestionListState: [] as any, // -1表示错误，0表示未完成，1表示正确 
    options: [] as number[], //多选时单个题目的临时选项存储数组
    valueList: [] as string[], //问答题答案存储
    valueLengthList: [] as number[], // 填空题答案长度存储
    mode: 0, // 0 做题， 1 背题
    isShowQuestionKey: false,
    pageList: [] as number[] //页码数组，用于实现picker翻页
  },

  // 进入页面时选择默认tab
  enterPageCurrentTap(option: any) {
    let currentNavTab = Number(option.type)
    let mode = Number(option.mode)
    this.setData({
      currentNavTab, mode, isShowQuestionKey: mode == 1
    })
    // this.getCurrentQuestionListState(currentNavTab)
  },
  // 切换导航tab，切换题库 
  handleChangeCurrentNavTabTap(e: any) {
    let index = e.target.dataset.index
    if (index == this.data.currentNavTab) { return }
    let that = this
    if (this.data.mode == 0) {
      // 警告
      wx.showModal({
        title: '警告',
        content: `放弃已完成的${this.data.questionType[this.data.currentNavTab]}，切换到${this.data.questionType[index]}`,
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            that.setData({
              currentNavTab: index,
              currentQuestionItemTab: 0
            })
            // 获取id
            that.initCurrentTabQuestionsBank()
            // that.initCurrentTabQuestionItemAnswerList()
            // 每次切换都清空已选择项和状态，以及问答题填写情况
            // that.setData({
            //   selectedOption: [],
            //   // 删除原本存储的临时options，为下一道题多选题做准备
            //   options: [],
            //   valueList: []
            // })
            // 获取currentQuestionListState
            // that.getCurrentQuestionListState(index)
            // 初始化
          } else {//这里是点击了取消以后
            return
          }
        }
      })
    } else {
      this.setData({
        currentNavTab: index,
        currentQuestionItemTab: 0
      })
      that.initCurrentTabQuestionsBank()

    }

  },

  // 滑动题目
  handleSlideChangeEnd(e: any) {
    let currentQuestionItemTab = e.detail.current
    this.setData({
      currentQuestionItemTab,
    })
    this.setData({
      // 删除原本存储的临时options，为下一道题多选题做准备
      // 如果当前selectedOption中存在，则不删除，直接换
      options: this.data.selectedOption[this.data.currentQuestionItemTab] || [],

    })
  },
  // 点击上一题
  // handleFromQuestionTap() {
  //   if (this.data.currentQuestionItemTab > 0) {
  //     this.setData({
  //       currentQuestionItemTab: this.data.currentQuestionItemTab - 1
  //     })
  //   }
  // },
  // 跳转下一题
  handleNextQuestionTap() {
    if (this.data.currentQuestionItemTab < this.data.currentTabQuestionBankCount - 1) {
      this.setData({
        currentQuestionItemTab: this.data.currentQuestionItemTab + 1,
        // isShowQuestionKey: false
      })
      this.setData({
        // 删除原本存储的临时options，为下一道题多选题做准备
        // 如果当前selectedOption中存在，则不删除，直接换
        options: this.data.selectedOption[this.data.currentQuestionItemTab] || [],
      })
    }
  },

  // 提交跳转到结果页面
  handleToResultPage() {
    let that = this
    // 警告
    let isDiscompletedList = new Array()
    this.data.currentQuestionListState.forEach((item: number, index: number) => {
      if (item == 0) {
        isDiscompletedList.push(index + 1)
      }
    })
    console.log(isDiscompletedList);
    if (isDiscompletedList.length) {
      let list = isDiscompletedList.join("、")
      wx.showModal({
        title: "警告",
        content: `您还有第${list}题没有完成，
        是否确认提交`,
        success: function (res: any) {
          if (res.confirm) {
            let questionsBank = JSON.stringify(that.data.currentTabQuestionBank)
            let currentQuestionListState = JSON.stringify(that.data.currentQuestionListState)
            let currentNavTab = that.data.currentNavTab
            let valueList = JSON.stringify(that.data.valueList)
            let selectedOption = JSON.stringify(that.data.selectedOption)
            wx.navigateTo({
              url: `../result-page/result-page?currentQuestionListState=${currentQuestionListState}&questionsBank=${questionsBank}&currentNavTab=${currentNavTab}&valueList=${valueList}&selectedOption=${selectedOption}`
            })
          } else {
            return
          }
        }
      })
    } else {
      let questionsBank = JSON.stringify(that.data.currentTabQuestionBank)
      let currentQuestionListState = JSON.stringify(that.data.currentQuestionListState)
      let currentNavTab = that.data.currentNavTab
      let valueList = JSON.stringify(that.data.valueList)
      let selectedOption = JSON.stringify(that.data.selectedOption)
      wx.navigateTo({
        url: `../result-page/result-page?currentQuestionListState=${currentQuestionListState}&questionsBank=${questionsBank}&currentNavTab=${currentNavTab}&valueList=${valueList}&selectedOption=${selectedOption}`
      })
    }
  },

  // 点击选项
  handleSelectOptionTap(e: any) {
    let bank = this.data.currentTabQuestionBank // 当前题库
    let tab = this.data.currentNavTab  // 当前题库的索引
    let index = e.target.dataset.index // 当前选择的选项
    let currentQuestionListState = this.data.currentQuestionListState

    if (tab == 0) {
      // 单选
      let answers = bank[this.data.currentQuestionItemTab].answers[0] //得到单选题答案
      if (answers == index) {
        // console.log("你答对了捏");
        currentQuestionListState[this.data.currentQuestionItemTab] = 1
        this.setData({ currentQuestionListState })
      } else {
        // console.log("你答错了捏");
        currentQuestionListState[this.data.currentQuestionItemTab] = -1
        this.setData({ currentQuestionListState })
      }
      // 选中的选项拿出来存成数组，以便更改颜色
      let selectedOption = this.data.selectedOption
      selectedOption[this.data.currentQuestionItemTab] = index
      this.setData({
        selectedOption
      })
      this.handleNextQuestionTap()
    }

    if (tab == 1) {
      // 多选
      let answers = bank[this.data.currentQuestionItemTab].answers //得到多选题答案
      // console.log(answers);
      // 临时options使用，将选项push上去，同时去重和排序
      let options = this.data.options
      if (options.length == 0) {
        options[0] = index
      } else if (options.includes(index)) {
        options.splice(options.indexOf(index), 1)
      } else {
        options.push(index)
        options.sort((a, b) => {
          return a - b
        })
      }
      this.setData({ options })
      if (answers.toString() == options.toString()) {
        currentQuestionListState[this.data.currentQuestionItemTab] = 1
        this.setData({ currentQuestionListState })
      } else {
        currentQuestionListState[this.data.currentQuestionItemTab] = -1
        this.setData({ currentQuestionListState })
      }
      // 选中的选项拿出来存成数组，以便更改颜色
      let selectedOption = this.data.selectedOption
      selectedOption[this.data.currentQuestionItemTab] = options
      this.setData({ selectedOption })
    }
  },

  // 显示题目解析，点击答案后调用更改值，切换题目后切换为默认值
  // handleIsShowQuestionKey() {
  //   this.setData({
  //     isShowQuestionKey: true
  //   })
  // },
  // 根据tab初始化currentQuestionListState
  // getCurrentQuestionListState(currentNavTab: number) {
  //   let length = 0
  //   if (currentNavTab === 0) {
  //     length = this.data.singleAnswerBank.length
  //   } else if (currentNavTab === 1) {
  //     length = this.data.nonuniqueAnswerBank.length
  //   } else if (currentNavTab === 2) {
  //     length = this.data.essayAnswerBank.length
  //   }
  //   let currentQuestionListState = new Array(length)
  //   currentQuestionListState.fill(0)
  //   this.setData({
  //     currentQuestionListState
  //   })

  // },

  // 填空题，监听表单变化，双向绑定数据
  handleGetTextInputChange(e: any) {
    let currentQuestionListState = this.data.currentQuestionListState
    let index = e.target.dataset.index
    let value = e.detail.value

    // 此处复用了多选题的处理模式 ~
    let answers = this.data.currentTabQuestionBank[this.data.currentQuestionItemTab].answers //得到填空题答案
    // console.log(answers);
    // 临时options使用，将选项push上去，同时去重和排序
    let options = this.data.options
    options[index] = value
    this.setData({ options })
    if (answers.toString() == options.toString()) {
      currentQuestionListState[this.data.currentQuestionItemTab] = 1
      this.setData({ currentQuestionListState })
    } else {
      currentQuestionListState[this.data.currentQuestionItemTab] = -1
      this.setData({ currentQuestionListState })
    }
    // 选中的选项拿出来存成数组，以便更改颜色
    let selectedOption = this.data.selectedOption
    selectedOption[this.data.currentQuestionItemTab] = options
    this.setData({ selectedOption })

  },

  // 问答题，监听表单变化，双向绑定数据
  handleGetTextareaChange(e: any) {
    let currentQuestionItemTab = this.data.currentQuestionItemTab
    let valueList = this.data.valueList
    let value = e.detail.value
    valueList[currentQuestionItemTab] = value
    this.setData({ valueList })
  },

  // 选择页码并完成跳转
  handleToSelectedPage(e: any) {
    let page = Number(e.detail.value)
    this.setData({
      currentQuestionItemTab: page
    })
  },

  // 初始化题目信息
  initCurrentTabQuestionsBank() {
    wx.showLoading({ title: "请求中" })
    let that = this
    wx.request({
      url: 'http://8.134.149.248:3001/api/get_questions_all_info_list',
      data: {
        type: this.data.currentNavTab
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res: any) {
        if (res.statusCode !== 200) {
          wx.hideLoading()
          wx.showToast({
            title: "请求超时", icon: "error", duration: 5000, success: function () {
              setTimeout(() => {
                wx.navigateTo({ url: '../select-page/select-page' })
              }, 5000)
            }
          })
          return
        }
        var currentTabQuestionBank
        if (that.data.currentNavTab == 0 || that.data.currentNavTab == 1) {
          // 选择题
          currentTabQuestionBank = res.data.map((item: any) => {
            item.answers = (item.answers).map((i: number | string) => {
              i = Number(i)
              return i
            })
            return item
          })
        } else if (that.data.currentNavTab == 2) {
          // 填空题
          let valueLengthList = that.data.valueLengthList
          currentTabQuestionBank = res.data.map((item: any, index: number) => {
            // item.title = (item.title).map((i: string) => {
            //   return i
            // })
            let valueLength = []
            valueLength = (item.answers).map((i: string) => {
              return i.length * 2
            })
            valueLengthList[index] = valueLength
            return item
          })
          that.setData({ valueLengthList })

        } else if (that.data.currentNavTab == 3) {
          // 问答题
          currentTabQuestionBank = res.data
        }
        that.setData({ currentTabQuestionBank })
        that.initCurrentTabQuestionsBankCount(that.data.currentNavTab)
        wx.hideLoading()
      },
    })


  },


  // 初始化题目总数
  initCurrentTabQuestionsBankCount(type: number) {
    let that = this
    wx.request({
      url: 'http://8.134.149.248:3001/api/get_questions_total_count_by_TYPE',
      data: {
        type
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res: any) {
        that.setData({
          currentTabQuestionBankCount: res.data[0]["COUNT (*)"]
        })
        // 初始化题目总数后 初始化状态列表以及选中题目列表
        that.initCurrentQuestionListState()
        // 初始化题目总数后 初始化页码数组
        that.initPageList()
      }
    })
  },

  // 初始化状态数组
  initCurrentQuestionListState() {
    let currentQuestionListState = new Array(this.data.currentTabQuestionBankCount).fill(0)
    let selectedOption = new Array(this.data.currentTabQuestionBankCount)
    this.setData({ currentQuestionListState, selectedOption })
  },

  // 初始化页码数组
  initPageList() {
    let length = this.data.currentTabQuestionBankCount
    let initPage = 1
    let pageList = new Array(length).fill(0)
    pageList = pageList.map(item => {
      return item = initPage++
    })
    this.setData({ pageList })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    this.enterPageCurrentTap(option)
    this.initCurrentTabQuestionsBank()
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

})