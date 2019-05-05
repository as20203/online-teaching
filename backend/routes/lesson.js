const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const upload  = require("../middleware/verify-lesson");

module.exports = (db) =>{
    const {student, teacher, user, lesson} = db;
    router.get("/api/lesson", async (req, res) => {
        const lessons = await lesson.findAll({include: [{model: teacher, include: [{model: user}]}]});
        res.status(200).json({message: "Lessons retrieved.", lessons})
    });

    router.get("/api/lesson/:lessonId", async (req, res) => {
        const {lessonId} = req.params;
        const lesson = await lesson.findOne({where: {lessonId}});
        if (lesson) {
            res.status(200).json({message: "Lesson retrieved.", lesson})
        } else {
            res.status(404).json({message: "Lesson not found."})
        }
    });

    router.post("/api/lesson",verifyToken,upload.single('lessonFile') , async (req, res) => {
        if(req.error){
            return res.status(402).json({
                message:req.error
            })
        }
        const {lessonName, description} = req.body;
        if (!req.user || (req.user && req.user.userType !== "teacher")) {
            res.status(402).json({message: "You are not authorized to create a lesson."});
        } else {
            const foundTeacher = await teacher.findOne({where: {userId: req.user.userId}});
            if (teacher) {
                const created = await lesson.create({lessonName, description,lessonFile:"http://localhost:5000/"+req.file.path ,teacherId: foundTeacher.teacherId});
                if (created) {
                    res.status(200).json({created, message: "Lesson created."})
                } else {
                    res.status(501).json({message: "Could not create a lesson."})
                }
            } else {
                res.status(401).json({message: "Teacher account doesn't exist."});
            }
        }
    });

    return router;
};

