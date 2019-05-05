const bcrypt = require('bcrypt-nodejs');

module.exports = async (db) =>{
const {user,student,teacher, lesson} = db;
const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
const hash = bcrypt.hashSync('123', salt);

    await user.bulkCreate([
        { userId: 1, name:"AS20203", username: 'as20203', password: hash, age:25, address:'F-7 Markaz, ISB', gender:'M', userType: "student", },
        { userId: 2, name:"JAWAD", username: 'jawad', password: hash, age:25, address:'F-7 Markaz, ISB', gender:'M', userType: "teacher", },
        { userId: 3, name:"ALI", username: 'ali', password: hash, userType: "student", age:28, address:'House No 458, Street 21, Lhr', gender:'M' },
        { userId: 4, name:"Kashif", username: 'kashif', password: hash,age:25, address:'F-7 Markaz, ISB', gender:'M', userType: "teacher", },
        { userId: 5, name:"Usman", username: 'usman', password: hash, userType: "student", age:28, address:'House No 472, Street 21, Lhr', gender:'M' },
        { userId: 6, name:"Noshi", username: 'noshi', password: hash, userType: "teacher", age:22, address:'F-10 Markaz, ISB', gender:'M' }
    ]);

    await teacher.bulkCreate([
        {teacherId: 1, degree: "BE-SE", userId: 2},
        {teacherId: 2, degree: "BE-CS", userId: 4},
        {teacherId: 3, degree: "BE-EE", userId: 6},
    ]);
    await student.bulkCreate([
        {studentId: 1, grade: "10th", userId: 1},
        {studentId: 2, grade: "7th", userId: 3},
        {studentId: 3, grade: "9th", userId: 5},
    ]);

    await lesson.bulkCreate([
        {lessonId: 1, lessonName: "LESSON - 01", description: "DESCRIPTION OF LESSON - 01",lessonFile:'http://localhost:5000/lessons/Report-Project.pdf',teacherId: 1},
        {lessonId: 2, lessonName: "LESSON - 02", description: "DESCRIPTION OF LESSON - 02",lessonFile:'http://localhost:5000/lessons/Report-Project.pdf',teacherId: 2},
        {lessonId: 3, lessonName: "LESSON - 03", description: "DESCRIPTION OF LESSON - 03",lessonFile:'http://localhost:5000/lessons/SampleVideo_1280x720_2mb.mp4',teacherId: 3},
    ])

};

 
