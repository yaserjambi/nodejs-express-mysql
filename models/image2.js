module.exports = (sequelize, DataTypes) => {
    const Image2 = sequelize.define("image2", {
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
  
    return Image2;
  };
  