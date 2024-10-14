import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true, // Adds createdAt and updatedAt timestamps
  paranoid: true,   // Enables soft deletes by adding a deletedAt timestamp
})
export class Book extends Model<Book> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

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
    type: DataType.DATE,
    allowNull: false,
  })
  publicationDate: Date;

  @Column({
    type: DataType.BLOB,
    allowNull: true,
  })
  bookCover: any;
}
