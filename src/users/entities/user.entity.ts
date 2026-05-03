import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './profile.entity';
import { Post } from '../../posts/entities/post.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
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

  @BeforeInsert()
  async hashPassword() {
    // Aquí puedes implementar la lógica para hashear la contraseña antes de guardarla en la base de datos.
    this.password = await bcrypt.hash(this.password, 10);
  }
}
