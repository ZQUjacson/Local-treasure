// pages/shopList/shopList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopList:[],
        pageIndex:1,
        pageSize:20,
        catId: 1
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.title){
            wx.setNavigationBarTitle({
                title: options.title,
            });
        }
        this.setData({
            catId:options.cat
        })
        wx.request({
            url: 'https://locally.uieee.com/categories/'+this.data.catId+'/shops',
            data:{
                _limit:this.data.pageSize,
                _page:this.data.pageIndex
            },
            success:(res)=>{
                console.log(res)
                this.setData({
                    shopList:res.data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log('下拉')
        this.setData({
            pageIndex:1,
            shopList:[]
        });
        wx.request({
            url: 'https://locally.uieee.com/categories/' + this.data.catId + '/shops',
            data: {
                _limit: this.data.pageSize,
                _page: ++this.data.pageIndex
            },
            success: (res) => {
                var newList = this.data.shopList.concat(res.data)
                console.log(res)
                this.setData({
                    shopList: newList
                })
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        wx.request({
            url: 'https://locally.uieee.com/categories/' + this.data.catId + '/shops',
            data: {
                _limit: this.data.pageSize,
                _page: ++this.data.pageIndex
            },
            success: (res) => {
                var newList = this.data.shopList.concat(res.data)
                console.log(res)
                this.setData({
                    shopList: newList
                })
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})