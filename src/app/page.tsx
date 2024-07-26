'use client';

import { Button, Select, SelectItem } from '@nextui-org/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useState } from 'react';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { cn } from '@nextui-org/theme';
import { Input } from '@nextui-org/input';

const difficulties = [
  {
    title: 'Easy',
    color: 'text-green-200'
  },
  {
    title: 'Medium',
    color: 'text-yellow-200'
  },
  {
    title: 'Hard',
    color: 'text-red-200'
  }
];

const questionTypes = [
  { name: 'True or False' },
  { name: 'Multiple choice' },
  { name: 'Single choice' },
  { name: 'Short answer' },
  { name: 'Long answer' }
];

type Inputs = {
  type: 'True or False' | 'Multiple choice' | 'Short answer' | 'Long answer';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  count: number;
};

const previous = [
  {
    files: ['unu', 'doi', 'trei'],
    timestamp: new Date()
  },
  {
    files: ['unu', 'doi', 'trei'],
    timestamp: new Date()
  },
  {
    files: ['unu', 'doi', 'trei'],
    timestamp: new Date()
  },
  {
    files: ['unu', 'doi', 'trei'],
    timestamp: new Date()
  },
  {
    files: ['unu', 'doi', 'trei'],
    timestamp: new Date()
  }
];

export default function Home() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      test: [
        {
          type: 'True or False',
          difficulty: 'Medium',
          count: 1
        }
      ]
    }
  });

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: 'test'
    });

  const [files, setFiles] = useState<File[]>([]);

  const onSubmit = (data: any) => {
    console.log(data);
    localStorage.setItem('test', JSON.stringify(data));
    return false;
  };

  const handleFileChange = (event: any) => {
    setFiles((prev) => [...prev, event.target.files[0]]);
  };

  return (
    <div className='w-screen h-screen bg-neutral-700 flex flex-col items-center'>
      <ScrollShadow
        hideScrollBar
        size={400}
        className='flex flex-col items-stretch pb-12'
      >
        <div className='flex gap-4 self-center pb-11 pt-14'>
          <i className='fal fa-check-square text-[5rem]' />
          <h1 className='font-semibold text-[3rem] text-white'>QuizCraft</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-neutral-500 rounded-3xl p-4 gap-2.5 flex flex-col'
        >
          <div className='flex flex-col bg-neutral-600 p-4 gap-4 rounded-3xl'>
            <label className='text-white/70 font-semibold text-xs'>
              Choose the materials to generate questions from (documents,
              images, etc.)
            </label>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className='bg-neutral-500 py-3 px-4 justify-between rounded-2xl flex items-center'
                  >
                    <div className='flex items-center gap-1'>
                      <i className='fa fa-file-lines text-xl text-white' />
                      <label className='font-semibold text-base text-white'>
                        {file.name}
                      </label>
                    </div>
                    <i
                      onClick={() => {
                        setFiles((prevItems) => {
                          const updatedItems = [...prevItems];
                          updatedItems.splice(index, 1);
                          return updatedItems;
                        });
                      }}
                      className='fa fa-xmark-circle text-neutral-300 text-xl cursor-pointer'
                    />
                  </div>
                ))}
              </div>
              <div>
                <input
                  onChange={handleFileChange}
                  type='file'
                  id='fileInput'
                  className='hidden'
                />
                <Button
                  className='bg-neutral-500 w-full'
                  onClick={() => {
                    document.getElementById('fileInput')!.click();
                    console.log(document.getElementById('fileInput'));
                  }}
                  startContent={<i className='fa fa-plus' />}
                >
                  Add a file
                </Button>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2.5'>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='flex flex-col gap-4 p-4 bg-neutral-600 rounded-3xl'
              >
                <div className='flex items-center justify-between'>
                  <h1 className='font-semibold text-white text-base'>
                    Question group {index + 1}
                  </h1>
                  {fields.length > 1 && (
                    <i
                      onClick={() => {
                        if (fields.length > 1) {
                          remove(index);
                        }
                      }}
                      className='fa fa-xmark-circle text-xl cursor-pointer'
                    />
                  )}
                </div>
                <div className='flex gap-4'>
                  <Select
                    {...register(`test.${index}.type`, {
                      required: true
                    })}
                    items={questionTypes}
                    label='Question type'
                    className='min-w-40'
                    classNames={{
                      trigger: 'bg-neutral-500',
                      label: 'font-semibold text-xs',
                      value: 'font-semibold text-base'
                    }}
                  >
                    {(questionType) => (
                      <SelectItem
                        classNames={{
                          title: 'font-semibold text-base'
                        }}
                        className='font-semibold text-base text-white'
                        key={questionType.name}
                      >
                        {questionType.name}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    {...register(`test.${index}.difficulty`, {
                      required: true
                    })}
                    items={difficulties}
                    label='Difficulty level'
                    className='min-w-40'
                    classNames={{
                      trigger: 'bg-neutral-500',
                      label: 'font-semibold text-xs'
                    }}
                    renderValue={(difficulties) =>
                      difficulties.map((difficulty) => (
                        <label
                          key={difficulty.data!.color}
                          className={cn(
                            '!font-semibold text-base',
                            difficulty.data!.color
                          )}
                        >
                          {difficulty.data!.title}
                        </label>
                      ))
                    }
                  >
                    {(difficulty) => (
                      <SelectItem
                        key={difficulty.title}
                        className={cn(
                          'font-semibold text-base',
                          difficulty.color
                        )}
                        classNames={{
                          title: 'font-semibold text-base'
                        }}
                      >
                        {difficulty.title}
                      </SelectItem>
                    )}
                  </Select>
                  <Input
                    {...register(`test.${index}.count`, {
                      required: true
                    })}
                    type='number'
                    label='Count'
                    classNames={{
                      inputWrapper: 'h-full bg-neutral-500'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button
            className='w-full bg-neutral-600 text-white text-base font-semibold'
            startContent={<i className='fa fa-plus' />}
            onClick={() => {
              append({
                difficulty: 'Medium',
                type: 'Multiple choice',
                count: 1
              });
            }}
          >
            Add a new question group
          </Button>
          <Button
            type='submit'
            className='w-full bg-white text-black text-base font-semibold'
            endContent={<i className='fa fa-paper-plane-alt text-xl' />}
          >
            Generate
          </Button>
        </form>
        <label className='text-neutral-300 font-semibold text-base pt-11 pb-7 self-center'>
          Or check out previous quizzes
        </label>
        <div className='flex flex-col gap-3'>
          {previous.map((quiz, index) => (
            <Button
              key={index}
              className='!bg-neutral-600 !rounded-[1.2rem] !p-4 !justify-between !flex !h-auto'
            >
              <div className='flex gap-2'>
                <i className='fa fa-file-lines text-xl text-white' />
                <label>
                  {quiz.files.slice(0, 2).join(', ')}
                  {quiz.files.length > 2
                    ? ` & ${quiz.files.length - 2} more`
                    : ''}
                </label>
              </div>
              <div className='flex items-center text-neutral-300 font-semibold text-[0.875rem] gap-2'>
                <label>
                  {('0' + quiz.timestamp.getHours()).slice(-2)}:
                  {('0' + quiz.timestamp.getMinutes()).slice(-2)}
                </label>
                <i className='fa fa-arrow-right text-xl text-white' />
              </div>
            </Button>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
