import { Module } from '@nestjs/common';
import { MiscelleanousService } from './miscelleanous.service';
import { MiscelleanousController } from './miscelleanous.controller';

@Module({
  controllers: [MiscelleanousController],
  providers: [MiscelleanousService]
})
export class MiscelleanousModule {}
