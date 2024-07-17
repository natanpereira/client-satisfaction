export interface IAnswerResponse {
  [key: string]: {
    questionId: string;
    question: string;
    answerId: string;
    answer: string;
    formId: string;
    form: string;
  }[];
}
