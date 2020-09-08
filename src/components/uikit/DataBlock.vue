<template lang="pug">
  .data-block(v-if="data && data.length")
    .title {{title}}

    table: tbody
      tr(v-for="(it, idx) in data" @click="copyValue($event, it)")
        td {{it.label}}
        td
          .copied-notification {{$t('viewer.value_copied')}}
          .td-value(@click="activateLong(it, $event)"
                    v-if="it.value"
                    :class="{long: it.long, active: it.long && it.value === activeLongValue}")
            template(v-if="!it.html") {{it.value}}
            template(v-else): span(v-html="it.value")
</template>

<style lang="stylus" scoped>
  @import '../../assets/style/table'
  @import '../../assets/style/data_block'
  @import '../../assets/style/copy'
  @import '../../assets/style/long'
</style>

<script>
  import CopyMixin from '@/mixins/copy';
  import LongMixin from '@/mixins/long';

  export default {
    name: 'data-block',

    mixins: [CopyMixin, LongMixin],

    props: ['title', 'data']
  };
</script>
