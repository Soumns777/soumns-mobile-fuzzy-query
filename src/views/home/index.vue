
<template>
  <div>
    <fuzzyQuery :searchResult.sync="searchResult" :keyWordsLength.sync="keyWordsLength" />
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
  }
}
</script>

<style scoped></style>

