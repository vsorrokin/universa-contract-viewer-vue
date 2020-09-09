<template lang="pug">
  v-data-block(:title="$t(`viewer.${type}_data`)" :data="info[type]")
</template>

<script>
  import VDataBlock from '../uikit/DataBlock';

  export default {
    name: 'contract-general-info',

    props: ['contract', 'type'],

    created() {
      this.fillStaticData();
    },

    data() {
      return {
        info: {
          [this.type]: null
        }
      }
    },

    methods: {
      fillStaticData() {
        const result = [];

        Object.keys(this.contract[this.type].data).forEach(label => {
          result.push({
            label,
            value: this.contract[this.type].data[label]
          });
        });

        this.info[this.type] = result;
      }
    },

    components: {
      VDataBlock
    }
  };
</script>
