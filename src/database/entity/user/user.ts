import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  phoneNumber: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  phoneVerified?: boolean;

  @Column({ nullable: true })
  emailVerified?: boolean;

  @Column({ nullable: false, length: 50 })
  firstName: string;

  @Column({ nullable: false, length: 50 })
  lastName: string;

  @Column({ nullable: true, length: 50 })
  username?: string;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
