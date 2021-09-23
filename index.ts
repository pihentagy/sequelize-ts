import { Optional } from 'sequelize';

const { DataTypes, Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('sqlite://./h.sqlite') // Example for sqlite

interface UserAttributes {
    id: number;
    firstName?: string;
    lastName?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}


class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public firstName!: string | null;
    public lastName!: string | null; // comment this line and field access will work!
}

User.init({
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'last-name',
        get() {
            return 'your ' + this.getDataValue('lastName');
        }
        // allowNull defaults to true
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    // modelName: 'User' // We need to choose the model name
});


async function main() {
    console.log('running sequelize');
    try {
        await sequelize.sync({ force: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
    await User.create({ 'firstName': 'World', 'lastName': 'hello' });
    (await User.findAll()).map((e) => console.log(`Lastname: ${e.lastName}, with get: ${e.get('lastName')}`));
}

main().then(function () {
    console.log("main ended");
});
