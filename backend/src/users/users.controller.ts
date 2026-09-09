import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';

import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request.type';
import { UpdateOwnUserData } from './dto/update-own-user-data.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // =============
  // SEFL
  // =============

  @Get('me')
  async getMe(@Request() request: AuthenticatedRequest) {
    return await this.findById(request.user.id);
  }

  @Patch('me')
  async updateOwnUserData(
    @Request() request: AuthenticatedRequest,
    @Body() updateOwnUserData: UpdateOwnUserData,
  ) {
    return await this.userService.updateOwnData(
      request.user.id,
      updateOwnUserData,
    );
  }

  // =============
  // ADMIN / USER MANAGEMENT
  // =============

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Roles('ADMIN')
  @Get()
  async findAll(@Query() query: FindUsersQueryDto) {
    return await this.userService.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.userService.delete(id);

    return {
      message: 'User deleted successfully',
    };
  }
}
