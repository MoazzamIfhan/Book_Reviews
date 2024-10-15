import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from '../users/users.model';

@Table({
  timestamps: true, // Adds createdAt and updatedAt timestamps
  paranoid: true, // Enables soft deletes by adding a deletedAt timestamp
})
export class Reviews extends Model<Reviews> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: { len: [0, 5] },
  })
  rating: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: { len: [0, 500] },
  })
  review_text: string;

  @BelongsTo(() => Users, { foreignKey: 'userId', as: 'users' })
  userId: number;
}
