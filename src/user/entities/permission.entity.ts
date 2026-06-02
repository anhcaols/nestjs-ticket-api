import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'jwt_permissions',
})
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    comment: 'Unique permission name',
  })
  name: string;

  @Column({
    length: 6,
  })
  nameCode: string;

  @CreateDateColumn({
    comment: 'The date and time the user was created',
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: 'The date and time the user was last updated',
  })
  updatedAt: Date;
}
