import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()//uma anotação de controller, que diz que essa classe é responsavel por mapear as requisições, a classe é um controller
export class AppController {
  constructor(private readonly appService: AppService) {}//está criando um objeto da classe Appservice

  @Get()/*Diz que a função que vai ser declarada vai retornar para a função get que fizermos na API, indica que o metodo será 
  uma requisiçãoget*/
  getHello(): string {
    return this.appService.getHello();//Pegando o getHello e retorna para app service
  }
}
