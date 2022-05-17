import { Injectable } from '@nestjs/common';
import { commentsCreateDto } from '../dto/comments.create.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 1;
  }

  async createComment(id: string, comments: commentsCreateDto) {
    return 'hello world';
  }

  async plusLike(id: string) {}
}
