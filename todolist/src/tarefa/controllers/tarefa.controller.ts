import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { brotliDecompressSync } from "zlib";
import { Tarefa } from "../entities/tarefa.entity";
import { TarefaService } from "../service/tarefa.service";


@Controller('/tarefa')//Vai injetar no service e mapear a função get. /tarefa sera o caminho
export class TarefaController{
    constructor(
        private readonly service: TarefaService){}

    @Get()//Mapeando o Get no controller
    @HttpCode(HttpStatus.OK)//Retorna um status se der certo o Get ele retorna Ok
    findAll(): Promise<Tarefa[]>{
        return this.service.findAll()//Busca tudo dentro do banco
    }

    @Get('/:id')//Passar o caminho de tarefa/id
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tarefa>{//Esperando um Id, que vai ser do tipo inteiro
        return this.service.findById(id)//Buscando um Id
    }

    @Get('/nome/:nome')//tarefa/nome/l
    @HttpCode(HttpStatus.OK)//Retorna um status se der certo o Get ele retorna Ok
    findByNome(@Param('nome')nome: string): Promise<Tarefa[]>{
        return this.service.findByNome(nome)
    } 

    @Post()//Post Salva no DB
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tarefa: Tarefa): Promise<Tarefa>{
        return this.service.create(tarefa)
    }

    @Put()//Atualiza no DB
    @HttpCode(HttpStatus.OK)
    update(@Body() tarefa: Tarefa): Promise<Tarefa>{
        return this.service.update(tarefa)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.service.delete(id)
    }
}