import { Injectable } from '@nestjs/common';

@Injectable()//O @ significa decorator, e diz que essa classe pode ser injetada
export class AppService {
  getHello(): string {//Método que tem um retorno do tipo string
    return 'Hello World!';//que retorna um hello world
  }
}
//Está indicando que essa classe está com toda lógica que vamos implementar no projeto