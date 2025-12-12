import { Test, TestingModule } from "@nestjs/testing";
import { NivelUsuarioService } from "./nivelUsuario.service";
import { getModelToken } from "@nestjs/sequelize";
import { NivelUsuario } from "./nivelUsuario.model";

describe("NivelUsuarioService", () => {
  let service: NivelUsuarioService;
  let model: typeof NivelUsuario;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NivelUsuarioService,
        {
          provide: getModelToken(NivelUsuario),
          useValue: {
            create: jest.fn(),
            findAndCountAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NivelUsuarioService>(NivelUsuarioService);
    model = module.get<typeof NivelUsuario>(getModelToken(NivelUsuario));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("criar", () => {
    it("should create a nivelUsuario record", async () => {
      const criarDto = {
        nome: "Nível Teste",
        descricao: "Descrição do nível",
        pontuacaoMinima: 10,
        corIdentificacao: "#FFFFFF",
      };

      // Mock do retorno do create
      const createdNivelUsuario = { id: 1, ...criarDto };
      (model.create as jest.Mock).mockResolvedValue(createdNivelUsuario);

      const result = await service.criar(criarDto);

      expect(model.create).toHaveBeenCalledWith(criarDto);
      expect(result).toEqual(createdNivelUsuario);
    });
  });
});
