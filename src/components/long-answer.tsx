import { TextModel } from '@/lib/types';
import { Textarea } from '@nextui-org/input';

export default function LongAnswer({
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
      <Textarea
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
