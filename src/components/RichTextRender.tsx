import React from 'react'

export function PortableTextRender({ value }: { value: any }) {
  if (!value) return null

  // Value may be an object with children or an array of blocks
  const blocks = Array.isArray(value) ? value : value?.children || []

  return (
    <>
      {blocks.map((block: any, i: number) => {
        const type = block?.type || block?.[0]
        // handle simple paragraph blocks
        if (block.type === 'paragraph' || block.type === 'p' || block.type === 'paragraph-node') {
          const text = (block.children || []).map((c: any) => c.text || '').join('')
          return (
            <p key={i} className="leading-relaxed">
              {text}
            </p>
          )
        }

        // fallback: try to stringify small blocks
        if (block.text) {
          return (
            <p key={i} className="leading-relaxed">
              {block.text}
            </p>
          )
        }

        return <div key={i} />
      })}
    </>
  )
}

export default PortableTextRender
