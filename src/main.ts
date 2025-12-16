import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Habilitar raw body para webhook do Stripe
    rawBody: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // ✅ CORS (DEV): permite qualquer origin (inclui 192.168.1.62:3001)
  app.enableCors({
    origin: true, // reflete o Origin automaticamente
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "stripe-signature"],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("API de Loja de Cartas Pokémon")
    .setDescription("API para gerenciamento de cartas Pokémon, leilões, anúncios e pagamentos")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("cartas")
    .addTag("anuncios-venda")
    .addTag("carrinho")
    .addTag("pagamento")
    .addTag("leiloes")
    .addTag("comentarios")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = Number(process.env.PORT ?? 3000);

  // ✅ ajuda quando você acessa pela rede (IP)
  await app.listen(port, "0.0.0.0");

  console.log(`Backend: http://localhost:${port}`);
  console.log(`Swagger: http://localhost:${port}/api`);
}
bootstrap();
