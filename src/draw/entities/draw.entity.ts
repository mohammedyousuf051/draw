import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BeforeInsert,
} from 'typeorm';
import { Participant } from '../../participants/entities/participant.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('draws')
export class Draw {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    totalTickets: number;

    @Column({ default: 0 })
    enteredTickets: number;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Participant, (participant) => participant.draw)
    participants: Participant[];

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}
