import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import { Reviews } from '../reviews/reviews.model';

@Table({
  timestamps: true, // Adds createdAt and updatedAt timestamps
  paranoid: true, // Enables soft deletes by adding a deletedAt timestamp
})
export class Users extends Model<Users> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @HasMany(() => Reviews, { foreignKey: 'userId', as: 'Reviews' })
  Reviews!: number;
}
