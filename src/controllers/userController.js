const { User } = require("../models");

exports.getAllUsers = async (_, res) => {
    console.log("Correct getAllUsers");
    const users = await User.findAll();
    res.json(users);
};

exports.getUserById = async (req, res) => {
    console.log("Correct getUserById");
    const { id } = req.params;
    const Users = await User.findByPk(id);
    res.json(Users);
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
};

exports.deleteUser = async (req, res) => {
    console.log("Correct deleteUser");
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.json({ message: `User ${user.firstName} ${user.lastName} has been deleted` });
};

exports.updateUser = async (req, res) => {
    console.log("Correct updateUser");
    const { id } = req.params;
    const user = await User.update(req.body, {
        returning: true,
        where: {
            id
        }
    });
    res.json(user);
};