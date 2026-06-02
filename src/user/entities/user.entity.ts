import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity({
  name: 'jwt_user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @CreateDateColumn({
    comment: 'The date and time the user was created',
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: 'The date and time the user was last updated',
  })
  updatedAt: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'jwt_user_permissions',
  })
  permissions: Permission[];
}
