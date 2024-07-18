import { HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { FormQuestion } from '../database/entities/form-question.entity';
import { Form } from '../database/entities/form.entity';
import { CreateManyQuestions } from './dto/create-form-question.dto';
import { UpdateFormQuestionDto } from './dto/update-form-question.dto';
import { FormQuestionController } from './form-question.controller';
import { FormQuestionService } from './form-question.service';

const service = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
} as unknown as FormQuestionService;

const mockForm = {
  id: 1,
  title: 'Test Form',
  description: 'Updated description',
  startDate: new Date(),
  endDate: new Date(),
  targetPublic: 'public',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
} as Form;

describe('FormQuestionController', () => {
  const controller: FormQuestionController = new FormQuestionController(
    service,
  );

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create many questions', async () => {
      const formId = '1';
      const createFormQuestionDto: CreateManyQuestions = {
        questions: [
          { name: 'Question 1', type: 'string', length: 10, required: true },
          { name: 'Question 2', type: 'number', length: null, required: true },
        ],
      };
      const expectedResult = [
        {
          id: 1,
          name: 'Question 1',
          type: 'string',
          length: 10,
          required: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          answers: [],
          form: mockForm,
        },
      ];

      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResult);

      await controller.create(formId, createFormQuestionDto, reply);

      expect(service.create).toHaveBeenCalledWith(
        +formId,
        createFormQuestionDto,
      );
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(reply.send).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all questions', async () => {
      const expectedQuestions: FormQuestion[] = [
        {
          id: 1,
          name: 'Question 1',
          type: 'string',
          length: 10,
          required: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          answers: [],
          form: mockForm,
        },
      ];

      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      jest.spyOn(service, 'findAll').mockResolvedValueOnce(expectedQuestions);

      await controller.findAll(reply);

      expect(service.findAll).toHaveBeenCalled();
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(reply.send).toHaveBeenCalledWith(expectedQuestions);
    });
  });

  describe('findOne', () => {
    it('should return one question by ID', async () => {
      const questionId = '1';
      const expectedQuestion: FormQuestion = {
        id: 1,
        name: 'Question 1',
        type: 'string',
        length: 10,
        required: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        answers: [],
        form: mockForm,
      };

      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(expectedQuestion);

      await controller.findOne(questionId, reply);

      expect(service.findOne).toHaveBeenCalledWith(+questionId);
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(reply.send).toHaveBeenCalledWith(expectedQuestion);
    });
  });

  describe('update', () => {
    it('should update one question by ID', async () => {
      const questionId = '1';
      const updateFormQuestionDto: UpdateFormQuestionDto = {
        name: 'Updated Question',
        type: 'text',
      };
      const expectedResult = {
        id: 1,
        question: 'Updated Question',
        type: 'text',
      };

      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      jest.spyOn(service, 'update').mockResolvedValueOnce(expectedResult);

      await controller.update(questionId, updateFormQuestionDto, reply);

      expect(service.update).toHaveBeenCalledWith(
        +questionId,
        updateFormQuestionDto,
      );
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(reply.send).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('remove', () => {
    it('should remove one question by ID', async () => {
      const questionId = '1';
      const expectedResult = { success: true };

      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      jest.spyOn(service, 'remove').mockResolvedValueOnce(expectedResult);

      await controller.remove(questionId, reply);

      expect(service.remove).toHaveBeenCalledWith(+questionId);
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(reply.send).toHaveBeenCalledWith(expectedResult);
    });
  });
});
