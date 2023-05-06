const { User } = require("../models");

exports.getAllUsers = async (_, res) => {
    console.log("Correct getAllUsers");
    const users = await User.findAll();
    res.json(users);
};

// exports.getAllUsers = async (_, res, next) => {
//     console.log("Correct getAllUsers");
//     const {offset, limit}= req.query;

//     try{
//         const users = await User.findAll({
//             offset,
//             limit
//         });
//         res.json(users);
//     }catch(error){
//         next(error);
//     }
// };

exports.createUser = async (req, res) => {
    console.log("Correct createUser");
    const user = await User.create(req.body);
    res.json(user);
}

