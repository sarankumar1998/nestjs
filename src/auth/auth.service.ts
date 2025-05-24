import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../Entities/user.Entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
        private jwtService: JwtService,

    ) { }

    async signup(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepo.create({ username, password: hashedPassword });
        return this.usersRepo.save(user);
    }


    async login(username: string, password: string) {
        const users = await this.usersRepo.find({ where: { username } });
    //     if (!user) throw new UnauthorizedException('Invalid credentials');

    //     const isMatch = await bcrypt.compare(password, user.password);
    //     if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    //     const payload = { sub: user.id, username: user.username };
    //     const token = await this.jwtService.signAsync(payload);

    //     return {
    //         access_token: token,
    //     };
    // }
      if (!users || users.length === 0) {
    throw new UnauthorizedException('Invalid credentials');
  }

  for (const user of users) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = { sub: user.id, username: user.username };
      const token = await this.jwtService.signAsync(payload);

      return { access_token: token };
    }
  }

    }}
