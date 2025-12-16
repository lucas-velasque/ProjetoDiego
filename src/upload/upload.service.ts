import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private supabase: SupabaseClient;
  private bucketName = 'anuncios-fotos';

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials are not configured');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Faz upload de uma imagem para o Supabase Storage
   * @param file Buffer do arquivo
   * @param filename Nome do arquivo
   * @param folder Pasta dentro do bucket (opcional)
   * @returns URL pública da imagem
   */
  async uploadImage(
    file: Buffer,
    filename: string,
    folder?: string,
  ): Promise<string> {
    try {
      // Gerar nome único para o arquivo
      const timestamp = Date.now();
      const uniqueFilename = `${timestamp}-${filename}`;
      const path = folder ? `${folder}/${uniqueFilename}` : uniqueFilename;

      // Upload do arquivo
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .upload(path, file, {
          contentType: 'image/*',
          upsert: false,
        });

      if (error) {
        throw new Error(`Erro ao fazer upload: ${error.message}`);
      }

      // Obter URL pública
      const { data: publicUrlData } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(path);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Erro no upload:', error);
      throw error;
    }
  }

  /**
   * Deleta uma imagem do Supabase Storage
   * @param filePath Caminho do arquivo no bucket
   */
  async deleteImage(filePath: string): Promise<void> {
    try {
      const { error } = await this.supabase.storage
        .from(this.bucketName)
        .remove([filePath]);

      if (error) {
        throw new Error(`Erro ao deletar imagem: ${error.message}`);
      }
    } catch (error) {
      console.error('Erro ao deletar:', error);
      throw error;
    }
  }

  /**
   * Verifica se o bucket existe, se não, cria
   */
  async ensureBucketExists(): Promise<void> {
    try {
      const { data: buckets } = await this.supabase.storage.listBuckets();
      const bucketExists = buckets?.some((b) => b.name === this.bucketName);

      if (!bucketExists) {
        await this.supabase.storage.createBucket(this.bucketName, {
          public: true,
        });
        console.log(`Bucket '${this.bucketName}' criado com sucesso!`);
      }
    } catch (error) {
      console.error('Erro ao verificar/criar bucket:', error);
    }
  }
}
