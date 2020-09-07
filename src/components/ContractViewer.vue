<template lang="pug">
  .universa-contract-viewer(:style="cssVars" v-if="contract")

    .contract-title
      svg.logo(version='1.1', xmlns='http://www.w3.org/2000/svg', width='31', height='34', viewBox='0 0 939 1024')
        title
        g
        path(:fill="`rgb(${styleConfig.textColor})`", d='M927.949 248.273l-448.201-245.466c-2.95-1.655-6.475-2.63-10.228-2.63s-7.278 0.975-10.335 2.685l0.107-0.055-448.242 245.466c-6.638 3.69-11.056 10.662-11.056 18.665 0 0.003 0 0.007 0 0.010v-0.001 490.105c0 0.003 0 0.006 0 0.010 0 8.004 4.418 14.975 10.948 18.609l0.108 0.055 448.076 245.466c2.95 1.655 6.475 2.63 10.228 2.63s7.278-0.975 10.335-2.685l-0.107 0.055 448.365-245.466c6.638-3.69 11.056-10.662 11.056-18.665 0-0.003 0-0.007 0-0.010v0.001-490.105c0-0.003 0-0.006 0-0.010 0-8.004-4.418-14.975-10.948-18.609l-0.108-0.055zM915.526 742.934l-133.582-72.878v-319.132c0-0.007 0-0.014 0-0.022 0-8.919-7.23-16.149-16.149-16.149-2.923 0-5.664 0.777-8.029 2.134l0.079-0.042-134.576 76.108c-9.108 5.223-15.146 14.887-15.155 25.961v135.737l-126.998-69.607v-474.701l434.411 237.889zM23.474 742.934v-461.823l129.442 71.014v320.001zM469.355 525.459l126.46 69.276-123.313 70.394c-0.953 0.547-2.095 0.869-3.313 0.869s-2.359-0.322-3.346-0.887l0.033 0.017-126.336-68.696zM457.596 505.127l-130.891 71.636v-142.898c0-0.017 0-0.037 0-0.057 0-8.705-4.797-16.29-11.891-20.255l-0.117-0.060-278.51-152.216 421.409-230.808zM176.394 364.796l21.904 12.174 104.804 57.309v155.612l-126.708 69.234zM315.194 609.848l139.463 76.025c4.184 2.348 9.183 3.731 14.505 3.731 5.529 0 10.71-1.493 15.161-4.098l-0.142 0.077 139.793-79.918c4.607-2.676 7.657-7.587 7.661-13.209v-153.376c0.006-2.352 1.293-4.403 3.199-5.491l0.031-0.016 123.644-69.897v306.419l-286.875 160.414c-0.68 0.386-1.494 0.614-2.36 0.614s-1.68-0.228-2.384-0.627l0.024 0.013-277.93-151.553zM469.355 1000.035l-433.169-237.309 128.365-70.394 290.932 158.841c3.95 2.236 8.673 3.555 13.706 3.555s9.757-1.319 13.847-3.628l-0.141 0.073 287.289-160.746 132.506 72.298z')
      .info
        .title {{info.name}}
        .desc {{info.description}}

    // General information
    .data-block
      .title {{$t('viewer.general')}}

      table: tbody
        tr(v-for="(it, idx) in info.general" @click="copyValue($event, it)")
          td {{it.label}}
          td
            .copied-notification {{$t('viewer.value_copied')}}
            .td-value(@click="activateLong(it, $event)"
                      v-if="it.value"
                      :class="{long: it.long, active: it.long && it.value === activeLongValue}")
              |{{it.value}}

    // Owner
    .data-block(v-if="info.ownerAdresses && info.ownerAdresses.length")
      .title {{$t('viewer.owner')}}

      table: tbody
        tr(v-for="(it, idx) in info.ownerAdresses" @click="copyValue($event, it)")
          td Key \#{{idx + 1}}
          td
            .copied-notification {{$t('viewer.value_copied')}}
            .td-value.long(@click="activateLong(it, $event)"
                           :class="{active: it.value === activeLongValue}")
              |{{it.value}}

    // Signatures
    .data-block(v-if="info.signatures && (info.signatures.keys.length || info.signatures.rolesList.length)")
      .title {{$t('viewer.signatures_no_ref')}}

      table: tbody
        tr(@click="copyValue($event, info.signatures.rolesList)")
          td {{$t('viewer.Roles')}}
          td
            .copied-notification {{$t('viewer.value_copied')}}
            .td-value
              |{{info.signatures.rolesList.value.join(', ')}}
        tr(v-for="it in info.signatures.keys" @click="copyValue($event, it)")
          td {{it.label}}
          td
            .copied-notification {{$t('viewer.value_copied')}}
            .td-value.long(@click="activateLong(it, $event)"
                           :class="{active: it.value === activeLongValue}")
              |{{it.value}}

    // State data
    .data-block(v-if="info.state")
      .title {{$t('viewer.state_data')}}

      table: tbody
        tr(v-for="it in info.state" @click="copyValue($event, it)")
          td {{it.label}}
          td
            .copied-notification {{$t('viewer.value_copied')}}
            .td-value(v-if="it.value")
              |{{it.value}}

    // Definition data
    .data-block(v-if="info.definition")
      .title {{$t('viewer.def_data')}}

      table: tbody
        tr(v-for="it in info.definition" @click="copyValue($event, it)")
          td {{it.label}}
          td
            .copied-notification {{$t('viewer.value_copied')}}
            .td-value(v-if="it.value")
              |{{it.value}}
</template>

<style lang="stylus" scoped>

  trans(props...)
    transition-timing-function: ease
    transition-duration: .3s
    transition-property: unquote(props)

  .contract-title
    position: relative
    padding-left: 50px
    margin-bottom: 50px

    .logo
      position: absolute
      height: 34px
      top: 0
      bottom: 0
      margin: auto
      left: 0

    .title
      font-size: 24px
    .desc
      font-size: 16px

  .data-block
    margin-bottom: 50px
    &:last-child
      margin-bottom: 0
    .title
      font-size: 20px
      margin-bottom: 20px
      font-weight: 700

  table
    width: 100%
    border-collapse: collapse
    table-layout: fixed
    font-size: 15px
    word-break: break-word

  td
    padding: 12px 0px 12px 0px
    border-bottom: "1px solid rgba(%s, 0.4)" % var(--text-color)
    height: 55px
    position: relative
    trans('padding')

    &:first-child
      padding-left: 10px

  tr
    cursor: pointer
    trans('background-color')
    &:hover
      background-color: "rgba(%s, 0.1)" % var(--text-color)
      td:first-child
        padding-left: 20px
    &:last-child
      td
        border-bottom: none

  .copied-notification
    position: absolute
    font-weight: 500
    color: #fff
    //background-color: "rgba(%s, 1)" % var(--bg-color)
    background-color: #147b14
    border-radius: 4px
    padding: 6px 12px 4px 12px
    transform: translateY(-50%)
    top: 50%
    left: 0
    opacity: 1
    pointer-events: none
    display: none
    z-index: 20
    &.visible
      display: block
      trans('opacity, transform')
      transition-duration: 1.5s
    &.active
      opacity: 0
      transform: translateY(-10px)

  .long
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    max-width: 70%
    display: inline-block
    line-height: 1
    margin-bottom: -0.25em
    border: "1px solid rgba(%s, 1)" % var(--text-color)
    padding: 6px 14px
    cursor: pointer
    font-size: 13px
    position: absolute
    transform: translateY(-50%)
    top: 50%

    trans('background-color, color, padding, trasform, box-shadow')
    transition-duration: .15s
    user-select: none

    &:hover
      background-color: "rgba(%s, 1)" % var(--text-color)
      color: "rgba(%s, 1)" % var(--bg-color)

    &.active
      word-break: break-all
      overflow: auto
      text-overflow: initial
      white-space: initial
      background: "rgba(%s, 1)" % var(--bg-color)
      z-index: 10
      padding: 27px
      box-shadow: "0px 0px 76px -20px rgba(%s, 1)" % var(--text-color)

      user-select: all
      &:hover
        color: "rgba(%s, 1)" % var(--text-color)

</style>

<script>
  function cap(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function selectText(el) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(el);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
  };

  function copy(val) {
    try {
      navigator.clipboard.writeText(val);
    } catch (e) {}
  }

  let privateKey = 'JgAcAQABvID2aGSNX6bzGyUAQjReoePsIwjrcKXvKR6mODV588tuxy2bJKiUDoFuMwN2RDB+1RVEIxDN2oaU2phiu6cnNMEv99eQ02P2oxODzKKmO/80rLhITazKSa5vsyKcSeoa+iGKEtc/hCcK2qTcv10cq0qEXaNSMvw0K+A/LvCe5PgKnbyA8Sk8tTUR5prey5zC6pl4utzITXuGmOAHIfeglUi/ilphXXXIYlcOKUBuKzUH7k7nFn0R3JcxDAlwYJVuXsYSmjZyCaknLrCU1RV5fCJ0dunKdX6+glNMp2eiCXdXCaE+HbKQZQFCz3zNSvBI45RIRFhKYR76OiD2xnJhQCATwJM=';

  export default {
    name: 'universa-contract-viewer',

    props: {
      data: {
        required: true
      },
      styleConfig: {
        type: Object,
        default() {
          return {
            textColor: '0, 0, 0',
            bgColor: '255, 255, 255'
          }
        }
      }
    },

    computed: {
      cssVars() {
        return {
          '--text-color': this.styleConfig.textColor,
          '--bg-color': this.styleConfig.bgColor
        }
      }
    },

    data() {
      return {
        activeLongValue: null,
        contract: null,
        info: {
          general: {
            rev: {
              label: this.$t('viewer.Revision'),
              value: null
            },
            issued: {
              label: this.$t('viewer.issued'),
              value: null
            },
            expires: {
              label: this.$t('viewer.expires'),
              value: null
            },
            id: {
              label: 'ID',
              value: null,
              long: true
            },
            origin: {
              label: this.$t('viewer.origin'),
              value: null,
              long: true,
              contractLink: true
            },
            parent: {
              label: this.$t('viewer.parent'),
              value: null,
              long: true,
              contractLink: true
            },
            api_level: {
              label: this.$t('viewer.api_level'),
              value: null
            }
          },

          definition: null,
          state: null,
          ownerAdresses: null,
          signatures: null,
          name: null,
          description: null
        }
      }
    },

    watch: {
      data() {
        this.loadContract();
      }
    },

    mounted() {
      this.loadContract();

      document.addEventListener('click', e => {
        if (e.target.classList.contains('long')) return;
        this.activeLongValue = null;
      });
    },

    methods: {
      loadContract() {
        if (!this.data) return;

        const boss = Uni.decode64(this.data);

        this.contract = Uni.Boss.load(boss).contract;

        console.log(this.contract);

        this.info.name = this.contract.definition.data.name;
        this.info.description = this.contract.definition.data.description;

        this.fillNetworkInfo();
        this.fillGeneralInfo();
        this.fillOwnerInfo();
        this.fillStaticData('state');
        this.fillStaticData('definition');
        this.fillSignatures();
      },

      async fillNetworkInfo() {
        const boss = Uni.decode64(privateKey);
        privateKey = await Uni.PrivateKey.unpackBOSS(boss);

        const network = new Uni.Network(privateKey, {topologyKey: 'universa_topology'});

        try {
          await network.connect();
        } catch (err) {
          console.log("network connection error: ", err);
          return;
        }

        let isApproved;

        try {
          const approvedId = (await this.contract.hashId()).base64
          isApproved = await network.isApproved(approvedId, 0.6);
        }
        catch (err) {
          console.log("on network command:", err);
          return;
        }

        console.log(isApproved);
      },

      async fillSignatures() {
        const keys = await this.contract.getSignatureKeys();

        const keyAddresses = [];
        keys.forEach((key, idx) => {
          keyAddresses.push({
            label: `Key #${idx + 1} (short)`,
            value: key.shortAddress58,
            long: true
          });

          keyAddresses.push({
            label: `Key #${idx + 1} (long)`,
            value: key.longAddress58,
            long: true
          });
        });

        const roles = {
          ...this.contract.state.roles,
          owner: this.contract.owner,
          issuer: this.contract.issuer,
          creator: this.contract.creator
        };

        const rolesList = [];

        for (let key in roles) {

          if (roles[key].availableFor({roles, keys})) {
            rolesList.push(roles[key].name);
          }

        }

        this.info.signatures = {
          keys: keyAddresses,
          rolesList: {value: rolesList}
        };
      },

      fillOwnerInfo() {
        this.info.ownerAdresses = this.contract.owner.addresses.map(it => {
          return {value: it.base58, long: true};
        });
      },

      async fillGeneralInfo() {
        const branch = this.contract.state.branchId ? `${this.$t('viewer.branch')} ${this.contract.state.branchId}` : this.$t('viewer.root_branch');
        this.info.general.rev.value = `${this.$t('viewer.revision')} ${this.contract.state.revision}, ${branch}`;

        this.info.general.issued.value = this.contract.definition.createdAt.toISOString();

        this.info.general.expires.value = this.contract.state.expiresAt.toISOString();

        this.info.general.id.value = (await this.contract.hashId()).base64;

        if (this.contract.origin) {
          this.info.general.origin.value = this.contract.origin.base64;
          this.info.general.origin.long = true;
          this.info.general.origin.contractLink = true;
        } else {
          this.info.general.origin.value = this.$t('viewer.root_contract');
          this.info.general.origin.long = false;
          this.info.general.origin.contractLink = false;
        }

        if (this.contract.parent) {
          this.info.general.parent.value = this.contract.parent.base64;
          this.info.general.parent.long = true;
          this.info.general.parent.contractLink = true;
        } else {
          this.info.general.parent.value = this.$t('viewer.root_contract');
          this.info.general.parent.long = false;
          this.info.general.parent.contractLink = false;
        }

        this.info.general.api_level.value = this.contract.version;
      },

      fillStaticData(key) {
        const result = [];

        Object.keys(this.contract[key].data).forEach(label => {
          result.push({
            label,
            value: this.contract[key].data[label]
          });
        });

        this.info[key] = result;
      },

      copyValue(e, it) {
        selectText(e.currentTarget.querySelector('.td-value'));

        copy(it.value);

        const copied = e.currentTarget.querySelector('.copied-notification');

        copied.classList.add('visible');

        setTimeout(() => {
          copied.classList.add('active');
        }, 500);

        setTimeout(() => {
          copied.classList.remove('visible');
          copied.classList.remove('active');
        }, 1500);
      },

      activateLong(it, e) {
        if (!it.long) return;

        this.activeLongValue = it.value;

        selectText(e.target);

        copy(it.value);
      }
    }
  };
</script>
