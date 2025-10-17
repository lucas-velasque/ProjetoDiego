import { Test, TestingModule } from "@nestjs/testing";
import { CategoriaCartasController } from "./categoriaCartas.controller";

describe("CategoriaCartasController", () => {
  let controller: CategoriaCartasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaCartasController],
    }).compile();

    controller = module.get<CategoriaCartasController>(
      CategoriaCartasController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
