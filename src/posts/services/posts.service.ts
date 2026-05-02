import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll() {
    const posts = await this.postsRepository.find({
      relations: ['user.profile', 'categories'], //cargo la relacion con user y categories para que me traiga el user y las categorias asociadas a cada post.
    });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user.profile', 'categories'], //cargo la relacion con user para que me traiga el user asociado a ese articulo.
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async create(body: CreatePostDto) {
    try {
      const newPost = await this.postsRepository.save({
        ...body,
        user: { id: body.userId }, //asigno el userId al post, para que sepa a que user pertenece el post.
        categories: body.categoryIds?.map((id) => ({ id })), //asigno las categoryIds al post, para que sepa a que categorias pertenece el post.
      });
      return this.findOne(newPost.id); //devuelvo el post creado con su user asociado.
    } catch {
      throw new BadRequestException('Error creating post');
    }
  }

  async update(id: number, changes: UpdatePostDto) {
    try {
      const post = await this.findOne(id);
      const updatedPost = this.postsRepository.merge(post, changes);
      const savedPost = await this.postsRepository.save(updatedPost);
      return this.findOne(savedPost.id); //devuelvo el post actualizado con su user asociado.
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Error updating post');
    }
  }

  async remove(id: number) {
    try {
      await this.postsRepository.delete(id);
      return { message: 'Post deleted' };
    } catch (error) {
      throw new BadRequestException('Error deleting post');
    }
  }
}
