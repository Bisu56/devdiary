import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

interface Props {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your story...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[250px] p-4 text-slate-700',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
      <div className="flex flex-wrap gap-1 p-2 border-b border-slate-200 bg-slate-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded text-sm font-semibold ${
            editor.isActive('bold') ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded text-sm italic ${
            editor.isActive('italic') ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded text-sm font-semibold ${
            editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded text-sm font-semibold ${
            editor.isActive('heading', { level: 3 }) ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded text-sm ${
            editor.isActive('bulletList') ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded text-sm ${
            editor.isActive('orderedList') ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded text-sm font-mono ${
            editor.isActive('codeBlock') ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {'</>'}
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter image URL:');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className="p-2 rounded text-sm text-slate-600 hover:bg-slate-100"
        >
          IMG
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;