<template lang="pug">
  #app
    <select class="lang-selector" v-model="$i18n.locale">
      <option v-for="lang in ['en', 'ru']" :key="lang">{{lang}}</option>
    </select>
    input(type="file" @change="submit")
    //v-contract-viewer(:data="contract" contract-id="NPo4dIkNdgYfGiNrdExoX003+lFT/d45OA6GifmcRoTzxSRSm5c5jDHBSTaAS+QleuN7ttX1rTvSQbHIIqkcK/zWjx/fCpP9ziwsgXbyyCtUhLqP9G4YZ+zEY/yL/GVE")
    v-contract-viewer(:data="contract" :topology="topology")
</template>

<style lang="stylus" scoped>
  #app
    margin: 100px

  .universa-contract-viewer
    margin-top: 100px
</style>


<script>
  import VContractViewer from '@/components/ContractViewer';

  import topology from './tunis.topology.json';

  console.log(topology);

  export default {
    name: 'universa-contract-viewer-page',

    data() {
      return {
        contract: null,
        topology
      }
    },

    methods: {
      submit(event) {
        const reader = new FileReader();

        reader.onload = (file) => {
          this.contract = reader.result.split('base64,')[1];
        }

        reader.readAsDataURL(event.target.files[0]);
      }
    },

    components: {
      VContractViewer
    }
  };
</script>
