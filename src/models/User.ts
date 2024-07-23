import { Table, Model, Column, DataType, Default, AllowNull } from 'sequelize-typescript';

@Table({
    tableName: 'users'
})

class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    lastLogin: Date

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    registrationTime: Date;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    isBlocked: boolean
}

export default User;