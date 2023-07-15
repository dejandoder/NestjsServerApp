import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Employee, EmployeeDocument } from "./schemas/employee.shema";

import { CreateEmployeeDTO } from "./dtos/create-employee.dto";
import { UpdateEmployeeDTO } from "./dtos/update-employee.dto";

@Injectable()
export class EmployeesRepository {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) { }

    async create(employee: CreateEmployeeDTO): Promise<Employee> {
        const newUser = new this.employeeModel(
            employee
        );
        return await newUser.save();
    }

    async delete(id: string): Promise<Employee> {
        return await this.employeeModel.findOneAndUpdate(
            { _id: id },
            { deleted: true },
            { new: true }
        );
    }

    async update(id: string, employee: UpdateEmployeeDTO): Promise<Employee> {
        return await this.employeeModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    'name': employee?.name,
                    'homeAddress.city': employee?.homeAddress?.city,
                    'homeAddress.zipCode': employee?.homeAddress?.zipCode,
                    'homeAddress.addressLine1': employee?.homeAddress?.addressLine1,
                    'homeAddress.addressLine2': employee?.homeAddress?.addressLine2
                }, employee
            },
            { new: true }
        );

    }

    async findEmployees(page: number, limit: number): Promise<Employee[]> {
        const skip = (page - 1) * limit;
        return await this.employeeModel.find({ deleted: false }).skip(skip).limit(limit).exec();
    }

    async findDeletedEmployees(): Promise<Employee[]> {
        return await this.employeeModel.find({ deleted: true }).exec();
    }
}