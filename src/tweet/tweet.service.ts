import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TweetService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}

  async createPrisma(createTweetDto: CreateTweetDto): Promise<Tweet> {
    return await this.prisma.tweet.create({
      data: { ...createTweetDto },
    });
  }

  async findAllPrisma(): Promise<Tweet[]> {
    return await this.prisma.tweet.findMany();
  }

  async findOnePrisma(id: number): Promise<Tweet> {
    return await this.prisma.tweet.findUnique({ where: { id } });
  }

  async updatePrisma(
    id: number,
    updateTweetDto: UpdateTweetDto,
  ): Promise<Tweet> {
    return await this.prisma.tweet.update({
      data: { ...updateTweetDto },
      where: { id },
    });
  }

  async removePrisma(id: number) {
    return await this.prisma.tweet.delete({ where: { id } });
  }
}
  