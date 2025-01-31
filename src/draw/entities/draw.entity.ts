import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BeforeInsert,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Participant } from '../../participants/entities/participant.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('draws')
@Index('draw_isActive_idx', ['isActive'])
export class Draw {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    totalTickets: number;

    @Column({ default: 0 })
    enteredTickets: number;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastUpdated: Date;

    @OneToMany(() => Participant, (participant) => participant.draw)
    participants: Participant[];

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}
