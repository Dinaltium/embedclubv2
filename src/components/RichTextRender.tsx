'use client'
import React from 'react'

/**
 * renderNode
 * Small helper that turns a single lexical-like block node into a React element.
 * Supports paragraph blocks and basic inline formatting (bold, italic, links).
 */
function renderNode(node: any, key: number) {
  if (!node) return null

  // Lexical text node - has text property
  if (node.text !== undefined) {
    let content: React.ReactNode = node.text

    // Apply formatting
    if (node.format) {
      const format = node.format
      if (format & 1) content = <strong key={key}>{content}</strong> // bold
      if (format & 2) content = <em key={key}>{content}</em> // italic
    }

    // Handle links
    if (node.type === 'link' || node.url || node.href) {
      const href = node.url || node.href || '#'
      return (
        <a key={key} href={href} className="text-teal-700 underline">
          {content}
        </a>
      )
    }

    return <span key={key}>{content}</span>
  }

  // Paragraph-like block: loop children and render inline marks
  if (node.type === 'paragraph' || node.type === 'p' || (node.children && !node.text)) {
    const children = (node.children || [])
      .map((child: any, i: number) => {
        // Recursively render child nodes
        return renderNode(child, i)
      })
      .filter(Boolean)

    if (children.length === 0) return null

    // Use appropriate HTML element based on node type
    if (node.type === 'heading' || node.tag === 'h1' || node.tag === 'h2' || node.tag === 'h3') {
      const Tag = node.tag || 'h2'
      return React.createElement(Tag, { key, className: 'font-semibold text-lg mb-2' }, children)
    }

    return (
      <p key={key} className="leading-relaxed">
        {children}
      </p>
    )
  }

  // Unknown node type -> ignore (safe)
  return null
}

export default function PortableTextRender({ value }: { value: any }) {
  if (!value) return null

  // Handle Lexical format: { root: { children: [...] } }
  let blocks: any[] = []
  if (value?.root?.children) {
    blocks = value.root.children
  } else if (Array.isArray(value)) {
    blocks = value
  } else if (value?.children) {
    blocks = value.children
  }

  if (blocks.length === 0) return null

  return <>{blocks.map((b: any, i: number) => renderNode(b, i))}</>
}
