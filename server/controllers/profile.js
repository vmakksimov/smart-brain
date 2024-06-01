const { json } = require("body-parser");

const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}



const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  console.log(req.body)
  const { name, age, pet } = req.body.formInput;
  db('users')
    .where({ id })
    .update({ name })
    .then(result => {
      console.log("result on update", result)
      if (result) {
        console.log('here after the res update')
        // res.json('success')
        
        res.status(200).json('success')
      } else {
        res.status(400).json('not found')
      }
    })
    .catch(error => {
      console.log("catch in the update profile", error)
    })
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate
}