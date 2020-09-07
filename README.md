## Description ##

Vue.js component to display universa contract data.

## Usage instructions ##

First install [universa-core](https://www.npmjs.com/package/universa-core).

    yarn add vue-universa-contract-viewer

And then:

    import VContractViewer from "vue-universa-contract-viewer";
    Vue.component("v-contract-viewer", VContractViewer);

Usage:

    <v-contract-viewer :data="contract" :style-config="{textColor: '0, 0, 0', bgColor: '255, 255, 255'}" />

**contract** can be base64, BOSS or universa-core Contract object
**style-config** uses RGB color values

Also you must have [vue-i18n](https://www.npmjs.com/package/vue-i18n) installed and configured with these keys in your lang file:

    {
      "viewer": {
        "value_copied": "Value copied to clipboard",
        "general": "General information",
        "Revision": "Revision",
        "revision": "revision",
        "branch": "branch",
        "issued": "Issued",
        "expires": "Expires",
        "origin": "Origin",
        "parent": "Parent",
        "api_level": "API level",
        "def_data": "Definition data",
        "state_data": "State data",
        "root_contract": "This is a root contract",
        "root_branch": "root branch",
        "owner": "Owner"
      }
    }
