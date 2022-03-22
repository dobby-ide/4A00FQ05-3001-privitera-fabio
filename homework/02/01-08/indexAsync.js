const connection = require('./database/crudrepositoryAsync.js');
const location = [333, 30];

const mainById = async () => {
  //findById
  try {
    await connection.connect();
    const result = await connection.findById(33);
    console.log(result);
  } catch (err) {
    console.log('not a valid id');
  } finally {
    try {
      console.log(await connection.close());
    } catch (err) {
      console.log('connection still alive');
    }
  }
};

//findAll
const mainAll = async () => {
  try {
    await connection.connect();
    const result = await connection.findAll();
    console.log(result);
  } catch (err) {
    console.log('not a valid id');
  } finally {
    try {
      console.log(await connection.close());
    } catch (err) {
      console.log('connection still alive');
    }
  }
};
//save
const mainSave = async () => {
  try {
    await connection.connect();
    const result = await connection.save(location);
    console.log(result);
  } catch (err) {
    console.log('not been able to save it');
  } finally {
    try {
      console.log(await connection.close());
    } catch (err) {
      console.log('connection still alive');
    }
  }
};
const mainDelete = async () => {
  try {
    await connection.connect();
    const result = await connection.deleteById(22);
    console.log(result);
  } catch (err) {
    console.log('not been able to delete it');
  } finally {
    try {
      console.log(await connection.close());
    } catch (err) {
      console.log('connection still alive');
    }
  }
};
// let connecting = await connection.connect();
// console.log(connecting);

// let findAll = await connection.findAll();
// console.log(findAll);
// let save = await connection.save(location);
// console.log(save);

// let deleteById = await connection.deleteById(3);
// console.log('affected rows: ' + deleteById.affectedRows);

// let findById = await connection.findById(7);
// let result = await findById;
// console.log(result);

// let closing = await connection.close((err) => console.log(err));
//console.log(closing);

//mainAll();
//mainById();
//mainSave();
//mainDelete();