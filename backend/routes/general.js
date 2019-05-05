const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
module.exports = (db) =>{
    const {student,teacher,user} = db; 
    
    router.get("/api/user",verifyToken,async(req,res)=>{
        const verifyUser = req.user;
        //return res.json({status:200,message:"hello from route"});
        const profileUser = await user.findOne({where:{userId:verifyUser.userId}});
        if(profileUser){
            if(verifyUser.userType=='teacher'){
                const profileTeacher = await teacher.findOne({where:{userId:verifyUser.userId}});
                if(profileTeacher){
                    const teacher = {
                        name:profileUser.name,
                        age:profileUser.age,
                        degree:profileTeacher.degree,
                        gender:profileUser.gender,
                        address:profileUser.address,
                        
                    }
                    res.json({teacher:teacher,status:200,userType:profileUser.userType})
                }else{
                    res.json({err: "Couldn't Find Teacher!", status: 500}) 
                }
            }else{
                const profileStudent = await student.findOne({where:{userId:verifyUser.userId}});
                if(profileStudent){
                    const student = {
                        name:profileUser.name,
                        age:profileUser.age,
                        grade:profileStudent.grade,
                        gender:profileUser.gender,
                        address:profileUser.address,
                    }
                    res.json({student:student,status:200,userType:profileUser.userType})
                }else{
                    res.json({err: "Couldn't Find Student!", status: 500}) 
                }
            }
        }else{
            res.json({err: "Couldn't Find Teacher!", status: 500}) 
        }
       
    })

    return router;
}

