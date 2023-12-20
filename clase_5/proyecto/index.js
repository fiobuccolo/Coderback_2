import moment from "moment";


// variable que almacene la fecha actual
let now = moment();
console.log(now);
// variableq ue almacene la fecha de nacimiento
let birthDate = moment("1986-08-14")
console.log(birthDate)

console.log(birthDate.isValid())
if(!birthDate.isValid()){
    console.log("Fecha erronea");
} 

console.log(now.diff(birthDate,"days"));
console.log(now.diff(birthDate,"years"));
