Passo a passo - criação e edição de APIs utilizando NestJs

*Criação e configuração*

1 - Criar um novo projeto Nest - nest new *nome-do-projeto*
2 - Acessar a pasta do novo projeto e realizar a instalação do ORM, SQL e o Validator
3 - npm install --save @nestjs/typeorm mysql2 - MySQL e ORM
4 - npm install --save class-validator class-transformer - Validators

*Configurações Primárias no src/main.ts*

5 - src/main.ts - Modificar o fuso-horário e Habilitar o validator
6 - process.env.TZ = '-03:00' - Ajustar o fuso-horário ao do Brasil
7 - app.useGlobalPipes(new ValidationPipe()) - Ativando as validações
8 - app.enableCors()

*Criação do Schema/Database manual no SQL e inclusão no NestJs*

8 - Abrir MySQL Workbench - novo SQL File
9 - Create database *nome-do-schema* - Criar ambiente para incluir as tabelas do projeto
10 - use *nome-do-schema* - utilizar a schema criado no mysql
11 - Configurar src/module.ts, remover controller e provider controllers: [], providers: [],
12 - configurar imports: [ TypeOrmModule.forRoot ({ type: 'tipo do banco - mysql', host: 'endereço - localhost', port: padrao 3306 - verificar banco, username: 'root - verificar banco', password: 'senha do banco configurado do host', database: 'schema criado - db_projeto', entities: 'classe entity do projeto', synchronize: true/false}), ProjetoModule ],
13 - Necessario criar src/nome-do-projeto, src/nome-do-projeto/entities, src/nome-do-projeto/modules para configurar o module principal
14 - em entities criar projeto.entity.ts @Entity({name: 'nome da tabela'}) export class ProjetoNome { configurar colunas das tabelas, podendo ser numbers, strings ou Date, principais anotações: @PrimaryGeneratedColumn() - PK, @IsNotEmpty(), @MaxLength(100), @Column({nullable: false, length: 100})}
15 - em modules criar projeto.module.ts @Module({imports:[TypeOrmModule.forFeature([Projeto])], providers:[ProjetoService], controllers:[ProjetoController], exports:[TypeOrmModule]}) export class ProjetoModule{}
16 - Ao rodar o programa neste ponto com um npm run start:dev - a tabela definida no entity com name: já deve ter sido criada e pode ser acessada no workbench do mysql

*Criação do service e controller da API - configuração*

17 - criar diretório src/projeto/controllers - mapeamento de requisições e src/projeto/service - construção das regras de negócio para as requisições
18 - criar projeto.service.ts, utilizar anotação @Injectable() export class ProjetoService { construtor(@InjectableRepository(Projeto *Classe Entity*) private projetoRepository: Repository<Projeto>){} }
19 - criar projeto.controller.ts, utilizar anotação @Controller('/projeto') export class ProjetoController {constructor(private readonly service: ProjetoService *Classe de serviço*){}}
20 - iniciar a mapear post, put, delete, get no service e no controller

*Criação das regras de negócios e funções assíncronas no service*

21 - async create(projeto: Projeto): Promise<Projeto>{return this.projetoRepository.save(projeto)}
22 - async findAll(): Promise<Projeto[]>{return this.projetoRepository.find()}
23 - async findById(id: numero): Promise<Projeto>{let projetoProcurado = await this.projetoRepository.findOne({where: {id}}) if(!projetoProcurado){throw new HttpException('Post nao encontrado!', HttpStatus.NOT_FOUND)} return projetoProcurado}
24 - async findByNome(nome: string): Promise<Projeto[]>{return this.projetoRepository.find({where:{campoProcuradoDaTabela: ILike(`%${nome}%`)}})}
25 - async delete(id: number): Promise<DeleteResult>{let projetoDeletar = await this.findById(id) if(!projetoDeletar){throw new HttpException('Nao encontrado!', HttpStatus.NOT_FOUND)} return this.projetoRepository.delete(id)}
26 - async update(projeto: Projeto): Promise<Projeto>{let projetoAtualizar = await this.findById(projeto.id) if(!projetoAtualizar || !projeto.id){throw new HttpException('Projeto nao encontrado', HttpStatus.NOT_FOUND)} return this.projetoRepository.save(projeto)}

*Mapeando requisições Http no controller*

27 - Anotações @Get(), caso busca for especifica, adicionar endereço após '/projeto', @Get('/:id') - resultando em 'localhost:3000/projeto/id'
28 - Anotações @Post() e @Put() não precisam de endereço adicional, será passado um @Body no parâmetro da função.
29 - Anotação @Delete('/:parametro') é necessário um parametro que foi definido em service para utilizá-lo, id, ou nome.
30 - Validação @HttpCode necessária, apenas Delete @HttpCode(HttpStatus.NO_CONTENT), demais requisições @HttpCode(HttpStatus.OK)
31 - Funções que requerem um parâmetro de busca utilizam anotações @Param('nomeParametro') nomeParametro: string, ou, @Param('nomeParametro', ParseIntPipe) nomeParametro: number
32 - Todas funções return this.service.funcaoDoService(parametro se tiver)

*Relacionamentos de tabelas 

33 - Criar uma nova pasta dentro de src/ com o nome da tabela que irá se relacionar, src/projeto se relaciona com src/projeto-rel
34 - Criar pastas entities, modules, controllers, services para o projeto-rel
35 - Criar projeto-rel.entity.ts com @Entity('nome_tabela_relacionada') sendo uma export class com nome ProjetoRelacao
36 - Definir qual será a relação @OneToMany e qual será a @ManyToOne
37 - Em @OneToMany - uma unica entrada pode se relacionar a muitas outras, @OneToMany(() => ClasseRelacionada, (objetoDaClasseRelacionada) => objetoDaClasseRelacionada.campoRelacionado) objetoDaClasseRelacionadaPlural: ClasseRelacionada[]
38 - Em @ManyToOne(() => ClasseProjetoRelacionada, (objetoDaClasseRelacionada) => objetoDaClasseRelacionada.objetoDaClassePrinciapalPlural, {onDelete: "CASCADE"}) objetoDaClasseRelacionada: ClasseRelacionada
39 - Utilizar relations em todos os services de classes relacionadas, relations: { campo_da_tabela_com_relação: true}
40 - Relação OneToOne: @OneToOne(() => ClasseRelacionada) @JoinColumn() atributoNaTabela: ClasseRelacionada | Relação ManyToMany:  @ManyToMany(() => ClasseRelacionada, (atributoClasseRelacionada) => atributoClasseRelacionada.atributo) @JoinTable() atributoNaTabela: ClasseRelacionada[]

*Imports Fundamentais*

Controller
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DeleteResult} from "typeorm";

Service
import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

Entity
import { IsNotEmpty, Max, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Module
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
