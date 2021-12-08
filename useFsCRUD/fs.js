const fs = require('fs');
fs.readFile('student.json',"utf8",(error, data)=>{
  const list = JSON.parse(data);
})
function createStudent(id,name,age,gender,department) {
    fs.readFile('student.json',"utf8",(error, data)=>{
        const list = JSON.parse(data);
        /**
         * 
         * @param {*} id 
         * @returns student or undefined
         */
        function checkId(id) {
         return list.find(item => item.ID == id)
        }
        if(!checkId(id)) {
          list.push({ 
            "ID":  id, 
             "name": name,
             "age": age, 
            "gender": gender,
             "department": department
             })
             fs.writeFile('student.json',"utf8",JSON.stringify(list),(error)=> error)
        }else console.log('ID must be different')
      })
}
createStudent(2,'Viet Bao',25,'Male','Math');
function readStudent(id){
  fs.readFile('student.json',(error, data)=>{
    const list = JSON.parse(data);
    list.forEach((item) => {
      if(item.ID == id){
        console.log(item);
      }
    } )
  })
}
readStudent(1)
function updateStudent(id){
  fs.readFile('student.json',(error, data)=>{

  })
}
function delStudent(id){
  fs.readFile('student.json',(error, data)=>{
    const list = JSON.parse(data);
    list.forEach((item,index) => {
      if(item.ID == id){
        list.splice(index,1); 
      }
    })
    fs.writeFile('student.json',JSON.stringify(list),(error)=>console.log(error));
  })
}
// delStudent(2);

