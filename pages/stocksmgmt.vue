<template>
  <v-container>
      <p class="display-3">Stocksmgmt Page</p>
      <template>
  <v-data-table
    :headers="headers"
    :items="stocks"
    sort-by="id"
    sort-desc
    class="elevation-1"
    :loading="loading"
  >
  <template #item.product_name="{item}">
    <v-avatar size="32" class="mr-5"><v-img :src="`https://avatars.dicebear.com/api/jdenticon/${item.product_name+item.description+item.import_stuff}.svg`"></v-img></v-avatar>
    {{ item.product_name}}
  </template>
  <template #item.import_timestamp="{item}">
    {{$moment(item.import_timestamp).fromNow()}}
  </template>
  <template #item.export_timestamp="{item}">
    {{$moment(item.export_timestamp).fromNow()}}
  </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Management</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.product_name"
                      label="Product name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.amount"
                      label="Amount"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
    </v-container>
</template>

<script>
  import { mapFields } from "vuex-map-fields";
 
  export default {
    data: () => ({
      loading: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: "Id", value: 'id'},
        {
          text: 'Product name',
          align: 'start',
          sortable: true,
          value: 'product_name',
        },
        { text: 'Description', value: 'description'},
        { text: 'Stock', value: 'amount' },
        { text: 'Import date', value: 'import_timestamp' },
        { text: 'Export date', value: 'export_timestamp' },
        { text: 'Import staff', value: 'import_staff' },
        { text: 'Export staff', value: 'export_staff' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        product_name: '',
        description: '',
        amount: 0,
      },
      defaultItem: {
        product_name: '',
        description: '',
        amount: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...mapFields(["stocks","auth"])
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      
    },

    methods: {
      editItem (item) {
        this.loading = true;
        setTimeout(() => {
        this.editedIndex = this.stocks.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true;
        this.loading = false;
      }, Math.random() * (750 - 200) + 200);
      },

      deleteItem (item) {
        this.loading = true;
        setTimeout(() => {
        this.editedIndex = this.stocks.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        this.loading = false;
      }, Math.random() * (750 - 200) + 200);
      },

      deleteItemConfirm () {
        this.stocks.splice(this.editedIndex, 1)
        this.closeDelete()
        
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.loading = true;
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1;
          this.loading = false;
        })
      },
      save () {
        this.loading = true;
        setTimeout(() => {
          if (this.editedIndex > -1) {
            Object.assign(this.stocks[this.editedIndex], {...this.editedItem, export_timestamp: Date.now()})
          } else {
            this.stocks.push({id:  this.stocks.length+1,...this.editedItem, export_timestamp: Date.now(), import_timestamp:  Date.now(),import_staff: this.auth.user.id, export_staff: this.auth.user.id});
          }
          this.close();
          this.loading = false;
        }, Math.random() * (750 - 200) + 200);

      }
    },
  }
</script>