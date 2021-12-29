
<template>
  <div>
    <fuzzyQuery :searchResult.sync="searchResult" :keyWordsLength.sync="keyWordsLength" />

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
      searchResult: [],
      keyWordsLength: 4
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

