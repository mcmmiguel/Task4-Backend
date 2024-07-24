import { Table, Model, Column, DataType, Default, AllowNull } from 'sequelize-typescript';

@Table({
    tableName: 'users'
})

class User extends Model {
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