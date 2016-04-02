module.exports = function(mongoose) {

    //var FieldSchema = require("./field.schema.server.js")(mongoose);

    //use mongoose to declare a user schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {type: String, enum: ["TEXT","TEXTAREA", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]},
        placeholder: String,
        options: [
            {   label: String,
                value: String
            }
        ]
        // collection property sets
        // collection name to 'user'
    });
    return FieldSchema;
};