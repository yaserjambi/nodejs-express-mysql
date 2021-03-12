module.exports = (sequelize, Sequelize) => {
  const note = sequelize.define("note", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
  });

  return note;
};
