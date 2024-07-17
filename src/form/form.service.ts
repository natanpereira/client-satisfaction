import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IAnswerResponse } from '../common/enums/interfaces/answer.interface';
import { Answer } from '../database/entities/answer.entity';
import { Form } from '../database/entities/form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Injectable()
export class FormService {
  constructor(
    @Inject('FORM_REPOSITORY')
    protected formRepository: Repository<Form>,
  ) {}
  async create(createFormDto: CreateFormDto) {
    const newEntity = this.formRepository.create(createFormDto);

    const persistedEntity = await this.formRepository.save(newEntity);

    return persistedEntity;
  }

  async findAll() {
    const result = await this.formRepository.find({
      relations: {
        questions: true,
        answers: { formQuestion: true, form: true },
      },
    });

    result.forEach((form) => {
      form.answersResponse = this.normalizeResponseAnswers(form.answers);
      delete form.answers;
    });

    return result;
  }

  async findOne(id: number) {
    const result = await this.formRepository
      .findOneOrFail({
        where: { id },
        relations: {
          questions: true,
          answers: { formQuestion: true, form: true },
        },
      })
      .catch(() => {
        throw new NotFoundException(`Form with id ${id} not found`);
      });

    result.answersResponse = this.normalizeResponseAnswers(result.answers);
    delete result.answers;

    return result;
  }

  async update(id: number, updateFormDto: UpdateFormDto) {
    const entity = await this.formRepository
      .findOneByOrFail({
        id,
      })
      .catch(() => {
        throw new NotFoundException(`Form with id ${id} not found`);
      });

    await this.formRepository.update(entity.id, updateFormDto);

    return updateFormDto;
  }

  async remove(id: number) {
    await this.formRepository.softDelete(id);

    return { success: true };
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
            ...rest,
          },
        ];
        return acc;
      },
      {} as IAnswerResponse,
    );
  }
}
