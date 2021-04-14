import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import State from './State';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: string;


  @Column()
  name: string;

  @Column()
  prefect: string;

  @Column()
  population: number;

  @Column()
  state_fk: string;

  @ManyToOne(() => State )
  @JoinColumn({ name: 'state_fk' })
  account: State;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default City;
