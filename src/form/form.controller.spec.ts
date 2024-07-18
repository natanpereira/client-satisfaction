import { HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Form } from '../database/entities/form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormController } from './form.controller';
import { FormService } from './form.service';
const service = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
} as unknown as FormService;

describe('FormController', () => {
  const controller: FormController = new FormController(service);

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new form', async () => {
      const createFormDto: CreateFormDto = {
        title: 'Test Form',
        description: 'Updated description',
        startDate: new Date(),
        endDate: new Date(),
        targetPublic: 'public',
      };
      const expectedForm: Form = {
        id: 1,
        title: 'Test Form',
        description: 'Updated description',
        startDate: new Date(),
        endDate: new Date(),
        targetPublic: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        questions: [],
        answers: [],
      };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedForm);

      await controller.create(createFormDto, reply);

      expect(service.create).toHaveBeenCalled();
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(reply.send).toHaveBeenCalledWith(expectedForm);
    });
  });

  describe('findAll', () => {
    it('should return all forms', async () => {
      const expectedForms: Form[] = [
        {
          id: 1,
          title: 'Test Form',
          description: 'Updated description',
          startDate: new Date(),
          endDate: new Date(),
          targetPublic: 'public',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          questions: [],
          answers: [],
        },
      ];
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(expectedForms);

      await controller.findAll(reply);

      expect(service.findAll).toHaveBeenCalled();
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(reply.send).toHaveBeenCalledWith(expectedForms);
    });
  });

  describe('findOne', () => {
    it('should return a form by ID', async () => {
      const formId = '1';
      const expectedForm: Form = {
        id: 1,
        title: 'Test Form',
        description: 'Updated description',
        startDate: new Date(),
        endDate: new Date(),
        targetPublic: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        questions: [],
        answers: [],
      };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(expectedForm);

      await controller.findOne(formId, reply);

      expect(service.findOne).toHaveBeenCalled();
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(reply.send).toHaveBeenCalledWith(expectedForm);
    });
  });

  describe('update', () => {
    it('should update a form by ID', async () => {
      const formId = '1';
      const updateFormDto: UpdateFormDto = {
        description: 'Updated description',
      };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      jest
        .spyOn(service, 'update')
        .mockResolvedValueOnce({ id: +formId, ...updateFormDto });

      await controller.update(formId, updateFormDto, reply);

      expect(service.update).toHaveBeenCalled();
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(reply.send).toHaveBeenCalledWith({
        id: +formId,
        ...updateFormDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a form by ID', async () => {
      const formId = '1';
      const expectedForm = { success: true };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      jest.spyOn(service, 'remove').mockResolvedValueOnce(expectedForm);

      await controller.remove(formId, reply);

      expect(service.remove).toHaveBeenCalled();
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(reply.send).toHaveBeenCalledWith(expectedForm);
    });
  });
});
