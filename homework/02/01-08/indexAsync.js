const connection = require('./database/crudrepositoryAsync.js');
const location = [20, 30];

const main = async () => {
  let connecting = await connection.connect();
  console.log(connecting);

  let findAll = await connection.findAll();
  console.log(findAll);
  let save = await connection.save(location);
  console.log(save);

  let deleteById = await connection.deleteById(3);
  console.log('affected rows: ' + deleteById.affectedRows);

  let findById = await connection.findById(7);
  let result = await findById;
  console.log(result);

  let closing = await connection.close((err) => console.log(err));
  //console.log(closing);
};
main();
