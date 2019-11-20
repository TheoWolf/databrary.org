<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="title"
        label="Project title *"
        hint="Name your project something descriptive"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type a title']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import gql from 'graphql-tag'
// import cannot find the createProject module !?
// import { createProject as mutation } from '../graphql/createProject.ts'

export default {
  data () {
    return {
      title: null
    }
  },

  methods: {
    async onSubmit () {
      await this.createProject()

      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Submitted'
      })
    },

    onReset () {
      this.titile = null
    },

    async createProject () {
      // Call to the graphql mutation
      const results = await this.$apollo.mutate({
        // Query q
        // mutation: mutation(this.name)
        mutation: gql`
            mutation {
              insert_assets(
                objects: { 
                  name: ${this.title},
                  asset_type: project,
                  privacy_type: private
                }
              ) {
                returning {
                  id
                }
              }
            }
          `
      })

      const project = results.data.insert_assets.returning[0]
      this.$router.push({
        path: `/project/${project.id}`
      })
    }
  }
}
</script>
