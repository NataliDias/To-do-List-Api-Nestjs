import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';//importando 

async function bootstrap() {//Ele está criando uma função assincrona- Função com nome bootstrap
  const app = await NestFactory.create(AppModule);/*await = quer dizer que quando for executar diz que precisa 
  esperar essa linha para executar a debaixo*/
  //AppModule, diz qual classe é o controller e o Service
  await app.listen(3500);//Está dizendo que localmente vai rodar na porta 3000
}

bootstrap();

//É um arquivo TS
