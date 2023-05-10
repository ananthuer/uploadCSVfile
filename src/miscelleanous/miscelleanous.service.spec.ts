import { Test, TestingModule } from '@nestjs/testing';
import { MiscelleanousService } from './miscelleanous.service';

describe('MiscelleanousService', () => {
  let service: MiscelleanousService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiscelleanousService],
    }).compile();

    service = module.get<MiscelleanousService>(MiscelleanousService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
