import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, UploadedFiles, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { storage } from './oss';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { MyLogger } from 'src/logger/my.logger';

@Controller('user')
export class UserController {
  private logger = new MyLogger();
  constructor(private readonly userService: UserService) { }

  @Post('new')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    this.logger.log('login message', 'login context');
    return this.userService.login(loginUserDto);
  }

  @Post('upload/avt')
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads/avatar',
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 3,
    },
    fileFilter: (req, file, cb) => {
      const extName = path.extname(file.originalname);
      if ([".png", ".jpg", ".gif"].includes(extName)) {
        return cb(null, true);
      }
      return cb(new BadRequestException('Upload file error!'), false);
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.path;
  }
 
  @Get('merge/file')
  mergeFile(@Query('file') fileName: string, @Res() res: Response) {
    const nameDir = 'uploads/' + fileName;
    // read file
    const files = fs.readdirSync(nameDir);

    let startPos = 0, countFile = 0;

    files.map(file => {
      // get path full
      const filePath = nameDir + '/' + file;
      const streamFile = fs.createReadStream(filePath);
      streamFile.pipe(fs.createWriteStream('uploads/merge/' + fileName, {
        start: startPos,
      })).on('finish', () => {
        countFile++;
        if(countFile === files.length) {
          fs.rm(nameDir, {recursive: true}, (err) => {
            if(err) {
              console.log('err', err);
            }
          });
        }
      });
      startPos += fs.statSync(filePath).size;
    })
    return res.json({
      link: `http://localhost:3000/uploads/merge/${fileName}`,
      fileName
    });
  }

  @Post('upload/large-file')
  @UseInterceptors(FilesInterceptor('files', 20, {
    dest: 'uploads',
  }))
  uploadLargeFile(@UploadedFiles() files: Express.Multer.File[], @Body() body: { name: string}) {
    console.log('files', files);
    console.log('body', body);

    // get file name
    const fileName = body.name.match(/^(.+)-(\d+)$/)?.[1] ?? body.name;
    const nameDir = 'uploads/chunks' + '-' + fileName;

    // mkdir
    if(!fs.existsSync(nameDir)) {
      fs.mkdirSync(nameDir);
    }

    //  copy file
    fs.copyFileSync(files[0].path, nameDir + '/' + body.name);

    // remove file
    fs.rmSync(files[0].path);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
