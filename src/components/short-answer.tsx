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
    <div className='bg-white/70 gap-4 p-4 rounded-3xl flex flex-col'>
      <h1 className='font-semibold text-base text-primary-700'>{question}</h1>
      <Input
        {...register(`${groupIndex}.${index}`)}
        classNames={{
          inputWrapper:
            'bg-white !font-medium !text-primary-700 text-[0.875rem]',
          input: '!text-primary-700 !font-medium'
        }}
        placeholder='Write your answer here...'
      />
    </div>
  );
}
