import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Index,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { AuthMethod } from 'src/interfaces/db.enums';

@Entity({ name: 'user_auths' })
export class UserAuth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @Index()
  @JoinColumn()
  user: User;

  @Column({
    nullable: false,
    type: 'enum',
    array: true,
    default: [AuthMethod.EMAIL_AND_PASSWORD],
  })
  nmethods: AuthMethod[];

  @Index({ unique: true, where: '"phoneNumber" IS NOT NULL' })
  @Column({ nullable: true })
  phoneNumber?: string;

  @Index({ unique: true, where: '"email" IS NOT NULL' })
  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
