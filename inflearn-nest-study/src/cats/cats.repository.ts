import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import * as mongoose from 'mongoose';
import { CommentsSchema } from 'src/comments/comments.schema';
@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);

    /* 
    Schema hasn't beeb registered for model "comments" 오류가 발생했는데
    몽고디비 버전이랑 네스트가 호환되지 않아서 발생한 오류
    package.json 버전 명시 아래와 같이 수정
    "mongoose" : "^5.13.9"
    "@nestjs/mongoose" : "^8.0.1"
    */
    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel);

    return result;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      return !!result ? true : false;
    } catch (err) {
      throw new HttpException('db error', 500);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = fileName;

    const newCat = await cat.save();

    return newCat.readOnlyData;
  }
}
