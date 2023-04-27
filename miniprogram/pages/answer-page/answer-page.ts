// pages/answer-page/answer-page.ts


Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 单选题题库
    singleAnswerBank: [
      {
        id: "001",
        title: "下面关于构造函数说法不正确的是？",
        options: [
          { optionId: "A", title: "构造函数中可以有return语句" },
          { optionId: "B", title: "每个类中都至少含有一个构造函数" },
          { optionId: "C", title: "一个类中可以有多个构造函数" },
          { optionId: "D", title: "一个类中构造函数的优先级高于构造代码块" },
        ],
        answer: { optionId: "D", title: "一个类中可以有多个构造函数" },
        key: "构造代码块优先于任意形式的构造方法先执行",
      }, {
        id: "002",
        title: "下列标识符定义不正确的是？",
        options: [
          { optionId: "A", title: "HelloWord" },
          { optionId: "B", title: "main" },
          { optionId: "C", title: "char" },
          { optionId: "D", title: "_123" },
        ],
        answer: { optionId: "C", title: "char" },
        key: "标识符不能是关键字",
      }, {
        id: "003",
        title: "下面哪个类未实现或继承Collection接口？",
        options: [
          { optionId: "A", title: "HashMap" },
          { optionId: "B", title: "ArrayList" },
          { optionId: "C", title: "Vector" },
          { optionId: "D", title: "HaseSet" },
        ],
        answer: { optionId: "A", title: "HashMap" },
        key: "集合类主要由２个接口派生：Collection，Map",
      }, {
        id: "004",
        title: "下面有关java hashmap的说法错误的是？",
        options: [
          { optionId: "A", title: "HashMap的实例有两个参数影响其性能：“初始容量”和“加载因子”" },
          { optionId: "B", title: "HashMap的实现不是同步的，意味着他不是线程安全的" },
          { optionId: "C", title: "HashMap通过开放地址法解决哈希冲突" },
          { optionId: "D", title: "HashMap中的key-value都是存储在Entry数组中的" },
        ],
        answer: { optionId: "C", title: "HashMap通过开放地址法解决哈希冲突" },
        key: "HashMap是通过链地址法解决哈希冲突的",
      },
    ],
    // 多选题题库
    nonuniqueAnswerBank: [
      {
        id: "001",
        title: "中共七大把党在长期奋斗中形成的优良作风概括为三大作风，即（）这是中国共产党区别于其他政党的显著标志，是使党的路线、方针、政策得以顺利贯彻的根本保证",
        options: [
          { optionId: "A", title: "理论和实践相结合的作风" },
          { optionId: "B", title: "谦虚谨慎、艰苦朴素的工作作风" },
          { optionId: "C", title: "和人民群众紧密联系在一起的作风" },
          { optionId: "D", title: "批评与自我批评的作风" },
        ],
        answer: [
          { optionId: "A", title: "理论和实践相结合的作风" },
          { optionId: "C", title: "和人民群众紧密联系在一起的作风" },
          { optionId: "D", title: "批评与自我批评的作风" },
        ],
        key: "这是第一道多选题，详见2021年党史教育知识考试题"
      },
      {
        id: "002",
        title: "我国进行的社会主义改革，是（）",
        options: [
          { optionId: "A", title: "社会主义社会发展的动力" },
          { optionId: "B", title: "社会主义现代化的必由之路" },
          { optionId: "C", title: "中国的第二次革命" },
          { optionId: "D", title: "社会主义制度的自我完善" },
        ],
        answer: [
          { optionId: "A", title: "社会主义社会发展的动力" },
          { optionId: "B", title: "社会主义现代化的必由之路" },
          { optionId: "C", title: "中国的第二次革命" },
          { optionId: "D", title: "社会主义制度的自我完善" },
        ],
        key: "这是第二道多选题，详见2021年党史教育知识考试题"
      }, {
        id: "003",
        title: "党的十七大是在我国改革发展关键阶段召开的一次十分重要的大会下列选项属于这次大会主题的是（）",
        options: [
          { optionId: "A", title: "高举中国特色社会主义伟大旗帜" },
          { optionId: "B", title: "深入贯彻落实科学发展观" },
          { optionId: "C", title: "继续解放思想，坚持改革开放" },
          { optionId: "D", title: "为中华民族伟大复兴而奋斗" },
        ],
        answer: [
          { optionId: "A", title: "高举中国特色社会主义伟大旗帜" },
          { optionId: "B", title: "深入贯彻落实科学发展观" },
          { optionId: "C", title: "继续解放思想，坚持改革开放" },
          { optionId: "D", title: "社会主义制度的自我完善" },
        ],
        key: "这是第三道多选题，详见2021年党史教育知识考试题"
      },
    ],
    //问答题题库
    essayAnswerBank: [
      {
        id: "001",
        title: "TCP 和 UDP 的区别？",
        key: "（1）TCP 是面向连接的，udp 是无连接的即发送数据前不需要先建立链接。（2）TCP 提供可靠的服务。也就是说，通过 TCP 连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP 尽最大努力交付，即不保证可靠交付。 并且因为 tcp 可靠，面向连接，不会丢失数据因此适合大数据量的交换。（3）TCP 是面向字节流，UDP 面向报文，并且网络出现拥塞不会使得发送速率降低（因此会出现丢包，对实时的应用比如 IP 电话和视频会议等）。（4）TCP 只能是 1 对 1 的，UDP 支持 1 对 1,1 对多。（5）TCP 的首部较大为 20 字节，而 UDP 只有 8 字节。（6）TCP 是面向连接的可靠性传输，而 UDP 是不可靠的。"
      },
      {
        id: "002",
        title: "简单说一下闭包？",
        key: "闭包是指有权访问另外一个函数作用域中的变量的函数。闭包就是函数的局部变量集合，只是这些局部变量在函数返回后会继续存在。闭包就是就是函数的“堆栈”在函数返回后并不释放，我们也可以理解为这些函数堆栈并不在栈上分配而是在堆上分配。当在一个函数内定义另外一个函数就会产生闭包。"
      },
      {
        id: "003",
        title: "简单说一下事件委托？",
        key: "把一个元素响应事件（click、keydown......）的函数委托到另一个元素；优点：减少内存消耗、动态绑定事件。"
      },

    ],
    // 题目类型
    questionType: ["单选题", "多选题", "填空题", "问答题"],
    currentNavTab: 0, //当前题库索引
    currentQuestionItemTab: 0, //当前题目在题库的索引
    currentTabQuestionTotalCount: 0, //当前题库的总题目数量
    currentQuestionListState: [] as any, // -1表示错误，0表示未完成，1表示正确 
    selectedOption: [] as any,//已选择的选项，用于改变颜色
    options: [] as any, //多选时单个题目的临时选项存储数组
    valueList: [] as any, //问答题答案存储

  },
  // 初始化题库
  InitQuestionList(type:any) {
    type += ""
    wx.request({
      url: "http://localhost:3001/api/get_questions_list_no_answer_by_TYPE",
      method: "GET",
      data: {
        type,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },

  // 进入页面时选择默认tab
  enterPageCurrentTap(option: any) {
    let currentNavTab = Number(option.type)
    this.setData({
      currentNavTab
    })
    this.changeCurrentTapTotalCount(currentNavTab)
    this.getCurrentQuestionListState(currentNavTab)
  },
  // 改变当前选中tab的总题目数量
  changeCurrentTapTotalCount(currentNavTab: number) {
    let count = 0
    switch (currentNavTab) {
      case 0:
        count = this.data.singleAnswerBank.length
        break;
      case 1:
        count = this.data.nonuniqueAnswerBank.length
        break;
      case 2:
        count = this.data.essayAnswerBank.length
        break;
      default:
        count = 0
        break;
    }
    this.setData({ currentTabQuestionTotalCount: count })
  },
  // 切换导航tab，切换题库 
  handleChangeCurrentNavTabTap(e: any) {
    let index = e.target.dataset.index
    if (index == this.data.currentNavTab) { return }
    let that = this
    // 警告
    wx.showModal({
      title: '警告',
      content: `放弃已完成的${this.data.questionType[this.data.currentNavTab]}，切换到${this.data.questionType[index]}`,
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          that.setData({
            currentNavTab: index,
            currentQuestionItemTab: 0
          })
          // 每次切换tab都抓取一下当前tab题目数量
          that.changeCurrentTapTotalCount(index)
          // 每次切换都清空已选择项和状态，以及问答题填写情况
          that.setData({
            selectedOption: [],
            // 删除原本存储的临时options，为下一道题多选题做准备
            options: [],
            valueList: []
          })
          // 获取currentQuestionListState
          that.getCurrentQuestionListState(index)
          // 初始化
          that.InitQuestionList(that.data.currentNavTab)
        } else {//这里是点击了取消以后
          return
        }
      }
    })
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
      options: this.data.selectedOption[this.data.currentQuestionItemTab] || []
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
    if (this.data.currentQuestionItemTab < this.data.currentTabQuestionTotalCount - 1) {
      this.setData({
        currentQuestionItemTab: this.data.currentQuestionItemTab + 1,
        // isShowQuestionKey: false
      })
      this.setData({
        // 删除原本存储的临时options，为下一道题多选题做准备
        // 如果当前selectedOption中存在，则不删除，直接换
        options: this.data.selectedOption[this.data.currentQuestionItemTab] || []
      })
    }
  },
  // 提交跳转到结果页面
  handleToResultPage() {
    let questionsBank = ""
    if (this.data.currentNavTab == 0) {
      questionsBank = JSON.stringify(this.data.singleAnswerBank)
    } else if (this.data.currentNavTab == 1) {
      questionsBank = JSON.stringify(this.data.nonuniqueAnswerBank)
    } else if (this.data.currentNavTab == 2) {
      questionsBank = JSON.stringify(this.data.essayAnswerBank)
    }
    let currentQuestionListState = JSON.stringify(this.data.currentQuestionListState)
    let valueList = JSON.stringify(this.data.valueList)
    wx.navigateTo({
      url: "../result-page/result-page?currentQuestionListState=" + currentQuestionListState + "&questionsBank=" + questionsBank + "&currentNavTab=" + this.data.currentNavTab + "&valueList=" + valueList
    })
  }
  ,
  // 点击选项
  handleSelectOptionTap(e: any) {
    let item = e.target.dataset.item //选项对象
    let tab = this.data.currentNavTab  //题库
    let questionItem = this.data.currentQuestionItemTab  //当前题目索引
    let selectedOption = this.data.selectedOption
    let optionItem = item.optionId
    if (tab === 0) {  // 单选
      let correctId = this.data.singleAnswerBank[questionItem].answer.optionId
      // 单选正确，如果错题里面有这道，则删除这道错题
      if (item.optionId && item.optionId === correctId) {
        this.data.currentQuestionListState[questionItem] = "1"
      } else if (item.optionId && item.optionId !== correctId) {
        // 单选错误，如果错题里面有这道，则不添加到错题集
        this.data.currentQuestionListState[questionItem] = "-1"
        // 错误后调用显示解析
        // this.handleIsShowQuestionKey()
      }
      // 当前选项变色，更改当前选择数组
      let i = -1
      switch (optionItem) {
        case "A":
          i = 0
          break;
        case "B":
          i = 1
          break;
        case "C":
          i = 2
          break;
        case "D":
          i = 3
          break;
      }
      selectedOption[questionItem] = i
      this.setData({
        selectedOption
      })
      this.handleNextQuestionTap() // 跳转下一题
    } else if (tab == 1) { //多选
      let nonuniqueAnswerBank = this.data.nonuniqueAnswerBank
      let i = -1
      switch (optionItem) {
        case "A":
          i = 0
          break;
        case "B":
          i = 1
          break;
        case "C":
          i = 2
          break;
        case "D":
          i = 3
          break;
      }
      let currentQuestionItemTab = this.data.currentQuestionItemTab
      let options = this.data.options
      // 去重
      if (options.indexOf(i) == -1) {
        this.data.options.push(i)
      } else if (options.indexOf(i) !== -1) {
        this.data.options.splice(options.indexOf(i), 1)
      }
      // 对options进行排序
      options.sort((a: any, b: any) => {
        return a - b
      })
      this.setData({ options: this.data.options })
      selectedOption[currentQuestionItemTab] = this.data.options
      this.setData({ selectedOption })
      // 生成答题状态
      let currentQuestionListState = this.data.currentQuestionListState
      let answerList = [-1]
      nonuniqueAnswerBank[currentQuestionItemTab].answer.map((item, index) => {
        let optionId = -1
        switch (item.optionId) {
          case "A":
            optionId = 0
            break;
          case "B":
            optionId = 1
            break;
          case "C":
            optionId = 2
            break;
          case "D":
            optionId = 3
            break;
        }
        answerList[index] = optionId
      })
      // 判断长度，长度正确判断对错
      if (selectedOption[currentQuestionItemTab].length == answerList.length) {
        let isTrue = selectedOption[currentQuestionItemTab].toString() == answerList.toString()
        if (isTrue) {
          currentQuestionListState[currentQuestionItemTab] = "1"
        } else { currentQuestionListState[currentQuestionItemTab] = "-1" }
      } else if (selectedOption[currentQuestionItemTab].length == "0") {
        currentQuestionListState[currentQuestionItemTab] = "0"
      } else { currentQuestionListState[currentQuestionItemTab] = "-1" }
      this.setData({ currentQuestionListState })
    }
    // }
  },
  // 显示题目解析，点击答案后调用更改值，切换题目后切换为默认值
  handleIsShowQuestionKey() {
    this.setData({
      isShowQuestionKey: true
    })
  },
  // 根据tab初始化currentQuestionListState
  getCurrentQuestionListState(currentNavTab: number) {
    let length = 0
    if (currentNavTab === 0) {
      length = this.data.singleAnswerBank.length
    } else if (currentNavTab === 1) {
      length = this.data.nonuniqueAnswerBank.length
    } else if (currentNavTab === 2) {
      length = this.data.essayAnswerBank.length
    }
    let currentQuestionListState = new Array(length)
    currentQuestionListState.fill(0)
    this.setData({
      currentQuestionListState
    })

  },

  // 问答题，监听表单变化，双向绑定数据
  handleGetTextareaChange(e: any) {
    let currentQuestionItemTab = this.data.currentQuestionItemTab
    let valueList = this.data.valueList
    let value = e.detail.value
    valueList[currentQuestionItemTab] = value
    this.setData({
      valueList
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    this.enterPageCurrentTap(option)
    this.InitQuestionList(this.data.currentNavTab)
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