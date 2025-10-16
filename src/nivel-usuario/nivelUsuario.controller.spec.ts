import { Test, TestingModule } from "@nestjs/testing";
import { NivelUsuarioController } from "./nivelUsuario.controller";

describe("NivelUsuarioController", () => {
  let controller: NivelUsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelUsuarioController],
    }).compile();

    controller = module.get<NivelUsuarioController>(NivelUsuarioController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
