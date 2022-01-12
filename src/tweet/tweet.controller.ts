import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags( 'tweet' )
@Controller('tweet')
export class TweetController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.createPrisma(createTweetDto);
  }

  @Get()
  findAll() {
    return this.tweetService.findAllPrisma();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tweetService.findOnePrisma(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetService.updatePrisma(+id, updateTweetDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.tweetService.removePrisma(+id);
  }
}
