import { Injectable, NotFoundException } from "@nestjs/common";

import { EmployeesRepository } from "./employees.repository";
import { Employee } from "./schemas/employee.shema";

import { CreateEmployeeDTO } from "./dtos/create-employee.dto";
import { UpdateEmployeeDTO } from "./dtos/update-employee.dto";

@Injectable()
export class EmployeesService {
    constructor(private employeesRepository: EmployeesRepository) { }

    async create(employeeDTO: CreateEmployeeDTO): Promise<Employee> {
        return this.employeesRepository.create(employeeDTO);
    }

    async update(id: string, employeeDTO: UpdateEmployeeDTO): Promise<Employee> {
        const employee = await this.employeesRepository.update(
            id,
            employeeDTO
        );

        if (!employee) {
            throw new NotFoundException('Employee Not Found');
        }
        return employee;
    }

    async delete(id: string): Promise<Employee> {
        const employee = await this.employeesRepository.delete(id);

        if (!employee) {
            throw new NotFoundException('Employee Not Found');
        }
        return employee;
    }

    async findEmployees(page: number, limit: number): Promise<Employee[]> {
        const employee = await this.employeesRepository.findEmployees(page, limit);

        if (!employee) {
            throw new NotFoundException('Employee Not Found');
        }
        return employee;
    }

    async findDeletedEmployees(): Promise<Employee[]> {
        const employee = await this.employeesRepository.findDeletedEmployees();

        if (!employee) {
            throw new NotFoundException('Employee Not Found');
        }
        return employee;
    }

}