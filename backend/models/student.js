const Sequelize = require('sequelize');

module.exports = sequelize => {
    const Student = sequelize.define('Student', {
        studentId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        grade:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    Student.associate = (models) => {  
        Student.belongsTo(models.user, {foreignKey: 'userId', sourceKey: 'userId'});
    };

    return Student;
};