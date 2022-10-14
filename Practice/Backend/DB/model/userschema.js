const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    phone: String,
    password: String,
    admin: Boolean,
    consultancyId: String,
    created: Date,
    active: Boolean,
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

});
mongoose.pluralize(false);



//hasing the password
userSchema.pre('save', async function (next) {
    console.log("Inside Encryption")
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

//Generate Token
userSchema.methods.generateAuthtoken = async function () {

    try {
        console.log("Hello again");
        let tokenCheck = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: tokenCheck });
        await this.save();
        return tokenCheck;
    } catch (err) {
        console.log(err);
    }


}

const User = mongoose.model('User', userSchema);

module.exports = User;