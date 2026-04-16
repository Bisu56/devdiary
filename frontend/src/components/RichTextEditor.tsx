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
        placeholder: 'Write something amazing...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
      <div className="flex flex-wrap gap-1 p-2 border-b border-slate-700 bg-slate-800/50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded text-sm ${
            editor.isActive('bold') ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded text-sm ${
            editor.isActive('italic') ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded text-sm ${
            editor.isActive('heading', { level: 2 }) ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded text-sm ${
            editor.isActive('heading', { level: 3 }) ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded text-sm ${
            editor.isActive('bulletList') ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded text-sm ${
            editor.isActive('orderedList') ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded text-sm ${
            editor.isActive('codeBlock') ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          {'</>'}
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded text-sm text-slate-400 hover:text-white"
        >
          Image
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;