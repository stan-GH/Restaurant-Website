const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        month: String,
        year: String,
        dates: Map
    }
);

module.exports = mongoose.model("Data", DataSchema);