'use strict';

module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var productSchema = mongoose.Schema({
        '_id': String,
        'name': String,
        'imageUrl': String
    }, {collection:'Shopaholic.product'});
    return productSchema;
};
