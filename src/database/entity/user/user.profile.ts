import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { BloodGroup, Gender, Genotype } from 'src/interfaces/db.enums';

@Entity({ name: 'user_profiles' })
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ nullable: false })
  gender: Gender;

  @Column({ nullable: false, type: 'timestamptz' })
  dateOfBirth: Date;

  @Column({ nullable: true, length: 20 })
  emergencyContact?: string;

  @Column({ nullable: false })
  genotype: Genotype;

  @Column({ nullable: false })
  bloodGroup: BloodGroup;

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
