<template lang="pug">
  .status-block
    .title: i18n(path="viewer.checked_by_nodes")
      template(v-slot:count) {{nodesChecked}}/{{topologySize}}
    .nodes-counter
      .tick(v-for="n in topologySize" :class="{active: n <= nodesChecked}")

    v-data-block(:title="$t('viewer.contract_status')" :data="status")
</template>

<style lang="stylus" scoped>
  @import '../../assets/style/status'
</style>

<script>
  import dayjs from 'dayjs';

  import VDataBlock from '../uikit/DataBlock';

  let privateKey = `JgAcAQABvID2aGSNX6bzGyUAQjReoePsIwjrcKXvKR6mODV588tuxy2bJKiU
                    DoFuMwN2RDB+1RVEIxDN2oaU2phiu6cnNMEv99eQ02P2oxODzKKmO/80rLhI
                    TazKSa5vsyKcSeoa+iGKEtc/hCcK2qTcv10cq0qEXaNSMvw0K+A/LvCe5PgK
                    nbyA8Sk8tTUR5prey5zC6pl4utzITXuGmOAHIfeglUi/ilphXXXIYlcOKUBu
                    KzUH7k7nFn0R3JcxDAlwYJVuXsYSmjZyCaknLrCU1RV5fCJ0dunKdX6+glNM
                    p2eiCXdXCaE+HbKQZQFCz3zNSvBI45RIRFhKYR76OiD2xnJhQCATwJM=`;

  export default {
    name: 'contract-title',

    props: {
      contract: {
        required: false
      },
      contractId: {
        required: false
      },
      styleConfig: {
        required: true
      }
    },

    created() {
      this.fillNetworkInfo();
    },

    data() {
      return {
        topologySize: 33,
        nodesChecked: 0,
        checkDone: false,
        info: {

        },
        status: []
      }
    },

    methods: {
      async connect() {
        try {
          const boss = Uni.decode64(privateKey);
          privateKey = await Uni.PrivateKey.unpack(boss);
        } catch (e) {}


        const network = new Uni.Network(privateKey, {topologyKey: 'universa_topology'});

        await network.connect();

        return network;
      },

      onResponse(res) {
        if (this.nodesChecked >= this.topologySize || this.checkDone) return;

        this.info.createdAt = res.itemResult.createdAt;
        this.info.expiresAt = res.itemResult.expiresAt;

        this.nodesChecked++;
      },

      async fillNetworkInfo() {
        const network = await this.connect();

        this.topologySize = network.size();

        let status;

        try {
          const approvedId = this.contract ? (await this.contract.hashId()).base64 : this.contractId;
          status = await network.isApprovedExtended(approvedId, 0.6, this.onResponse);
        }
        catch (err) {
          console.log("on network command:", err);
          return;
        }

        this.checkDone = true;
        this.finishNodeLinesAnimation();

        this.fillStatus(status);
      },

      fillStatus(status) {
        let statusValue = this.getStateValue(status.states);
        let statusText = statusValue;

        if (this.info.createdAt) {
          statusText = `${statusValue}, ${dayjs(this.info.createdAt).format('YYYY DD MMM HH:mm')}`;
        }

        if (this.info.expiresAt) {
          statusText = `${statusText}<br/>${this.$t('viewer.Expires')} ${dayjs(this.info.expiresAt).format('YYYY DD MMM HH:mm')}`;
        }

        this.status = [
          {
            html: true,
            label: this.$t('viewer.Status'),
            value: statusText
          }
        ];

        if (statusValue !== 'UNDEFINED') {
          this.status.push({
            label: this.$t('viewer.Network'),
            value: status.isTestnet ? this.$t('viewer.approved_test') : this.$t('viewer.approved_main')
          });
        }
      },

      getStateValue(states) {
        const stateValues = Object.keys(states);

        let finalState = null;

        let maxNodesCount = 0;
        for (let i = 0; i < stateValues.length; i++) {
          const stateValue = stateValues[i];
          let nodesCount = states[stateValue];

          if (nodesCount > maxNodesCount) {
            maxNodesCount = nodesCount;
            finalState = stateValue;
          }
        }

        return finalState;
      },

      finishNodeLinesAnimation() {
        const activeCount = this.nodesChecked;

        for (let i = activeCount, l = this.topologySize; i < l; i++) {
          setTimeout(() => {
            this.nodesChecked++;
          }, 15 * (i - activeCount))
        }
      },
    },

    components: {
      VDataBlock
    }
  };
</script>
