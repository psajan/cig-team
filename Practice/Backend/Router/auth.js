const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("../DB/connection");
const User = require("../DB/model/userschema");

router.get('/', (req, res) => {
    res.send('Hello world');
});

// Promise Approach
// router.post('/registeruser', (req, res) => {

//     const { userName, email, phone, password, admin, consultancyId, created, active } = req.body;
//     console.log(userName);
//     console.log(email);
//     console.log(phone);
//     console.log(password);
//     console.log(admin);
//     console.log(consultancyId);
//     console.log(created);
//     console.log(active);
//     if (!userName || !email || !phone || !password || !consultancyId || !created) {
//         return res.status(422).json({ error: "Field Empty" });
//     }
//     User.findOne({ email: email })
//     .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "Email already exists" });
//             }
//             const user = new User({ userName, email, phone, password, admin, consultancyId, created, active });
//             user.save()
//                 .then(() => {
//                     res.status(201).json({ message: "Registration Successful" })
//                 })
//                 .catch((err) => res.status(500).json({ error: "Registration Failed" })
//                 )
//         })
//         .catch(err => {console.log(err);})

// });

//Async Await approach
router.post('/registeruser', async (req, res) => {
    const { userName, email, phone, password, admin, consultancyId, created, active } = req.body;
    if (!userName || !email || !phone || !password || !consultancyId || !created) {
        return res.status(422).json({ error: "Field Empty" });
    }

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }
        const user = new User({ userName, email, phone, password, admin, consultancyId, created, active });


        const userRegister = await user.save();
        if (userRegister) {
            res.status(201).json({ message: "Registration Successful" })
        }
        else {
            res.status(500).json({ error: "Registration Failed" })
        }
    }
    catch {
        (err)
        console.log(err);
    }

});

//login route
router.post('/login', async (req, res) => {
    // console.log(req.body);
    // res.json({message:"awesome"});
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please enter a valid data" });
        }
        const userLogin = await User.findOne({ email: email });
        //console.log(userLogin);


        if (userLogin) {
            console.log("Hello");
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const tokenCheck = await userLogin.generateAuthtoken();
            console.log(tokenCheck);
            res.cookie("jwtoken",tokenCheck,{
            expires: new Date(Date.now()+2589200000), //cookie expires in 30 Days
            httpOnly:true
            });
            if (!isMatch) {
                res.json({ message: "User Not Found" });
            }
            else {
                console.log("User  Found")
                res.json({ message: "User Found" });
            }

        }
        else {
            res.json({ message: "User Not Found" });
        }


    }
    catch (arr) {

    }
});


module.exports = router;