export const config = () => ({
    cloudConnectionInformation : {        
      uri: process.env.MONGO_URI,
      //connectionName: 'MainClient'
    },
    localConnectionInformation : {        
      uri: process.env.MONGO_URI,
    }
})
