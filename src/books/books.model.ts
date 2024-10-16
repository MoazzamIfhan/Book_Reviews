import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  timestamps: true, // Adds createdAt and updatedAt timestamps
  paranoid: true, // Enables soft deletes by adding a deletedAt timestamp
})
export class Book extends Model<Book> {
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
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  publicationDate: String;

  @Column({
    type: DataType.BLOB,
    allowNull: true,
  })
  bookCover: any;
}
