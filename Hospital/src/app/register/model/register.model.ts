import { UserDTOModel } from "./userDTO.model";


export class registerModel
{
    constructor
        (
        public name:string="",
        public email:string="",
        public role: string="",
        public password: string="",
        public hashKey: string="",
        public passwordClear: string="",
        public specialization_name:string="",
        public experience:string="",
        public degree:string="",
        public image:string=""
        )
        {
            
        } 
}