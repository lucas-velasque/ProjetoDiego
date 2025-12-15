-- Seed: 20 Cartas Pokémon populares
-- Execute no Supabase SQL Editor

INSERT INTO cartas (
  id, nome, descricao, tipo, raridade, pontos_saude, categoria_id,
  "descricaoPokedex", "danoCausado", ataque, "custoAtaque",
  "efeitosAtaque", ilustrador, "simboloExpansao", "numeroExpansao",
  fraqueza, resistencia, "custoRecuo", "descricaoNaPokedex", "categoriaId",
  custo_mana, elemento, expansao, numero_colecao, imagem_url, preco_medio,
  created_at, updated_at
) VALUES
  (1, 'Pikachu', 'O Pokémon Rato Elétrico', 'Pokémon', 'Comum', 60, NULL,
   'Este Pokémon armazena eletricidade nas bochechas.', 30, 'Choque do Trovão', '⚡⚡',
   'Paralisa o oponente 20% das vezes', 'Ken Sugimori', '⚡', '025/102',
   'Lutador', NULL, '⚡', 'Quando ameaçado, libera choques elétricos de suas bochechas.', NULL,
   2, 'Elétrico', 'Base Set', '025', 'https://images.pokemontcg.io/base1/58.png', 15.00,
   NOW(), NOW()),

  (2, 'Charizard', 'O Pokémon Chama', 'Pokémon', 'Holo Rara', 150, NULL,
   'Cospe fogo que é quente o suficiente para derreter pedregulhos.', 120, 'Labaredas', '🔥🔥🔥🔥',
   'Descarte 2 cartas de Energia Fogo', 'Mitsuhiro Arita', '🔥', '006/102',
   'Água', 'Lutador', '🔥🔥🔥', 'Voa em busca de oponentes fortes. Seu fogo derrete qualquer coisa.', NULL,
   4, 'Fogo', 'Base Set', '006', 'https://images.pokemontcg.io/base1/4.png', 350.00,
   NOW(), NOW()),

  (3, 'Blastoise', 'O Pokémon Marisco', 'Pokémon', 'Holo Rara', 140, NULL,
   'Os jatos de água de sua concha são muito precisos.', 80, 'Hidro Bomba', '💧💧💧',
   'Causa dano adicional por cada Energia Água extra', 'Ken Sugimori', '💧', '009/102',
   'Elétrico', NULL, '💧💧', 'Lança jatos de água com precisão mortal. Pode perfurar aço.', NULL,
   3, 'Água', 'Base Set', '009', 'https://images.pokemontcg.io/base1/2.png', 280.00,
   NOW(), NOW()),

  (4, 'Venusaur', 'O Pokémon Semente', 'Pokémon', 'Holo Rara', 140, NULL,
   'A planta nas costas cresce absorvendo raios solares.', 60, 'Chicote de Vinha', '🍃🍃🍃',
   'Cura 10 HP de todos os seus Pokémon de Planta', 'Mitsuhiro Arita', '🍃', '003/102',
   'Fogo', NULL, '🍃🍃', 'A flor em suas costas emite um aroma relaxante após chuva.', NULL,
   3, 'Planta', 'Base Set', '003', 'https://images.pokemontcg.io/base1/15.png', 290.00,
   NOW(), NOW()),

  (5, 'Mewtwo', 'O Pokémon Genético', 'Pokémon', 'Holo Rara', 120, NULL,
   'Foi criado por um cientista após anos de experimentos.', 100, 'Psíquico', '⭐⭐⭐',
   'Causa dano baseado nas Energias do oponente', 'Ken Sugimori', '⭐', '150/102',
   'Psíquico', NULL, '⭐⭐', 'Criado por manipulação genética. É extremamente selvagem.', NULL,
   3, 'Psíquico', 'Base Set', '150', 'https://images.pokemontcg.io/base1/10.png', 420.00,
   NOW(), NOW()),

  (6, 'Gyarados', 'O Pokémon Atrocidade', 'Pokémon', 'Rara', 130, NULL,
   'Raramente visto na natureza. Enorme e vicioso.', 90, 'Dragão Furioso', '💧💧💧💧',
   'Descarte 1 Energia para usar', 'Mitsuhiro Arita', '💧', '130/102',
   'Elétrico', NULL, '💧💧💧', 'Quando enraivecido, pode destruir uma cidade inteira.', NULL,
   4, 'Água', 'Base Set', '130', 'https://images.pokemontcg.io/base1/6.png', 65.00,
   NOW(), NOW()),

  (7, 'Alakazam', 'O Pokémon Psi', 'Pokémon', 'Rara', 100, NULL,
   'Seu cérebro pode superar um supercomputador.', 50, 'Confusão', '⭐⭐⭐',
   'Pode confundir o Pokémon Ativo do oponente', 'Ken Sugimori', '⭐', '065/102',
   'Psíquico', NULL, '⭐⭐', 'Seu QI ultrapassa 5.000. Lembra de tudo que já aconteceu.', NULL,
   3, 'Psíquico', 'Base Set', '065', 'https://images.pokemontcg.io/base1/1.png', 85.00,
   NOW(), NOW()),

  (8, 'Machamp', 'O Pokémon Superpoder', 'Pokémon', 'Rara', 140, NULL,
   'Com apenas um braço pode mover montanhas.', 80, 'Soco Sísmico', '⚔️⚔️⚔️⚔️',
   'Nocauteia automaticamente Pokémon Básicos', 'Ken Sugimori', '⚔️', '068/102',
   'Psíquico', NULL, '⚔️⚔️⚔️', 'Seus socos são tão rápidos que parecem centenas de golpes.', NULL,
   4, 'Lutador', 'Base Set', '068', 'https://images.pokemontcg.io/base1/8.png', 95.00,
   NOW(), NOW()),

  (9, 'Dragonite', 'O Pokémon Dragão', 'Pokémon', 'Rara', 130, NULL,
   'É capaz de dar a volta ao mundo em apenas 16 horas.', 70, 'Slam', '🔥🔥🔥🔥',
   'Jogue uma moeda, se coroa causa 100 de dano', 'Mitsuhiro Arita', '🐉', '149/102',
   'Incolor', NULL, '🔥🔥🔥', 'Voa mais rápido que o som. Muito inteligente e bondoso.', NULL,
   4, 'Dragão', 'Fossil', '149', 'https://images.pokemontcg.io/fossil/4.png', 180.00,
   NOW(), NOW()),

  (10, 'Gengar', 'O Pokémon Sombra', 'Pokémon', 'Rara', 110, NULL,
   'Sob a luz da lua cheia, sua sombra se move sozinha.', 60, 'Pesadelo', '⭐⭐⭐',
   'O Pokémon Adormecido recebe dano entre turnos', 'Ken Sugimori', '👻', '094/102',
   'Psíquico', 'Lutador', '⭐', 'Para roubar a vida de sua vítima, esconde-se nas sombras.', NULL,
   3, 'Fantasma', 'Fossil', '094', 'https://images.pokemontcg.io/fossil/5.png', 125.00,
   NOW(), NOW()),

  (11, 'Snorlax', 'O Pokémon Soneca', 'Pokémon', 'Rara', 150, NULL,
   'Não está satisfeito a menos que coma 400kg por dia.', 50, 'Corpo Slam', '⚪⚪⚪⚪',
   'Alto dano mas pode causar dano em si mesmo', 'Ken Sugimori', '⚪', '143/102',
   NULL, NULL, '⚪⚪⚪⚪', 'Come e dorme. É muito gentil, mas bloqueia estradas quando dorme.', NULL,
   4, 'Normal', 'Jungle', '143', 'https://images.pokemontcg.io/jungle/11.png', 110.00,
   NOW(), NOW()),

  (12, 'Lapras', 'O Pokémon Transporte', 'Pokémon', 'Rara', 120, NULL,
   'Transporta pessoas através do mar nas costas.', 50, 'Raio de Gelo', '💧💧💧',
   'Pode congelar o Pokémon oponente', 'Ken Sugimori', '💧', '131/102',
   'Elétrico', NULL, '💧💧', 'Adora transportar pessoas. Quase extinto devido à caça.', NULL,
   3, 'Água', 'Fossil', '131', 'https://images.pokemontcg.io/fossil/10.png', 88.00,
   NOW(), NOW()),

  (13, 'Eevee', 'O Pokémon Evolução', 'Pokémon', 'Comum', 50, NULL,
   'Possui genes irregulares que podem evoluir de várias formas.', 20, 'Ataque Rápido', '⚪',
   'Ataque simples e rápido', 'Ken Sugimori', '⚪', '133/102',
   'Lutador', NULL, '⚪', 'DNA instável permite evoluir para se adaptar ao ambiente.', NULL,
   1, 'Normal', 'Jungle', '133', 'https://images.pokemontcg.io/jungle/51.png', 22.00,
   NOW(), NOW()),

  (14, 'Vaporeon', 'O Pokémon Jato de Bolha', 'Pokémon', 'Incomum', 100, NULL,
   'Vive perto da água. Sua cauda se parece com barbatana.', 60, 'Hidro Canhão', '💧💧💧',
   'Causa dano pesado', 'Mitsuhiro Arita', '💧', '134/102',
   'Elétrico', NULL, '💧', 'Sua estrutura molecular é similar à da água. Pode se fundir nela.', NULL,
   3, 'Água', 'Jungle', '134', 'https://images.pokemontcg.io/jungle/12.png', 75.00,
   NOW(), NOW()),

  (15, 'Jolteon', 'O Pokémon Relâmpago', 'Pokémon', 'Incomum', 90, NULL,
   'Acumula íons negativos na atmosfera para lançar raios.', 50, 'Agulha de Alfinete', '⚡⚡',
   'Causa dano a todos os Pokémon do oponente', 'Mitsuhiro Arita', '⚡', '135/102',
   'Lutador', NULL, '⚡', 'Se irritado, seus pelos ficam em pé como agulhas afiadas.', NULL,
   2, 'Elétrico', 'Jungle', '135', 'https://images.pokemontcg.io/jungle/4.png', 72.00,
   NOW(), NOW()),

  (16, 'Flareon', 'O Pokémon Chama', 'Pokémon', 'Incomum', 100, NULL,
   'Quando acumula energia térmica, sua temperatura pode chegar a 900°C.', 60, 'Chamas', '🔥🔥🔥',
   'Descarte 1 Energia Fogo para usar', 'Mitsuhiro Arita', '🔥', '136/102',
   'Água', NULL, '🔥', 'Armazena calor em seu corpo. Pode chegar a 900 graus Celsius.', NULL,
   3, 'Fogo', 'Jungle', '136', 'https://images.pokemontcg.io/jungle/3.png', 78.00,
   NOW(), NOW()),

  (17, 'Articuno', 'O Pokémon Congelante', 'Pokémon', 'Holo Rara', 100, NULL,
   'Um Pokémon pássaro lendário que congela a água no ar.', 70, 'Nevasca', '💧💧💧💧',
   'Pode causar dano a todos os Pokémon', 'Mitsuhiro Arita', '❄️', '144/102',
   'Lutador', 'Lutador', '💧💧', 'Pássaro lendário do gelo. Dizem aparecer para pessoas perdidas.', NULL,
   4, 'Água/Voador', 'Fossil', '144', 'https://images.pokemontcg.io/fossil/2.png', 245.00,
   NOW(), NOW()),

  (18, 'Zapdos', 'O Pokémon Elétrico', 'Pokémon', 'Holo Rara', 100, NULL,
   'Um Pokémon pássaro lendário que causa tempestades massivas.', 90, 'Trovão', '⚡⚡⚡⚡',
   'Causa muito dano mas pode ferir a si mesmo', 'Mitsuhiro Arita', '⚡', '145/102',
   'Lutador', 'Lutador', '⚡⚡⚡', 'Lendário pássaro elétrico. Aparece durante tempestades.', NULL,
   4, 'Elétrico/Voador', 'Fossil', '145', 'https://images.pokemontcg.io/fossil/15.png', 265.00,
   NOW(), NOW()),

  (19, 'Moltres', 'O Pokémon Chama', 'Pokémon', 'Holo Rara', 100, NULL,
   'Um Pokémon pássaro lendário. Dizem aparecer antes da primavera.', 80, 'Fogo Selvagem', '🔥🔥🔥🔥',
   'Descarte todas as Energias Fogo anexadas', 'Mitsuhiro Arita', '🔥', '146/102',
   'Água', 'Lutador', '🔥🔥', 'Lendário pássaro de fogo. Sua aparição anuncia a primavera.', NULL,
   4, 'Fogo/Voador', 'Fossil', '146', 'https://images.pokemontcg.io/fossil/12.png', 255.00,
   NOW(), NOW()),

  (20, 'Ditto', 'O Pokémon Transformação', 'Pokémon', 'Rara', 50, NULL,
   'Pode se reorganizar celularmente para transformar-se.', 0, 'Transformação', '⚪',
   'Copia exatamente o Pokémon oponente', 'Ken Sugimori', '⚪', '132/102',
   NULL, NULL, '⚪', 'Reorganiza suas células para se transformar no que vê.', NULL,
   1, 'Normal', 'Fossil', '132', 'https://images.pokemontcg.io/fossil/3.png', 92.00,
   NOW(), NOW())

ON CONFLICT (id) DO NOTHING;

-- Verificar inserção
SELECT id, nome, raridade, elemento, preco_medio FROM cartas ORDER BY id;
