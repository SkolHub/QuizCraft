import { Controller } from 'react-hook-form';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { cn } from '@nextui-org/theme';
import { SingleChoiceModel } from '@/lib/types';

export default function SingleChoice({
  question,
  choices,
  control,
  index,
  groupIndex,
  displayResult
}: SingleChoiceModel & {
  control: any;
  index: number;
  groupIndex: number;
  displayResult: boolean;
}) {
  return (
    <div className='bg-neutral-500 gap-4 p-4 rounded-3xl flex flex-col'>
      <h1 className='font-semibold text-base text-white'>{question}</h1>
      <Controller
        name={`${groupIndex}.${index}`}
        control={control}
        render={({ field: { onChange } }) => (
          <RadioGroup
            onValueChange={(value) => {
              onChange(+value);
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
