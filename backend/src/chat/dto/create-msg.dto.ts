import { IsNumber, IsString } from 'class-validator'
import { Users } from '../entities/users.entity';
export class CreateMsgDto {
    
    @IsNumber()
    room: number;

    @IsString()
    msg: string;

    date: Date;
}