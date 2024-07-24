import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import User from './User';

@Table({
    tableName: 'tokens',
    timestamps: false,
})
class Token extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare token: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    declare expiresAt: Date;

    isExpired(): boolean {
        return new Date() > this.expiresAt;
    }
}

export default Token;
