import gql from 'graphql-tag'
// TODO(Reda): Why this function import is not working 
export default function createProject(name: string) {
  return gql`
            mutation {
              insert_assets(
                objects: { 
                  name: ${name},
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
}