import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tarefa } from "../entities/tarefa.entity";


@Injectable()//Diz que a tarefa pode ser injetavel
export class TarefaService{

    constructor(
        @InjectRepository(Tarefa)//Vai injetar um repositorio pegando tarefa como entidade
        private tarefaRepository: Repository<Tarefa>//Esta guardando esse repositório tarefa 
    ){}

    async findAll(): Promise<Tarefa[]>{//Função Assincrona que retorna uma promisse que recupera um array/Lista[] de Tarefa
        return this.tarefaRepository.find({
            relations: {//relaciona essa categoria com o atributo de tarefas
                categoria: true
            }
        })//retorna o tarefa repository que o constructor pegou
    }

    async findById(id: number): Promise<Tarefa>{//Retorna uma promisse unica
        let tarefa = await this.tarefaRepository.findOne({//Encontra um  na tarefa repository
            where: {
                id//onde o Id seja esse
            },
            relations: {//relaciona essa categoria com o atributo de tarefas
                categoria: true
            }
        })

        if (!tarefa)//Se tarefa for vazia
            throw new HttpException('Tarefa não foi encontrada', HttpStatus.NOT_FOUND)//Retorna um erro do tipo notfound

        return tarefa
        }
    
    async findByNome(nome: string): Promise<Tarefa[]> {
        return this.tarefaRepository.find({
            where:{
            nome: ILike(`%${nome}%`)//Retorna um nome. O iLike pesquisa independente da formatação ou apenas algumas letras
            },
            relations: {//relaciona essa categoria com o atributo de tarefas
                categoria: true
            }
        })
    }

    async create(tarefa: Tarefa): Promise<Tarefa>{//Criando um objeto que recebe a clase tarefa
        return this.tarefaRepository.save(tarefa)
    }    

    async update(tarefa: Tarefa): Promise<Tarefa>{
        let tarefaUpdate = await this.findById(tarefa.id)
            
       if (!tarefaUpdate || !tarefa.id)
        throw new HttpException('Tarefa não foi encontrada', HttpStatus.NOT_FOUND)
      
        return this.tarefaRepository.save(tarefa)
    }

    async delete(id: number): Promise<DeleteResult>{

        let tarefaDelete = await this.findById(id)

        if (!tarefaDelete)
            throw new HttpException('Tarefa não foi encontrada', HttpStatus.NOT_FOUND)

        return this.tarefaRepository.delete(id)
    }


    }