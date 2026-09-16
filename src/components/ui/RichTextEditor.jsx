'use client';

// src/components/ui/RichTextEditor.jsx
// Komponen WYSIWYG Rich Text Editor berbasis Tiptap untuk CMS Esther Property

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdTitle,
  MdUndo,
  MdRedo,
} from 'react-icons/md';

export function RichTextEditor({
  content = '',
  onChange,
  placeholder = 'Tuliskan deskripsi lengkap di sini...',
  label,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [3],
        },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'rich-text min-h-[150px] p-3.5 text-xs text-neutral-900 leading-relaxed focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="w-full h-40 bg-neutral-100/60 border border-border-c rounded-btn animate-pulse flex items-center justify-center text-xs text-neutral-500">
        Memuat editor teks...
      </div>
    );
  }

  const toggleAction = (actionFn, isActiveCheck) => {
    return {
      onClick: (e) => {
        e.preventDefault();
        actionFn();
      },
      className: `p-1.5 rounded-btn text-sm font-medium transition-colors cursor-pointer ${
        isActiveCheck
          ? 'bg-remax-blue text-white shadow-2xs'
          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
      }`,
    };
  };

  return (
    <div className="space-y-1.5 font-sans">
      {label && (
        <label className="block text-xs font-semibold text-neutral-900">
          {label}
        </label>
      )}

      <div className="border border-border-c rounded-btn bg-white overflow-hidden focus-within:border-remax-blue focus-within:ring-1 focus-within:ring-remax-blue/20 transition-all">
        {/* Toolbar Header */}
        <div className="bg-neutral-100/70 border-b border-border-c px-2 py-1.5 flex flex-wrap items-center gap-1">
          {/* Bold */}
          <button
            type="button"
            title="Tebal (Bold)"
            {...toggleAction(
              () => editor.chain().focus().toggleBold().run(),
              editor.isActive('bold')
            )}
          >
            <MdFormatBold className="text-base" />
          </button>

          {/* Italic */}
          <button
            type="button"
            title="Miring (Italic)"
            {...toggleAction(
              () => editor.chain().focus().toggleItalic().run(),
              editor.isActive('italic')
            )}
          >
            <MdFormatItalic className="text-base" />
          </button>

          <div className="w-[1px] h-4 bg-border-c mx-1" />

          {/* Heading 3 */}
          <button
            type="button"
            title="Sub-judul (Heading)"
            {...toggleAction(
              () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
              editor.isActive('heading', { level: 3 })
            )}
          >
            <MdTitle className="text-base" />
          </button>

          {/* Bullet List */}
          <button
            type="button"
            title="Daftar Poin (Bullet List)"
            {...toggleAction(
              () => editor.chain().focus().toggleBulletList().run(),
              editor.isActive('bulletList')
            )}
          >
            <MdFormatListBulleted className="text-base" />
          </button>

          {/* Numbered List */}
          <button
            type="button"
            title="Daftar Angka (Numbered List)"
            {...toggleAction(
              () => editor.chain().focus().toggleOrderedList().run(),
              editor.isActive('orderedList')
            )}
          >
            <MdFormatListNumbered className="text-base" />
          </button>

          {/* Blockquote */}
          <button
            type="button"
            title="Kutipan (Quote)"
            {...toggleAction(
              () => editor.chain().focus().toggleBlockquote().run(),
              editor.isActive('blockquote')
            )}
          >
            <MdFormatQuote className="text-base" />
          </button>

          <div className="w-[1px] h-4 bg-border-c mx-1" />

          {/* Undo */}
          <button
            type="button"
            title="Batal (Undo)"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().undo().run();
            }}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded-btn text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
          >
            <MdUndo className="text-base" />
          </button>

          {/* Redo */}
          <button
            type="button"
            title="Ulangi (Redo)"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().redo().run();
            }}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded-btn text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
          >
            <MdRedo className="text-base" />
          </button>
        </div>

        {/* Content Area */}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
