export class User{
    constructor(
        public s3:String,
        public name:String,
        public password:String,
        public email:String,
        public role:String,
        public manager:String,
    ){}
}