'use client';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';

// Components
import { Accordion } from '@/components/ui/Accordion';

export const FAQAccordion = () => (
  <RadixAccordion.Root type="single" defaultValue="1" collapsible>
    <Accordion value="1" title="1. What is StudySnap and how does it work?">
      <p>
        StudySnap is a platform designed for students and learners to create,
        organize, and share study notes. Users can create subjects, add notes,
        and attach documents. Notes can be private or public, and public notes
        appear in the Discover section. AI-powered features help users
        understand content, generate quizzes, complete sentences, or modify
        their documents based on their needs.
      </p>
    </Accordion>
    <Accordion value="2" title="2. Can I learn interacivly from notes?">
      <p>
        Yes! Public notes allow interactive learning through AI-powered
        features. You can ask AI questions about the content, generate quizzes
        to test your knowledge, and explore other users &apos; public notes. By
        clicking on a user &apos;s profile, you can view all their shared study
        materials for a more engaging learning experience.
      </p>
    </Accordion>
    <Accordion value="3" title="3. How does the AI assist with studying?">
      <p className="font-medium">
        The AI offers multiple functionalities, including:
      </p>
      <ul className="mt-4 list-disc pl-10">
        <li>Answering questions related to a document&apos;s content.</li>
        <li>Generating quizzes to test your understanding.</li>
        <li> Completing sentences based on the context.</li>
        <li>
          Allowing document owners to enhance or transform their documents based
          on prompts.
        </li>
      </ul>
    </Accordion>
    <Accordion value="4" title="4. Is my content private by default?">
      <p>
        Yes, all your notes and documents are private unless you explicitly
        choose to make them public. You have full control over your study
        materials and who can access them.
      </p>
    </Accordion>
    <Accordion value="5" title="5. Can I upload files and images to my notes?">
      <p>
        Absolutely! You can upload images or PDF documents to enhance your
        notes. If you own the document, you can also provide a custom prompt,
        and the AI will generate a response tailored to your needs. Ako želiš
        dodatne izmjene ili još neka pitanja/dodatke, samo reci! 🚀
      </p>
    </Accordion>
  </RadixAccordion.Root>
);
