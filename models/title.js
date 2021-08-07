
module.exports = (sequelize, Sequelize) => {


    const title_many = sequelize.define("title_many", {

        title: {
            type: Sequelize.STRING
        },


    });


    return title_many;
};