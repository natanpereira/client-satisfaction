import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IAnswerResponse } from '../common/interfaces/answer.interface';
import { Answer } from '../database/entities/answer.entity';
import { FormQuestion } from '../database/entities/form-question.entity';
import { Form } from '../database/entities/form.entity';
import {
  CreateAnswerDto,
  CreateArrayAnswersDto,
} from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('FORM_REPOSITORY')
    protected formRepository: Repository<Form>,
    @Inject('FORM_QUESTION_REPOSITORY')
    protected formQuestionRepository: Repository<FormQuestion>,
    @Inject('ANSWER_REPOSITORY')
    protected answerRepository: Repository<Answer>,
  ) {}
  async create(formId: number, createAnswerDto: CreateArrayAnswersDto) {
    const uuid = uuidv4();
    const form = await this.formRepository
      .findOneOrFail({ where: { id: formId }, relations: { questions: true } })
      .catch(() => {
        throw new NotFoundException(
          'Form not found, make valid formId and try again',
        );
      });

    this.validateAnswers(createAnswerDto.answers, form.questions);

    const answers = createAnswerDto.answers.map((answer) => {
      const formQuestion = form.questions.find(
        (question) => question.id === answer.formQuestionId,
      );

      return this.answerRepository.create({
        answerId: uuid,
        ...answer,
        form,
        formQuestion,
      });
    });

    await this.answerRepository.save(answers);

    return answers;
  }

  async findAll() {
    const answers = await this.answerRepository.find({
      order: { form: { targetPublic: 'ASC' } },
      relations: { form: true, formQuestion: true },
    });
    return this.normalizeResponseAnswers(answers);
  }

  async findOne(answerId: string) {
    const answer = await this.answerRepository.find({
      where: { answerId },
      relations: { form: true, formQuestion: true },
    });

    if (!answer)
      throw new NotFoundException(`Answer with id ${answerId} not found`);

    return this.normalizeResponseAnswers(answer);
  }

  private validateAnswers(
    answers: CreateAnswerDto[],
    questions: FormQuestion[],
  ) {
    const questionAnswereds = [];
    const errors = [];
    answers.forEach((answer) => {
      const question = questions.find(
        (question) => question.id === answer.formQuestionId,
      );

      if (!question) {
        throw new NotFoundException('Question not found, try again');
      }

      questionAnswereds.push(question.id);

      const { type, length } = question;

      switch (type) {
        case 'string':
          if (typeof answer.answer !== 'string') {
            errors.push(
              `Answer for formQuestionId ${answer.formQuestionId} must be a string.`,
            );
          } else if (length && answer.answer.length > length) {
            errors.push(
              `Answer for formQuestionId ${answer.formQuestionId} exceeds the maximum length of ${length}.`,
            );
          }
          break;
        case 'number':
          if (isNaN(+answer.answer)) {
            errors.push(
              `Answer for formQuestionId ${answer.formQuestionId} must be a number.`,
            );
          }
          break;
        case 'boolean':
          if (typeof answer.answer !== 'boolean') {
            errors.push(
              `Answer for formQuestionId ${answer.formQuestionId} must be a boolean.`,
            );
          }
          break;
        default:
          errors.push(
            `Question type ${type} not supported for formQuestionId ${answer.formQuestionId}.`,
          );
      }
    });

    const questionNotAnswered = questions
      .filter((question) => {
        return !questionAnswereds.includes(question.id) && question.required;
      })
      .map((question) => question.name);

    if (questionNotAnswered.length > 0) {
      errors.push('Answer(s) not answered: ' + questionNotAnswered);
    }

    if (errors.length > 0) throw new BadRequestException(errors);
  }

  normalizeResponseAnswers(answers: Answer[]) {
    return answers.reduce(
      (acc, { answerId, id, formQuestion, answer, form, ...rest }) => {
        acc[answerId] = [
          ...(acc[answerId] ?? []),
          {
            questionId: formQuestion.id.toString(),
            question: formQuestion.name,
            answerId: id.toString(),
            answer: answer.toString(),
            formId: form.id.toString(),
            form: form.title,
            targetPublic: form.targetPublic,
            ...rest,
          },
        ];
        return acc;
      },
      {} as IAnswerResponse,
    );
  }
}
