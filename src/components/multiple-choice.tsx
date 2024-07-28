import { MultipleChoiceModel } from '@/lib/types';
import { Controller } from 'react-hook-form';
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox';
import { cn } from '@nextui-org/theme';

export default function MultipleChoice({
  question,
  choices,
  control,
  index,
  groupIndex,
  displayResult
}: MultipleChoiceModel & {
  control: any;
  index: number;
  groupIndex: number;
  displayResult: boolean;
}) {
  return (
    <div className='bg-neutral-500 gap-4 p-4 rounded-3xl flex flex-col'>
      <h1 className='font-semibold text-base text-white'>{question}</h1>
      <Controller
        render={({ field: { onChange } }) => (
          <CheckboxGroup
            onValueChange={(value) => {
              onChange(value.map((value) => +value));
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
