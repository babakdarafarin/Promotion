export const config = () => ({
     cloudConnectionInformation : {        
        node: process.env.ELK_NODE,
        cloud: {
          id: process.env.ELK_CLOUD_ID
        },
        auth: {
            username: process.env.ELK_CLOUD_USERNAME,
            password: process.env.ELK_CLOUD_PASSWORD
        },
      },
      localConnectionInformation : {        
        node: process.env.ELK_NODE,
      }
})