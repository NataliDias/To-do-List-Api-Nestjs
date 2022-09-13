import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

export class CategoriaService{

    constructor(
        @InjectRepository(Categoria)
        private categoriarepository: Repository<Categoria>
    ){}

    async findAll(): Promise<Categoria[]>{//Função Assincrona que retorna uma promisse que recupera um array/Lista[] de categoria
        return this.categoriarepository.find({
            relations: {//relaciona essa categoria com o atributo de tarefas
                tarefas: true
            }
        })//retorna o tarefa repository que o constructor pegou
    }

    async findById(id: number): Promise<Categoria>{//Retorna uma promisse unica
        let categoria = await this.categoriarepository.findOne({//Encontra um  na categoria repository
            where: {
                id//onde o Id seja esse
            },
            relations: {//relaciona essa categoria com o atributo de tarefas
                tarefas: true
            }
        })

        if (!Categoria)//Se categoria for vazia
            throw new HttpException('Categoria não foi encontrada', HttpStatus.NOT_FOUND)//Retorna um erro do tipo notfound

        return categoria
        }
    
    async findByDescricao(descricao: string): Promise<Categoria[]> {
        return this.categoriarepository.find({
            where:{
            descricao: ILike(`%${descricao}%`)//Retorna um nome. O iLike pesquisa independente da formatação ou apenas algumas letras
            },
            relations: {//relaciona essa categoria com o atributo de tarefas
                tarefas: true
            }
        })
    }

    async create(categoria: Categoria): Promise<Categoria>{//Criando um objeto que recebe a clase categoria
        return this.categoriarepository.save(categoria)
    }    

    async update(categoria: Categoria): Promise<Categoria>{
        let categoriaUpdate = await this.findById(categoria.id)
            
       if (!categoria || !categoria.id)
        throw new HttpException('Categoria não foi encontrada', HttpStatus.NOT_FOUND)
      
        return this.categoriarepository.save(categoria)
    }

    async delete(id: number): Promise<DeleteResult>{

        let categoriaDelete = await this.findById(id)

        if (!categoriaDelete)
            throw new HttpException('Categoria não foi encontrada', HttpStatus.NOT_FOUND)

        return this.categoriarepository.delete(id)
    }

}