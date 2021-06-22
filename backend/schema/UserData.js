const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserDataSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        dateReserved: String,
        timeReserved: String
    }
);

module.exports = mongoose.model("UserData", UserDataSchema);