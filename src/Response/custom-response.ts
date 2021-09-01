export class CustomResponse{
    constructor(message : string, result : boolean, body : any){
        this.message = message
        this.wasSuccessful = result
        this.body = body
    }

    public message : string
    public wasSuccessful : boolean
    public body : any
}