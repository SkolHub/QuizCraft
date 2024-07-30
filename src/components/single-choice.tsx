import { Controller } from 'react-hook-form';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { cn } from '@nextui-org/theme';
import { SingleChoiceModel } from '@/lib/types';
import { useState } from 'react';

export default function SingleChoice({
  question,
  choices,
  control,
  index,
  groupIndex,
  displayResult,
  answer
}: SingleChoiceModel & {
  control: any;
  index: number;
  groupIndex: number;
  displayResult: boolean;
  answer: number;
}) {
  const [ans, setAns] = useState<number | undefined>();

  return (
    <div className='bg-white/70 gap-4 p-4 rounded-3xl flex flex-col'>
      <h1 className='font-semibold text-base text-primary-700'>
        {question} answer: {answer}
      </h1>
      <Controller
        name={`${groupIndex}.${index}`}
        control={control}
        render={({ field: { onChange } }) => (
          <RadioGroup
            onValueChange={(value) => {
              onChange(+value);
              setAns(+value);
            }}
            className='!gap-2.5'
          >
            {choices.map((choice, index) => (
              <Radio
                key={index}
                value={String(index)}
                classNames={{
                  base: cn(
                    'inline-flex w-full m-0 bg-white',
                    'items-center justify-start',
                    'cursor-pointer rounded-lg gap-2 p-4  text-white  border-white'
                  ),
                  label: 'w-full !text-primary-600 text-base font-semibold',
                  wrapper: '!text-white !border-primary-900',
                  control: '!bg-primary-900'
                }}
                className='bg-neutral-600 px-4 py-3 !w-full !max-w-full rounded-2xl'
              >
                {choice}
              </Radio>
            ))}
          </RadioGroup>
        )}
      />
      {displayResult && (
        <label className={ans === answer ? 'text-green-500' : 'text-red-500'}>
          Answer: {answer}
        </label>
      )}
    </div>
  );
}
