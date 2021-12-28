<template>
  <div class="container">
    <!-- 输入框 -->
    <div class="container-input">
      <form action="/">
        <van-search v-model="value" placeholder="请输入搜索关键词" @input="getCompleteResult" @search="searchKeywords" />
      </form>
    </div>

    <!-- 下方模糊查询结果显示 -->
    <div class="container-search-result">
      <div v-for="(item, index) in dropDownResult" :key="index">
        <div class="container-search-result-eval">
          <span style="color: #c8aa71">{{ keyWord }}</span>
          <span> {{ item }}</span>
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
      type: Array
    },
    keyWordsLength: {
      type: [String, Number],
      require: true
    }
  },
  data() {
    return {
      value: '', // 搜索内容
      dropDownResult: [] // 联想下拉数据项
    }
  },
  mounted() {},
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

        res.forEach((item) => {
          if (item.indexOf(val) != -1) {
            this.dropDownResult.push(this.highLight(item, val))
          }
        })

        console.log(this.dropDownResult, '-->this.dropDownResult')

        // 下拉联想数据
        // this.dropDownResult = res
      }
    },

    /**
     * 模糊查询搜索高亮
     */
    highLight(str, key) {
      if (str.indexOf(key) != -1) {
        this.keyWord = key

        var reg = new RegExp(`(${key})`, 'gm')
        var replace = ''
        return str.replace(reg, replace)
      }
    },

    /**
     * 搜索结果
     */
    async searchKeywords(val) {
      const res = await new Promise((resolve, reject) => {
        return setTimeout(() => {
          resolve(['南京阿里巴巴1', '南京阿里巴巴12', '南京阿里巴巴13', '南京阿里巴巴23'])
        }, 100)
      })

      // 下拉联想数据
      this.dropDownResult = res
    },

    cancel() {
      Toast('取消')
    }
  }
}
</script>

<style scoped lang="scss">
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
    padding-bottom: 20px;
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);

    .container-search-result-eval {
      font-size: 14px;
      padding: 20px 0 0 50px;
    }
  }
}
</style>
