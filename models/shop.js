module.exports = (sequelize, DataTypes) => {
    const Shop = sequelize.define("shops", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });

    Shop.associate = (models) => {
        Shop.hasMany(models.products, {
          foreignKey: "fk_shop_id",
          as: "products",
        });
      };

    return Shop;
}