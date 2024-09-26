import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1727353772881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
           `CREATE TABLE draws (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                totalTickets INT NOT NULL,
                enteredTickets INT DEFAULT 0,
                isActive BOOLEAN DEFAULT TRUE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )` 
        );

        await queryRunner.query(
            `CREATE INDEX draw_isActive_idx ON draws (isActive)`
        );

        await queryRunner.query(
            `CREATE TABLE participants (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                hkid VARCHAR(255) NOT NULL,
                age INT NOT NULL,
                ticketNumber INT UNIQUE NOT NULL,
                draw_id UUID,
                CONSTRAINT participant_hkid_idx UNIQUE (hkid),
                CONSTRAINT participant_ticketNumber_idx UNIQUE (ticketNumber),
                CONSTRAINT fk_draw FOREIGN KEY (draw_id) REFERENCES draws(id)
            )`
        );

        await queryRunner.query(
            `CREATE INDEX participant_hkid_idx ON participants (hkid)`
        );

        await queryRunner.query(
            `CREATE INDEX participant_ticketNumber_idx ON participants (ticketNumber)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE participants`
        );

        await queryRunner.query(
            `DROP TABLE draws`
        );
    }

}
