export class ApiError{
  constructor(statuCode,message="Something went wrong",error=[],stack=""){
    super(message)
    this.statuCode=statuCode;
    this.message=message;
    this.data=null
    this.error=error
    
    if(stack){
      this.stack=stack
    }else{
      Error.captureStackTrace(this, this.constructor)
    }
  }
}