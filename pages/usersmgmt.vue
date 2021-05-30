<template>
  <v-container>
      <p class="display-3">Usersmgmt Page</p>
      <template>
  <v-data-table
    :headers="headers"
    :items="accounts"
    sort-by="id"
    sort-desc
    class="elevation-1"
    :loading="loading"
  >
  <template #item.firstname="{item}">
    <v-avatar size="32" class="mr-5"><v-img :src="`https://avatars.dicebear.com/api/avataaars/${item.lastname+item.firstname+item.id}.svg`"></v-img></v-avatar>
    {{ item.firstname }}  {{ item.lastname }}
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
              New User
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
                      v-model="editedItem.firstname"
                      label="First name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.lastname"
                      label="Last name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-model="editedItem.gender"
                      label="Gender"
                      :items="gender"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.birthdate"
                      label="Birthdate"
                      placeholder="YYYY-DD-MM"
                      v-mask="'####-##-##'"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.tel"
                      label="Phone number"
                      v-mask="'###-###-####'"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="8"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                  >
                    <v-select
                      v-model="editedItem.role"
                      label="Role"
                      :items="['user','admin']"
                    ></v-select>
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
      gender: ['Male','Female'],
      headers: [
        {text: "Id", value: 'id'},
        {
          text: 'First-last name',
          align: 'start',
          sortable: true,
          value: 'firstname',
        },
        { text: 'Birthdate', value: 'birthdate' },
        { text: 'Gender', value: 'gender' },
        { text: 'Email', value: 'email' },
        { text: 'Tel', value: 'tel' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        "role": "",
            "firstname": "",
            "lastname": "",
            "birthdate": "",
            "gender": "",
            "email": "",
            "tel": "",
      },
      defaultItem: {
        "role": "",
            "firstname": "",
            "lastname": "",
            "birthdate": "",
            "gender": "",
            "email": "",
            "tel": "",
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...mapFields(["accounts","auth","header"])
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
        this.editedIndex = this.accounts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true;
        this.loading = false;
        this.header = "success";
      }, Math.random() * (750 - 200) + 200);
      },

      deleteItem (item) {
        this.loading = true;
        setTimeout(() => {
        this.editedIndex = this.accounts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        this.loading = false;
        this.header = "success";
      }, Math.random() * (750 - 200) + 200);
      },

      deleteItemConfirm () {
        this.accounts.splice(this.editedIndex, 1)
        this.header = "success";
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
            Object.assign(this.accounts[this.editedIndex], {...this.editedItem })
          } else {
            this.accounts.push({id:  this.accounts.length+1,...this.editedItem });
          }
          this.close();
          this.loading = false;
          this.header = "success";
        }, Math.random() * (750 - 200) + 200);

      }
    },
  }
</script>