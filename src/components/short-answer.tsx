import { TextModel } from '@/lib/types';
import { Input } from '@nextui-org/react';

export default function ShortAnswer({
  question,
  register,
  index,
  groupIndex,
  displayResult
}: TextModel & {
  register: any;
  index: number;
  groupIndex: number;
  displayResult: boolean;
}) {
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
