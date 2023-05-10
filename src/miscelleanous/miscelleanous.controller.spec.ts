import { Test, TestingModule } from '@nestjs/testing';
import { MiscelleanousController } from './miscelleanous.controller';
import { MiscelleanousService } from './miscelleanous.service';

describe('MiscelleanousController', () => {
  let controller: MiscelleanousController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiscelleanousController],
      providers: [MiscelleanousService],
    }).compile();

    controller = module.get<MiscelleanousController>(MiscelleanousController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
