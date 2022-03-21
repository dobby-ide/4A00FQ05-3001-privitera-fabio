const connection = require('./database/crudrepositoryAsync.js');
const idSchema = {
  type: 'array',
  items: [
    {
      type: 'number',
      minimum: -90,
      maximum: 90,
    },
    {
      type: 'number',
      minimum: -180,
      maximum: 180,
    },
  ],
};
const location = [320, 30];
const Validator = require('jsonschema').Validator;
const validator = new Validator();

const validation = validator.validate(location, idSchema);
if (validation.errors.length > 0) {
  console.log(validation.errors);
}


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
