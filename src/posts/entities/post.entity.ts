import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  content!: string;

  @Column({ type: 'varchar', length: 255, name: 'cover_image', nullable: true })
  coverImage!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  summary!: string;

  //Si el articulo es borrador
  @Column({ type: 'boolean', default: true, name: 'is_draft' })
  isDraft!: boolean;

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

  //Relaciones
  //Varios articulos pueden pertenecer a un mismo User
  @ManyToOne(() => User, (user) => user.posts, { nullable: false}) //nullable:false significa que un post tiene que tener un user asociado, no puede existir un post sin un user.
  @JoinColumn({ name: 'user_id' }) //especifico la FK a la cual "post" se va a unir con "user"
  user!: User;
}
