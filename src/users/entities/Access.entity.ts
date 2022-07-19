import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Access' })
export class Access {
  @PrimaryColumn()
  id: number;

  @Column()
  idUser: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;
}
