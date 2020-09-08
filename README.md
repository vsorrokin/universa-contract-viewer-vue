
## Description ##

Vue.js component to display universa contract data.

![Contract info example](/dev/screen.png?raw=true)

## Usage instructions ##

First install [universa-core](https://www.npmjs.com/package/universa-core).

    yarn add vue-universa-contract-viewer

And then:

    import VContractViewer from "vue-universa-contract-viewer";
    Vue.component("v-contract-viewer", VContractViewer);

Usage:

    <v-contract-viewer :data="contract"
                       :contract-id="..."
                       :style-config="{textColor: '0, 0, 0', bgColor: '255, 255, 255'}" />

**data** base64 contract string.

**contract-id** you can pass contract ID only. In this case contract status will be checked only.

**style-config** uses RGB color values.

Also you must have [vue-i18n](https://www.npmjs.com/package/vue-i18n) installed and configured with these keys in your lang file:

    {
      "viewer": {
        "value_copied": "Value copied to clipboard",
        "general": "General information",
        "Revision": "Revision",
        "revision": "revision",
        "branch": "branch",
        "issued": "Issued",
        "Expires": "Expires",
        "origin": "Origin",
        "parent": "Parent",
        "api_level": "API level",
        "definition_data": "Definition data",
        "state_data": "State data",
        "root_contract": "This is a root contract",
        "root_branch": "root branch",
        "owner": "Owner",
        "signatures_no_ref": "Signatures (references check is unavailable)",
        "Roles": "Roles",
        "checked_by_nodes": "Checked by {count} nodes",
        "contract_status": "Contract status",
        "Status": "Status",
        "Network": "Network",
        "approved_main": "Approved by Main Net",
        "approved_test": "Approved by Test Net",
        "storage": "Storage",
        "uni_cloud": "Unixchange private cloud",
        "download": "Download"
      }
    }
