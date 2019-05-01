const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const router = express.Router();
const jwt   = require("jsonwebtoken");
const verifyToken = require("../middleware/verify-token");
module.exports = (db) =>{
    const {student,teacher,user} = db; 
    router.post("/api/login", async (req, res) => {
        const {username, password} = req.body;
        const newUser = await user.findOne({ raw: true, where: {username} });
        if (!newUser) {
            res.json({status: 402, message: "User doesn't exist."})
        } else {   
                // compare password
                let specificUser;
                if (newUser.userType === 'student') {
                    specificUser = await student.findOne({where: {userId: newUser.userId}, include: { all: true }});
                } else if (newUser.userType === 'teacher') {
                    specificUser = await teacher.findOne({where: {userId: newUser.userId}, include: { all: true }});
                }    
                const match = bcrypt.compareSync(password, newUser.password);
                    if (match) {
                        const { username, password, userType, name, userId } = newUser;
                        const tokenUser = {
                           username, password, userType, name, userId
                        };
                        const token = jwt.sign({tokenUser}, process.env.JWT_KEY);
                        res.json({status: 200, token, user: tokenUser, specificUser})
                    } else {
                        res.json({status: 402, message: "Invalid credentials."});
                }        
        }
    });

    router.post("/api/signup",async(req,res)=>{
        console.log(req.body);
        const {userType,password,username,Name,age,address} = req.body;
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
        const hash = await bcrypt.hashSync(password, salt);
        
        const created = await user.create({
            username:username,
            password: hash,
            name:Name,
            age:age,
            userType:userType,
            address:address
        });

        if(created){
            if(userType==='student'){
                const newStudent = await student.create({userId:created.userId,grade:req.body.grade});
                if(newStudent){
                    res.json({status:200,message:"Created Student"});
                }else{
                    res.json({err: "Couldn't create student!", status: 500}) 
                }
            }else{
                const newTeacher = await teacher.create({userId:created.userId,degree:req.body.degree});
                if(newTeacher){
                    res.json({status:200,message:"Created Teacher"});
                }else{
                    res.json({err: "Couldn't create teacher!", status: 500}) 
                }
            }
        }else{
            res.json({err: "Couldn't create User!", status: 500}) 
        }
        
    });

    router.post("/api/verify-token", verifyToken, async (req, res) => {
        const foundUser = await user.findOne({ raw: true, where: {username: req.user.username} });
        if (!foundUser) {
            res.json({err: "Authentication failed!", status: 402})
        } else {
            res.json({status: 200, message: "Token verified.", user: req.user})
        }
    });

    return router;
}

