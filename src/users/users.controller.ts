import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';

@Controller('users')
export class UsersController {
  //   constructor(private readonly usersService: UsersService) {}

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() requestDto: UserUpdateRequestDto,
  ) {
    // return await this.usersService.update(id, requestDto);
    return '';
  }
}
