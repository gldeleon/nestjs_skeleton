import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'usuario' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario: number;
  @Column()
  usuario: string;
  @Column()
  contrasena: string;
  @Column()
  nombre: string;
  @CreateDateColumn()
  fecha_alta: Date;
  @UpdateDateColumn()
  fecha_modificacion: Date;
  @Column({
    default: true,
  })
  registro_activo: boolean;
}
