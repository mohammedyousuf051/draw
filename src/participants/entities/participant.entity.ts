import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BeforeInsert,
    Index,
} from 'typeorm';
import { Draw } from '../../draw/entities/draw.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('participants')
@Index('participant_hkid_idx', ['hkid'])
@Index('participant_ticketNumber_idx', ['ticketNumber'])
export class Participant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    hkid: string;

    @Column()
    age: number;

    @Column({ unique: true })
    ticketNumber: number;

    @ManyToOne(() => Draw, (draw) => draw.id)
    draw: Draw;

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}
