import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlacklistedTokenEntity } from '../entity/blacklist.entity';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(BlacklistedTokenEntity)
    private readonly blacklistRepository: Repository<BlacklistedTokenEntity>,
  ) {}

  async addToBlacklist(token: string, expiresIn: number): Promise<void> {
    const expiryDate = new Date(Date.now() + expiresIn * 1000);

    await this.blacklistRepository.upsert(
      {
        token,
        createdAt: new Date(),
        deletedAt: expiryDate,
      },
      ['token'],
    );
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.blacklistRepository.findOne({
      where: {
        token,
      },
    });
    return blacklistedToken !== null;
  }
}
