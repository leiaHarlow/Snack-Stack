const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/snacks');

let snackSchema = new mongoose.Schema({
  product: {type: String, unique: true},
  description: {type: String, unique: true},
  counter: {type: Number},
  image: {type: String, unique: true},
  stores: {type: Array, required: true},
});

const SnackModel = mongoose.model('snacks', snackSchema);


const save = (snackData, callback) => {

  SnackModel.create(snackData, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })

}

const change = (snackData, callback) => {
  console.log(snackData)
  SnackModel.updateOne({product: snackData.name}, {$set: {counter: snackData.counter, stores: snackData.store}}, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })
}

module.exports.SnackModel = SnackModel;
module.exports.save = save;
module.exports.change = change;