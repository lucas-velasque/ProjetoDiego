import { Test, TestingModule } from "@nestjs/testing";
import { CategoriaLeilaoService } from "./categoriaLeilao.service";

describe("CategoriaLeilaoService", () => {
  let service: CategoriaLeilaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaLeilaoService],
    }).compile();

    service = module.get<CategoriaLeilaoService>(CategoriaLeilaoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
