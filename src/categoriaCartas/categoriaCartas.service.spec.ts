import { Test, TestingModule } from "@nestjs/testing";
import { CategoriaCartasService } from "./categoriaCartas.service";

describe("CategoriaCartasService", () => {
  let service: CategoriaCartasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaCartasService],
    }).compile();

    service = module.get<CategoriaCartasService>(CategoriaCartasService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
