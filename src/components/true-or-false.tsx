import { TrueOrFalseModel } from '@/lib/types';
import { Controller } from 'react-hook-form';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { cn } from '@nextui-org/theme';
import { useState } from 'react';

export default function TrueOrFalse({
  question,
  control,
  index,
  groupIndex,
  displayResult,
  answer
}: TrueOrFalseModel & {
  control: any;
  index: number;
  groupIndex: number;
  displayResult: boolean;
}) {
  const [ans, setAns] = useState<boolean | undefined>();

  return (
    <div className='bg-white/70 gap-4 p-4 rounded-3xl flex flex-col'>
      <h1 className='font-semibold text-base text-primary-700'>{question}</h1>
      <Controller
        name={`${groupIndex}.${index}`}
        control={control}
        render={({ field: { onChange } }) => (
          <RadioGroup
            isDisabled={displayResult}
            onValueChange={(value) => {
              onChange(
                value === '0' ? false : value === '1' ? true : undefined
              );

              setAns(value === '0' ? false : value === '1' ? true : undefined);
            }}
            className='!gap-2.5'
          >
            {['True', 'False'].map((choice, index) => (
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
                className='bg-white px-4 py-3 !w-full !max-w-full rounded-2xl'
              >
                {choice}
              </Radio>
            ))}
          </RadioGroup>
        )}
      />
      {displayResult && (
        <label className={ans !== answer ? 'text-green-500' : 'text-red-500'}>
          Answer: {answer ? 'True' : 'False'}
        </label>
      )}
    </div>
  );
}
