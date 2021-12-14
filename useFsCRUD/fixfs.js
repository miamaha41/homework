const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const getAll = async () => {
  try {
    const dataString = await fs.promises.readFile(
      path.resolve(__dirname, "studen.json")
    );
    return JSON.parse(dataString);
  } catch (err) {
    throw err;
  }
};
const writeData = async (data) => {
  try {
    await fs.promises.writeFile(
      path.resolve(__dirname, "studen.json"),
      JSON.stringify(data)
    );
  } catch (error) {
    throw error;
  }
};
const createNewStudent = async (newStudent) => {
  try {
    newStudent.id = uuid.v4();
    if (!fs.existsSync(path.resolve(__dirname, "studen.json"))) {
      const newData = [newStudent];
      await writeData(newData);
      return;
    }
    const data = await getAll();
    data.push(newStudent);
    await writeData(data);
  } catch (err) {
      throw err;
  }
};
const newStudent = {
  name: "Hai Yen",
  age: 16,
};
const readStudent = async(id)=>{
try {
    const allUser = await getAll();
    const index = findIndex(allUser, id);
    if (index < 0) {
        throw new Error("Student not found!");
      }
    return allUser[index];
} catch (error) {
    throw error;
}
}
const findStudentById = (allUser, id) => {
  allUser.findIndex((student) => student.id === id);
};
const updateStudent = async (student) => {
  try {
    const { id, ...dataUpdate } = student;
    if (!id) {
      throw new Error("ID must be required!");
    }
    const allUser = await getAll();
    const index = findStudentById(allUser, id);
    if (index < 0) {
      throw new Error("Student not found!");
    }
    allUser[index] = {
      ...allUser[index],
      ...dataUpdate,
    };
    await writeData(allUser);
  } catch (err) {
    throw err;
  }
};
const deleteStudent = async (id) => {
  try {
    const allUser = await getAll();
    const index = findStudentById(allUser, id);
    if(index < 0){
        throw new Error("Student not found!");
    }
    allUser.splice(index, 1);
    await writeData(allUser);
  } catch (error) {
      throw error;
  }
};
