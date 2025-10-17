import { Test, TestingModule } from "@nestjs/testing";
import { CategoriaLeilaoController } from "./categoriaLeilao.controller";

describe("CategoriaLeilaoController", () => {
  let controller: CategoriaLeilaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaLeilaoController],
    }).compile();

    controller = module.get<CategoriaLeilaoController>(
      CategoriaLeilaoController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
