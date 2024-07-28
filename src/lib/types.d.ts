export type QuestionType =
  | 'True or False'
  | 'Multiple choice'
  | 'Single choice'
  | 'Short answer'
  | 'Long answer';

export interface MultipleChoiceModel {
  choices: string[];
  question: string;
  answer: string[];
}

export interface SingleChoiceModel {
  choices: string[];
  question: string;
  answer: string;
}

export interface TrueOrFalseModel {
  question: string;
  answer: boolean;
}

export interface TextModel {
  question: string;
  response?: boolean;
  wrong?: string;
  example?: string;
}

export type QuestionModel =
  | MultipleChoiceModel
  | SingleChoiceModel
  | TrueOrFalseModel
  | TextModel;

export type QuestionGroupModel = {
  difficulty: 'Easy' | 'Medium' | 'Hard';
} & (
  | {
      type: 'Multiple choice';
      questions: MultipleChoiceModel[];
    }
  | {
      type: 'True or False';
      questions: TrueOrFalseModel[];
    }
  | {
      type: 'Single choice';
      questions: SingleChoiceModel[];
    }
  | {
      type: 'Short answer';
      questions: TextModel[];
    }
  | {
      type: 'Long answer';
      questions: TextModel[];
    }
);
