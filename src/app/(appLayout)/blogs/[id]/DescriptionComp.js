export default function MarkdownPreview({ markdown }) {
  const a = { __html: markdown };
  return <div dangerouslySetInnerHTML={a} />;
}
