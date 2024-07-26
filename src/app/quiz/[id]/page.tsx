'use client';

import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { cn } from '@nextui-org/theme';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox';
import { Textarea } from '@nextui-org/input';
import { Controller, useForm } from 'react-hook-form';

const colors = {
  Easy: 'text-green-200',
  Medium: 'text-yellow-200',
  Hard: 'text-red-200'
};

type QuestionType =
  | 'True or False'
  | 'Multiple choice'
  | 'Single choice'
  | 'Short answer'
  | 'Long answer';

interface MultipleChoiceModel {
  choices: string[];
  question: string;
  answer: string[];
}

interface SingleChoiceModel {
  choices: string[];
  question: string;
  answer: string;
}

interface TrueOrFalseModel {
  question: string;
  answer: boolean;
}

interface TextModel {
  question: string;
}

type QuestionModel =
  | MultipleChoiceModel
  | SingleChoiceModel
  | TrueOrFalseModel
  | TextModel;

type QuestionGroupModel = {
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

const groups: QuestionGroupModel[] = [
  {
    type: 'Multiple choice',
    difficulty: 'Easy',
    questions: [
      {
        question: 'Test 123',
        answer: ['a', 'b', 'c'],
        choices: ['a', 'b', 'c', 'd']
      },
      {
        question: 'Test 123',
        answer: ['a', 'b', 'c'],
        choices: ['a', 'b', 'c', 'd']
      }
    ]
  },
  {
    type: 'Single choice',
    difficulty: 'Easy',
    questions: [
      {
        question: 'Test 123',
        answer: 'a',
        choices: ['a', 'b', 'c', 'd']
      },
      {
        question: 'Test 123',
        answer: 'a',
        choices: ['a', 'b', 'c', 'd']
      }
    ]
  },
  {
    type: 'True or False',
    difficulty: 'Easy',
    questions: [
      {
        question: 'Test 123',
        answer: true
      },
      {
        question: 'Test 123',
        answer: true
      }
    ]
  },
  {
    type: 'Short answer',
    difficulty: 'Easy',
    questions: [
      {
        question: 'Test 123'
      },
      {
        question: 'Test 123'
      }
    ]
  },
  {
    type: 'Long answer',
    difficulty: 'Easy',
    questions: [
      {
        question: 'Test 123'
      },
      {
        question: 'Test 123'
      }
    ]
  }
];

export default function Page() {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className='w-screen h-screen bg-neutral-700 flex flex-col items-center overflow-auto'>
      <div className='max-w-full w-[37rem] flex flex-col py-20 gap-12'>
        <div className='flex flex-col items-center'>
          <Select label='Select an animal' className='w-full'>
            <SelectItem key={1}>test</SelectItem>
          </Select>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
          <div className='flex flex-col gap-8'>
            {groups.map((group, index) => (
              <QuestionGroup
                register={register}
                groupIndex={index}
                control={control}
                key={index}
                {...group}
              />
            ))}
          </div>
          <Button
            type='submit'
            className='w-full bg-white text-black font-semibold text-base'
          >
            Submit answers
          </Button>
        </form>
      </div>
    </div>
  );
}

function QuestionGroup({
  groupIndex,
  difficulty,
  type,
  questions,
  register,
  control
}: { groupIndex: number; register: any; control: any } & QuestionGroupModel) {
  console.log(groupIndex);

  function getQuestion(
    type: QuestionType,
    question: QuestionModel,
    index: number
  ) {
    switch (type) {
      case 'Long answer':
        return (
          <LongAnswer
            register={register}
            index={index}
            groupIndex={groupIndex}
            key={index}
            {...(question as TextModel)}
          />
        );

      case 'Multiple choice':
        return (
          <MultipleChoice
            control={control}
            index={index}
            groupIndex={groupIndex}
            key={index}
            {...(question as MultipleChoiceModel)}
          />
        );

      case 'Short answer':
        return (
          <ShortAnswer
            register={register}
            index={index}
            groupIndex={groupIndex}
            key={index}
            {...(question as TextModel)}
          />
        );

      case 'Single choice':
        return (
          <SingleChoice
            control={control}
            index={index}
            groupIndex={groupIndex}
            key={index}
            {...(question as SingleChoiceModel)}
          />
        );

      case 'True or False':
        return (
          <TrueOrFalse
            control={control}
            index={index}
            groupIndex={groupIndex}
            key={index}
            {...(question as TrueOrFalseModel)}
          />
        );
    }
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center gap-1.5'>
        <h1 className='font-semibold text-xl text-white'>
          Group {groupIndex + 1}
        </h1>
        <i className='fa fa-circle-small text-xs' />
        <label className='font-semibold text-base text-white'>{type}</label>
        <i className='fa fa-circle-small text-xs' />
        <label className={cn('font-semibold text-base', colors[difficulty])}>
          {difficulty}
        </label>
      </div>
      <div className='flex flex-col gap-6'>
        {questions.map((question, index) => getQuestion(type, question, index))}
      </div>
    </div>
  );
}

function SingleChoice({
  question,
  choices,
  control,
  index,
  groupIndex
}: SingleChoiceModel & { control: any; index: number; groupIndex: number }) {
  return (
    <div className='bg-neutral-500 gap-4 p-4 rounded-3xl flex flex-col'>
      <h1 className='font-semibold text-base text-white'>{question}</h1>
      <Controller
        name={`${groupIndex}.${index}`}
        control={control}
        render={({ field: { onChange } }) => (
          <RadioGroup
            onValueChange={(value) => {
              onChange(value);
            }}
            className='!gap-2.5'
          >
            {choices.map((choice, index) => (
              <Radio
                key={index}
                value={String(index)}
                classNames={{
                  base: cn(
                    'inline-flex w-full m-0 bg-neutral-600',
                    'items-center justify-start',
                    'cursor-pointer rounded-lg gap-2 p-4  text-white  border-white'
                  ),
                  label: 'w-full',
                  wrapper: '!text-white !border-white',
                  control: '!bg-white'
                }}
                className='bg-neutral-600 px-4 py-3 !w-full !max-w-full rounded-2xl'
              >
                {choice}
              </Radio>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
}

function MultipleChoice({
  question,
  choices,
  control,
  index,
  groupIndex
}: MultipleChoiceModel & { control: any; index: number; groupIndex: number }) {
  return (
    <div className='bg-neutral-500 gap-4 p-4 rounded-3xl flex flex-col'>
      <h1 className='font-semibold text-base text-white'>{question}</h1>
      <Controller
        render={({ field: { onChange } }) => (
          <CheckboxGroup
            onValueChange={(value) => {
              onChange(value);
            }}
            className='!gap-2.5'
          >
            {choices.map((choice, index) => (
              <Checkbox
                key={index}
                value={String(index)}
                classNames={{
                  base: cn(
                    'inline-flex w-full m-0 bg-neutral-600',
                    'items-center justify-start',
                    'cursor-pointer rounded-lg gap-2 p-4 text-white  border-white'
                  ),
                  label: 'w-full',
                  wrapper: '!text-white !border-white'
                }}
                className='bg-neutral-600 px-4 py-3 !w-full !max-w-full rounded-2xl !border-white'
              >
                {choice}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
        control={control}
        name={`${groupIndex}.${index}`}
      />
    </div>
  );
}

function TrueOrFalse({
  question,
  control,
  index,
  groupIndex
}: TrueOrFalseModel & { control: any; index: number; groupIndex: number }) {
  return (
    <div className='bg-neutral-500 gap-4 p-4 rounded-3xl flex flex-col'>
      <h1 className='font-semibold text-base text-white'>{question}</h1>
      <Controller
        name={`${groupIndex}.${index}`}
        control={control}
        render={({ field: { onChange } }) => (
          <RadioGroup
            onValueChange={(value) => {
              onChange(value);
            }}
            className='!gap-2.5'
          >
            {['True', 'False'].map((choice, index) => (
              <Radio
                key={index}
                value={String(index)}
                classNames={{
                  base: cn(
                    'inline-flex w-full m-0 bg-neutral-600',
                    'items-center justify-start',
                    'cursor-pointer rounded-lg gap-2 p-4  text-white  border-white'
                  ),
                  label: 'w-full',
                  wrapper: '!text-white !border-white',
                  control: '!bg-white'
                }}
                className='bg-neutral-600 px-4 py-3 !w-full !max-w-full rounded-2xl'
              >
                {choice}
              </Radio>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
}

function ShortAnswer({
  question,
  register,
  index,
  groupIndex
}: TextModel & { register: any; index: number; groupIndex: number }) {
  return (
    <div className='bg-neutral-500 gap-4 p-4 rounded-3xl flex flex-col'>
      <h1 className='font-semibold text-base text-white'>{question}</h1>
      <Input
        {...register(`${groupIndex}.${index}`)}
        classNames={{
          inputWrapper:
            'bg-neutral-600 font-medium text-neutral-300 text-[0.875rem]'
        }}
        placeholder='Write your answer here...'
      />
    </div>
  );
}

function LongAnswer({
  question,
  register,
  index,
  groupIndex
}: TextModel & { register: any; index: number; groupIndex: number }) {
  return (
    <div className='bg-neutral-500 gap-4 p-4 rounded-3xl flex flex-col'>
      <h1 className='font-semibold text-base text-white'>{question}</h1>
      <Textarea
        {...register(`${groupIndex}.${index}`)}
        classNames={{
          inputWrapper:
            'bg-neutral-600 font-medium text-neutral-300 text-[0.875rem]'
        }}
        placeholder='Write your answer here...'
      />
    </div>
  );
}
