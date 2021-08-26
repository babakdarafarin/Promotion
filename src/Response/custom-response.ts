export class CustomResponse{
    constructor(message : string, result : boolean){
        this.message = message
        this.wasSuccessful = result
    }

    public message : string
    public wasSuccessful : boolean
    public body : any
}