import { IsNotEmpty, MaxLength } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_tarefa'})//Criando tabela tb_tarefa e diz que a classe que vir depois será a tb tarefa
export class Tarefa{//Criando uma classe
    
    @PrimaryGeneratedColumn()//Definindo a chave primaria
    id: number

    @IsNotEmpty()//Validator para caso o usuario digite algo vazio
    @MaxLength(50)//Validator pra se o nome for maior que 50 char
    @Column({nullable: false, length: 50})//Definindo que nome é uma coluna, que não pode ser nula e com máximo de 50 char
    nome: string


    @IsNotEmpty()//Validator para caso o usuario digite algo vazio
    @MaxLength(500)//Validator pra se a descricao for maior que 500 char
    @Column({nullable: false, length:500})//Definindo que descricao é uma coluna, que não pode ser nula e com máximo de 500 char
    descricao: string

    @IsNotEmpty()//Validator para caso o usuario digite algo vazio
    @MaxLength(50)//Validator pra se o responsavel for maior que 50 char
    @Column({nullable: false, length:50})//Definindo que responsavel é uma coluna, que não pode ser nula e com máximo de 50 char
    responsavel:string
    
    @Column()//Não precisa passar parametros, pois uma data sempre tem dados definidos
    data: Date

    @Column()//Não precisa parametros, pois é sempre true ou false
    status: boolean

    @ManyToOne(() => Categoria, (Categoria ) => Categoria.tarefas, {
            onDelete: "CASCADE"})//Declara que se uma categoria é excluida todas as tarefas pertencentes tambem são
    categoria: Categoria
}