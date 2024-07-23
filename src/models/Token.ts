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
    token: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    expiresAt: Date;

    isExpired(): boolean {
        return new Date() > this.expiresAt;
    }
}

export default Token;
