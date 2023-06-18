import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAddressDTO {
    @IsString()
    city: string;

    @IsNumber()
    zipCode: number;

    @IsString()
    addressLine1: string;

    @IsString()
    @IsOptional()
    addressLine2: string;
}