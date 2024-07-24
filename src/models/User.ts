import { Table, Model, Column, DataType, Default, AllowNull } from 'sequelize-typescript';

export interface IUser {
    email: string;
    password: string;
    name: string;
    isBlocked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
@Table({
    tableName: 'users'
})

class User extends Model<IUser> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    declare email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare lastLogin: Date

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    declare isBlocked: boolean
}

export default User;