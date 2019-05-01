const Sequelize = require('sequelize');

module.exports = sequelize => {
    const Teacher = sequelize.define('Teacher', {
        teacherId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        degree:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    Teacher.associate = (models) => {  
        Teacher.belongsTo(models.user, {foreignKey: 'userId', sourceKey: 'userId'});
    };

    return Teacher;
};