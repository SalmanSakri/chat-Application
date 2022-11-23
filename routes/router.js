const express = require("express")

const router = express.Router();
const users = require("../models/userSchema");

// router.get("/",(req,res)=>{
//     console.log("connect");
// });

router.post("/register", async (req, res) => {
    const { name, email, age, mobile, work, address, description } = req.body;

    // if (!name || !email || !age || !mobile || !work || !address || !description) {
    //     res.status(422).json("plz fill the data");
    // }

    try {
        const presentuser = await users.findOne({ email: email, mobile: mobile });
        // console.log(presentuser);

        if (presentuser) {
            res.status(422).json("this is user is already present");

        } else {
            const adduser = new users({
                name, email, age, mobile, work, address, description
            });

            await adduser.save();
            res.status(201).json(adduser);
            // console.log(adduser);
        }
    } catch (error) {
        console.log(error)
        res.status(422).json(error)
    }

})


// get userdata

router.get("/getdata", async (req, res) => {
    try {
        const userdata = await users.find();
        res.status(201).json(userdata);
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error)
    }
})

// get user

router.get("/getuser/:id", async (req, res) => {
    try {
        // console.log(req.params);
        const { id } = req.params;

        const userindividual = await users.findById({ _id: id });
        // console.log(userindividual);
        res.status(201).json(userindividual)
    } catch (error) {
        res.status(422).json(error)
    }
})

// update user data

router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateduser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });

        // console.log(updateduser);
        res.status(201).json(updateduser);
    } catch (error) {
        res.status(422).json(error)
    }
})

// delete userdate

router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletuser = await users.findByIdAndDelete({ _id: id })
        // console.log(deletuser);
        res.status(201).json(deletuser);
    } catch (error) {
        res.status(422).json(error);
    }

})

module.exports = router;