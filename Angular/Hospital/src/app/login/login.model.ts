export class LoginModel{
    constructor(
        public email:number=0,
        public userid:number=0,
        public login:Date=new Date(),
        public logout:Date=new Date()
        ){

        }
}