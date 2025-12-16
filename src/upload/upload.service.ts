import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private supabase: SupabaseClient;
  private bucketName = 'anuncios-fotos';
  private supabaseUrl: string | undefined;
  private supabaseKey: string | undefined;

  constructor(private configService: ConfigService) {
    this.supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    this.supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (this.supabaseUrl && this.supabaseKey) {
      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }
  }

  private ensureConfigured(): void {
    if (!this.supabase) {
      throw new Error('Supabase credentials are not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
    }
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
    this.ensureConfigured();
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
    this.ensureConfigured();
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
    this.ensureConfigured();
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
