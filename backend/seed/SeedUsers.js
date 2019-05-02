const bcrypt = require('bcrypt-nodejs');

module.exports = (db) =>{
const {user,student,teacher} = db;
let data = [
    { 
    name:"AS20203",
    username: 'as20203',
    password: '123',
    grade:'5th',
    userType:'student',
    age:18,
    address:'House No 586, Street 22, Rwp',
    gender:'M'
    },
    {  
    name:"JAWAD",
    username: 'jawad',
    password: '123',
    userType: "teacher",
    degree:'BE-SE',
    age:22,
    address:'House No 452, Street 21, Isb',
    gender:'M'
    },
    {
    name:"ALI",
    username: 'ali',
    password: '123',
    userType: "student",
    age:28,
    address:'House No 458, Street 21, Lhr',
    grade:'7th',
    gender:'M'

    },
    {
    name:"Noshi",
    username: 'noshi',
    password: '123',
    userType: "teacher",
    degree:'BS-CS',
    age:22,
    address:'F-10 Markaz, ISB',
    gender:'M'
    },
    { 
    name:"Usman",
    username: 'usman',
    password: '123',
    userType: "student",
    age:28,
    address:'House No 472, Street 21, Lhr',
    grade:'10th',
    gender:'M'
    },
    {
    name:"Kashif",
    username: 'kashif',
    password: '123',
    userType: "teacher",
    degree:'BS-CS',
    age:25,
    address:'F-7 Markaz, ISB',
    gender:'M'
    }
];
    

data.forEach(async (seed)=>{
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    const hash = bcrypt.hashSync(seed.password, salt);
    
    const created = await user.create({
        username:seed.username,
        password: hash,
        name:seed.name,
        age:seed.age,
        userType:seed.userType,
        address:seed.address,
        gender:seed.gender
    });

    if (seed.userType === "teacher") {
        await teacher.create({userId:created.userId,degree:seed.degree});
    } else if (seed.userType === "student") {
        await student.create({userId:created.userId,grade:seed.grade});
    }
})

}

 
