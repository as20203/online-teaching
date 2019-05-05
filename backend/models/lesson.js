const Sequelize = require('sequelize');

module.exports = sequelize => {
    const Lesson = sequelize.define('Lesson', {
        lessonId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        lessonName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    Lesson.associate = (models) => {
        Lesson.belongsTo(models.teacher, {foreignKey: 'teacherId', sourceKey: 'teacherId'});
    };

    return Lesson;
};