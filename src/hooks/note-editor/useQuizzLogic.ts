'use client';

// External packagess
import * as React from 'react';

import { type PressEvent } from 'react-aria-components';

// Types
import { type QuizzData } from '@/hooks/note-editor/useGenerateQuizz';

// Dialog logic to enable user to adapt their application with power of AI
export const useQuizzLogic = (quizzData: QuizzData) => {
  const [questionCount, setQuestionCount] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);

  // Checking if the answer is correct or not, and then displaying feedback to user (logic essentially)
  const correctAnswerCheck = (e: PressEvent, index: number) => {
    e.target.classList.add('text-gray-100');
    if (index === quizzData[questionCount]?.correct - 1) {
      setCorrectAnswers((prev) => prev + 1);
      e.target.classList.add('bg-green-400');
    } else {
      e.target.classList.add('bg-red-400');
    }
    setTimeout(() => {
      setQuestionCount(questionCount + 1);
      // Waiting for two seconds to display feedback to user
      e.target.classList.remove('bg-green-400');
      e.target.classList.remove('bg-red-400');
      e.target.classList.remove('text-gray-100');
    }, 2000);
  };

  return { correctAnswerCheck, correctAnswers, questionCount };
};
