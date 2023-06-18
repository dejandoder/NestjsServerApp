import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmployeesModule } from './employees.module';
import { EmployeesService } from './employees.service';
import { EmployeesRepository } from './employees.repository';

import { CreateEmployeeDTO } from './dtos/create-employee.dto';
import { UpdateEmployeeDTO } from './dtos/update-employee.dto';

import { EmployeeSchema, Employee } from './schemas/employee.shema';

describe('EmployeesService', () => {
  let employeesService: EmployeesService;
  let mockEmployeesRepository: EmployeesRepository;

  const employeeModel: Employee = {
    name: 'Name 1',
    email: 'name1@example.com',
    phoneNumber: 1234567890,
    homeAddress: {
      city: 'City',
      zipCode: 12345,
      addressLine1: 'Address Line 1',
      addressLine2: 'Address Line 2',
    },
    dateOfEmployment: new Date(),
    dateOfBirth: new Date(),
    deleted: false
  };

  const employees: Employee[] = [
    {
      name: 'Name',
      email: 'nameemail@example.com',
      phoneNumber: 1234567890,
      homeAddress: {
        city: 'City',
        zipCode: 12345,
        addressLine1: 'Address Line 1',
        addressLine2: 'Address Line 2',
      },
      dateOfEmployment: new Date(),
      dateOfBirth: new Date(),
      deleted: false
    },
    {
      name: 'Name 2',
      email: 'nameemail2@example.com',
      phoneNumber: 9876543210,
      homeAddress: {
        city: 'City',
        zipCode: 12345,
        addressLine1: 'Address Line 1',
        addressLine2: 'Address Line 2',
      },
      dateOfEmployment: new Date(),
      dateOfBirth: new Date(),
      deleted: false
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService, EmployeesRepository],
      imports: [
        MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
        EmployeesModule
      ]
    }).compile();

    employeesService = module.get<EmployeesService>(EmployeesService);
    mockEmployeesRepository = module.get<EmployeesRepository>(EmployeesRepository);
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      const createEmployeeDTO: CreateEmployeeDTO = {
        name: 'Name',
        email: 'nameemail@example.com',
        phoneNumber: 1234567890,
        homeAddress: {
          city: 'City',
          zipCode: 12345,
          addressLine1: 'Address Line 1',
          addressLine2: 'Address Line 2',
        },
        dateOfEmployment: new Date(),
        dateOfBirth: new Date(),
      };

      jest.spyOn(mockEmployeesRepository, 'create').mockResolvedValue(employeeModel);

      const result = await employeesService.create(createEmployeeDTO);

      expect(mockEmployeesRepository.create).toHaveBeenCalledWith(createEmployeeDTO);
      expect(result).toEqual(employeeModel);
    });
  });

  describe('update', () => {
    const updateEmployeeDTO: UpdateEmployeeDTO = {
      name: 'Updated Name',
      homeAddress: {
        city: 'Updated City',
        zipCode: 11111,
        addressLine1: 'Updated Address Line 1',
        addressLine2: 'Updated Address Line 2',
      },
      email: '',
      phoneNumber: 0,
      dateOfEmployment: undefined,
      dateOfBirth: undefined
    };
    it('should update an existing employee', async () => {
      const employeeId = '1';

      jest.spyOn(mockEmployeesRepository, 'update').mockResolvedValue(employeeModel);

      const result = await employeesService.update(employeeId, updateEmployeeDTO);

      expect(mockEmployeesRepository.update).toHaveBeenCalledWith(employeeId, updateEmployeeDTO);
      expect(result).toEqual(employeeModel);
    });

    it('should throw NotFoundException if employee is not found', async () => {
      const employeeId = '1';

      jest.spyOn(mockEmployeesRepository, 'update').mockResolvedValue(null);

      await expect(employeesService.update(employeeId, updateEmployeeDTO)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete an existing employee', async () => {
      const employeeId = '1';

      jest.spyOn(mockEmployeesRepository, 'delete').mockResolvedValue(employeeModel);

      const result = await employeesService.delete(employeeId);

      expect(mockEmployeesRepository.delete).toHaveBeenCalledWith(employeeId);
      expect(result).toEqual(employeeModel);
    });

    it('should throw NotFoundException if employee is not found', async () => {
      const employeeId = '1';

      jest.spyOn(mockEmployeesRepository, 'delete').mockResolvedValue(null);

      await expect(employeesService.delete(employeeId)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findEmployees', () => {
    it('should find employees with pagination', async () => {
      const page = 1;
      const limit = 10;

      jest.spyOn(mockEmployeesRepository, 'findEmployees').mockResolvedValue(employees);

      const result = await employeesService.findEmployees(page, limit);

      expect(mockEmployeesRepository.findEmployees).toHaveBeenCalledWith(page, limit);
      expect(result).toEqual(employees);
    });

  });

  describe('findDeletedEmployees', () => {
    it('should find deleted employees', async () => {
      jest.spyOn(mockEmployeesRepository, 'findDeletedEmployees').mockResolvedValue(
        employees,
      );
      const result = await employeesService.findDeletedEmployees();

      expect(mockEmployeesRepository.findDeletedEmployees).toHaveBeenCalled();
      expect(result).toEqual(employees);
    });

  });
});
