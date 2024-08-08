import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
  } from 'typeorm';
  
  @Entity({ name: 'profile' })
  export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    lastname: string;
    @Column()
    surename: string;
    @Column()
    age: string;
    @CreateDateColumn()
    fecha_alta: Date;
    @UpdateDateColumn()
    fecha_modificacion: Date;
    @Column({
      default: true,
    })
    registro_activo: boolean;
  }
  