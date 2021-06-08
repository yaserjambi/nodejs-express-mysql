module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      imageUrl:{
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATEONLY,

      }
    });
  
    return Image;
  };
  