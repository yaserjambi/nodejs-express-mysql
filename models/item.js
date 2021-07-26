
module.exports = (sequelize, Sequelize) => {


    const items = sequelize.define("items", {

        item: {//إسم البند
            type: Sequelize.STRING
        },
        select: {// select
            type: Sequelize.STRING
        },

    });


    return items;
};