<template>
  <div>
    <fuzzyQuery :searchResult.sync='searchResult' :keyWordsLength.sync='keyWordsLength' :color.sync='color' />

    {{ searchResultChanged }}
  </div>
</template>

<script>
import fuzzyQuery from '@/components/fuzzyQuery.vue'

export default {
  name: 'Home',
  components: {
    fuzzyQuery
  },
  data() {
    return {
      searchResult: [], // 搜索获取数据
      keyWordsLength: 4, // 关键字触发字数
      color: '#008CFF' // 关键字颜色
    }
  },
  computed: {
    searchResultChanged() {
      return console.log(this.searchResult)
    }
  }
}
</script>

<style scoped></style>
