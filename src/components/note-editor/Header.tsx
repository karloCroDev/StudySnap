'use client';

// Eternal packagess
import * as React from 'react';
import { Editor as EditorType } from '@tiptap/react';
import { twJoin } from 'tailwind-merge';

// Components
import { HeaderEditText } from '@/components/note-editor/HeaderEditText';

// Libs
import { plus_jakarta_sans } from '@/lib/fonts';

export const Header: React.FC<{
  isEditing: boolean;
  editor: EditorType;
}> = ({ isEditing, editor }) =>
  isEditing ? (
    <HeaderEditText editor={editor} />
  ) : (
    <div className="flex animate-header-initial-apperance items-center justify-between px-2">
      <h1
        className={twJoin(
          'text-3xl font-bold !italic underline underline-offset-4',
          plus_jakarta_sans.className
        )}
      >
        WWII
      </h1>
      <p className="text-md font-semibold text-gray-500">by: You</p>
    </div>
  );
