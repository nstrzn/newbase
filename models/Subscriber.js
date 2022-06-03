const mongoose = require("mongoose");
subscriberSchema = mongoose.Schema({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    lowercase: true,
    unique: true, 
    required: true
},
zipCode: {
    type: Number,
    min: [1000, "Zip code too short"],
    max: [99999, "Zip code too long"],
},
themes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thema" }]
});

subscriberSchema.methods.getInfo = function() {
    return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};
  
subscriberSchema.methods.findLocalSubscribers = function() {
    return this.model("Subscriber")
      .find({ zipCode: this.zipCode })
      .exec();
};

module.exports = mongoose.model("Subscriber", subscriberSchema);

