'use client';

// Eternal packagess
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';
import { twJoin } from 'tailwind-merge';

// Components
import { HeaderEditText } from '@/components/note-editor/HeaderEditText';

// Databases
import { plus_jakarta_sans } from '@/lib/fonts';

// Header for showing who is author and title of document (viewing mode of document - not header from core layout!)
export const Header: React.FC<{
  isEditing: boolean;
  editor: EditorType;
  title: string;
  author: string;
}> = ({ title, author, isEditing, editor }) =>
  isEditing ? (
    <HeaderEditText editor={editor} title={title} />
  ) : (
    <div className="flex animate-header-initial-apperance items-center justify-between">
      <h1
        className={twJoin(
          'text-3xl font-bold !italic underline underline-offset-4',
          plus_jakarta_sans.className
        )}
      >
        {title}
      </h1>
      <p className="text-md font-semibold text-gray-500">by: {author}</p>
    </div>
  );
