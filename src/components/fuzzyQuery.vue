<template>
  <div class='container'>
    <!-- 输入框 -->
    <div class='container-input'>
      <form action='/'>
        <van-search v-model='value' placeholder='请输入搜索关键词' @input='getCompleteResult' @search='searchKeywords' />
      </form>
    </div>

    <!-- 下方 模糊下拉搜索项 -->
    <div class='container-search-result' :style="{ display: showDropDown ? 'block' : 'none' }">
      <div v-for='(item, index) in dropDownResult' :key='index'>
        <div class='container-search-result-eval' @click='getCompleteKeyWord(htmlToText(item))'>
          <span v-html='item'></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'fuzzyQuery',
  props: {
    searchResult: {
      type: [Array, String]
    },
    keyWordsLength: {
      type: [String, Number],
      require: true
    },
    color: {
      type: [String, Number],
      require: true
    }
  },
  data() {
    return {
      value: '', // 搜索内容
      dropDownResult: [], // 联想下拉数据项
      showDropDown: false // 显示下拉数据
    }
  },
  mounted() {
  },
  methods: {
    /**
     * 模糊查询
     */
    async getCompleteResult(val) {
      // 模糊查询四字限制四字
      if (val.length >= this.keyWordsLength) {
        const res = await new Promise((resolve, reject) => {
          return setTimeout(() => {
            resolve(['南京阿里巴巴1', '南京阿里巴巴12', '南京阿里巴巴13', '南京阿里巴巴23', '南京阿里巴巴323', '南京阿里巴巴424', '南京阿里巴巴1241', '南京阿里巴巴12414', '南京阿里巴巴1241414'])
          }, 100)
        })

        // 重置
        this.dropDownResult = []
        this.showDropDown = true

        res.forEach((item) => {
          if (item.indexOf(val) != -1) {
            this.dropDownResult.push(this.highLight(item, val))
          }
        })
      }
    },

    /**
     * 模糊查询搜索高亮
     */
    highLight(str, key) {
      console.log(this.color)
      if (str.indexOf(key) != -1) {
        var reg = new RegExp(`(${key})`, 'gm')
        var replace = `<span style='color:${this.color}'>$1</span>`
        return str.replace(reg, replace)
      }
    },

    /**
     * 将HTML标签里的内容转为纯文本
     */
    htmlToText(htmlStr) {
      return htmlStr.replace(/<[^>]*>|/g, '')
    },

    /**
     * 确定选择内容
     */
    getCompleteKeyWord(keyWord) {
      this.value = keyWord
      this.showDropDown = false
      this.$emit('update:searchResult', this.value)
      this.searchKeywords(this.value)
    },

    /**
     * 搜索结果
     */
    async searchKeywords(val) {
      console.log(val, '--->search')

      // const res = await new Promise((resolve, reject) => {
      //   return setTimeout(() => {
      //     resolve(['南京阿里巴巴1', '南京阿里巴巴12', '南京阿里巴巴13', '南京阿里巴巴23'])
      //   }, 100)
      // })
      // // 下拉联想数据
      // this.dropDownResult = res
      // this.showDropDown = true
    },

    cancel() {
      Toast('取消')
    }
  }
}
</script>

<style scoped lang='scss'>
/deep/ .van-search__content--square {
  border-radius: 30px;
}

/deep/ .van-icon-search:before {
  color: #2a69c8;
  font-size: 40px;
}

.container {
  padding-top: 20px;
  width: 100vw;
  height: 100vh;

  .container-input {
    margin: 0 20px;
  }

  .container-search-result {
    width: 600px;
    height: 200px;
    margin: 0 70px;
    padding: 10px 0 20px 0;
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);

    .container-search-result-eval {
      font-size: 16px;
      padding: 30px 0 0 50px;
    }
  }
}
</style>
