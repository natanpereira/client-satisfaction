import { HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AnswerResponse } from '../common/interfaces/answer.interface';
import { FormQuestion } from '../database/entities/form-question.entity';
import { Form } from '../database/entities/form.entity';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { CreateArrayAnswersDto } from './dto/create-answer.dto';

const service = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
} as unknown as AnswerService;

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

const mockFormQuestion = {
  id: 1,
  name: 'Question 1',
  type: 'string',
  length: 10,
  required: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
} as FormQuestion;

describe('AnswerController', () => {
  const controller: AnswerController = new AnswerController(service);

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create answers for a form question', async () => {
      const formId = '1';
      const createAnswerDto: CreateArrayAnswersDto = {
        answers: [{ answer: 'Answer 1', formQuestionId: 1, formId: 1 }],
      };
      const expectedResult = [
        {
          id: 1,
          ...createAnswerDto.answers[0],
          createdAt: new Date(),
          answerId: 'abc123',
          form: mockForm,
          formQuestion: mockFormQuestion,
        },
      ];

      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResult);

      await controller.create(formId, createAnswerDto, reply);

      expect(service.create).toHaveBeenCalledWith(+formId, createAnswerDto);
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(reply.send).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all answers', async () => {
      const expectedAnswers: AnswerResponse = {
        form1: [
          {
            questionId: '1',
            question: 'Question 1',
            answerId: '1',
            answer: 'Answer 1',
            formId: '1',
            form: 'Form 1',
            targetPublic: 'public',
          },
        ],
      };

      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      jest.spyOn(service, 'findAll').mockResolvedValueOnce(expectedAnswers);

      await controller.findAll(reply);

      expect(service.findAll).toHaveBeenCalled();
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(reply.send).toHaveBeenCalledWith(expectedAnswers);
    });
  });

  describe('findOne', () => {
    it('should return an answer by ID', async () => {
      const answerId = '1';
      const expectedAnswer: AnswerResponse = {
        form1: [
          {
            questionId: '1',
            question: 'Question 1',
            answerId: '1',
            answer: 'Answer 1',
            formId: '1',
            form: 'Form 1',
            targetPublic: 'public',
          },
        ],
      };

      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(expectedAnswer);

      await controller.findOne(answerId, reply);

      expect(service.findOne).toHaveBeenCalledWith(answerId);
      expect(reply.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(reply.send).toHaveBeenCalledWith(expectedAnswer);
    });
  });
});
