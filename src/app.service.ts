import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API de Gerenciamento de documentação de colaboradores - Desafio INMETA';
  }
}
