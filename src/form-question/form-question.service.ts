import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FormQuestion } from '../database/entities/form-question.entity';
import { Form } from '../database/entities/form.entity';
import { CreateManyQuestions } from './dto/create-form-question.dto';
import { UpdateFormQuestionDto } from './dto/update-form-question.dto';

@Injectable()
export class FormQuestionService {
  constructor(
    @Inject('FORM_REPOSITORY')
    protected formRepository: Repository<Form>,
    @Inject('FORM_QUESTION_REPOSITORY')
    protected formQuestionRepository: Repository<FormQuestion>,
  ) {}
  async create(formId: number, createFormQuestionDto: CreateManyQuestions) {
    const form = await this.formRepository
      .findOneByOrFail({ id: formId })
      .catch(() => {
        throw new NotFoundException(
          'Form not found, make valid formId and try again',
        );
      });

    const formQuestions = createFormQuestionDto.questions.map((question) =>
      this.formQuestionRepository.create({ ...question, form }),
    );

    await this.formQuestionRepository.save(formQuestions);

    return formQuestions;
  }

  async findAll() {
    return await this.formQuestionRepository.find({
      relations: { form: true },
    });
  }

  async findOne(id: number) {
    return await this.formQuestionRepository
      .findOneOrFail({ where: { id }, relations: { form: true } })
      .catch(() => {
        throw new NotFoundException(`Form Question with id ${id} not found`);
      });
  }

  async update(id: number, updateFormQuestionDto: UpdateFormQuestionDto) {
    const entity = await this.formQuestionRepository
      .findOneByOrFail({
        id,
      })
      .catch(() => {
        throw new NotFoundException(`Form Question with id ${id} not found`);
      });

    await this.formQuestionRepository.update(entity.id, updateFormQuestionDto);

    return updateFormQuestionDto;
  }

  async remove(id: number) {
    await this.formQuestionRepository.softDelete(id);

    return { success: true };
  }
}
