import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

@Controller('/categoria')
export class CategoriaController{
    constructor(private readonly service: CategoriaService){}

    @Get()//Mapeando o Get no controller
    @HttpCode(HttpStatus.OK)//Retorna um status se der certo o Get ele retorna Ok
    findAll(): Promise<Categoria[]>{
        return this.service.findAll()//Busca tudo dentro do banco
    }

    @Get('/:id')//Passar o caminho de tarefa/id
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria>{//Esperando um Id, que vai ser do tipo inteiro
        return this.service.findById(id)//Buscando um Id
    }

    @Get('/descricao/:descricao')//tarefa/nome/l
    @HttpCode(HttpStatus.OK)//Retorna um status se der certo o Get ele retorna Ok
    findByNome(@Param('descricao')nome: string): Promise<Categoria[]>{
        return this.service.findByDescricao(nome)
    } 

    @Post()//Post Salva no DB
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria>{
        return this.service.create(categoria)
    }

    @Put()//Atualiza no DB
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Categoria): Promise<Categoria>{
        return this.service.update(categoria)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.service.delete(id)
    }
}