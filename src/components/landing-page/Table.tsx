'use client';

// External packages
import * as React from 'react';
import {
  Table as AriaTable,
  TableHeader,
  TableBody,
  Column,
  Row,
  Cell,
} from 'react-aria-components';
import { twJoin } from 'tailwind-merge';

const data = [
  {
    feature: 'AI-Powered Q&A',
    studySnap: '✅ Yes',
    notion: '✅ Yes',
    evernote: '❌ No',
    quizlet: '❌ No',
    googleDocs: '❌ No',
  },
  {
    feature: 'AI-Generated Quizzes',
    studySnap: '✅ Yes',
    notion: '❌ No',
    evernote: '❌ No',
    quizlet: '✅ Yes',
    googleDocs: '❌ No',
  },
  {
    feature: 'AI-Autocompletion',
    studySnap: '✅ Yes',
    notion: '✅ Yes',
    evernote: '❌ No',
    quizlet: '✅ Yes',
    googleDocs: '❌ No',
  },
  {
    feature: 'AI Document Editing',
    studySnap: '✅ Yes',
    notion: '❌ No',
    evernote: '❌ No',
    quizlet: '❌ No',
    googleDocs: '❌ No',
  },
  {
    feature: 'Exploring strangers notes inside the app',
    studySnap: '✅ Yes',
    notion: '❌ No',
    evernote: '❌ No',
    quizlet: '❌ No',
    googleDocs: '❌ No',
  },
  {
    feature: 'Context-Based AI Assistance',
    studySnap: '✅ Yes',
    notion: '❌ No',
    evernote: '❌ No',
    quizlet: '❌ No',
    googleDocs: '❌ No',
  },
];

export const Table = () => (
  <div className="min-w-full overflow-x-scroll !rounded-lg border border-blue-900 shadow">
    <AriaTable aria-label="Feature Comparison Table" className="w-full">
      <TableHeader>
        <Column className="px-4 py-3" isRowHeader>
          Feature
        </Column>
        <Column className="px-4 py-3">StudySnap</Column>
        <Column className="px-4 py-3">Notion</Column>
        <Column className="px-4 py-3">Evernote</Column>
        <Column className="px-4 py-3">Quizlet</Column>
        <Column className="px-4 py-3">Google Docs</Column>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <Row key={index} className={twJoin('border-t border-t-blue-400')}>
            <Cell className="px-4 py-3">{item.feature}</Cell>
            <Cell className="px-4 py-3 text-center">{item.studySnap}</Cell>
            <Cell className="px-4 py-3 text-center">{item.notion}</Cell>
            <Cell className="px-4 py-3 text-center">{item.evernote}</Cell>
            <Cell className="px-4 py-3 text-center">{item.quizlet}</Cell>
            <Cell className="px-4 py-3 text-center">{item.googleDocs}</Cell>
          </Row>
        ))}
      </TableBody>
    </AriaTable>
  </div>
);
