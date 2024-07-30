'use client';

import { Button } from '@nextui-org/react';
import { cn } from '@nextui-org/theme';
import { useForm } from 'react-hook-form';
import { ReactNode, useEffect, useState } from 'react';
import api from '@/lib/api';
import { QuestionGroupModel, QuestionModel, QuestionType } from '@/lib/types';
import SingleChoice from '@/components/single-choice';
import MultipleChoice from '@/components/multiple-choice';
import TrueOrFalse from '@/components/true-or-false';
import ShortAnswer from '@/components/short-answer';
import LongAnswer from '@/components/long-answer';

const colors = {
  Easy: 'text-green-500',
  Medium: 'text-yellow-500',
  Hard: 'text-red-500'
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { register, handleSubmit, control } = useForm();

  const [groups, setGroups] = useState<QuestionGroupModel[]>([]);

  const [displayResult, setDisplayResult] = useState<boolean>(false);

  const [feedback, setFeedback] = useState<string>('');

  const onSubmit = async (data: any) => {
    setDisplayResult(true);

    const response = await api.post(
      `/quiz-craft/feedback/${id}`,
      groups
        .map((group) => group.questions)
        .flat()
        .map((question, index) => ({
          question: question.question,
          answer: data[index]
        }))
    );

    setFeedback(response.data.feedback);
  };

  useEffect(() => {
    async function getResponse() {
      const response = await api.get(`/quiz-craft/${id}`);

      console.log(response);

      setGroups(response.data[0].body.groups);
    }

    void getResponse();
  }, []);

  return (
    <div className='w-screen h-screen bg-secondary-200 flex flex-col items-center overflow-auto px-4'>
      <div className='max-w-full w-[37rem] flex flex-col py-20 gap-12'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
          <div className='flex flex-col gap-8'>
            {groups.map((group, index) => (
              <QuestionGroup
                displayResult={displayResult}
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
          <p>{displayResult ? feedback : ''}</p>
        </form>
      </div>
    </div>
  );
}

const questionComponents: Record<QuestionType, (...props: any) => ReactNode> = {
  'Long answer': LongAnswer,
  'Multiple choice': MultipleChoice,
  'Short answer': ShortAnswer,
  'Single choice': SingleChoice,
  'True or False': TrueOrFalse
};

function QuestionGroup({
  groupIndex,
  difficulty,
  type,
  questions,
  register,
  control,
  displayResult
}: {
  groupIndex: number;
  register: any;
  control: any;
  displayResult: boolean;
} & QuestionGroupModel) {
  console.log(groupIndex);

  function getQuestion(
    type: QuestionType,
    question: QuestionModel,
    index: number
  ) {
    const Component = questionComponents[type];

    return (
      <>
        <Component
          displayResult={displayResult}
          register={register}
          index={index}
          groupIndex={groupIndex}
          key={index}
          control={control}
          {...question}
        />
      </>
    );
  }

  return (
    <div className='flex flex-col gap-4 sm:gap-8'>
      <div className='flex items-center gap-1.5'>
        <h1 className='font-semibold text-xl text-primary-900'>
          Group {groupIndex + 1}
        </h1>
        <i className='fa fa-circle-small text-primary-800 text-xs' />
        <label className='font-semibold text-base text-primary-800'>
          {type}
        </label>
        <i className='fa fa-circle-small text-primary-800 text-xs' />
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
