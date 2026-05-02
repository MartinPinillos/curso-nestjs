import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  //Agrego la relacion con Profile para el User, un User tiene un Profile.
  @OneToOne(() => Profile, { nullable: false, cascade: true }) //nullable:false significa que si o si un profile tiene que tener un user. //cascade:true significa que si se borra un user, se borra su profile asociado.
  @JoinColumn({ name: 'profile_id' })
  profile!: Profile;

  //Relacion con Posts, un User puede tener varios Posts
  @OneToMany(() => Post, post => post.user)
  posts!: Post[];
}
