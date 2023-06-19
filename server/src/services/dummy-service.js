import {  helper } from '../services/helper-service.js';
export const exec = () =>{
    const num = helper();

    if(num){
        return "Learning Js"; 
    }else{
        return "Learning React";
    }
}