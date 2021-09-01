export const config = () => ({
    cloudConnectionInformation : {        
      uri: process.env.MONGO_URI
    },
    localConnectionInformation : {        
      uri: process.env.MONGO_URI,
    }
})
