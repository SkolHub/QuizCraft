import { MultipleChoiceModel } from '@/lib/types';
import { Controller } from 'react-hook-form';
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox';
import { cn } from '@nextui-org/theme';
import { useState } from 'react';

function arraysContainSameNumbers(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.slice().sort((a, b) => a - b);
  const sortedArr2 = arr2.slice().sort((a, b) => a - b);

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
}

export default function MultipleChoice({
  question,
  choices,
  control,
  index,
  groupIndex,
  displayResult,
  answer
}: MultipleChoiceModel & {
  control: any;
  index: number;
  groupIndex: number;
  displayResult: boolean;
  answer: number[];
}) {
  const [ans, setAns] = useState<number[]>([]);

  return (
    <div className='bg-white/70 gap-4 p-4 rounded-3xl flex flex-col'>
      <h1 className='font-semibold text-base text-primary-700'>{question}</h1>
      <Controller
        render={({ field: { onChange } }) => (
          <CheckboxGroup
            onValueChange={(value) => {
              onChange(value.map((value) => +value));
              setAns(value.map((value) => +value));
            }}
            className='!gap-2.5'
          >
            {choices.map((choice, index) => (
              <Checkbox
                key={index}
                value={String(index)}
                classNames={{
                  base: cn(
                    'inline-flex w-full m-0 bg-white',
                    'items-center justify-start',
                    'cursor-pointer rounded-lg gap-2 p-4 text-white  border-white'
                  ),
                  label: 'w-full !text-primary-600 text-base font-semibold',
                  wrapper: '!text-white !border-primary-900'
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
      {displayResult && (
        <label
          className={
            arraysContainSameNumbers(ans, answer)
              ? 'text-green-500'
              : 'text-red-500'
          }
        >
          Answer: {answer.join(', ')}
        </label>
      )}
    </div>
  );
}
