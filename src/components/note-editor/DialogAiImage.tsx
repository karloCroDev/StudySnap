// 'use client';

// // External packages
// import * as React from 'react';
// import { TextField, FieldError, TextArea } from 'react-aria-components';
// import { Form } from 'react-aria-components';
// import { Editor as EditorType } from '@tiptap/react';
// import { MagicWandIcon } from '@radix-ui/react-icons';

// // Components
// import { Dialog } from '@/components/ui/Dialog';
// import { Button } from '@/components/ui/Button';
// import { Spinner } from '@/components/ui/Spinner';
// import { Input } from '@/components/ui/Input';

// // Store
// import { useToastStore } from '@/store/useToastStore';

// export const DialogGenerateContent: React.FC<{
//   editor: EditorType;
// }> = ({ editor }) => {
//   const toast = useToastStore((state) => state.setToast);
//   const [isOpen, setIsOpen] = React.useState(false);

//   const [prompt, setPrompt] = React.useState('');
//   const [loading, setLoading] = React.useState(false);

//   const imageAiResponse = async (
//     e: React.FormEvent<HTMLFormElement>,
//     // image: File
//   ) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append('file', image);
//       const response = await fetch('http://localhost:3000/api/ai/image-note', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         editor?.commands.insertContent(data);
//         toast({
//           title: 'Notes genearted',
//           content: 'Notes generated successfully from your image',
//           variant: 'success',
//         });
//       }
//     } catch (error) {
//       console.error('Upload failed:', error);
//       toast({
//         title: 'Failed to get notes',
//         content: 'Please try again later, problem with server',
//         variant: 'error',
//       });
//     } finally {
//       setLoading(false);
//       setIsOpen (false)
//     }
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={setIsOpen}
//       title="Generate content"
//       triggerProps={{
//         children: (
//           <Button
//             variant="solid"
//             rounded="full"
//             iconLeft={<MagicWandIcon className="size-5" />}
//             className="min-w-fit"
//             onPressStart={() => setIsOpen(true)}
//           >
//             Generate content
//           </Button>
//         ),
//         asChild: true,
//       }}
//     >
//       <Form className="flex flex-col" onSubmit={(e) => imageAiResponse(e, )}>
//         <Input label="Enter your image prompt" />
//         <Button
//           type="submit"
//           iconLeft={<MagicWandIcon className="size-5" />}
//           iconRight={loading && <Spinner />}
//           className="mt-2 self-end"
//         >
//           Generate
//         </Button>
//       </Form>
//     </Dialog>
//   );
// };
