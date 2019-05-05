const Sequelize = require('sequelize');

module.exports = sequelize => {
    const User = sequelize.define('User', {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull:false 
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        age:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        
        userType:{
            type:Sequelize.STRING,
            allowNull:false,
           
        },
        address:{
            type:Sequelize.STRING,
            allowNull:false
        },
        gender:{
            type:Sequelize.STRING,
            allowNull:false,
            
        },
        userImage:{
            type:Sequelize.STRING,
            defaultValue:'http://localhost:5000/profile/square-image.png' 
        }
    });


    return User;
};