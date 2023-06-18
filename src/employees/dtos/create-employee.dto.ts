import { IsDateString, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDTO } from "./create-address.dto";

export class CreateEmployeeDTO {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsNumber()
    phoneNumber: number;

    @Type(() => CreateAddressDTO)
    @IsObject()
    public homeAddress: CreateAddressDTO;

    @IsDateString()
    dateOfEmployment: Date;

    @IsDateString()
    dateOfBirth: Date;

}