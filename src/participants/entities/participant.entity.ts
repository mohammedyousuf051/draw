import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BeforeInsert,
} from 'typeorm';
import { Draw } from '../../draw/entities/draw.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('participants')
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
