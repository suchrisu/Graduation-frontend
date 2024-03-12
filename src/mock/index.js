const Mock = require("mockjs");
Mock.XHR.prototype.withCredentials = true
Mock.mock(/friend\/friendList/, 'post', () => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    return friendList
})

Mock.mock(/friend\/chatMsg/, 'post', (config) => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    let params = JSON.parse(config.body)
    if (params.frinedId == "1002")
        return chatMsg1002
    if (params.frinedId == "1003")
        return chatMsg1003
    if (params.frinedId == "1004")
        return chatMsg1004
})

Mock.mock(/session\/getSessionMsg/,'post', (config)=>{
    let params = JSON.parse(config.body)
    if (params.sessionId == "0")
        return chatMsg01
    if (params.sessionId == "1")
        return chatMsg02
    if (params.sessionId == "2")
        return chatMsg03
    return chatMsg04
})

Mock.mock(/chat\/getMsg/,'post',(config)=>{
    let params = JSON.parse(config.body)
    let chatMsgAssistant = Mock.mock(
        {
            headImg: require("@/assets/img/assistant.png"),
            name: "assitant",
            msg: "万能答案",
            chatType: 0,
            role: "assistant"
        }
    )

    

    

    chatMsgAssistant.msg = params.msg+chatMsgAssistant.msg
    return chatMsgAssistant
})

// Mock.mock(/session\/getSession/,'get',()=>{
//     return sessionList
// })





let sessionList = Mock.mock([
    {
        sessionName: "历史会话1",
        sessionDetail: "这是历史会话1",
        sessionId: "0",
        headImg: require("@/assets/img/head_portrait1.jpg")
    },
    {
        sessionName: "历史会话2",
        sessionDetail: "这是历史会话2",
        sessionId: "1",
        headImg: require("@/assets/img/head_portrait1.jpg")
    },
    {
        sessionName: "历史会话3",
        sessionDetail: "这是历史会话3",
        sessionId: "2",
        headImg: require("@/assets/img/head_portrait1.jpg")
    },
    {
        sessionName: "历史会话4",
        sessionDetail: "这是历史会话4",
        sessionId: "3",
        headImg: require("@/assets/img/head_portrait1.jpg")
    },
])


let chatMsg01 = [
    {
        role: "user",
        chatType: 0,
        msg: "历史对话1"
       
    },
    {
        name: "assitant",
        msg: "万能答案",
        chatType: 0,
        role: "assistant"
    },
]


let chatMsg02 = [
    {
        role: "user",
        chatType: 0,
        msg: "历史对话2"
       
    },
    {
        name: "assitant",
        msg: "万能答案",
        chatType: 0,
        role: "assistant"
    },
]

let chatMsg03 = [
    {
        role: "user",
        chatType: 0,
        msg: "历史对话3"
       
    },
    {
        name: "assitant",
        msg: "万能答案",
        chatType: 0,
        role: "assistant"
    },
]

let chatMsg04 = [
    {
        role: "user",
        chatType: 0,
        msg: "历史对话4"
       
    },
    {
        name: "assitant",
        msg: "万能答案",
        chatType: 0,
        role: "assistant"
    },
]



















































let chatMsg1002 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: " 在吗？",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },

        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "09：12 AM",
            msg: " 怎么了？",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "问你个问题",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "09：12 AM",
            msg: "别问",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
    ]
)
let chatMsg1003 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "在干嘛呢",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "吃饭",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "吃的什么饭",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "蛋炒饭",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "加蛋了吗？",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "你说呢",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1002", //uid
        },
    ]
)
let chatMsg1004 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: " sadasdawdas sadsad sad sad as despite ofhaving so much to do",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: "09：12 AM",
            msg: " 21312大萨达萨达",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "111212",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: "09：12 AM",
            msg: "大萨达萨达所大大萨达",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
    ]
)