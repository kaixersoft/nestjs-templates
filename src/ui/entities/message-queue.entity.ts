import { BaseEntity } from '../../core/model/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('queue-messages')
export class MessageQueueEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  module: string;
}
